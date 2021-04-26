ARG DOCKER_HUB="docker.io"

FROM $DOCKER_HUB/library/node:14.16.1-alpine3.13 AS build


COPY . /workspace/

ARG NPM_REGISTRY="https://registry.npmjs.org"

RUN echo "registry = \"$NPM_REGISTRY\"" > /workspace/.npmrc                              && \
    cd /workspace/                                                                       && \
    npm install --no-package-lock                                                        && \
    npm run build

FROM $DOCKER_HUB/library/nginx:1.20.0 AS runtime


COPY  --from=build /workspace/dist/ /usr/share/nginx/html/

RUN chmod a+rwx /var/cache/nginx /var/run /var/log/nginx                        && \
    sed -i.bak 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf && \
    sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf


EXPOSE 8080

USER nginx

HEALTHCHECK     CMD     [ "service", "nginx", "status" ]


