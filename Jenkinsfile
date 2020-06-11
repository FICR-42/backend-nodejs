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
        string(name: 'AWS_CREDENTIALS_ID', defaultValue: '5b4f2b5d-5891-47ae-bed3-151b4f3396fa', description: 'AWS Credentials ID')
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
            docker push ${params.AWS_ACCOUNT_ID}.dkr.ecr.${params.AWS_REGION}.amazonaws.com/${params.APPLICATION_NAME}:latest
        """
    }
}

def deployApplication() {
    sh """
        // TO DO
    """
}
