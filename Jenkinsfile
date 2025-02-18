pipeline {
    agent any

    tools {
      nodejs 'v18'
    }

    environment {
        NVM_DIR = "${WORKSPACE}/.nvm"
        OPERATION = "${params.OPERATION}"
    }

    parameters {
        choice(name: 'OPERATION', choices:['build&deploy','stop','start'], description:'What operation do you want to carry out?')
    }

    stages {
        stage('Install Dependencies') {
            when {
                expression { params.OPERATION == 'build&deploy' }
            }
            steps {
                script {
                    // Install project dependencies
                    sh 'rm -rf ./package-lock.json'
                    sh 'npm install --verbose'
                    
                }
            }
        }
        stage('Stop Servers') {
            when {
                expression { params.OPERATION == 'stop' }
            }
            steps {
                script {
                    // Stop the project
                    sh 'npm run stop'
                }
            }
        }
        stage('Run Project') {
            when {
                expression { params.OPERATION == 'build&deploy' || params.OPERATION == 'start'}
            }
            steps {
                script {
                    // Run the project in the background
                    sh 'npm run stop'
                    sh 'npm run start'
                }
            }
        }
    }
}