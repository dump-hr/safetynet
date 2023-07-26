#!/bin/sh

set -e

DIR=$1
BUCKET=$2

if [ -z "$DIR" ] || [ -z "$BUCKET" ]; then
  echo "Usage: $0 <dir> <bucket>"
  exit 1
fi

cd "$DIR" || exit 1

yarn
yarn build

aws s3 sync dist/ "s3://$BUCKET"

id=$(aws cloudfront list-distributions --query "DistributionList.Items[?Comment == '$BUCKET'].Id | [0]" --output text)
AWS_MAX_ATTEMPTS=10 aws cloudfront create-invalidation --distribution-id "$id" --paths "/*"
