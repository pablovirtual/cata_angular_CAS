#!/bin/sh

# Railway proporciona el puerto en la variable $PORT
# Este es el puerto en el que DEBE escuchar la aplicación
if [ -z "$PORT" ]; then
  echo "Error: La variable PORT no está definida. Railway requiere que la aplicación escuche en el puerto especificado por esta variable."
  exit 1
fi

echo "=============================================================="
echo "INICIANDO APLICACIÓN CATÁLOGO PELÍCULAS"
echo "Puerto asignado por Railway: $PORT"
echo "Fecha y hora de despliegue: $(date)"
echo "=============================================================="

# Crear una configuración de nginx específica para Railway
cat > /etc/nginx/conf.d/default.conf << EOF
server {
    # Es CRUCIAL escuchar en el puerto proporcionado por Railway
    listen $PORT default_server;
    server_name _;
    
    root /usr/share/nginx/html;
    index index.html;
    
    # Configuración para Angular SPA
    location / {
        try_files \$uri \$uri/ /index.html;
        
        # Deshabilitar el caché para HTML y otros archivos
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
        expires off;
    }
    
    # Configuración de caché para archivos estáticos con versión hash
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)(\?v=[0-9.]+)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000";
    }
    
    # Archivos estáticos sin versión hash - no cachear
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
    }
    
    # Configuración de seguridad
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
}
EOF

echo "Configuración de NGINX completada para Railway."
echo "NGINX escuchará en el puerto interno $PORT."
echo "Inicio de NGINX..."

# Iniciar NGINX en primer plano
exec nginx -g 'daemon off;'
