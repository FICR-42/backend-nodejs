#!/bin/bash

AWS_ACCOUNT_ID=$1
AWS_REGION=$2
APPLICATION_NAME=$3

# login no ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# baixa imagem da nova versão do backend
docker pull $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$APPLICATION_NAME:latest

# para e remove container ativo
docker stop ficr-back
docker rm ficr-back

# sobe nova versão do app
docker-compose up -d

# limpa ambiente docker
docker system prune -a -f