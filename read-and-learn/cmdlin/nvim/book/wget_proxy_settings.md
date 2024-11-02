`wget` has extensive configuration options, including proxy settings, which can be managed in two main ways:

### 1. **Using Command-Line Options**

- `--proxy=on/off`: Enables or disables proxy usage.
- `--proxy-user` and `--proxy-password`: Used to set credentials for proxy authentication.

Example:

```bash
wget --proxy=on --proxy-user=yourusername --proxy-password=yourpassword URL
```

### 2. **Using the `.wgetrc` Configuration File**

Set proxy settings in `~/.wgetrc` file:

```bash
http_proxy = http://proxyserver:port/
https_proxy = https://proxyserver:port/
```

You can also disable proxies globally by adding `use_proxy = off`.

For a full overview, check the [GNU Wget documentation](https://www.gnu.org/software/wget/manual/wget.html).

```bash
nvim wget_proxy_settings.md
```
