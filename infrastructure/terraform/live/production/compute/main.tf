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

module "backend" {
  source = "../../../modules/ec2"

  name_prefix               = "safetynet-backend-production"
  instance_type             = "t3a.nano"
  instance_count            = 1
  instance_root_device_size = 12
  subnets                   = data.aws_subnets.public_subnets.ids
  security_groups           = data.aws_security_groups.public_sg.ids
  # key_pair =

  tags = {
    Project     = "safetynet"
    Role        = "backend"
    Environment = "production"
  }
}
