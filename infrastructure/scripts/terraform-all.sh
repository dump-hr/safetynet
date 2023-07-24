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

TF_COMPONENTS_BY_PRIORITY="tfstate network data compute"

for TF_COMPONENT in $TF_COMPONENTS_BY_PRIORITY; do
  if [ ! -d "../terraform/live/$TF_ENV/$TF_COMPONENT" ]; then
    continue
  fi

  echo "Running command in '$TF_COMPONENT' component"
  ./terraform.sh "$TF_ENV" "$TF_COMPONENT" "$@"
done