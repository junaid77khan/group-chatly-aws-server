# Group Chatly AWS Server

A backend server for the Group Chatly application, built with Node.js and Express.js. This project leverages AWS services to provide scalable and secure functionalities, including user authentication, real-time messaging, and media storage.

## 🚀 Features

- **User Authentication**: Secure user registration and login using JWT.
- **Real-time Messaging**: Enables instant group chats.
- **Media Storage**: Upload and retrieve media files using AWS S3.
- **Scalable Architecture**: Designed to handle growing user bases efficiently.
- **RESTful APIs**: Clean and organized API endpoints for seamless integration.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT)
- **Cloud Services**: AWS (S3, EC2)
- **Environment Management**: dotenv

## ☁️ AWS Integration

### 1. Amazon S3

- **Purpose**: Stores user-uploaded media files (images, videos).
- **Implementation**:
  - Utilizes the AWS SDK for JavaScript to interact with S3.
  - Configured with IAM roles for secure access.
  - Supports file upload and retrieval functionalities.

### 2. Amazon EC2

- **Purpose**: Hosts the backend server.
- **Implementation**:
  - Deployed on an EC2 instance with proper security groups.
  - Uses PM2 for process management and Nginx as a reverse proxy.
  - Ensures high availability and scalability.

### 3. IAM Roles and Policies

- **Purpose**: Securely manage permissions for AWS services.
- **Implementation**:
  - Defined specific roles for EC2 and S3 access.
  - Applied the principle of least privilege to enhance security.
