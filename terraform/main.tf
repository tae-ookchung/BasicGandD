terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = var.region
}

resource "aws_instance" "cc-dev-server" {
  # Machine images are different across regions
  ami = "ami-03fd334507439f4d1" #to change
  instance_type = "t2.small"
  root_block_device {
    volume_size = 64
  }
  subnet_id = aws_subnet.cc-subnet-1.id
  vpc_security_group_ids = [
      aws_security_group.cc-allow-all-dev.id
  ]
  key_name = var.key_name
  tags = var.common_tags
}

resource "aws_eip" "cc-dev-server-ip" {
  instance = aws_instance.cc-dev-server.id
  tags = var.common_tags
}

output "server-pub-ip" {
  value = aws_instance.cc-dev-server.public_ip
}

resource "aws_db_instance" "cc-dev-db" {
  instance_class = "db.t3.micro"
  allocated_storage = 20
  engine = "postgres"
  db_name = var.db_name
  password = var.db_password
  username = var.db_username
  port = 5432

  db_subnet_group_name = aws_db_subnet_group.cc-subnet-group.name

  availability_zone = "${var.region}a"
  vpc_security_group_ids = [
      aws_security_group.cc-allow-all-dev.id
  ]

  publicly_accessible = true
  skip_final_snapshot = true
}

output "db-address" {
  value = aws_db_instance.cc-dev-db.address
}