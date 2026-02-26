#!/usr/bin/env bash
set -euo pipefail

if [ -n "${FRONTEND_PORT:-}" ]; then
  PORT="${FRONTEND_PORT}"
  if ss -ltn "( sport = :${PORT} )" | grep -q LISTEN; then
    echo "Port ${PORT} is already in use. Set another value in FRONTEND_PORT."
    exit 1
  fi
else
  PORT=""
  for candidate in 8080 8081 8082 8083 8084 8085 8086 8087 8088 8089 8090; do
    if ! ss -ltn "( sport = :${candidate} )" | grep -q LISTEN; then
      PORT="${candidate}"
      break
    fi
  done

  if [ -z "${PORT}" ]; then
    echo "No free port found between 8080 and 8090. Set FRONTEND_PORT manually."
    exit 1
  fi

  if [ "${PORT}" != "8080" ]; then
    echo "Port 8080 already in use, falling back to port ${PORT}."
  fi
fi

export FRONTEND_PORT="${PORT}"

docker compose down --remove-orphans

docker compose build --pull

docker compose up -d

docker compose ps
echo "Frontend available at http://localhost:${FRONTEND_PORT}"
