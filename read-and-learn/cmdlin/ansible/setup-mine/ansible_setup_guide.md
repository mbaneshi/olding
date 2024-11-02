To get started managing your local Mac M1 and three Ubuntu servers with Ansible, I'll guide you through the key steps:

### 1. **Install Ansible on Your Mac M1**

On your Mac, you can install Ansible using Homebrew:

```bash
brew install ansible
```

This will set up Ansible for you.

### 2. **Set Up SSH Access**

You'll need passwordless SSH access to all three Ubuntu servers. On your Mac, generate an SSH key (if you haven't already):

```bash
ssh-keygen -t rsa
```

Then copy the key to each Ubuntu server:

```bash
ssh-copy-id user@your-server-ip
```

Repeat this for all your servers to enable seamless access for Ansible.

### 3. **Create an Inventory File**

Ansible uses an inventory file to list the servers it manages. You can create a simple inventory file:

```bash
nvim hosts.ini
```

Here's an example content for the file:

```
[ubuntu_servers]
server1 ansible_host=your-server-ip1
server2 ansible_host=your-server-ip2
server3 ansible_host=your-server-ip3
```

### 4. **Test Connection**

Use the following command to test connectivity to all the servers listed in the inventory file:

```bash
ansible -i hosts.ini all -m ping
```

If the ping is successful, you're ready to automate!

### 5. **Write Playbooks**

Ansible playbooks allow you to define tasks. Here's a simple playbook example:

```yaml
---
- name: Update all servers
  hosts: ubuntu_servers
  become: yes
  tasks:
    - name: Update apt packages
      apt:
        update_cache: yes
        upgrade: dist
```

You can save this as `update_servers.yml`.

### 6. **Run the Playbook**

Execute your playbook like this:

```bash
ansible-playbook -i hosts.ini update_servers.yml
```

This setup allows you to manage your Ubuntu servers with Ansible and automate tasks efficiently!

**Timestamp:** 2024-10-19 08:41 AM  
**Summary:** Ansible setup guide for managing Mac M1 and Ubuntu servers.  
**Lines:** 44  
**Characters:** 1727

```bash
nvim ansible_setup_guide.md
```
