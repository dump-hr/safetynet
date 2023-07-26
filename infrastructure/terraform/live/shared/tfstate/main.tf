terraform {
  required_version = ">= 1.0.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region  = "us-east-1"
  profile = "safetynet"
}

module "tfstate_backend" {
  source = "../../../modules/tfstate-backend"

  bucket_name = "safetynet-tfstate"
  table_name  = "safetynet-tfstate-lock"
}
