# pf-web-app

Website - rewrite repository

### Project

To start container in local, please run scripts in root folder

```
make build-images
docker-compose up -d
```

#### Start project

## Routing

The page to be run is decided by the ingress defined in `chars/pf-web-app/values.yaml`. The defined variables are used in `ingress.yaml` to configure resolving the requested URL.

```
    /pf-web-app\/(.*)
```

URL is resolved in in sequence from left to right.

Healtcheck path: /pf-web-app/ping
