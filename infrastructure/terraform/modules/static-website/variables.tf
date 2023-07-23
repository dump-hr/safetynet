variable "bucket_name" {
  description = "The name of the S3 bucket. Must be globally unique."
  type        = string
}

variable "website_domain" {
  description = "The domain name for static website."
  type        = string
}

variable "single_page_app" {
  description = "Is website single page app."
  type        = bool
  default     = false
}

variable "wait_for_cdn_deployment" {
  description = "Wait for CDN deployment."
  type        = bool
  default     = true
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone id for website domain."
  type        = string
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "tags for the static website"
}