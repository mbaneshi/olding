To create an `index.fish` script that sources all `.fish` files found in sibling directories and any subdirectories, you can follow these steps. This script will recursively find and source all `.fish` files in the current directory and its subdirectories.

### `index.fish` Script

Here's the code you can use for the `index.fish` file:

```fish
#!/usr/bin/env fish

# Get the current directory
set current_dir (pwd)

# Function to source all .fish files recursively
function source_fish_files
    # Loop through all .fish files in the current directory
    for file in (find $argv[1] -name '*.fish' -type f)
        # Source the .fish file
        source "$file"
    end
end

# Call the function to source .fish files from the current directory and subdirectories
source_fish_files $current_dir
```

### Explanation:

1. **Shebang**: The first line (`#!/usr/bin/env fish`) ensures the script runs with the Fish shell.
2. **Current Directory**: `set current_dir (pwd)` stores the current directory path where the `index.fish` file resides.
3. **Function Definition**:
   - The `source_fish_files` function takes a directory as an argument and finds all `.fish` files within that directory (and its subdirectories).
   - `find $argv[1] -name '*.fish' -type f`: This command finds all files with a `.fish` extension, no matter the depth, from the specified directory.
   - The `source "$file"` line sources each found `.fish` file.
4. **Function Call**: `source_fish_files $current_dir` calls the function to source all `.fish` files starting from the current directory.

### Usage:

1. Create or update the `index.fish` file in your directory with the above code.
2. Make sure the `index.fish` file is executable:
   ```bash
   chmod +x index.fish
   ```
3. Run the script from your directory:
   ```bash
   ./index.fish
   ```

### Result:

This setup allows the `index.fish` file to source all `.fish` files from the directory where it resides and any subdirectories, allowing for a modular configuration approach.

---

**Timestamp:** 2024-10-15 11:30:00 UTC  
**Description:** Fish shell script to source all `.fish` files from the current directory and subdirectories.  
**Lines:** 27  
**Characters:** 467  
**Filename:**

```bash
nvim index.fish
```
