### 1. **Key Bindings Customization in WezTerm: A Comprehensive Breakdown**

Key bindings in WezTerm allow users to create shortcuts for any terminal action, making interactions faster and more intuitive. Since **Lua** scripting is used to define key bindings, this gives users the ability to fully tailor their experience. Let’s explore how this system works in detail.

#### 1.1 **Basic Structure of Key Bindings in Lua**

Key bindings in WezTerm are defined within the `keys` section of the Lua configuration file (`wezterm.lua`). Each key binding typically requires:

- **Key**: The keyboard key or character (e.g., `n`, `x`, `LeftArrow`, `F1`, etc.).
- **Modifiers**: Key combinations such as `CTRL`, `ALT`, `SHIFT`, or combinations of these.
- **Action**: The behavior or command triggered by the key press, which can be one of WezTerm's pre-defined actions or a custom Lua script.

A basic key binding setup looks like this:

```lua
local wezterm = require 'wezterm'

return {
  keys = {
    {key="n", mods="CTRL", action=wezterm.action{SpawnTab="CurrentPaneDomain"}},
  }
}
```

Here:

- **`key="n"`** specifies the key (`n`).
- **`mods="CTRL"`** defines the modifier (`CTRL`).
- **`action=wezterm.action{SpawnTab="CurrentPaneDomain"}`** specifies the action triggered when `Ctrl-n` is pressed: opening a new tab in the current domain.

#### 1.2 **Modifiers and Keys**

You can combine multiple modifiers like `CTRL`, `SHIFT`, `ALT`, `SUPER` (which maps to `Command` on macOS) to create unique combinations for actions. This allows you to handle various key events without clashing with system-wide shortcuts.

##### Example:

```lua
{key="x", mods="CTRL|SHIFT", action=wezterm.action{CloseCurrentPane={confirm=false}}}
```

Here, the combination `Ctrl-Shift-x` is bound to close the current pane.

#### 1.3 **WezTerm’s Pre-defined Actions**

WezTerm provides a comprehensive set of predefined actions that can be assigned to keys. These actions allow you to control various aspects of the terminal, such as:

- **Window Management** (open, close, resize panes, etc.)
- **Tab Management** (create, switch, move between tabs)
- **Clipboard and Selection** (copy, paste, etc.)
- **Font Adjustments** (increase/decrease font size)

##### Common Actions:

- **Spawning a New Tab:**
  ```lua
  {key="n", mods="CTRL", action=wezterm.action{SpawnTab="CurrentPaneDomain"}}
  ```
- **Closing a Tab:**
  ```lua
  {key="w", mods="CTRL", action=wezterm.action{CloseCurrentTab={confirm=false}}}
  ```
- **Switching Between Tabs:**

  ```lua
  {key="RightArrow", mods="CTRL", action=wezterm.action{ActivateTabRelative=1}},
  {key="LeftArrow", mods="CTRL", action=wezterm.action{ActivateTabRelative=-1}},
  ```

  These two bindings allow the user to switch between tabs using `Ctrl-RightArrow` and `Ctrl-LeftArrow`.

- **Resizing Panes:**
  ```lua
  {key="LeftArrow", mods="CTRL|SHIFT", action=wezterm.action{AdjustPaneSize={"Left", 1}}},
  {key="RightArrow", mods="CTRL|SHIFT", action=wezterm.action{AdjustPaneSize={"Right", 1}}},
  {key="UpArrow", mods="CTRL|SHIFT", action=wezterm.action{AdjustPaneSize={"Up", 1}}},
  {key="DownArrow", mods="CTRL|SHIFT", action=wezterm.action{AdjustPaneSize={"Down", 1}}},
  ```
  This setup resizes the active pane by moving the pane's border in the specified direction.

#### 1.4 **Custom Actions and Lua Scripts**

In addition to pre-defined actions, WezTerm also supports **custom Lua actions**, giving users complete freedom to script terminal behavior. This is where you can truly extend the capabilities of key bindings.

For example, you could bind a key to trigger a sequence of commands, interact with external programs, or modify terminal behavior dynamically.

##### Example: Open a new pane and run a command

```lua
local wezterm = require 'wezterm'

return {
  keys = {
    {
      key="Enter",
      mods="CTRL|SHIFT",
      action=wezterm.action_callback(function(window, pane)
        window:perform_action(wezterm.action{SplitHorizontal={domain="CurrentPaneDomain"}}, pane)
        pane:send_text("top\n")  -- Send a command to run in the new pane
      end),
    },
  },
}
```

This script does the following:

1. When `Ctrl-Shift-Enter` is pressed, a new pane opens.
2. After the pane opens, the `top` command is automatically executed in the new pane.

#### 1.5 **Layers and Conditional Bindings**

WezTerm’s key binding system allows for **layered or conditional key bindings**. You can set different key bindings based on context or conditions, such as the type of shell, active window, or operating system.

##### Example: Conditional Key Bindings for macOS vs. Linux

```lua
local wezterm = require 'wezterm'

local config = {}

if wezterm.target_triple == "x86_64-apple-darwin" then
  config.keys = {
    {key="c", mods="CMD", action=wezterm.action{CopyTo="Clipboard"}},
    {key="v", mods="CMD", action=wezterm.action{PasteFrom="Clipboard"}},
  }
else
  config.keys = {
    {key="c", mods="CTRL", action=wezterm.action{CopyTo="Clipboard"}},
    {key="v", mods="CTRL", action=wezterm.action{PasteFrom="Clipboard"}},
  }
end

return config
```

In this example:

- For **macOS**, the `Cmd+c` and `Cmd+v` bindings are used for copy/paste.
- For **Linux** or other platforms, `Ctrl+c` and `Ctrl+v` are used.

#### 1.6 **Chording Key Bindings**

WezTerm supports **chording** (multi-step key combinations), which allows you to define complex key sequences to trigger an action. This is useful for minimizing the number of single-step keybindings while providing powerful shortcut mechanisms.

##### Example:

```lua
return {
  keys = {
    {key="a", mods="CTRL", action=wezterm.action{SendString="tmux-prefix"}},
    {key="w", mods="CTRL|ALT", action=wezterm.action{ActivateTabRelative=1}},
  },
}
```

Here, the `Ctrl+a` sequence is sent as a `tmux-prefix` action, which acts like a "meta" key in `tmux`, allowing you to follow up with more commands. Similarly, `Ctrl+Alt+w` is set to activate the next tab.

#### 1.7 **Escape Sequences and Advanced Input Handling**

WezTerm can be configured to handle **escape sequences** from key bindings, which allows for sending sequences that aren't easily typable or could represent custom input (like special control codes).

##### Example:

```lua
{key="F1", mods="CTRL", action=wezterm.action{SendString="\x1b[1;5P"}}
```

This binding sends a custom escape sequence (`\x1b[1;5P`) when `Ctrl+F1` is pressed.

---

### Conclusion on Key Bindings Customization

The ability to define custom key bindings through Lua in WezTerm provides unmatched flexibility. With full control over key sequences, modifiers, and actions, users can shape the terminal experience to match their workflow. By combining WezTerm’s predefined actions with Lua scripting capabilities, you can automate complex actions, improve navigation, and streamline repetitive tasks, creating a highly efficient environment for daily terminal use.

---

**Generated**: 2024-10-19  
**Summary**: In-depth discussion on key bindings customization in WezTerm, focusing on Lua scripting capabilities and practical examples.  
**Lines**: 109  
**Characters**: 8393

```bash
nvim wezterm_key_bindings.md
```
