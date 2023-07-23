data "aws_subnets" "public_subnets" {
  tags = {
    Project     = "safetynet"
    Role        = "public"
    Environment = "shared"
    ManagedBy   = "terraform"
  }
}

data "aws_security_groups" "public_sg" {
  tags = {
    Project     = "safetynet"
    Role        = "public"
    Environment = "shared"
    ManagedBy   = "terraform"
  }
}
