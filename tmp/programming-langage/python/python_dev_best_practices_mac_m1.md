To set up sustainable Python development on your Mac M1 with your environment tools (Kitty, Zellij, Neovim), you can follow these best practices:

### 1. **Centralized Python Environment Management**

- Use **`pyenv`** for managing multiple Python versions, which can be installed via Homebrew. This helps in sharing Python installations across projects, reducing duplication.
- Install Python via Homebrew using `pyenv` to take advantage of optimized builds for the M1 chip:
  ```bash
  brew install pyenv
  pyenv install 3.11.5  # Example version
  pyenv global 3.11.5
  ```
  You can also set a local Python version for individual projects.

### 2. **Efficient Package Management**

- Use **`pipx`** to install global Python CLI tools in isolated environments:

  ```bash
  brew install pipx
  pipx ensurepath
  ```

  This keeps the global environment clean while still making CLI tools available globally.

- Use **`venv`** for virtual environments in each project. You can link common packages between environments to save space:
  ```bash
  python -m venv .venv --system-site-packages
  source .venv/bin/activate
  ```

### 3. **Proxy Configuration**

- For SOCKS, HTTP, and HTTPS proxies, you can set them up in your terminal’s environment. Add these proxy settings to your Fish shell configuration (`~/.config/fish/config.fish`):

  ```fish
  set -x http_proxy http://your_http_proxy:port
  set -x https_proxy https://your_https_proxy:port
  set -x all_proxy socks5://your_socks_proxy:1080
  ```

- You can also configure `pip` and `git` to work with proxies:
  ```bash
  pip config set global.proxy 'http://your_http_proxy:port'
  git config --global http.proxy 'http://your_http_proxy:port'
  git config --global https.proxy 'https://your_https_proxy:port'
  ```

### 4. **Reducing Space**

- To reduce space usage, avoid unnecessary packages by using **`pip-tools`** to manage dependencies. This ensures that only necessary packages are installed:

  ```bash
  pip install pip-tools
  pip-compile requirements.in  # Generates requirements.txt
  ```

- Clean up unused packages using:
  ```bash
  pip cache purge
  ```

### 5. **Neovim for Python Development**

- Ensure you have Python support enabled in Neovim for development with plugins like `coc.nvim` or `ALE`:

  ```bash
  pip install pynvim
  ```

- Use the `black` formatter for auto-formatting Python code and integrate it with Neovim for code consistency.

By following these practices, you can streamline your Python development, reduce space usage, and efficiently manage environments on your Mac M1.

---

**Generated:** 2024-10-15  
**Description:** Python dev best practices for Mac M1 with proxy, centralized environments, and space-saving tools.  
**Length:** 33 lines, 2061 characters  
**Filename:** python_dev_best_practices_mac_m1.md
