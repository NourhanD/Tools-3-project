pipeline {
    agent any

    environment {
        REGISTRY = 'nourhand'
        BACKEND_IMAGE = 'nourhand/backend-image:latest'
        FRONTEND_IMAGE = 'nourhand/frontend-image:latest'
        NAMESPACE = 'nourhandarwish-dev'
    }

    stages {
        stage('Clone Repositories') {
            steps {
                git url: 'https://github.com/NourhanD/Tools-3-project.git', branch: 'main'
            }
        }
        stage('Build Backend') {
            steps {
                dir('Backend'){
                    bat 'docker build -t %REGISTRY%/%BACKEND_IMAGE% .'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('Frontend') {
                    bat 'docker build -t %REGISTRY%/%FRONTEND_IMAGE% .'
                }
            }
        }
        stage('Run frontend container') {
            steps {
                bat 'docker run --name frontend1 -p 3000:3000 -d %FRONTEND_IMAGE%'
            }
        }
        stage('Run backend container') {
            steps {
                bat 'docker run --name backend1 -p 5000:5000 -d %BACKEND_IMAGE%'
            }
        }
    }
}
