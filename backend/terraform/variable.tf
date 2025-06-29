variable "common_tags" {
  type = object({
    terraform = bool
    env       = string
    application = string
  })
  default = {
    terraform = true
    env       = "dev"
    application = "cc-dev"
  }
}

variable "region" {
  type = string
  default = "eu-west-1"
}

variable "key_name" {
  type = string
}

variable "db_name" {
  type = string
}

variable "db_username" {
  type = string
}

variable "db_password" {
  type = string
}