#!/bin/sh

# Railway proporciona el puerto en la variable $PORT
# Este es el puerto en el que DEBE escuchar la aplicación
if [ -z "$PORT" ]; then
  echo "Error: La variable PORT no está definida. Railway requiere que la aplicación escuche en el puerto especificado por esta variable."
  exit 1
fi

echo "=============================================================="
echo "DIAGNÓSTICO DE PUERTO EN RAILWAY:"
echo "Puerto asignado por Railway: $PORT"
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
    }
    
    # Configuración de caché para archivos estáticos
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)\$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000";
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

# Crear página de diagnóstico (reemplaza la página normal)
cat > /usr/share/nginx/html/index.html << EOH
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diagnóstico de Railway</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f0f2f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #3f51b5;
        }
        .info {
            background-color: #e8eaf6;
            padding: 15px;
            border-radius: 4px;
            margin: 15px 0;
        }
        .success {
            color: green;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Diagnóstico de Railway</h1>
        <div class="info">
            <p><strong>Servidor:</strong> NGINX</p>
            <p><strong>Puerto interno configurado:</strong> $PORT</p>
            <p><strong>Hora de inicio del servidor:</strong> $(date)</p>
        </div>
        <p class="success">Si puedes ver esta página, la configuración básica del servidor está funcionando correctamente.</p>
        <p>Catálogo de Películas - Aplicación Angular</p>
    </div>
</body>
</html>
EOH

# Iniciar NGINX en primer plano
exec nginx -g 'daemon off;'
