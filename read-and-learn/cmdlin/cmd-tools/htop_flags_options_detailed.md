**Timestamp:** 2024-10-19 10:15:00 UTC  
**Description:** An elaborated list of flags and options for `htop`, providing detailed descriptions for each.  
**Lines:** 42  
**Characters:** 1436  
**Filename:** 
```bash
nvim htop_flags_options_detailed.md
```

### Detailed `htop` Flags and Options

- `-h`, `--help`:  
  Display a help message with a summary of all available options.

- `-v`, `--version`:  
  Show the version number of `htop` and exit.

- `-C`, `--no-color`:  
  Run `htop` without color support, which may be useful in environments that do not support ANSI color codes.

- `-d`, `--delay <delay>`:  
  Set the delay between updates in tenths of a second. For example, `-d 20` updates every 2 seconds.

- `-p`, `--pid <pid>`:  
  Monitor only the specified process IDs (PIDs). Multiple PIDs can be comma-separated (e.g., `-p 1234,5678`).

- `-s`, `--sort <column>`:  
  Specify the column by which to sort the processes. Common columns include `pid`, `mem` (memory usage), and `cpu` (CPU usage). For example, `-s mem` sorts processes by memory usage.

- `-u`, `--user <username>`:  
  Show processes for a specific user. This option filters the displayed processes to those owned by the given username.

- `--tree`:  
  Display processes in a tree format, illustrating the parent-child relationship among processes.

- `--no-mouse`:  
  Disable mouse support, allowing only keyboard navigation. Useful for terminal environments without mouse support.

- `--cpu=<n>`:  
  Display processes running on a specific CPU core, where `<n>` is the core number (e.g., `--cpu=0` for the first core).

- `--batch`:  
  Run `htop` in batch mode, which disables interactive features. This is useful for scripting or when you want to log process information to a file.

- `--max-threads <n>`:  
  Limit the number of threads displayed for each process to `<n>`, which can help reduce clutter in the display.

- `--signal <signal>`:  
  Send a specified signal to a process by entering the process ID after the signal name. For example, `--signal SIGKILL` will terminate the specified process.

- `-g`, `--group`:  
  Display processes by group, making it easier to see related processes together.

- `-m`, `--mem`:  
  Display memory usage as a percentage of total memory available, providing insights into memory consumption.

- `-x`, `--extra`:  
  Show extra information about each process, such as the command line arguments used to start it.

- `-n`, `--no-setup`:  
  Start without loading the last saved setup, giving a fresh view each time `htop` is launched.

- `--disable-htop`:  
  Disable the `htop` banner on startup for a cleaner interface.

Feel free to ask for any specific information or additional options you need!
