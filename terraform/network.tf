resource "aws_vpc" "cc-vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = var.common_tags
}

resource "aws_subnet" "cc-subnet-1" {
  vpc_id = aws_vpc.cc-vpc.id
  cidr_block = "10.0.0.0/24"
  availability_zone = "${var.region}a"
  tags = var.common_tags
}

resource "aws_subnet" "cc-subnet-2" {
  vpc_id = aws_vpc.cc-vpc.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "${var.region}b"
  tags = var.common_tags
}

resource "aws_db_subnet_group" "cc-subnet-group" {
  subnet_ids = [aws_subnet.cc-subnet-1.id, aws_subnet.cc-subnet-2.id]
}

resource "aws_internet_gateway" "cc-igw" {
  vpc_id = aws_vpc.cc-vpc.id
  tags = var.common_tags
}

resource "aws_route_table" "cc-subnet-1-rt" {
  vpc_id = aws_vpc.cc-vpc.id
  route {
    gateway_id = aws_internet_gateway.cc-igw.id
    cidr_block = "0.0.0.0/0"
  }
}

resource "aws_route_table" "cc-subnet-2-rt" {
    vpc_id = aws_vpc.cc-vpc.id
    route {
      gateway_id = aws_internet_gateway.cc-igw.id
      cidr_block = "0.0.0.0/0"
    }
}

resource "aws_route_table_association" "cc-rta-1" {
  subnet_id = aws_subnet.cc-subnet-1.id
  route_table_id = aws_route_table.cc-subnet-1-rt.id
}

resource "aws_route_table_association" "cc-rta-2" {
  subnet_id = aws_subnet.cc-subnet-2.id
  route_table_id = aws_route_table.cc-subnet-2-rt.id
}