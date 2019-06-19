FROM alpine:3.7

RUN apk add --update nginx nodejs

RUN npm config set unsafe-perm true

# RUN npm install -g vue-cli
# RUN npm install -g quasar-cli
# RUN npm install -g @vue/cli
# RUN npm install -g @vue/cli-init

RUN mkdir -p /tmp/nginx/vue-single-page-app
RUN mkdir -p /var/log/nginx
RUN mkdir -p /home/node/app
RUN mkdir -p /var/www/html

COPY ./nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx_config/default.conf /etc/nginx/conf.d/default.conf

# VOLUME [ "/home/node/app" ]
WORKDIR /home/node/app

# Bundle app source
COPY . .

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install
RUN cnpm run build:prod

RUN cp -r /home/node/app/dist/* /var/www/html

# EXPOSE 9000


CMD ["nginx", "-g", "daemon off;"]

#CMD [ "quasar", "dev" ]
