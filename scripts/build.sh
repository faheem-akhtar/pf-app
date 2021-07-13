#!/bin/bash -f

for country_code in ae qa
do
    export NEXT_PUBLIC_COUNTRY_CODE=$country_code

    export NEXT_PUBLIC_MOBILE=1
    rm -rf .$country_code.mobile.next
    next build

    export NEXT_PUBLIC_MOBILE=
    rm -rf .$country_code.desktop.next
    next build
done