FROM node:10.17.0-jessie-slim

RUN npm i -g yarn@1.21.1
RUN apt-get update \
  && apt-get install -y \ 
    git \
    curl \
    bzip2 \
    libfontconfig \
    ca-certificates \
    --no-install-recommends

RUN mkdir -p /src 
WORKDIR /src
