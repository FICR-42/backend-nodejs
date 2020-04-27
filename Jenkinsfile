pipeline {
    agent any

    stages {
        stage('NPM Setup') {
            steps {
                sh 'echo "Instaling packages..."'
                // sh 'npm install'
            }
        }
        stage('Test and Build') {
                parallel {
                    stage('Run Tests') {
                        steps {
                            sh 'echo "Running tests..."'
                            sh 'chmod +x scripts/init-tests.sh'
                            sh './scripts/init-tests.sh'
                        }
                    }
                    stage('Run API') {
                        sh 'npm run start'
                    }
                }
            }
        }
        stage('Deployment to EC2 Instance') {
            parallel {
                stage('Develop') {
                    when {
                        branch 'develop'
                    }
                    steps {
                        sh 'echo "Deploying develop backend..."'
                    }
                }
                stage('Master') {
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