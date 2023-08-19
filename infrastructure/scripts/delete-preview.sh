#!/bin/sh
#
PREVIEW_NAME=$1

TF_STATE_SUFFIX=-$PREVIEW_NAME TF_VAR_preview_name=$PREVIEW_NAME ./scripts/terraform.sh preview data init
TF_STATE_SUFFIX=-$PREVIEW_NAME TF_VAR_preview_name=$PREVIEW_NAME ./scripts/terraform.sh preview compute init
TF_VAR_preview_name=$PREVIEW_NAME ./scripts/terraform.sh preview data destroy -auto-approve
TF_VAR_preview_name=$PREVIEW_NAME ./scripts/terraform.sh preview compute destroy -auto-approve
