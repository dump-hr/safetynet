#!/bin/sh

TF_ENV=$1;

if [ -z "$TF_ENV" ]; then
  echo "Usage: $0 <environment> <command>"
  exit 1
fi

shift 1
cd -P -- "$(dirname -- "$0")" || exit 1

if [ ! -d "../terraform/live/$TF_ENV" ]; then
  echo "Environment '$TF_ENV' does not exist"
  exit 1
fi

TF_STATES_BY_PRIORITY="tfstate network data compute"

for TF_STATE in $TF_STATES_BY_PRIORITY; do
  if [ ! -d "../terraform/live/$TF_ENV/$TF_STATE" ]; then
    continue
  fi

  echo "Running command in '$TF_STATE' terraform state"
  ./terraform.sh "$TF_ENV" "$TF_STATE" "$@"
done