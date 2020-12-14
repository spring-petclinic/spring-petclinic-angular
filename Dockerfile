FROM node:14.15.0-alpine AS builder
COPY . /workspace
WORKDIR /workspace

RUN npm i 
RUN $(npm bin)/ng build --prod

FROM nginx:1.18.0
COPY --from=builder /workspace/dist/ /usr/share/nginx/html

RUN chmod a+rwx /var/cache/nginx /var/run /var/log/nginx 
RUN sed -i.bak 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

EXPOSE 8080
USER nginx
HEALTHCHECK CMD ["service", "nginx", "status"]