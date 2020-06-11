pipeline {
    agent any

    options {
        timeout(time: 15, unit: 'MINUTES')
    }

    environment {
        APPLICATION_NAME="backend-ficr"
    }

    parameters {
        string(name: 'DEPLOY_ENV', defaultValue: 'develop', description: 'Deploy Enviroment')
        string(name: 'AWS_ACCOUNT_ID', defaultValue: '253519823014', description: 'AWS Account ID')
        string(name: 'AWS_CREDENTIALS_ID', defaultValue: 'jenkins-aws', description: 'AWS Credentials ID')
        string(name: 'AWS_REGION', defaultValue: 'us-east-1', description: 'AWS Region')
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh """
                    chmod +x scripts/init-tests.sh
                    ./scripts/init-tests.sh
                """
            }
        }

        stage('Push docker image to ECR') {
            steps {
                pushDockerImageECR()
            }
        }

        stage('Deploy Application on EC2') {
            steps {
                deployApplication()
            }
        }
    }
}

def pushDockerImageECR() {
    withAWS(credentials: "${params.AWS_CREDENTIALS_ID}", region: "${params.AWS_REGION}") {
        sh """
            aws ecr get-login-password --region ${params.AWS_REGION} | docker login --username AWS --password-stdin ${params.AWS_ACCOUNT_ID}.dkr.ecr.${env.AWS_REGION}.amazonaws.com
            docker build -t ${env.APPLICATION_NAME} .
            docker tag ${env.APPLICATION_NAME}:latest ${params.AWS_ACCOUNT_ID}.dkr.ecr.${params.AWS_REGION}.amazonaws.com/${env.APPLICATION_NAME}:latest
            docker push ${params.AWS_ACCOUNT_ID}.dkr.ecr.${params.AWS_REGION}.amazonaws.com/${env.APPLICATION_NAME}:latest
        """
    }
}

def deployApplication() {
    sshagent(['backend-ficr-ec2']) {
        sh """
            ssh -o StrictHostKeyChecking=no -T ubuntu@backend.teste-route52-42.com 'chmod +x update.sh && ./update.sh ${env.AWS_ACCOUNT_ID} ${env.AWS_REGION} ${env.APPLICATION_NAME}'
        """
    }
}
