pipeline {
    agent any
    
    environment {
        NODEJS_HOME = tool name: 'node'
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
    }
    
    stages {
        stage('Copiando repositorio') {
            steps {
                git branch: 'main',  url: 'https://github.com/ElizabethTV/CI-CD-API'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'npm install cors@^2.8.5 express@^4.19.2 pg@^8.11.5'
            }
        }
        
        stage("Build Image") {
            steps {
                script {
                    docker.build('elizabeth00/my-rest-api:latest', '.')
                }
            }
        }
        
        stage ('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker_cred', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]){
                    bat 'docker login -u elizabeth00 -p lichis140500'
                    bat 'docker tag my-rest-api:1.0 elizabeth00/my-rest-api:latest'
                    bat 'docker push elizabeth00/my-rest-api:latest'
                    bat 'docker logout'
                }
            }
        }
        
        stage('Build') {
            steps {
                bat 'node src/index.js'
            }
        }
    }
}

