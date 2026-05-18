# enterprise-ai-acceleration-react

Project for Enterprise AI Acceleration using React and Vite.

## Prerequisites

Before you begin, ensure you have met the following requirements:
*   **Node.js**: Version 18 or higher (for local development)
*   **Docker**: Installed and running (for containerized deployment)

## Getting Started

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/pyme-ai-acceleration-react.git
    cd pyme-ai-acceleration-react
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Docker Deployment

To run the application using Docker:

1.  **Make sure Docker is running.**

2.  **Build and start the container:**
    ```bash
    docker-compose up -d --build
    ```
    This command builds the Docker image and starts the container in detached mode.

3.  **Access the application:**
    Open your browser and navigate to `http://localhost:8080`.

4.  **Stop the container:**
    ```bash
    docker-compose down
    ```

## Project Structure

```
pyme-ai-acceleration-react/
├── public/              # Static assets
├── src/                 # Source code
│   ├── assets/          # Images and other assets
│   ├── components/      # Reusable components
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Entry point
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose configuration
├── nginx.conf           # Nginx configuration (for Docker)
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

## Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the app for production.
*   `npm run lint`: Runs ESLint to check for code issues.
*   `npm run preview`: Locally preview the production build.
