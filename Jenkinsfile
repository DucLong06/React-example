pipeline {
    agent any

    stages {
        stage('Cloning from project') {
            steps {
                script {
                    def TITLE = "Trigger Frontend Pipeline ${env.BUILD_NUMBER}"
                    def STATUS = "Starting"
                    discordBot(TITLE, STATUS)
                    checkout scm
                }
            }
        }

        stage ('Build') {
            steps {
                script {
                    def tag = "${env.GIT_COMMIT.substring(0,7)}"
                    app = docker.build("${env.image}:${tag}", "--build-arg BE_URL=${env.BE_URL} -f Dockerfile.prod .")
                }
            }
        }

        stage ('Push') {
            steps {
                script {
                    docker.withRegistry("${env.registry}", "${env.credential}") {
                        app.push()
                    }
                }
            }
        }

        stage ('Deploy') {
            steps {
                script {
                    def tag = "${env.GIT_COMMIT.substring(0,7)}"
                    def image_id =  "${env.image}:${tag}"
                    sh "~/.local/bin/ansible-playbook  deployments/ansible-frontend.yaml --extra-vars \"image=${image_id}\""
                    sh "~/.local/bin/ansible-playbook  deployments/ingress.yaml --extra-vars \"STATIC_IP=${env.STATIC_IP}\" --extra-vars \"DOMAIN=${env.DOMAIN}\""
                }
            }
        }
    }

    post {
        success {
            script {
                def TITLE = "Completed Frontend Pipeline ${env.BUILD_NUMBER}"
                def STATUS = "Completed"
                discordBot(TITLE, STATUS)
            }
        }

        failure {
            script {
                def TITLE = "Failed Frontend Pipeline ${env.BUILD_NUMBER}"
                def STATUS = "Failed"
                discordBot(TITLE, STATUS)
            }
        }
    }

}

def repoName() {
    return scm.getUserRemoteConfigs()[0].getUrl().tokenize('/').last().split("\\.")[0]
}

def authorName() {
    return sh (
        script: "git --no-pager show -s --format='%an'",
        returnStdout: true
    )
}

def discordBot(TITLE, STATUS){
    def repo = repoName()
    def author = authorName()
    def tag = "${env.GIT_COMMIT.substring(0,7)}"
    def FOOTER = "Author: ${author}Status: ${STATUS}"
    def BODY = STATUS + " build & deploy pipeline ${env.BUILD_NUMBER} \n\nProject: `${repo}` \nBranch: `${env.GIT_BRANCH}` \nTag/Version: `${tag}` \n---"
    if (env.DISCORD_WEBHOOK){
        discordSend description: "${BODY}", footer: "${FOOTER}", image: "", link: "${env.BUILD_URL}", result: currentBuild.currentResult, scmWebUrl: "", thumbnail: "", title: "${TITLE}", webhookURL: "${env.DISCORD_WEBHOOK}"
    }
}

