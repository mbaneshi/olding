**Timestamp**: 2023-10-19 09:20:00  
**Short Description**: Detailed explanation of Ansible Variables  
**Lines**: 46  
**Characters**: 2,731

### Variables in Ansible

In Ansible, **variables** allow you to store and reuse values across tasks, making your playbooks more dynamic, flexible, and reusable. Variables can store a wide range of data types, including strings, lists, dictionaries, and more, enabling you to parameterize actions and configurations, which reduces duplication and hardcoding of values.

#### Purpose of Variables:

- **Dynamic Configuration**: Variables allow you to manage different environments (development, staging, production) with different configurations using the same playbook.
- **Reuse**: By storing values in variables, you can easily reuse them across multiple tasks or roles without duplicating the information.
- **Centralized Control**: Variables allow you to centralize configuration values in a single place, making updates and changes easier to manage.

#### Types of Variables:

1. **Playbook Variables**: Variables defined directly within a playbook.

   ```yaml
   - hosts: all
     vars:
       app_name: MyApp
   ```

2. **Role Variables**: Variables specific to a role, usually stored in the `defaults/main.yml` or `vars/main.yml` file.

   ```yaml
   # roles/my_role/defaults/main.yml
   app_port: 8080
   ```

3. **Host Variables**: Variables specific to a particular host or group of hosts, typically defined in the inventory file or separate variable files.

   ```ini
   [webservers]
   server1 ansible_host=192.168.1.10 app_env=production
   ```

4. **Facts**: Automatically gathered variables about a managed system (e.g., `ansible_os_family`).

5. **Extra Variables**: Variables passed at runtime using the `-e` option on the command line. These have the highest precedence.
   ```bash
   ansible-playbook site.yml -e "app_env=production"
   ```

#### Using Variables:

Variables are referenced in Ansible using double curly braces `{{ }}`. Here’s an example of using a variable in a task:

```yaml
- name: Install the application
  apt:
    name: "{{ app_name }}"
    state: present
```

In this example, the value of `app_name` is dynamically injected into the task at runtime.

#### Defining Variables:

Variables can be defined in multiple locations:

- **In Playbooks** using the `vars` keyword.
- **In Inventory** files (both static and dynamic).
- **In Role-specific variable files** (`vars/`, `defaults/`).
- **From External Sources** such as vaults, APIs, or command-line arguments.

#### Variable Precedence:

Ansible uses a specific order of precedence when deciding which variable to use if a variable is defined in multiple places. Extra variables (`-e` on the command line) have the highest precedence, followed by role defaults, playbook variables, and facts.

#### Variable Scoping:

- **Global Scope**: Variables that can be accessed anywhere in the playbook or roles.
- **Host Scope**: Variables specific to a host, defined in the inventory or host_vars.
- **Role Scope**: Variables defined within a role and used only by that role.

#### Variable Examples:

1. **Lists and Dictionaries**:

   ```yaml
   users:
     - name: alice
       uid: 1001
     - name: bob
       uid: 1002
   ```

2. **Complex Variables**:
   Variables can store complex structures, such as lists or dictionaries, allowing you to handle more sophisticated configurations.

Variables in Ansible help manage configurations dynamically and flexibly, reducing redundancy and making playbooks easier to maintain.

```bash
nvim ansible_variables.md
```
