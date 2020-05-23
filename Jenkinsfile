pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:12.16.2-alpine'
                    args '-v ${pwd}/:/usr/app/backend-nodejs/'
                    reuseNode true
                }
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            agent {
                docker {
                    image 'node:12.16.2-alpine'
                    args '-v ${pwd}/:/usr/app/backend-nodejs/'
                    reuseNode true
                }
            }
            stage('Unit Tests') {
                steps {
                    sh 'chmod +x scripts/init-tests.sh'
                    sh './scripts/init-tests.sh'
                }
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
