Move right by word: Alt + Right Arrow.
7. Kill/Erase by Word
You can quickly delete parts of a command with keyboard shortcuts.

Delete a word before the cursor: Ctrl + W.
Delete a word after the cursor: Alt + D.
8. Repeat Last Argument
Fish allows you to recall the last argument of the previous command.

Use last argument: Alt + . (dot). This will insert the last argument from the previous command into the current command line.
9. Jump Between Directories with cd
Fish comes with the cdh function, which allows you to quickly navigate to recent directories.

List recent directories: Type cdh and press Enter to see a list of recent directories.
Jump to one of them: Type cdh N, where N is the number next to the desired directory.
10. Wildcards for File Operations
Fish supports wildcards for easier file manipulation.

Use * for multiple files: For example, rm *.txt will remove all .txt files in the current directory.
11. Scripting and Configuration
Fish shell configuration can be done by editing the file ~/.config/fish/config.fish.

Add functions or environment variables: Open config.fish and add your custom functions or environment variables here. Example:
bash
Copy code
set -g PATH /new/path $PATH
12. Color Schemes and Syntax Highlighting
Fish automatically highlights syntax, helping you detect errors as you type. You can also change the theme for visual preference.

Change theme: Use fish_config to open an interactive web interface where you can customize themes and more.
13. Fish Key Bindings
Fish allows custom key bindings if you want to optimize your workflow even more.

View all current key bindings: Type bind in the terminal.
Set a custom key binding: You can add custom bindings by modifying the config.fish file. Example:
bash
Copy code
bind \cr 'echo "Enter key pressed"'
By mastering these features, you’ll be able to work more efficiently with Fish shell!
