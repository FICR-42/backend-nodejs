pipeline {
    agent any

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
            parallel {
                stage('Development') {
                    when {
                        branch 'develop'
                    }
                    steps {
                        sh 'echo "Deploying develop backend..."'
                    }
                }
                stage('Production') {
                    when {
                        branch 'master'
                    }
                    steps {
                        sh 'echo "Deploying production backend..."'
                    }
                }
            }
        }
    }
}

def pushDockerImageECR() {
    sh """
        aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 253519823014.dkr.ecr.us-east-1.amazonaws.com
        docker build -t backend-ficr .
        docker tag backend-ficr:latest 253519823014.dkr.ecr.us-east-1.amazonaws.com/backend-ficr:latest
        docker push 253519823014.dkr.ecr.us-east-1.amazonaws.com/backend-ficr:latest
    """
}