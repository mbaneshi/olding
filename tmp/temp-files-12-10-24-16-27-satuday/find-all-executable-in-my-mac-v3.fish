
#!/usr/bin/env fish

# Create or clear the tools.txt file
set tools_file "tools.txt"
echo -n "" >$tools_file

# Get the list of directories in $PATH
set path_dirs (echo $PATH | tr ':' '\n' | sort -u)

# Check if the PATH variable is empty
if test -z "$path_dirs"
    echo "Warning: PATH variable is empty. No directories to search."
    exit 1
end

# Loop through each unique directory and list executable files
for dir in $path_dirs
    # Log the current directory being explored
    echo "Exploring directory: $dir"

    # Check if the directory exists
    if test -d "$dir"
        echo "Found directory: $dir" >>$tools_file
        # List all executable files and append to tools.txt, properly handling spaces in filenames
        set found_files (find "$dir" -type f -perm +111 -print)

        # Log found files or indicate none were found
        if test -n "$found_files"
            echo "Executable files found in $dir:" >>$tools_file
            echo "$found_files" >>$tools_file
        else
            echo "No executable files found in $dir." >>$tools_file
        end
    else
        echo "Directory does not exist: $dir" >>$tools_file
    end
end

# Optional: Sort and remove duplicates
if test -e $tools_file
    sort -u $tools_file -o $tools_file
    echo "All available commands have been saved to $tools_file"
else
    echo "Error: tools.txt file was not created."
end
