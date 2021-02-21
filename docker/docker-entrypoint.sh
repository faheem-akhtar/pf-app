#!/bin/bash
set -e

if [ -z "$ENVIRONMENT" ]; then
    echo "\$ENVIRONMENT Needs to be defined"
else
    echo "\$ENVIRONMENT is $ENVIRONMENT"
fi

if [[ $ENVIRONMENT == "staging" ]]; then 
 	echo "This is STAGING ENVIRONMENT"
 	cp /src/.env_staging /src/.env
 	cp /src/configuration/staging_environments.json /src/configuration/environments.json
elif [[ $ENVIRONMENT == "production" ]]; then
    echo "This is PRODUCTION ENVIRONMENT"
 	cp /src/.env_production /src/.env
 	cp /src/configuration/production_environments.json /src/configuration/environments.json
fi

yarn run start
