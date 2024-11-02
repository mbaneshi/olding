Here’s an updated and adjusted version of the mission and guideline to better reflect the primary goal of **command composition** and service orchestration:

---

**Mission Overview:**

We are building a **comprehensive admin panel** using **FastAPI** and **Streamlit** to manage multiple Chrome profiles, services (GitHub, OpenAI, etc.), proxy configurations, and automation processes. This system will focus on **command composition** to instantiate other services (e.g., Playwright automation) with specific profiles, API tokens, and proxy settings. The admin panel will act as the orchestrator, issuing composite commands to subprocesses for automation tasks. The goal is to provide a centralized system for data persistence, command execution, and managing third-party integrations through an intuitive UI.

---

### **Key Components**:

1. **Database Layer**:
   - **Profiles**: Maintain Chrome profile associations, storing relevant data like tokens, directories, and services.
   - **Services**: Store platform details (GitHub, Twitter, OpenAI, etc.), including credentials, API tokens, and automation settings.
   - **Proxies**: Manage proxy settings (address, type, authentication) for each profile, necessary for isolated execution.
   - **Commands**: Store composite commands to initiate subprocesses like Node.js Playwright automation based on user profiles, proxies, and specific service configurations.

2. **Command Composition** (Primary Focus):
   - Build a flexible system for **composing commands** to control subprocesses.
   - Commands will dynamically instantiate automation services (Playwright) with:
     - **Profile-specific settings** (tokens, services, configurations).
     - **Proxy** and **network settings** for isolated browsing.
     - Integration with third-party APIs (GitHub, OpenAI, etc.).
   - Provide a system that allows the admin to define commands with the right configurations to execute automation tasks (e.g., social media interaction, API requests, browser automation).

3. **Business Logic**:
   - Manage **CRUD operations** for profiles, proxies, services, and commands.
   - **Command orchestration**: Automate execution based on stored commands, proxies, and profile configuration.
   - Token and service lifecycle management (e.g., refreshing tokens, updating API keys).
   - **Execution layer**: Ensure smooth handoff between FastAPI and Node.js Playwright subprocesses.

4. **UI Presentation**:
   - Use **Streamlit** to manage profiles, proxies, and command composition.
   - Interface for **executing commands** and viewing results (logs, status, errors).
   - Dashboard for managing automation tasks and tracking services (tokens, API usage, etc.).

5. **Automation Process**:
   - Centralize the **management** of automation via **Node.js Playwright** subprocesses.
   - Execute composite commands for:
     - **Browser automation** (e.g., social media, account login, API interactions).
     - Handling proxy configurations and **network isolation** per profile.
     - Automating data extraction or interaction with platforms (e.g., OpenAI queries, GitHub automation).

---

### **Tech Stack**:
- **Backend**:
  - **FastAPI** for API layer and command orchestration.
  - **SQLAlchemy** and **Alembic** for database models and migrations.
  - **PostgreSQL/MySQL** as the database to persist profile, service, proxy, and command data.
- **Frontend/UI**:
  - **Streamlit** for managing profiles, services, proxies, and command execution.
- **Automation**:
  - **Node.js Playwright** for browser-based automation tasks.
  - **Xray (Go-based)** for advanced proxy management and network isolation.

---

### **Goals for New Conversation**:

1. **Database Layer Design**:
   - Continue defining the schema for profiles, proxies, services, and commands.
   - Ensure proper association between **commands**, **profiles**, **proxies**, and **services**.

2. **Command Composition System**:
   - Focus on building a **flexible command composition layer** to control subprocess execution.
   - Define commands that will trigger automation (e.g., Playwright) with the right environment (profile, proxy, service).

3. **Business Logic**:
   - Develop orchestration logic to handle the creation and execution of commands.
   - Manage tokens, API keys, and automation lifecycle.

4. **UI Implementation**:
   - Design the **Streamlit interface** for managing profiles, services, and proxy configurations.
   - Build an interface for **command composition and execution** with status tracking.

5. **Automation Integration**:
   - Ensure FastAPI and Node.js Playwright integration for executing automation tasks based on the composed commands.

---

```bash
nvim mission_and_guideline_prompt_v2.md
```

---

**Timestamp**: 2023-10-23  
**Lines**: 50  
**Characters**: 3,402
