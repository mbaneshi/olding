**Timestamp**: 2023-10-19 09:30:00  
**Short Description**: Detailed explanation of Ansible Facts  
**Lines**: 44  
**Characters**: 2,708

### Facts in Ansible

**Facts** in Ansible are system properties and variables automatically collected from managed nodes when a playbook runs. They provide detailed information about the state of the system, such as the operating system, IP addresses, disk sizes, CPU architecture, and much more. Facts are extremely useful for writing dynamic and flexible playbooks that can adapt based on the environment or host being managed.

#### Gathering Facts:

By default, Ansible gathers facts using the **setup** module at the beginning of each playbook execution, unless explicitly disabled. These facts can then be used as variables throughout the playbook to make decisions or pass data into tasks.

To manually gather facts within a playbook, you can use the `setup` module:

```yaml
- name: Gather facts
  ansible.builtin.setup:
```

#### Example Facts:

Some common facts automatically gathered by Ansible include:

- **ansible_os_family**: The OS family (e.g., Debian, RedHat).
- **ansible_distribution**: The specific Linux distribution (e.g., Ubuntu, CentOS).
- **ansible_hostname**: The hostname of the managed node.
- **ansible_default_ipv4.address**: The default IPv4 address of the managed node.
- **ansible_processor**: Information about the system’s CPU architecture.
- **ansible_memory_mb**: System memory in megabytes.

You can view all facts gathered by running the `setup` module with the `filter` argument:

```bash
ansible all -m setup
```

#### Using Facts:

Once gathered, facts are treated as variables and can be used directly in tasks, conditionals, templates, and more. For example:

```yaml
- name: Install Nginx on Debian-based systems
  apt:
    name: nginx
    state: present
  when: ansible_os_family == "Debian"
```

In this task, the `ansible_os_family` fact is used in a `when` condition to ensure that the task is only run on Debian-based systems.

#### Custom Facts:

In addition to the default facts gathered by Ansible, you can define **custom facts** on managed nodes. Custom facts are typically stored as JSON or INI files in the `/etc/ansible/facts.d/` directory on the node. Ansible will automatically collect these facts during the fact-gathering process.

Example of a custom fact (in `/etc/ansible/facts.d/custom_fact.fact`):

```ini
[my_custom_facts]
  app_version=1.2.3
  env=production
```

These facts would then be available as variables, e.g., `ansible_local.my_custom_facts.app_version`.

#### Controlling Fact Gathering:

Fact gathering can be controlled using the `gather_facts` keyword in a playbook. If you want to skip fact gathering (to save time or because it's not needed), you can disable it:

```yaml
- hosts: all
  gather_facts: false
  tasks:
    - name: Run without gathering facts
      command: echo "No facts needed"
```

Alternatively, you can gather facts only when required by manually invoking the `setup` module later in the playbook.

#### Fact Caching:

Ansible can cache facts between playbook runs to improve performance in environments where fact gathering is expensive or slow. Fact caching can be enabled by configuring `fact_caching` in Ansible’s configuration file.

#### Importance of Facts:

- **Adaptability**: Facts allow playbooks to adapt to different environments automatically, such as running specific tasks based on the OS or hardware.
- **Dynamic Decision Making**: Using facts in conditions enables playbooks to make decisions based on the current system state.
- **Insight**: Facts provide valuable insights into the systems being managed, which can help in debugging or reporting.

```bash
nvim ansible_facts.md
```
