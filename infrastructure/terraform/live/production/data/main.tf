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

data "sops_file" "secrets" {
  source_file = "secrets.enc.json"
}

module "web" {
  source = "../../../modules/static-website"

  bucket_name        = "safetynet-web-production"
  website_domain     = "safetynet-web-production.dump.hr"
  cloudflare_zone_id = "b21704208d240237d4c4484318481bff"
  single_page_app    = true

  tags = {
    Project     = "safetynet"
    Role        = "web"
    Environment = "production"
  }

  providers = {
    aws.us-east-1 = aws.us-east-1
  }
}
