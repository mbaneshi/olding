To configure your Mac environment for using `pnpm` while managing downloaded packages under `~/.config/node`, follow the steps below.

### Step 1: Install `pnpm`

You can install `pnpm` using Homebrew, since you’re already using it for package management.

```bash
brew install pnpm
```

Verify installation with:

```bash
pnpm -v
```

### Step 2: Configure `pnpm` to Store Modules in `~/.config/node`

You can configure `pnpm` globally by creating/editing the configuration file `~/.config/pnpm/config.yaml`.

1. Create the directory if it doesn’t exist:

   ```bash
   mkdir -p ~/.config/pnpm
   ```

2. Open `~/.config/pnpm/config.yaml` in your favorite editor (`neovim` if you're using it):

   ```bash
   nvim ~/.config/pnpm/config.yaml
   ```

3. Add the following configuration:

```yaml
store-dir: ~/.config/node/pnpm-store
global-dir: ~/.config/node/global
```

- `store-dir`: This defines where pnpm will store downloaded packages (like `~/.config/node/pnpm-store`).
- `global-dir`: This sets where globally installed packages will reside.

### Step 3: Set Global `node_modules` Path and Update `NODE_PATH`

To ensure tools depending on `node_modules` can access them, you can set the `NODE_PATH` environment variable in your shell configuration file (Fish, in your case).

1. Edit your `~/.config/fish/config.fish` file:

   ```bash
   nvim ~/.config/fish/config.fish
   ```

2. Add the following line to set the `NODE_PATH` to your global directory:

   ```bash
   set -gx NODE_PATH ~/.config/node/global
   ```

3. Reload Fish shell:

   ```bash
   exec fish
   ```

### Step 4: Install Global Packages with `pnpm`

To install packages globally using `pnpm`, use the `-g` flag, which will install them in `~/.config/node/global` as configured:

```bash
pnpm add -g <package-name>
```

### Step 5: Verify Configuration

Finally, ensure everything is working as expected:

1. Check where `pnpm` stores global packages:

   ```bash
   pnpm root -g
   ```

2. Verify that installed packages are accessible globally:

   ```bash
   pnpm list -g
   ```

By setting up `pnpm` in this manner, you can ensure that all dependencies are placed in your desired directories and ready for use with other modules or tools.

*Timestamp: 2023-10-14 18:55:00 UTC*  
*Short description: Steps to configure pnpm on Mac with custom directories for modules*  
*Number of lines: 38, Number of characters: 2,054*

```md
pnpm-config.md
```
