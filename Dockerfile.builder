FROM node:14.17.1-stretch-slim

RUN apt-get update \
  && apt-get install -y \ 
    git \
    curl \
    bzip2 \
    libfontconfig \
    ca-certificates \
    --no-install-recommends \
  && curl -sfL https://raw.githubusercontent.com/lokalise/lokalise-cli-2-go/master/install.sh | sh \
  && mv bin/lokalise2 /usr/local/bin/

RUN mkdir -p /src 
WORKDIR /src
