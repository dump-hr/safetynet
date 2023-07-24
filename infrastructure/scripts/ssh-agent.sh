#!/bin/sh

ENV=$1
ACTION=$2

if [ -z "$ENV" ] || [ -z "$ACTION" ]; then
  echo "Usage: $0 <env> <load|unload>"
  exit 1
fi

cd -P -- "$(dirname -- "$0")" || exit 1

case "$ACTION" in
load)
  sops -d "../ssh-keys/$ENV.enc" | ssh-add -
  ;;
unload)
  ssh-add -d "../ssh-keys/$ENV.pub"
  ;;
*)
  echo "Usage: $0 <env> <load|unload>"
  exit 1
  ;;
esac
