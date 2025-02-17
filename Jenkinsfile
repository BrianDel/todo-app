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
                    sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash'
                    
                    // Add NVM to the environment
                    sh '''
                    echo "export NVM_DIR="$NVM_DIR
                    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
                    echo $NVM_DIR
                    echo "export NVM_DIR=$NVM_DIR" >> ~/.bash_rc
                    cat ~/.bash_rc
                    echo "[ -s \\"$NVM_DIR/nvm.sh\\" ] && \\. \\"$NVM_DIR/nvm.sh\\"" >> ~/.bash_rc
                    cat ~/.bash_rc
                    '''
                    
                    // Source NVM and install Node.js
                    sh '''
                    source ~/.bash_rc
                    nvm install 18
                    nvm use 18
                    nvm ls
                    '''
                }
            }
        }
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