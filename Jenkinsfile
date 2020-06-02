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
                    pwd
                    ls
                """
                    // chmod +x scripts/init-tests.sh
                    // ./scripts/init-tests.sh
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
