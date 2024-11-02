**Timestamp**: 2023-10-19 08:30:00  
**Short Description**: Detailed explanation of Ansible Inventory  
**Lines**: 67  
**Characters**: 4,387

### Inventory in Ansible

Ansible **inventory** is a crucial concept as it defines the set of target systems (or "hosts") that Ansible will manage. The inventory provides details about the systems that Ansible interacts with, such as their hostnames, IP addresses, and any variables or groupings related to those systems. Ansible inventory is flexible, supporting both static and dynamic lists of hosts.

#### Types of Inventory:

1. **Static Inventory**: A fixed list of nodes written in a file, usually `inventory` or `hosts`. This file explicitly defines hosts or groups of hosts that Ansible will manage.
2. **Dynamic Inventory**: Used for environments where infrastructure is highly dynamic, such as cloud services like AWS, GCP, or OpenStack. Instead of listing hosts statically, Ansible can query external systems to get an up-to-date list of nodes (e.g., querying AWS EC2 instances).

#### Static Inventory:

The most basic way to define an inventory is by creating a static inventory file. It can be as simple as a list of hostnames or IP addresses, but it often includes grouping, variables, and more.

A simple static inventory might look like this:

```ini
[webservers]
192.168.1.101
192.168.1.102

[dbservers]
192.168.1.201
192.168.1.202
```

In this case, the `[webservers]` and `[dbservers]` are groups of hosts. You can later reference these groups in playbooks to apply different sets of tasks to each group.

#### INI Format:

The default format for Ansible inventory is the **INI format**, which is human-readable and simple. Each group of hosts is defined under a section (denoted by square brackets). Here's an example of a more advanced INI file:

```ini
[webservers]
web1.example.com ansible_host=192.168.1.101 ansible_user=admin

[dbservers]
db1.example.com ansible_host=192.168.1.201 ansible_port=2222 ansible_user=root
```

In this case, additional host variables are provided:

- **ansible_host**: Specifies the IP address or hostname to connect to. This can be useful if the hostnames are not directly reachable.
- **ansible_user**: Specifies the user Ansible should use to connect to that particular host.
- **ansible_port**: Overrides the default SSH port (22) for a specific host.

#### YAML Format:

Ansible inventory can also be written in YAML, which offers a more structured format. Here’s the equivalent YAML format for the above example:

```yaml
all:
  hosts:
    web1.example.com:
      ansible_host: 192.168.1.101
      ansible_user: admin
    db1.example.com:
      ansible_host: 192.168.1.201
      ansible_port: 2222
      ansible_user: root
  children:
    webservers:
      hosts:
        web1.example.com:
    dbservers:
      hosts:
        db1.example.com:
```

#### Grouping in Inventory:

Hosts can be grouped to logically separate them for specific purposes. For instance, you might have `webservers`, `dbservers`, and `loadbalancers`. Grouping allows you to target specific hosts for specific actions in your playbooks. Ansible also supports **nested groups**, meaning that groups can contain other groups. For example:

```ini
[allservers:children]
webservers
dbservers

[webservers]
web1.example.com
web2.example.com

[dbservers]
db1.example.com
db2.example.com
```

In this setup, `allservers` is a group that contains the groups `webservers` and `dbservers`. This makes it easier to run tasks on all the servers by referencing `allservers`.

#### Host Variables:

Ansible allows you to define **host-specific variables** in the inventory file. This is useful when certain tasks or configurations vary slightly across different hosts. Host variables can be defined inline with the hosts, or in a separate directory structure (in case of larger environments). Example of inline host variables:

```ini
[webservers]
web1.example.com ansible_host=192.168.1.101 http_port=80
web2.example.com ansible_host=192.168.1.102 http_port=8080
```

In this case, the variable `http_port` is set differently for each web server, which allows you to control per-host variations in your playbook.

#### Group Variables:

You can also define **group variables**, which apply to all hosts in a particular group. This is useful for applying common settings across all hosts in a group without repeating variables for each individual host.

```ini
[webservers]
web1.example.com
web2.example.com

[webservers:vars]
http_port=80
```

Here, `http_port` is defined for the `webservers` group, and it applies to all hosts in that group.

#### Dynamic Inventory:

For environments like cloud infrastructure, where hosts may be frequently added or removed, a **dynamic inventory** is more appropriate. A dynamic inventory script or plugin is used to generate an inventory on the fly by querying cloud providers or other external services.

Ansible supports several plugins to work with various platforms, such as:

- **AWS EC2**: Queries EC2 instances dynamically.
- **GCP**: Retrieves the list of Google Cloud instances.
- **Azure**: Fetches the list of virtual machines from Azure.

For example, with AWS, a dynamic inventory file might look like this:

```bash
ansible-inventory --list -i aws_ec2.yaml
```

The dynamic inventory script interacts with AWS APIs to pull a list of EC2 instances and generates the necessary host information, including instance IDs, IP addresses, and metadata.

#### Combining Static and Dynamic Inventory:

Ansible allows you to combine static and dynamic inventories. You might have a static inventory file for development and a dynamic one for production. For instance:

```ini
[development]
dev1.example.com
dev2.example.com
```

Dynamic inventory for production might use a plugin to automatically discover hosts in AWS, Azure, or GCP.

#### Inventory Plugins:

In addition to scripts, Ansible includes **inventory plugins** to make dynamic inventory handling easier. These plugins natively integrate with various services (e.g., AWS, OpenStack, Kubernetes), and provide the ability to configure the inventory directly in YAML files.

#### Host Patterns:

Ansible allows advanced targeting through **host patterns**. Host patterns let you combine groups, exclude certain hosts, or match hosts using regular expressions.

- `webservers`: Targets all hosts in the `webservers` group.
- `webservers:!dbservers`: Targets hosts in `webservers` but not in `dbservers`.
- `webservers[0]`: Targets the first host in the `webservers` group.

#### Importance of Inventory:

- **Centralized Management**: The inventory file is the single source of truth for what hosts are managed, what groups they belong to, and what variables are specific to each host.
- **Dynamic Scaling**: Especially with dynamic inventory, as your infrastructure grows or changes, Ansible adapts to these changes automatically.
- **Flexibility**: The ability to manage multiple environments (dev, prod, staging) with the same playbooks but different inventories makes Ansible highly versatile.

Inventory is at the heart of how Ansible knows where to execute tasks, making it a fundamental component of any Ansible deployment.

```bash
nvim ansible_inventory.md
```
