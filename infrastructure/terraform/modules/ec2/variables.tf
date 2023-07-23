variable "name_prefix" {
  description = "Name prefix for EC2 instances."
  type        = string
}

variable "instance_count" {
  type        = number
  description = "number of instances to create"
  default     = 1
}

variable "instance_type" {
  type        = string
  description = "instance type"
  default     = "t3a.micro"
}

variable "instance_root_device_size" {
  type        = number
  description = "Root bock device size in GB"
  default     = 12
}

variable "subnets" {
  type        = list(string)
  description = "valid subnets to assign to server"
}

variable "security_groups" {
  type        = list(string)
  description = "security groups to assign to server"
  default     = []
}

variable "key_pair" {
  type        = string
  description = "key pair name"
  default     = null
}

variable "create_elastic_ip" {
  type        = bool
  description = "create an EIP for the ec2 instances"
  default     = true
}

variable "tags" {
  type        = map(string)
  description = "tags for ec2 instances"
  default     = {}
}
