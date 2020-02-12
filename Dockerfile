FROM node:slim

ENV DOMAIN="abs.austinsapp.com"

COPY . /app/

WORKDIR /app

RUN apt update -y \
    && useradd -M -s /sbin/nologin app \
    && npm install \
    && cd client \
    && npm install \
    && npm run build \
    && chown -R app:app /app 

EXPOSE 80

USER app

SHELL [ "bash", "-c" ]

CMD ["node", "Server.js"]