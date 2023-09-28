terraform {
  required_version = ">= 1.0.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }

    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }

    sops = {
      source  = "carlpett/sops"
      version = "~> 0.5"
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

provider "cloudflare" {
  api_token = data.sops_file.secrets.data["cloudflare_api_token"]
}

data "cloudflare_zone" "dump_hr" {
  name = "dump.hr"
}

data "sops_file" "secrets" {
  source_file = "secrets.enc.json"
}

module "web" {
  source = "../../../modules/static-website"

  bucket_name             = "safetynet-web-preview-${var.preview_name}"
  website_domain          = "safetynet-web-preview-${var.preview_name}.dump.hr"
  cloudflare_zone_id      = data.cloudflare_zone.dump_hr.id
  single_page_app         = true
  wait_for_cdn_deployment = false

  tags = {
    Project     = "safetynet"
    Role        = "web"
    Environment = "preview"
    Branch      = var.preview_name
  }

  providers = {
    aws.us-east-1 = aws.us-east-1
  }
}
