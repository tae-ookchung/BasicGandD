resource "aws_security_group" "cc-allow-all-dev" {
  vpc_id = aws_vpc.cc-vpc.id
  depends_on = [ aws_vpc.cc-vpc ]
  tags = var.common_tags

  # SSH rule
  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
  }

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
  }

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 0
    to_port     = 65535
    protocol    = "udp"
  }

  # For pings
  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = -1
    to_port     = -1
    protocol    = "icmp"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}