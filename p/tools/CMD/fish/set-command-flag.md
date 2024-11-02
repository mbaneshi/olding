In Fish shell, the `set` command is used to define and manipulate variables. It has several flags that control its behavior. Here's a breakdown of the most common flags:

### 1. `-l` (Local Scope)
- This flag defines a variable that is **local** to the current function or script.
- It only exists within the function or script and disappears once it exits.

```fish
function test_scope
    set -l LOCAL_VAR "I'm local"
    echo $LOCAL_VAR
end
```

### 2. `-g` (Global Scope)
- Defines a **global** variable that persists throughout the Fish shell session, even across functions or scripts.
  
```fish
set -g GLOBAL_VAR "I'm global"
echo $GLOBAL_VAR
```

### 3. `-x` (Exported Variable)
- Defines an **environment** variable, which makes it available to external processes (like child shells or external commands).
- Often used for variables like API keys or paths.

```fish
set -x PATH /new/path $PATH
```

### 4. `-U` (Universal Scope)
- Defines a **universal** variable, which is shared across all Fish shell sessions for the same user, even in different terminals or shells.
- Universal variables are persistent and saved across shell restarts.

```fish
set -U UNIVERSAL_VAR "I'm universal"
```

### 5. `-e` (Erase Variable)
- This flag removes (erases) a variable, freeing up its name and memory.

```fish
set -e VAR_NAME
```

### 6. `-q` (Quiet Check)
- This flag checks if a variable is set, and returns true/false, without printing anything.
  
```fish
if set -q VAR_NAME
    echo "VAR_NAME is set"
end
```

### 7. `-n` (No Interpolation)
- Prevents the evaluation or interpolation of a variable's contents, keeping the literal value.

```fish
set -n RAW_VAR "This is $PATH"
echo $RAW_VAR  # Output: "This is $PATH" (no interpolation)
```

### 8. `-S` (Show Variables)
- Displays the names and values of the variables currently set in Fish shell, or a specific variable.

```fish
set -S
set -S VAR_NAME
```

### 9. `-m` (Match by Wildcard)
- Matches variable names based on wildcard patterns.

```fish
set -e VAR_*  # Erase all variables that match "VAR_*"
```

### 10. `-c` (Use Default Empty Value)
- Assigns an empty value to a variable if no value is provided.

```fish
set -c EMPTY_VAR
echo $EMPTY_VAR  # Output: "" (empty string)
```

These flags allow you to control the scope, behavior, and visibility of variables in Fish shell.
