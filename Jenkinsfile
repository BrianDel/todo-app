pipeline {
    agent any

    tools {
        nodejs 'v18'
    }

    environment {
        NVM_DIR = "${WORKSPACE}/.nvm"
        OPERATION = "${params.OPERATION}"
        PATH = "${env.PATH}:/usr/local/bin:/usr/local/lib/node_modules/pm2/bin"
    }

    parameters {
        choice(name: 'OPERATION', choices: ['build&deploy', 'stop', 'start'], description: 'What operation do you want to carry out?')
    }

    stages {
        stage('Install Dependencies') {
            when {
                expression { params.OPERATION == 'build&deploy' }
            }
            steps {
                script {
                    // Install project dependencies
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
                    // Stop the project using pm2
                    sh 'pm2 stop all'
                }
            }
        }
        stage('Run Project') {
            when {
                expression { params.OPERATION == 'build&deploy' || params.OPERATION == 'start' }
            }
            steps {
                script {
                    // Run the project in the background using pm2
                    sh 'pm2 start npm --name "vite-project" -- run start'
                }
            }
        }
    }
}