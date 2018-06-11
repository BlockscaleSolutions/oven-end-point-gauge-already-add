#! /usr/bin/env bash

# Exit script as soon as a command fails.
set -o errexit

trap cleanup EXIT

cleanup() {
  docker-compose down
}


truffle_migrate() {
  cd exchange-service/truffle && ../node_modules/truffle/build/cli.bundled.js migrate --reset && cd ../../
}

# Start client, deploy new contracts and then test
docker-compose up -d eth
truffle_migrate

docker-compose build exchange-service
docker-compose up exchange-service

# sleep 5

# node test/tests
