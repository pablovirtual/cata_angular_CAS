FROM nginx:alpine

# Crear directorios necesarios
RUN mkdir -p /usr/share/nginx/html

# Crear una página estática básica
RUN echo '<html><head><title>Catálogo de Películas</title><style>body{font-family:Arial,sans-serif;margin:0;padding:0;display:flex;justify-content:center;align-items:center;height:100vh;background-color:#f5f5f5}.container{text-align:center;background-color:white;padding:30px;border-radius:10px;box-shadow:0 4px 8px rgba(0,0,0,0.1);max-width:600px}.title{color:#3f51b5;margin-bottom:10px}.subtitle{color:#666;margin-bottom:20px}.message{line-height:1.6}.btn{display:inline-block;background-color:#3f51b5;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;margin-top:20px;transition:background-color 0.3s}.btn:hover{background-color:#303f9f}</style></head><body><div class="container"><h1 class="title">Catálogo de Películas</h1><h2 class="subtitle">Servicio en Mantenimiento</h2><p class="message">Estamos trabajando para mejorar la aplicación.<br>El servicio estará disponible pronto.</p><a href="#" class="btn">Actualizar Página</a></div></body></html>' > /usr/share/nginx/html/index.html

# Configuración de NGINX
RUN echo 'server { \
  listen 80; \
  server_name _; \
  root /usr/share/nginx/html; \
  index index.html; \
  location / { \
    try_files $uri $uri/ /index.html; \
  } \
}' > /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
