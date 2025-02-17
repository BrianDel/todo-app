pipeline {
    agent any

    tools {
      nodejs 'v18'
    }

    environment {
        NVM_DIR = "${WORKSPACE}/.nvm"
        MY_PARAM = "${params.MY_PARAM}"
    }

    parameters {
        string(name: 'MY_PARAM', defaultValue: 'default_value', description: 'Description of my parameter')
        booleanParam(name: 'MY_BOOLEAN_PARAM', defaultValue: true, description: 'Description of my boolean parameter')
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // Install project dependencies
                    sh 'rm -rf ./package-lock.json'
                    sh 'npm install --verbose'
                    
                }
            }
        }
        stage('Run Project') {
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