ARG NODE_VERSION=20-alpine

# Prepare build environment
FROM node:$NODE_VERSION as prebuild
WORKDIR /app

COPY ./package.json ./
COPY ./src/componentes/scripts/generate-package-prod-deps.js ./
RUN node ./generate-package-prod-deps.js



# build environment
FROM node:$NODE_VERSION as build
ARG BACK_DOMAIN
ARG CLIENT_ID
ARG CLIENT_SECRET

ENV BACK_DOMAIN $BACK_DOMAIN
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY --from=prebuild /app/package-pro-deps.json /app/package.json
RUN yarn --prod
COPY . .
RUN yarn build



# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /html
COPY front.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
