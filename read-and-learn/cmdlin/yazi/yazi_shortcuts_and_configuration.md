
### Yazi - Command-line File Manager Overview

**Yazi** is a modern, terminal-based file manager similar to **Ranger** but written in **Rust**. It's designed to be fast, user-friendly, and highly customizable. The keybindings are inspired by **Vim**, so users familiar with Vim or Neovim will find it easy to pick up. 

### Default Shortcut Keys for Yazi

Here’s a list of commonly used default keybindings in **Yazi**:

- **Navigation**:
  - `h`: Go to the parent directory
  - `l`: Enter directory or open file
  - `j`: Move cursor down
  - `k`: Move cursor up
  - `gg`: Jump to the top of the list
  - `G`: Jump to the bottom of the list
  - `Ctrl+u`: Scroll up by half the page
  - `Ctrl+d`: Scroll down by half the page

- **File Operations**:
  - `y`: Yank (copy) the current file
  - `p`: Paste yanked file(s)
  - `dd`: Cut the current file
  - `r`: Rename the current file
  - `D`: Delete the current file
  - `a`: Create a new file or directory

- **Search and Filtering**:
  - `/`: Search for a file (similar to Vim's search)
  - `n`: Jump to the next search match
  - `N`: Jump to the previous search match
  - `Ctrl+f`: Filter files by pattern

- **File Preview**:
  - `Tab`: Toggle file preview
  - `Space`: Select file (multi-selection)

- **Miscellaneous**:
  - `q`: Quit the file manager
  - `?`: Show help (list of keybindings)

### Configuration for Yazi

Yazi’s configuration is managed in a **TOML** file, typically located in `~/.config/yazi/config.toml`. Below is an example configuration file to give you a starting point.

#### Example Configuration (`config.toml`):

```toml
# ~/.config/yazi/config.toml

[general]
# Enable or disable hidden files
show_hidden = true

# Enable file preview
preview = true

# File preview window size (percentage of terminal width)
preview_width = 50

# Set default sorting order (name, size, modified, or none)
sort_by = "name"

# Default key mappings (similar to Vim)
[keybindings]
up = "k"
down = "j"
left = "h"
right = "l"
quit = "q"
preview_toggle = "tab"
select = "space"
search = "/"
yank = "y"
paste = "p"
cut = "dd"
delete = "D"
rename = "r"
create = "a"
filter = "ctrl+f"
scroll_up_half = "ctrl+u"
scroll_down_half = "ctrl+d"
```

### Customizing Yazi

- **Keybinding Customization**: You can remap any key by modifying the `[keybindings]` section in the `config.toml` file.
- **Themes**: Yazi allows for color customization through the `themes` section, where you can define the color scheme for the file manager interface.

#### Example for Color Customization:

```toml
[theme]
# Set directory color to cyan
directory_color = "cyan"
# Set file color to white
file_color = "white"
# Set selected file color to yellow
selected_file_color = "yellow"
```

### Additional Tips:

- **Plugins**: While Yazi doesn't have a full plugin ecosystem like Ranger, you can use external commands and integrate them into keybindings for extended functionality.
- **File Previews**: You can configure external preview tools like `bat` (for file preview) or `ueberzug` (for image preview) depending on your terminal setup.
---

### Timestamp
2024-10-22 14:35 UTC

### Summary
Provided an overview of Yazi command-line file manager, shortcut keybindings, and example configuration setup.

### Reference
Lines: 55  
Characters: 2,976

### Filename
```bash
nvim yazi_shortcuts_and_configuration.md
```
