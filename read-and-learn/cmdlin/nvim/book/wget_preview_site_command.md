You can preview the size and number of files on the site without downloading it fully using `wget` with the `--spider` option. This will simulate a download and report information without saving files:

```bash
wget --spider --recursive --level=inf --no-parent https://lazyvim-ambitious-devs.phillips.codes
```

Explanation:

- `--spider`: Only checks the files without downloading them.
- `--recursive`: Crawls all links on the site.
- `--level=inf`: Ensures it goes through all levels of the website.
- `--no-parent`: Prevents climbing to parent directories.

This will give you an overview of file sizes and counts.

```bash
nvim wget_preview_site_command.md
```
