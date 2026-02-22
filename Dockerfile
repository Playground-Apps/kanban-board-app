FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from previous stage
COPY ./dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80
# Traefik configuration
ARG BASE_PATH="/"

LABEL traefik.enable=true \
      traefik.http.routers.frontend.tls=true \
      traefik.http.routers.frontend.rule="Host(`kanban-board.com`) && PathPrefix(\`${BASE_PATH}\`) && !PathPrefix(\`/api\`)" \
      traefik.http.routers.frontend.entrypoints="websecure" \
      traefik.http.routers.frontend.priority="500" \
      traefik.http.services.frontend.loadbalancer.server.port="80"

CMD ["nginx", "-g", "daemon off;"]