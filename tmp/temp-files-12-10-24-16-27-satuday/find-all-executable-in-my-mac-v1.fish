
#!/usr/bin/env fish

# Create or clear the tools.txt file
set tools_file "tools.txt"
echo -n "" >$tools_file

# Get the list of directories in $PATH
set path_dirs (echo $PATH | tr ':' ' ')

# Loop through each directory and list executable files with specific permissions
for dir in $path_dirs
    if test -d $dir
        echo "Exploring $dir" >>$tools_file
        # List all executable files with permissions 111 and append to tools.txt
        find $dir -type f -perm 111 -print >>$tools_file
    end
end

# Optional: Sort and remove duplicates
sort -u $tools_file -o $tools_file

echo "All available commands have been saved to $tools_file"
