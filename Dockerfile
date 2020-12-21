# CREATE BUILD ##
FROM node:14.15.1-alpine as build
ARG environment

WORKDIR /workspace/
ADD package.json /workspace/
RUN npm install

COPY . /workspace/
RUN $(npm bin)/ng build --configuration=$environment

# COPY RUNTIME BUILD AND CONFIGURE NGINX ##
FROM nginx:1.19.5-alpine AS runtime

# nginx stuff
COPY  --from=build /workspace/dist/ /usr/share/nginx/html/
COPY ./default.conf.template /etc/nginx/conf.d/default.conf.template
COPY ./nginx.conf /etc/nginx/nginx.conf

CMD /bin/ash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
