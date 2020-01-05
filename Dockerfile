FROM node:12-slim
WORKDIR /usr/src/app
ENV CLOUDINARY_CLOUD_NAME='YOUR_CLOUDINARY_CLOUD_NAME' \
    CLOUDINARY_API_KEY='YOUR_CLOUDINARY_API_KEY' \
    CLOUDINARY_API_SECRET='YOUR_CLOUDINARY_API_SECRET' \
    ALGOLIA_APP_ID='YOUR_ALGOLIA_APP_ID' \
    ALGOLIA_ADMIN_KEY='YOUR_ALGOLIA_ADMIN_KEY' \
    ALGOLIA_INDEX_NAME='prod_images' \
    NODE_ENV='production'
COPY ./src/ ./src/
COPY tsconfig.json webpack.config.js package*.json ./
RUN NODE_ENV=production npm ci && npm run build:prod
CMD [ "npm", "run", "start:prod" ]