data "aws_instances" "monitoring" {
  filter {
    name   = "tag:Role"
    values = ["monitoring"]
  }

  filter {
    name   = "instance-state-name"
    values = ["running"]
  }
}
