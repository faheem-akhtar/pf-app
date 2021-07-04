FROM node:14.17.1-stretch-slim

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
