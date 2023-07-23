output "cloudfront_endpoint" {
  value       = aws_cloudfront_distribution.website.domain_name
  description = "Endpoint for Cloudfront distribution"
}

output "website_endpoint" {
  value       = cloudflare_record.website.hostname
  description = "Endpoint for static website"
}
