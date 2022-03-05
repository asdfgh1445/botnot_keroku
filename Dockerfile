FROM node:16.4
ARG SHOPIFY_API_KEY
ARG BOTNOT_API_URL
ENV SHOPIFY_API_KEY ${SHOPIFY_API_KEY} 
ENV BOTNOT_API_URL ${BOTNOT_API_URL}

WORKDIR /app
COPY package.json /app
RUN npm install --production --legacy-peer-deps
COPY . /app
RUN npm run build
CMD npm run start
EXPOSE 8081
