FROM nginx:alpine

# Crear un archivo index.html básico
COPY index.html /usr/share/nginx/html/index.html

# Copiar el script de inicio
COPY start.sh /start.sh

# Hacer el script ejecutable
RUN chmod +x /start.sh

# Exponer el puerto (pero Railway lo ignorará y usará su variable PORT)
EXPOSE 80

# Comando para iniciar usando nuestro script
CMD ["/start.sh"]
