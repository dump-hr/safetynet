terraform {
  required_version = ">= 1.0.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "safetynet-tfstate"
    dynamodb_table = "safetynet-tfstate-lock"
    region         = "us-east-1"
    profile        = "safetynet"
    encrypt        = true
  }
}

provider "aws" {
  region  = "eu-central-1"
  profile = "safetynet"
}

provider "aws" {
  alias   = "us-east-1"
  region  = "us-east-1"
  profile = "safetynet"
}

locals {
  github_repository = "dump-hr/safetynet"
  deploy_branches   = ["main"]
  web_bucket        = "safetynet-web-production"

  tags = {
    Project     = "safetynet"
    Environment = "shared"
    ManagedBy   = "terraform"
  }
}

data "aws_kms_alias" "sops" {
  provider = aws.us-east-1
  name     = "alias/safetynet"
}

data "aws_cloudfront_distribution" "web" {
  provider = aws.us-east-1
  id       = "E2VFEEQYON09SI"
}

data "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
}

data "aws_iam_policy_document" "github_deploy_trust" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [data.aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = [for branch in local.deploy_branches : "repo:${local.github_repository}:ref:refs/heads/${branch}"]
    }
  }
}

data "aws_iam_policy_document" "github_deploy" {
  statement {
    actions   = ["kms:Decrypt"]
    resources = [data.aws_kms_alias.sops.target_key_arn]
  }

  statement {
    actions   = ["ec2:DescribeInstances"]
    resources = ["*"]
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = ["arn:aws:s3:::${local.web_bucket}"]
  }

  statement {
    actions   = ["s3:PutObject"]
    resources = ["arn:aws:s3:::${local.web_bucket}/*"]
  }

  statement {
    actions   = ["cloudfront:ListDistributions"]
    resources = ["*"]
  }

  statement {
    actions   = ["cloudfront:CreateInvalidation"]
    resources = [data.aws_cloudfront_distribution.web.arn]
  }
}

resource "aws_iam_role" "github_deploy" {
  name                 = "safetynet-github-deploy"
  assume_role_policy   = data.aws_iam_policy_document.github_deploy_trust.json
  max_session_duration = 3600

  tags = local.tags
}

resource "aws_iam_role_policy" "github_deploy" {
  name   = "deploy"
  role   = aws_iam_role.github_deploy.id
  policy = data.aws_iam_policy_document.github_deploy.json
}

output "github_deploy_role_arn" {
  value = aws_iam_role.github_deploy.arn
}
