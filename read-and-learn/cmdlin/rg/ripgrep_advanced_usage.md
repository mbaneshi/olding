**Timestamp**: 2024-10-25

**Short Description**: Detailed guide on advanced `ripgrep` (rg) usage.

**Lines**: 43

**Characters**: 3,103

```bash
nvim ripgrep_advanced_usage.md
```

---

Here's a guide to some advanced `ripgrep` (`rg`) usage that might boost your productivity in searching through codebases.

### 1. **Context Control**

- **`-C` / `--context=N`**: Show `N` lines of context around matches (similar to `grep -C`).
- **`-A N`** / **`-B N`**: Show `N` lines of context *after* (`-A`) or *before* (`-B`) the match.
  
  ```bash
  rg --context=3 "function_name" path/to/files
  ```

### 2. **Multithreading and Search Speed**

- **`--threads`**: Control the number of threads `rg` uses. Ideal for large searches on multi-core systems.
  
  ```bash
  rg --threads 4 "TODO"
  ```

- **`--sort-files`**: Sort file paths before searching, which may yield consistent ordering and potentially faster searches in some filesystems.

### 3. **File Filtering**

- **`--type`** / **`-t`**: Limit search to specific file types (e.g., Rust, Markdown, JS).
  
  ```bash
  rg -t js "function"
  ```

- **`-g`**: Include only files matching specific globs. For example, to search only `.js` and `.ts` files in a directory:

  ```bash
  rg -g "*.js" -g "*.ts" "async"
  ```

- **`--iglob`**: Ignores case in glob patterns, making it ideal for OS-independent searching.
  
  ```bash
  rg --iglob "*.{JPG,jpg}" "image_tag"
  ```

### 4. **Predefined Patterns and Libraries**

- **`--pre`**: Enables running custom preprocessors on each file (e.g., `.gz` files).
  
  ```bash
  rg --pre "gzip -d" "pattern" *.gz
  ```

### 5. **PCRE2 Regular Expressions**

- **`--pcre2`**: Allows for complex regex patterns, such as lookarounds, not supported by default.
  
  ```bash
  rg --pcre2 "(?<=foo)bar"
  ```

### 6. **Negating Patterns**

- **`-v`**: Inverts the search to show lines that do *not* match the pattern.
  
  ```bash
  rg -v "debug"
  ```

### 7. **Replace Matches with `--replace`**

You can substitute patterns directly in output, which is useful for quick edits.

```bash
rg "foo" --replace "bar" path/to/files
```

### 8. **Output Customization**

- **`--json`**: Output results in JSON format for use with other CLI tools.
  
  ```bash
  rg --json "pattern"
  ```

- **`--color`**: Specify color settings for easier distinction (use `always`, `never`, or `auto`).
  
  ```bash
  rg --color=always "highlight_me"
  ```

- **`--heading` and `--no-heading`**: Toggle grouping results by file for better readability.

### 9. **File Encoding Control**

For mixed encodings in a codebase:

```bash
rg --encoding utf-16 "search_term"
```

### 10. **Efficient Recursive and Depth-Controlled Searches**

- **`--max-depth`**: Limits search depth, especially useful in massive directories.

  ```bash
  rg "example" --max-depth 2
  ```

These techniques should help you leverage `rg`’s powerful features for even more targeted, efficient searching in your projects. Let me know if you’d like more specific examples!
