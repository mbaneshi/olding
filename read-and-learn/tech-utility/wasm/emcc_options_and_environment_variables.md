### Filename: emcc_options_and_environment_variables.txt
### Timestamp: 2024-10-14 14:05 UTC
### Description: This document outlines various options for the `emcc` command-line tool, detailing flags for pre/post-processing JavaScript, embedding files, and managing environment variables.
### Lines: 161
### Characters: 17755

---

### Emscripten Compiler (emcc) Options and Environment Variables

**JavaScript Pre/Post Processing Options**
=============================

1. **`--pre-js <file>`**
   - Specifies a file whose contents are added before the emitted code and optimized together with it.
   - Allows for better dead code elimination and minification.
   - Not recommended for altering the main output in a way that confuses the optimizer.

2. **`--post-js <file>`**
   - Like `--pre-js`, but emits a file *after* the emitted code.

3. **`--extern-pre-js <file>`**
   - Specifies a file whose contents are prepended to the JavaScript output after all other processing is done.
   - This is similar to prepending this file after `emcc` finishes running.

4. **`--extern-post-js <file>`**
   - Like `--extern-pre-js`, but appends to the end.

5. **`--embed-file <file>`**
   - Specify a file (with path) to embed inside the generated WebAssembly module.
   - More efficient than preloading as it avoids copying the file data at runtime.

6. **`--preload-file <name>`**
   - Specify a file to preload before running the compiled code asynchronously.
   - Preloaded files are stored in **filename.data**, which should be used alongside **filename.html**.

7. **`--exclude-file <name>`**
   - Files and directories to be excluded from `--embed-file` and `--preload-file`.

8. **`--use-preload-plugins`**
   - Tells the file packager to run preload plugins on the files as they are loaded.

9. **`--shell-file <path>`**
   - The path name to a skeleton HTML file used when generating HTML output.

10. **`--source-map-base <base-url>`**
    - Base URL for the location where WebAssembly source maps will be published.

11. **`--minify 0`**
    - Identical to `-g1`.

12. **`--js-transform <cmd>`**
    - Specifies a command to be called on the generated code before it is optimized.

13. **`--bind`**
    - Links against the embind library. Deprecated: Use `-lembind` instead.

14. **`--emit-tsd <path>`**
    - Generate a TypeScript definition file for the emscripten module.

15. **`--ignore-dynamic-linking`**
    - Ignores dynamic linking, allowing the build system to proceed without errors.

16. **`--js-library <lib>`**
    - A JavaScript library to use in addition to those in Emscripten's core libraries.

17. **`-v`**
    - Turns on verbose output, useful for diagnosing errors.

18. **`--check`**
    - Runs Emscripten's internal sanity checks and reports any issues with the current configuration.

19. **`--cache <directory>`**
    - Sets the directory to use as the Emscripten cache.

20. **`--clear-cache`**
    - Manually clears the cache of compiled Emscripten system libraries.

21. **`--use-port=<port>`**
    - Use the specified port. Multiple ports can be specified.

22. **`--clear-ports`**
    - Manually clears the local copies of ports from the Emscripten Ports repos.

23. **`--show-ports`**
    - Shows the list of available projects in the Emscripten Ports repos.

24. **`-Wwarn-absolute-paths`**
    - Enables warnings about the use of absolute paths in `-I` and `-L` directives.

25. **`--proxy-to-worker`**
    - Runs the main application code in a worker, proxying events and output.

26. **`--emrun`**
    - Enables the generated output to be aware of the emrun command line tool.

27. **`--cpuprofiler`**
    - Embeds a simple CPU profiler onto the generated page.

28. **`--memoryprofiler`**
    - Embeds a memory allocation tracker onto the generated page.

29. **`--threadprofiler`**
    - Embeds a thread activity profiler onto the generated page.

30. **`--em-config <path>`**
    - Specifies the location of the **.emscripten** configuration file.

31. **`--valid-abspath <path>`**
    - Note an allowed absolute path that should not trigger warnings.

32. **`-o <target>`**
    - Defines the output type based on the file name extension.

33. **`-c`**
    - Tells `emcc` to emit an object file.

34. **`--output_eol windows|linux`**
    - Specifies the line ending to generate for text output files.

35. **`--cflags`**
    - Prints out the flags `emcc` would pass to `clang`.

---

**Environment Variables**
=====================

- **`EMMAKEN_JUST_CONFIGURE`**
- **`EMCC_AUTODEBUG`**
- **`EMCC_CFLAGS`**
- **`EMCC_CORES`**
- **`EMCC_DEBUG`**
- **`EMCC_DEBUG_SAVE`**
- **`EMCC_FORCE_STDLIBS`**
- **`EMCC_ONLY_FORCED_STDLIBS`**
- **`EMCC_LOCAL_PORTS`**
- **`EMCC_STDERR_FILE`**
- **`EMCC_CLOSURE_ARGS`**
- **`EMCC_STRICT`**
- **`EMCC_SKIP_SANITY_CHECK`**
- **`EM_IGNORE_SANITY`**
- **`EM_CONFIG`**
- **`EM_LLVM_ROOT`**
- **`_EMCC_CCACHE`**

Search for 'os.environ' in `emcc.py` for usage of these variables. Notably, `EMCC_DEBUG` forces the compiler to dump build and temporary files for review.

---

**Note:** The supported targets for `emcc` include llvm bitcode, WebAssembly, and NOT elf, which is typically desired for shared object support.
