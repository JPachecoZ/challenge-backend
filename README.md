# Challenge Backend

## Introduction
This repository contains the backend implementation for the Challenge. It provides a GraphQL API along with authentication endpoints using Express.js and Apollo Server. This README serves as a guide to set up, run, and deploy the backend application.

## Prerequisites
Ensure you have the following installed in your local development environment:
- Node.js
- npm (Node Package Manager)
- Docker (for containerization)
- Google Cloud SDK (for deployment to Google Kubernetes Engine)

## Installation
1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/JPachecoZ/challenge-backend
    ```

2. Navigate to the project directory:
    ```bash
    cd challenge-backend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

## Configuration
1. Ensure you have a `.env` file in the root directory with the necessary environment variables. You can use the provided `.env.example` file as a template.

2. Update the Dockerfile if needed, though it should work as is for most cases.

3. Update the `deploy.yml` file in the `.github/workflows` directory if necessary. Make sure it's configured correctly for your Google Cloud Platform (GCP) project.

## Usage
To run the application locally, you have two options:

1. **Production Mode**:
    ```bash
    npm start
    ```

2. **Development Mode** (with nodemon for auto-restart on file changes):
    ```bash
    npm run dev
    ```

## Docker
To build and run the application using Docker, follow these steps:

1. Build the Docker image:
    ```bash
    docker build -t challenge-backend .
    ```

2. Run the Docker container:
    ```bash
    docker run -p 3000:3000 challenge-backend
    ```

## Deployment
The provided `deploy.yml` file sets up a GitHub Actions workflow to deploy the application to Google Kubernetes Engine (GKE) on every push to the `main` branch. Ensure you have the necessary secrets set up in your GitHub repository for authentication with GCP.

## Project Structure
- **src**: Contains the application source code.
- **src/controllers**: Contains controller functions for authentication and user CRUD.
- **src/db**: Contains db library config and setup.
- **src/data**: Contains sqlite3 database.
- **src/graphql**: Contains GraphQL schema, resolvers, and context setup.
- **src/index.js**: Main entry point of the application.
- **Dockerfile**: Docker configuration file.
- **deploy.yml**: GitHub Actions workflow for deployment.

## Contact
For any questions or issues, please contact Javier Pacheco at [jepach@gmail.com](mailto:jepach@gmail.com).

## License
This project is licensed under the terms of the MIT license. See the [LICENSE](LICENSE) file for more details.