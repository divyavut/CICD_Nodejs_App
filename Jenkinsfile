pipeline {
    agent any
     tools {
        nodejs 'nodejs'  // Ensure 'NodeJS' matches the name in Global Tool Configuration
        npm install -g npm 
    }
    environment {
        AWS_REGION = 'us-east-1'  // Your AWS region
        ECR_REPOSITORY = '461997657539.dkr.ecr.us-east-1.amazonaws.com/nodejs-app' // ECR repository name
        // EKS_CLUSTER_NAME = 'expense'  // EKS cluster name
        DOCKER_IMAGE_TAG = 'v1'  // Docker image tag
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // Install Node.js dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run Jest tests
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Log in to ECR and get the login password
                    sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPOSITORY}"

                    // Build the Docker image
                    sh "docker build -t ${ECR_REPOSITORY}:${DOCKER_IMAGE_TAG} ."
                }
            }
        }

        stage('Push Docker Image to ECR') {
            steps {
                script {
                    // Push the Docker image to ECR
                    sh "docker push ${ECR_REPOSITORY}:${DOCKER_IMAGE_TAG}"
                }
            }
        }
    }

    post {
        always {
            cleanWs()  // Clean up workspace after the pipeline runs
        }
        success {
            echo 'Pipeline completed successfully!, wonderfull'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for details.'
        }
    }
}
