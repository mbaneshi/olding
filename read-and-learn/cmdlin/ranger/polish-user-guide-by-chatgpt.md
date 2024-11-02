**Contents**  
========  
- [Introduction](#introduction)  
- [User Interface](#user-interface)  
- [Basic Navigation](#basic-navigation)  
- [Key Bindings and Hints](#key-bindings-and-hints)  
- [Configuration](#configuration)  
- [Previews](#previews)  
- [Tabs, Bookmarks, Travelling](#tabs-bookmarks-travelling)  
- [Selection, Macros, Tags](#selection-macros-tags)  
- [Filtering, Sorting, Directory Flattening](#filtering-sorting-directory-flattening)  
- [File Operations](#file-operations)  
- [Using Shell and Flags](#using-shell-and-flags)  
- [More Tips](#more-tips)  

---

**Introduction**  
============  
This guide provides an in-depth explanation on how to efficiently navigate and operate within `ranger`, a console file manager known for its Vim-style key bindings and extensibility. You can use the `[Contents]` links above to jump to different sections for quick reference.

---

**User Interface**  
==============  
`Ranger's` interface follows the **Miller columns** paradigm, dividing the window into three main panels:  

1. **Middle panel**: Displays contents of the current directory.
2. **Left panel**: Shows the parent directory, with the current directory highlighted.
3. **Right panel**: Previews the selected file or directory.  

Commands like `hjkl` for navigation and colon (`:`) for entering the command mode, mirror Vim's behavior. For instance, `yy` copies a file, `pp` pastes, and `dd` deletes.

---

**Basic Navigation**  
=================  
You can navigate directories using either the arrow keys or the `vim`-inspired `hjkl` keys:  

- `j/k`: Move up or down.
- `l`: Open the selected directory or file.
- `h`: Return to the parent directory.
  
Other useful keys:  

- `i`: Preview files in full-screen mode.
- `q`: Quit (either closing tabs or exiting `ranger`).

---

**Key Bindings and Hints**  
=========================  
`Ranger` offers multiple key bindings and visual hints for commands. Hints display when you press a key that leads to multiple options. For example:  

- `g`: Navigation and tabs.  
- `r`: Open with custom commands.
- `y`: Yank (copy).
- `d`: Cut or delete.
- `p`: Paste.  
- `.`: Filter stack.  
- `z`: Change settings.  
- `u`: Undo the last action.  
- `+`, `-`, `=`: Modify file access permissions.  

Hints will evolve as you type additional keys.

---

**Configuration**  
================  
`Ranger` uses four main configuration files, each responsible for specific behaviors:  

1. `rc.conf`: General options and key bindings.
2. `rifle.conf`: Determines which program opens which file type.
3. `scope.sh`: Manages file previews.
4. `commands.py`: Python scripts for custom commands.

You can customize these settings by copying them to `~/.config/ranger` using the `--copy-config` flag, and modifying the files.

---

**Previews**  
=========  
File previews are managed by the `scope.sh` script. You can modify `scope.sh` or even replace it with another script or binary.  

**Image Previews**:  
`Ranger` supports image previews using utilities like `w3m-img` and specific terminals (`urxvt`, `Kitty`, etc.). To enable previews, edit `preview_images_method` in `rc.conf`.  

To toggle image previews, press `zi`.

**Custom Previews**:  
You can create custom previews by leveraging the `$cached` environment variable, allowing for graphical previews of various file types (e.g., videos, PDFs).

---

**Tabs, Bookmarks, Travelling**  
===========================  
You can quickly switch between multiple directories using **tabs** and **bookmarks**.  

**Tabs**:  
Use `Alt-N` to switch to tab N, or create a new tab if it doesn't exist. `Tab`/`Shift-Tab` cycles between open tabs, while `q` closes tabs.  

**Bookmarks**:  
Bookmark any directory using `m<key>`, and jump to it later using `'key'`. Use `''` to return to the previous directory.

---

**Selection, Macros, Tags**  
==========================  
Efficient file management in `ranger` is further improved by features like selection, tags, and macros.
