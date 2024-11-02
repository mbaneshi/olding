Here’s a concise summary and guideline of your mission, which you can use as a prompt to start a new conversation on another profile:

---

**Mission Overview:**

We are building a robust **admin panel** using **FastAPI** and **Streamlit**, designed to manage multiple Chrome profiles, services (e.g., GitHub, OpenAI), proxies, tokens, and automation processes. This system will centralize data persistence, automate interactions through Node.js Playwright services, and use advanced proxy settings (e.g., Xray) for isolated profile management. The key goals are to design a scalable **database layer**, develop **business logic** for profile and service automation, and create a streamlined **UI presentation**.

---

### **Key Components:**

1. **Database Layer**:  
   - **Profiles**: Manage user profiles (each associated with a Chrome user directory).  
   - **Services**: Store credentials, tokens, and API settings for platforms like GitHub, Twitter, OpenAI, etc.  
   - **Proxies**: Store proxy settings (address, port, type) for each profile.  
   - **Commands**: Store composite commands for Playwright automation, linked to profiles and proxies.

2. **Business Logic**:
   - CRUD operations for profiles, services, proxies.
   - Automation processes triggered by **Playwright** with profile-specific settings.
   - Token and API management for interacting with third-party services.

3. **UI Presentation**:
   - Use **Streamlit** to manage profiles, services, proxies, and execute commands via an intuitive interface.

4. **Automation Process**:
   - Hand off tasks to a Node.js Playwright-based automation service.
   - Composite commands for automating social media, browser actions, etc.

---

### **Tech Stack**:
- **Backend**: 
  - **FastAPI** for API layer.
  - **SQLAlchemy** for database ORM.
  - **Alembic** for migrations.
  - **PostgreSQL/MySQL** for database.
- **Frontend/UI**:
  - **Streamlit** for managing and interacting with profiles, proxies, and services.
- **Automation**:
  - **Node.js Playwright** for automated browser actions.
  - **Xray (Go-based)** for advanced proxy management.

---

### **Goals for New Conversation**:
1. **Continue the Database Layer Design**:
   - Define models, migrations, and CRUD operations.
   - Design schema for profiles, services, proxies, and commands.

2. **Develop Business Logic**:
   - Ensure the backend connects profiles, proxies, and automation workflows.

3. **UI Implementation**:
   - Build a user-friendly interface to manage and trigger automation tasks.

4. **Automation Integration**:
   - Prepare for the integration of Node.js-based Playwright service with FastAPI.

---

```bash
nvim mission_and_guideline_prompt.md
```

---

**Timestamp**: 2023-10-23  
**Lines**: 47  
**Characters**: 2,905
