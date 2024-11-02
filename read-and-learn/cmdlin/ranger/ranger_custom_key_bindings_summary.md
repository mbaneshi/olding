### Key Concepts for Custom Key Bindings in Ranger

1. **Edit `rc.conf` Quickly**:
   - Command: `map X chain shell vim -p ~/.config/ranger/rc.conf %rangerdir/config/rc.conf; source ~/.config/ranger/rc.conf`
   - Opens custom and default `rc.conf` files in Vim and reloads config upon exit.

2. **Smart "cw" for Rename**:
   - Command: `map cw eval fm.execute_console("bulkrename") if fm.thisdir.marked_items else fm.open_console("rename " + fm.thisfile.basename)`
   - Switches between renaming a single file or bulk renaming.

3. **Send Files to Trash**:
   - Command: `map DD shell mv -i %s ~/.local/share/Trash/files/...`
   - Use `DD` to send files to Trash, and `uD` to restore the last deleted file.

4. **Filter-As-You-Type**:
   - Command: `map f console scout -ftsea%space`
   - Mimics "find" behavior, filtering files as you type.

5. **Recursive Search**:
   - Command: `map F  chain flat 5 ; console scout -ftsea%space`
   - Unfolds directories up to 5 levels and searches recursively.

6. **Open in Tmux Splits**:
   - Commands for horizontal/vertical splits or new windows using `tmux`:
     - `map ev shell tmux split-window -h rifle %f`
     - `map es shell tmux split-window -v rifle %f`
     - `map ew shell tmux new-window rifle %f`

7. **Toggle File Visibility**:
   - Script `dotify.sh` toggles hidden/visible file status with key binding:  
   - `map <alt>h shell /path/to/dotify.sh %s`

8. **Unmount and Power Off Devices**:
   - Command: `map xp shell for selection in %p; do ...`
   - Unmounts and powers off selected devices.

```md
ranger_custom_key_bindings_summary.md
```

**Generated on:** 2024-10-14  
**Short summary of useful custom key bindings for Ranger**  
**Lines:** 26  
**Characters:** 1,543
