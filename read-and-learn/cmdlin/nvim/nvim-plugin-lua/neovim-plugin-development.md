Designing a simple Neovim plugin for educational purposes is a great way to explore Lua, Neovim’s API, and the structure of plugins. Below is a step-by-step guide to creating a plugin from scratch, along with some useful utilities and starter code to help you along the way.

### **Step-by-Step Plugin Creation:**

#### **1. Create a Basic Lua Plugin Structure**

First, create a directory for your plugin in Neovim’s `runtimepath` (usually `~/.config/nvim/lua`).

```bash
mkdir -p ~/.config/nvim/lua/myplugin
```

In this directory, create the following structure:

```bash
myplugin/
├── init.lua    # Entry point for your plugin
├── commands.lua  # Separate file for custom commands
└── config.lua  # Configuration options for the plugin
```

#### **2. Basic Plugin Code**

Your `init.lua` file will be the main entry point, where you register the commands and configure the plugin.

```lua
-- init.lua (Entry point)
local M = {}

-- Load other modules of the plugin
M.commands = require('myplugin.commands')
M.config = require('myplugin.config')

function M.setup(opts)
    -- Set up default options or load user-provided ones
    M.config.setup(opts)

    -- Example: Define a custom command in Neovim
    vim.api.nvim_create_user_command('MyPluginHello', function()
        print("Hello from My Plugin!")
    end, {})

    -- Example: Trigger a custom function from commands.lua
    M.commands.greet()
end

return M
```

#### **3. Commands and Configuration**

Next, you can define custom commands and plugin configuration options. In `commands.lua`, you could create a simple function:

```lua
-- commands.lua
local M = {}

function M.greet()
    print("Greetings from commands.lua!")
end

return M
```

In `config.lua`, manage user-configurable options:

```lua
-- config.lua
local M = {}

M.defaults = {
    greeting = "Hello, world!"
}

function M.setup(opts)
    M.options = vim.tbl_deep_extend("force", M.defaults, opts or {})
end

return M
```

#### **4. Using the Plugin in Neovim**

To use your plugin, you’ll need to add a Lua `require()` call in your Neovim configuration (`init.lua` or `init.vim`):

```lua
-- ~/.config/nvim/init.lua
require('myplugin').setup({
    greeting = "Welcome to my Neovim Plugin!"
})
```

This will load your plugin when Neovim starts. You can test it by running the `:MyPluginHello` command.

---

### **Extending the Plugin**

Once you have the basics, you can extend this plugin to add more complex functionality:

- **Autocommands**: Listen to events like file save or buffer enter.
- **Keybindings**: Map custom keybindings that trigger plugin functions.
- **Integration with Existing Plugins**: Hook your plugin to work alongside popular plugins like Telescope, Lualine, or Treesitter.

For example, let’s add a keybinding to greet when pressing `<leader>g`:

```lua
vim.api.nvim_set_keymap('n', '<leader>g', ':lua require("myplugin.commands").greet()<CR>', { noremap = true, silent = true })
```

### **Plugin Utilities and Starter Code**

- **[nvim-lua/plenary.nvim](https://github.com/nvim-lua/plenary.nvim)**: A utility library providing Lua functions that make Neovim plugin development easier. It has built-in modules for jobs, async handling, file I/O, and more.
- **[nvim-lua/popup.nvim](https://github.com/nvim-lua/popup.nvim)**: Popup API for Neovim, useful for creating custom UIs inside Neovim.
- **[tjdevries/astronauta.nvim](https://github.com/tjdevries/astronauta.nvim)**: Simplifies setting keymaps and commands in Lua. This can reduce boilerplate code.
- **[MunifTanjim/nui.nvim](https://github.com/MunifTanjim/nui.nvim)**: A UI component library for Neovim plugins, helping you create rich user interfaces.
- **[starter.nvim](https://github.com/echasnovski/starter.nvim)**: A minimal plugin starter template for Neovim. It comes with a basic plugin setup to help you jumpstart your project.

### **Educational Plugin Examples to Explore**

- **[nvim-telescope/telescope.nvim](https://github.com/nvim-telescope/telescope.nvim)**: Telescope is an extensible fuzzy finder for Neovim. It has a well-structured plugin that you can inspect for ideas on how to structure your plugin.
- **[folke/which-key.nvim](https://github.com/folke/which-key.nvim)**: A powerful keybinding plugin that you can explore to see how it handles complex keymapping and popup UI elements.
- **[kyazdani42/nvim-tree.lua](https://github.com/nvim-tree/nvim-tree.lua)**: A file explorer for Neovim. It’s a great example of integrating Neovim APIs with custom UI and commands.

### **Debugging and Troubleshooting**

- **`nvim --headless`**: Start Neovim without UI for debugging scripts and commands in automation pipelines.
- **`:messages`**: Check error logs when something goes wrong.
- **`lua print(vim.inspect(variable))`**: Use `vim.inspect()` to print variables and data structures for debugging.

By building a simple plugin, you’ll get hands-on experience with the Neovim API, Lua, and common plugin patterns. Once you feel comfortable, you can explore more advanced features like autocommands, custom user interfaces, or async jobs to make your plugins more powerful.

```bash
nvim neovim-plugin-development.md
```
