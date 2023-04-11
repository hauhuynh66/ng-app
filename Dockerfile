FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/ng-app /usr/share/nginx/html