# Railway-friendly static server using Caddy
FROM caddy:2-alpine

WORKDIR /srv

COPY . /srv

COPY Caddyfile /etc/caddy/Caddyfile

# Railway sets $PORT — Caddy listens on it via env substitution
EXPOSE 8080
