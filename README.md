# Fluentd-OpenSearch Showcase for Kubernetes Monitoring

## Project Overview

This project serves as a comprehensive showcase for understanding and implementing Kubernetes (K8s) based Fluentd-OpenSearch monitoring solutions. It provides detailed use cases, structural explanations, and practical configuration examples to help users effectively collect, process, store, and visualize container logs within a K8s environment.

## Features

*   **Kubernetes Monitoring Use Cases:** Explore various scenarios for monitoring clusters, nodes, pods, workloads, networking, security, storage, data management, business workloads, and scalability using Fluentd and OpenSearch.
*   **Fluentd-OpenSearch Structural Understanding:** A dedicated section explaining the architecture and integration of Fluentd, OpenSearch, and OpenSearch Dashboards in a K8s logging pipeline.
*   **Fluentd Configuration Examples:** Practical examples for Fluentd `source`, `filter`, and `match/output` configurations, including file sources, Kubernetes sources, and different output destinations.
*   **K8s Container Log Processing Flow:** A step-by-step guide detailing how container logs flow from K8s services through Fluentd to OpenSearch and finally to OpenSearch Dashboards for visualization.
*   **Interactive Web Application:** A user-friendly web interface built with React and Vite to navigate through the documentation and examples.

## Technologies Used

*   **React:** Frontend library for building the user interface.
*   **Vite:** Fast build tool for modern web projects.
*   **TypeScript:** Type-safe JavaScript.
*   **Tailwind CSS:** Utility-first CSS framework for styling.
*   **Fluentd:** Open-source data collector for unified logging.
*   **OpenSearch:** Distributed, community-driven, 100% open-source search and analytics suite (compatible with Elasticsearch).
*   **Kubernetes:** Container orchestration platform.

## Local Development Setup

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jeonck/fluentd-showcase.git
    cd fluentd-showcase
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173/fluentd-showcase/`.

4.  **Build for production:**
    ```bash
    npm run build
    ```
    This will generate the production-ready files in the `docs` directory.

## Deployment

This project is deployed using GitHub Pages. The live version can be accessed at:
[https://jeonck.github.io/fluentd-showcase/](https://jeonck.github.io/fluentd-showcase/)

## Contributing

Feel free to open issues or submit pull requests if you have suggestions or improvements.