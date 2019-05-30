### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:8.12.0-alpine as builder

ARG npmConfigProduction
ARG nodeEnv
ARG peersviewApi
ENV NPM_CONFIG_PRODUCTION=${npmConfigProduction}
ENV NODE_ENV=${nodeEnv}
ENV PEERSVIEW_API=${peersviewApi}

COPY package*.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm install && mkdir /app && mv ./node_modules ./app

## Move to /app (eq: cd /app)
WORKDIR /app

# Copy everything from host to /app in the container
COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN npm run build-prod

### STAGE 2: Setup ###

FROM nginx:1.15-alpine

ARG nodeEnv
ENV NODE_ENV=${nodeEnv}

## Remove default nginx config
RUN rm -rf /etc/nginx/conf.d/*

## Copy nginx
COPY --from=builder /app/nginx /nginx

## Copy the nginx mimeTypes
COPY --from=builder /app/nginx/mime.types /etc/nginx/conf.d/mime.types

## Copy ssl
COPY --from=builder /app/ssl /ssl

RUN \
if [ "$nodeEnv" == "production" ]; then cp /nginx/production.conf /etc/nginx/conf.d/default.conf; else cp /nginx/development.conf /etc/nginx/conf.d/default.conf; fi

RUN \
if [ "$nodeEnv" == "production" ]; then cp -R /ssl /sslPeersview; fi

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080
EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]