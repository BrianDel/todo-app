pipeline {
    agent any

    environment {
        NVM_DIR = "${WORKSPACE}/.nvm"
    }

    stages {
        stage('Setup') {
            steps {
                script {
                    // Download and install NVM
                    dir("${WORKSPACE}") {
                      sh '''
                      #!/bin/bash
                      curl -o ${JENKINS_HOME}/install.sh https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh
                      unset NVM_DIR
                      echo 'NVM_DIR:'$NVM_DIR
                      '''
                      sh '''
                      #!/bin/bash
                      export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
                      echo "[ -s \\"$NVM_DIR/nvm.sh\\" ] && \\. \\"$NVM_DIR/nvm.sh\\"" >> ~/.bashrc
                      echo "---------"
                      cat ~/.bashrc
                      '''
                      
                      // Source NVM and install Node.js
                      sh '''
                      #!/bin/bash
                      source $NVM_DIR/.bash_rc
                      nvm install 18
                      nvm use 18
                      nvm ls
                      '''
                                      
                      // Source NVM and install Node.js
                      sh '''
                      #!/bin/bash
                      source ~/.bash_rc
                      nvm install 18
                      nvm use 18
                      nvm ls
                      '''
                    } 
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Install project dependencies
                    dir("${WORKSPACE}") {
                      sh 'rm -rf ./package-lock.json'
                      sh 'npm install --verbose'
                    }
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