FROM 624165964329.dkr.ecr.ap-southeast-1.amazonaws.com/pf-newprojects-web:builder-latest

COPY docker/docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

EXPOSE 8080 3000

COPY . /src

CMD ["/docker-entrypoint.sh"]
