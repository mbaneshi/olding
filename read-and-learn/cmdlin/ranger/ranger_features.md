**[10/14/2024 06:32 AM]**  
A guide covering features of **Ranger**, including advanced navigation (`:travel`), selection, macros, file operations, and tags. Additional sections explain filtering, sorting, renaming, directory flattening, and using the shell. It also details the new **metadata** feature, allowing custom metadata for files.

**Lines: 284 | Characters: 16,661**

```md
ranger_features.md

### Key Concepts from Ranger Usage:

1. **Travelling Between Directories**:
   - Use the `:travel` command to quickly navigate by typing partial names of directories/files, progressing through nested directories automatically when unique matches are found.

2. **Selection and Macros**:
   - **Selection**: Mark files with `space` (individual files), `v` (invert selection), or `V` (visual mode for range selection). You can also mark/unmark files by regex or tag.
   - **Macros**: Abbreviations for Ranger commands (`%f` = highlighted file, `%d` = current directory, `%s` = selected files, etc.) simplify executing commands on files.

3. **Tags**:
   - Use `t` to tag a file, `"` followed by any character for custom tags, and `ut` to remove tags. Tags are persistent and can be used for organizing files (e.g., marking books you've read).

4. **Filtering, Sorting, and Directory Flattening**:
   - Use `:filter` with a regular expression to show only matching files, or `:filter_stack` to combine filters with binary operators.
   - Directory flattening with `:flat N` shows files in nested directories up to the Nth level in a linear view.

5. **File Operations**:
   - **Copying/Moving**: Use `yy` to copy, `dd` to move, and `pp` to paste files. Multiple files can be copied/moved by marking them. You can copy files across different Ranger instances using `:save_copy_buffer` and `:load_copy_buffer`.
   - **Renaming**: Use `cw` to rename files, with options to change only parts of filenames (e.g., extension) using macros like `%s`.
   - **Bulk Renaming**: Select files and run `:bulkrename` to rename them in bulk using a text editor.
   - **Deleting/Creating**: Use `:delete`, `:touch`, and `:mkdir` for file operations.

6. **Rifle (Smart File Opener)**:
   - `rifle` determines which program to open a file with, based on its MIME type, extension, and available programs. You can customize its behavior through `rifle.conf`.

7. **Using Shell Commands and Flags**:
   - Ranger supports shell commands through the `:shell` command. Flags (`w`, `t`, `f`, `r`) modify how these commands run, e.g., seeing output, forking console/GUI programs, or running commands with root rights.

8. **Metadata and Linemodes**:
   - Store and manage metadata for files using `:meta`. Metadata can be used with linemodes (e.g., to display file permissions or metadata like titles). Custom linemodes can be defined for more tailored views.

9. **Getting Help**:
   - Press `?` to access different help menus, including keybindings, commands, and settings.

---

This summarizes the navigation, file management, and customization tools available in Ranger, focusing on its efficient command-line interface for managing large file systems.
```
