# terraform

## Recipes

### New dev machine setup

Install dependencies:
- [aws-cli](https://github.com/aws/aws-cli#installation)
- [tfenv](https://github.com/tfutils/tfenv)

Add project AWS credentials to `~/.aws/credentials` file:
```
[safetynet]
aws_access_key_id = AKIAXXXXXXXXXXXXXXXX
aws_secret_access_key = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Apply changes to infrastructure

```
./run [dev|staging|production] [network|compute|data] [terraform-command]
```

### Create terraform state backend

```
cd live/shared/tfstate-backend
# check values in main.tf
terraform init
terraform apply
```

### Destroy terraform state backend

terraform state backend will not be deleted with `terraform destroy` because
state for it is stored locally on time of creation and is not copied to remote
location or backed up. To cleanup terraform state from AWS account, manually
delete tfstate S3 bucket and tfstate lock DynamoDB table from AWS console.
Names can be found in `shared/tfstate/main.tf`. 

## Learning resources

- [DevOps with Terraform](https://cloudcasts.io/course/terraform) `course` `3h 43m`