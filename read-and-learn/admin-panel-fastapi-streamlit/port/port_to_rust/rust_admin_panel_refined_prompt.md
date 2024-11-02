### **Refined Project Prompt**

"Develop a modular and extensible admin panel entirely in Rust, utilizing **Axum** for the backend API and **SQLx** for asynchronous database interactions. The frontend will be built using **Yew**, allowing for a seamless and responsive user interface. The system should facilitate centralized automation management for tasks such as browser automation, API interactions, and task scheduling. Key features include:

- **Database Management**: Implement a robust database layer with models for profiles, services, proxies, commands, and tasks. Ensure CRUD operations and schema migrations are well-defined using SQLx.

- **API Development**: Use Axum to create RESTful API endpoints for managing automation tasks, profiles, and services. Include middleware for error handling, logging, and authentication if necessary.

- **Frontend Implementation**: Build a user-friendly dashboard using Yew, allowing users to manage profiles, compose commands, view task statuses, and visualize results in real-time.

- **Task Scheduling**: Integrate a task scheduling mechanism for executing automation tasks. Use async features of Rust to handle task orchestration and real-time updates.

- **Error Handling and State Management**: Implement centralized error handling and logging. Utilize Redis for state management and caching, providing a fast and efficient way to manage session data.

### **Approach Guide for Implementation**

1. **Project Structure**:
   - Set up a Cargo workspace to manage modular components effectively.
   - Create separate directories for the backend (Axum + SQLx) and frontend (Yew).

2. **Backend Implementation**:
   - **Database Layer**: 
     - Define data models using SQLx, ensuring type safety and proper relationships (e.g., foreign keys).
     - Implement migrations using `sqlx-cli` for managing database schemas.
     - Create repository patterns to encapsulate database logic, promoting clean code and maintainability.
   
   - **API Layer**: 
     - Set up Axum to define routes and handlers for your endpoints.
     - Implement middleware for logging and error handling.
     - Consider using Axum's extractors for easy handling of request data (e.g., JSON parsing).

3. **Frontend Implementation**:
   - **Yew Setup**: 
     - Use Yew to create components for the dashboard, profile management, command composition, and task visualization.
     - Implement state management in Yew to manage UI state and real-time updates.
     - Ensure API calls to the Axum backend are handled correctly, with error handling for network requests.

4. **Task Scheduling**:
   - Implement task scheduling functionality that allows users to schedule automation tasks easily.
   - Use async Rust features to handle task execution without blocking the main thread.
   - Integrate real-time updates into the frontend, providing feedback on task progress.

5. **Testing and Documentation**:
   - Write unit tests for each module in the backend and frontend.
   - Document the API endpoints and frontend components to facilitate easier onboarding and maintenance.

6. **Deployment**:
   - Create a Dockerfile to containerize the application for deployment.
   - Consider using CI/CD pipelines for automated testing and deployment processes.

By adhering to this refined prompt and implementation guide, you will ensure that your Rust-based admin panel is modular, efficient, and maintainable, while leveraging the strengths of Axum, SQLx, and Yew."

---

### **Timestamp**: 2024-10-23 14:10:12  
### **Short Description**: Refined project prompt focusing on Axum, SQLx, and Yew, along with an implementation approach guide.  
### **Line Count**: 106  
### **Character Count**: 19318  

```bash
nvim rust_admin_panel_refined_prompt.md
```
