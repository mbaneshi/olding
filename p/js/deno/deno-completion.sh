 deno completions fish                                       🕙 13:53:48 11-10-2024 Friday October
add       (Add dependencies to your configuration file. deno add @std/path You can add multiple dependencies at once: deno add @std/path @std/assert)
bench  (Run benchmarks using Deno's built-in bench tool. Evaluate the given files, run all benches declared with 'Deno.bench()' and report results …)
bundle  (⚠ `deno bundle` was removed in Deno 2. See the Deno 1.x to 2.x Migration Guide for migration instructions: https://docs.deno.com/runtime/…)
cache  (Cache and compile remote dependencies. Download and compile a module with all of its static dependencies and save them in the local cache, …)
check  (Download and type-check without execution. deno check jsr:@std/http/file-server Unless --reload is specified, this command will not re-down…)
clean                                                                                                        (Remove the cache directory ($DENO_DIR))
compile  (Compiles the given script into a self contained executable. deno compile --allow-read --allow-net jsr:@std/http/file-server deno compile …)
completions  (Output shell completion script to standard output. deno completions bash > /usr/local/etc/bash_completion.d/deno.bash source /usr/loc…)
coverage  (Print coverage reports from coverage profiles. Collect a coverage profile with deno test: deno test --coverage=cov_profile Print a repor…)
deno.json
deno.lock
doc  (Show documentation for a module. Output documentation to standard output: deno doc ./path/to/module.ts Output documentation in HTML format: d…)
eval  (Evaluate JavaScript from the command line. deno eval "console.log('hello world')" To evaluate as TypeScript: deno eval --ext=ts "const v: st…)
fmt  (Auto-format various file types. deno fmt myfile1.ts myfile2.ts Supported file types are: JavaScript, TypeScript, Markdown, JSON(C) and Jupyte…)
help
i  (Installs dependencies either in the local project or globally to a bin directory. Local installation Add dependencies to the local project's co…)
info  (Show information about a module or the cache directories. Get information about a module: deno info jsr:@std/http/file-server The following …)
init                                                                     (scaffolds a basic Deno project with a script, test, and configuration file)
install  (Installs dependencies either in the local project or globally to a bin directory. Local installation Add dependencies to the local projec…)
json_reference
jupyter                                                                                                           (Deno kernel for Jupyter notebooks)
lint  (Lint JavaScript/TypeScript source code. deno lint deno lint myfile1.ts myfile2.js Print result as JSON: deno lint --json Read from stdin: ca…)
lsp  (The 'deno lsp' subcommand provides a way for code editors and IDEs to interact with Deno using the Language Server Protocol. Usually humans d…)
main.ts
main_test.ts
publish                                                                         (Publish the current working directory's package or workspace to JSR)
remove  (Remove dependencies from the configuration file. deno remove @std/path You can remove multiple dependencies at once: deno remove @std/path…)
repl  (Starts a read-eval-print-loop, which lets you interactively build up program state in the global context. It is especially useful for quick …)
run  (Run a JavaScript or TypeScript program, or a task or script. By default all programs are run in sandbox without access to disk, network or ab…)
serve  (Run a server defined in a main module The serve command uses the default exports of the main module to determine which servers to start. St…)
task                                              (Run a task defined in the configuration file. deno task build List all available tasks: deno task)
test  (Run tests using Deno's built-in test runner. Evaluate the given modules, run all tests declared with Deno.test() and report results to stand…)
types        (Print runtime TypeScript declarations. deno types > lib.deno.d.ts The declaration file could be saved and used for typing information.)
uninstall  (Uninstalls a dependency or an executable script in the installation root's bin directory. deno uninstall @std/dotenv chalk deno uninsta…)
upgrade  (Upgrade deno executable to the given version. Latest deno upgrade Specific version deno upgrade 1.45.0 deno upgrade 1.46.0-rc.1 deno upgr…)
vendor  (⚠ `deno vendor` was removed in Deno 2. See the Deno 1.x to 2.x Migration Guide for migration instructions: https://docs.deno.com/runtime/…)
