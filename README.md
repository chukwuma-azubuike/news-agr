# News AGR

[News AGR](https://nextjs.org) is a news aggregator that gathers news from multiple sources in one place—customized to your preferences. This project is built using Next.js with the new app router and is fully dockerised for a consistent production environment.

## Table of Contents

- [News AGR](#news-agr)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
    - [Required Variables](#required-variables)
      - [News API](#news-api)
      - [The Guardian API](#the-guardian-api)
      - [NY Times API](#ny-times-api)
    - [How to Obtain the API Keys](#how-to-obtain-the-api-keys)
  - [Building and Running with Docker](#building-and-running-with-docker)
    - [Dockerfile Overview](#dockerfile-overview)
    - [Step 1: Build the Docker Image](#step-1-build-the-docker-image)
    - [Step 2: Run the Docker Container](#step-2-run-the-docker-container)
    - [Step 3: Access the Application](#step-3-access-the-application)
  - [Running the Development Server](#running-the-development-server)
  - [Additional Notes](#additional-notes)

## Prerequisites

-   **Docker:** Make sure Docker is installed on your machine. If not, follow the [Docker installation guide](https://docs.docker.com/get-docker/).
-   **Yarn:** For local development, ensure Yarn is installed.
-   **Node.js:** The project is built using Node.js (v18-alpine is used in the Dockerfile).

## Environment Variables

This project requires the following environment variables for API integrations. They must be placed in a `.env.local` file in the project root.

### Required Variables

#### News API

```
NEXT_PUBLIC_NEWS_API_BASE_URL=https://newsapi.org/v2/everything
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
```

#### The Guardian API

```
NEXT_PUBLIC_GUARDIAN_API_KEY=your_guardian_api_key
NEXT_PUBLIC_GUARDIAN_BASE_URL=https://content.guardianapis.com/search
```

#### NY Times API

```
NEXT_PUBLIC_NY_TIMES_API_KEY=your_nytimes_api_key
NEXT_PUBLIC_NY_TIMES_BASE_URL=https://api.nytimes.com/svc/search/v2/articlesearch.json
```

### How to Obtain the API Keys

-   **News API:** Register at [newsapi.org](https://newsapi.org) to obtain your API key.
-   **The Guardian API:** Register at [The Guardian Open Platform](https://open-platform.theguardian.com) for an API key.
-   **NY Times API:** Sign up at [NY Times Developer](https://developer.nytimes.com) to get your API key.

Alternatively, you can request these API keys by emailing me at [chukwumaazubuike@gmail.com](mailto:chukwumaazubuike@gmail.com).

## Building and Running with Docker

The project comes with a multi-stage Dockerfile that builds and runs the Next.js app in production mode.

### Dockerfile Overview

-   **Builder Stage:**
    -   Uses the `node:18-alpine` image.
    -   Installs dependencies and builds the Next.js app.
-   **Runner Stage:**
    -   Uses a fresh `node:18-alpine` image.
    -   Copies the build artifacts from the builder stage.
    -   Exposes port `3700` and starts the app with `yarn start`.

### Step 1: Build the Docker Image

Run the following command in the project directory (where your Dockerfile is located):

```bash
docker build -t news-agr .
```

### Step 2: Run the Docker Container

Run the container and map the container’s port to your local machine. This command also injects the environment variables from your `.env.local` file:

```bash
docker run -p 3700:3700 --env-file .env.local news-agr
```

### Step 3: Access the Application

Once the container is running, open your browser and navigate to:

[http://localhost:3700](http://localhost:3700)

You should see the News AGR application running.

## Running the Development Server

For local development (without Docker), follow these steps:

1. **Install Dependencies:**

    ```bash
    yarn install
    ```

2. **Run the Development Server:**

    ```bash
    yarn dev
    ```

3. **Access the Development Version:**

    Open your browser and navigate to:

    [http://localhost:3600](http://localhost:3600)

## Additional Notes

-   **Production vs. Development:**  
    The Docker setup is optimized for a production build. Use `yarn dev` for faster local development with hot reloading.
-   **Environment Variables:**  
    Variables prefixed with `NEXT_PUBLIC_` are exposed to the client side. Ensure that you secure any sensitive information appropriately.
-   **Troubleshooting:**
    -   If you encounter issues with Docker, verify that Docker is running and your environment variables are correctly set in `.env.local`.
    -   Check container logs using:
        ```bash
        docker logs <container-id>
        ```
        Replace `<container-id>` with the actual container ID, which you can obtain via:
        ```bash
        docker ps
        ```
