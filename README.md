# pf-web-app

Website - rewrite repository

## Routing

The page to be run is decided by the ingress defined in `chars/pf-web-app/values.yaml`. The defined variables are used in `ingress.yaml` to configure resolving the requested URL.

```
    /pf-web-app\/(.*)
```

URL is resolved in in sequence from left to right.

Healtcheck path: /pf-web-app/ping
