
function chrome-launch
    # Set the path to the Chrome user data directory
    set chrome_data_dir "$HOME/Library/Application Support/Google/Chrome"

    # Check if the Chrome data directory exists
    if not test -d "$chrome_data_dir"
        echo "Chrome data directory not found: $chrome_data_dir"
        return 1
    end

    # Get a list of all profiles
    set profiles (ls "$chrome_data_dir" | grep -E '^Profile [0-9]+$')

    # Check if there are no profiles found
    if test (count $profiles) -eq 0
        echo "No profiles found in $chrome_data_dir."
        return 1
    end

    # Print the available profiles and prompt for selection
    echo "Available profiles:"
    for i in (seq (count $profiles))
        echo "$i: $profiles[$i]"
    end

    echo -n "Select a profile by number: "
    read selected_index

    # Validate the selected index
    if not test "$selected_index" -ge 1 -a "$selected_index" -le (count $profiles)
        echo "Invalid selection."
        return 1
    end

    # Get the selected profile name
    set selected_profile $profiles[$selected_index]

    # Set the path to the Chrome binary
    set chrome_command "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

    # Construct the arguments for Chrome as a list
    set chrome_args --remote-debugging-port=9222
    set chrome_args $chrome_args --user-data-dir="$chrome_data_dir"
    set chrome_args $chrome_args --profile-directory="$selected_profile"

    # Print the command for logging/debugging purposes
    echo "Launching Chrome with the following command:"
    echo "$chrome_command $chrome_args"

    # Execute the command in the background
    exec "$chrome_command" $chrome_args &
end
