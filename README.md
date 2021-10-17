# pf-web-app

Website - rewrite repository

### Project

Before moving next steps, please be sure installed NodeJS version is `v14.17.1`
To start container in local, please run scripts in root folder

```
make build-images
docker-compose up -d
```

[PR-env pipeline url](https://build.propertyfinder.ae/view/PF-K8S-PRENV/job/pf-k8s-deploy-prenv/)

### Internalization

#### Managing Translations

We use [lokalise](https://app.lokalise.com/project/8608849260eedebb9ba8d9.28758700/?view=multi) for translations. All translation keys must be created in lokalise app.

- Common translations should be assigned to `common/%LANG_ISO%.json` in lokalise.
- Country spesific translations should be assigned to `country/${countryName}/%LANG_ISO%.json` where `${countryName}` is country-code like `ma, ae, bh ...`. Country spesific translations should have the exact key with the common.

The application initially reads the country-specific key, if it's not defined it reads from the common ones.

#### Managing styling

Styling internalization is being handled by [postcss-rtl](https://www.npmjs.com/package/postcss-rtl).

### Routing

The page to be run is decided by the ingress defined in `chars/pf-web-app/values.yaml`. The defined variables are used in `ingress.yaml` to configure resolving the requested URL.

```
    /pf-web-app\/(.*)
```

URL is resolved in in sequence from left to right.

Healtcheck path: /pf-web-app/ping

### Testing

The app is tested with [jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/docs/react-testing-library).

There are 4 scripts to test the app:

- `test`: Tests the app, will close on success or fail.
- `test:watch`: Tests the app but keeps running, will automaticaly run the test for the modified files.
- `test:update`: Tests the app and is used to update snapshots (if any).
- `test:coverage`: Tests the app and creates a coverage reporter.

To test a single file just add the path to the end of the comment like:

```bash
yarn test:update src/components/header/__tests__/component.spec.tsx
```

### Logging

Some console methods have been customized for datadog implementation in the client side.
Nothing is required to send them to datadog, use console methods as normal. If first parameter is a string it will use that as message, otherwise the message will be `Generic`.
