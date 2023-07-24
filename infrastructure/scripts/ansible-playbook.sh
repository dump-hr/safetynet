#!/bin/sh

ANSIBLE_ENV=$1;
ANSIBLE_COMPONENT=$2;

if [ -z "$ANSIBLE_ENV" ] || [ -z "$ANSIBLE_COMPONENT" ]; then
  echo "Usage: $0 <environment> <component> <arguments>"
  exit 1
fi

shift 2
cd -P -- "$(dirname -- "$0")" || exit 1

if [ ! -d "../ansible/$ANSIBLE_COMPONENT" ]; then
  echo "Component '$ANSIBLE_COMPONENT' does not exist"
  exit 1
fi

if [ ! -f "../ansible/$ANSIBLE_COMPONENT/inventories/$ANSIBLE_ENV.aws_ec2.yml" ]; then
  echo "Environment '$ANSIBLE_ENV' does not exist"
  exit 1
fi

./ssh-agent.sh "$ANSIBLE_ENV" load

ansible-playbook "../ansible/$ANSIBLE_COMPONENT/playbook.yml" \
  -i "../ansible/$ANSIBLE_COMPONENT/inventories/$ANSIBLE_ENV.aws_ec2.yml" \
  "$@"

./ssh-agent.sh "$ANSIBLE_ENV" unload