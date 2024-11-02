### Filename: emscripten_emcc_overview.txt
### Timestamp: 2024-10-14 17:45:00 UTC
### Description: Overview of the Emscripten Compiler Frontend (emcc), detailing its command-line syntax, arguments, and optimization options.
### Lines: 145
### Characters: 16,951

---

**Emscripten Compiler Frontend (emcc)**
***********************************

The Emscripten Compiler Frontend ("emcc") is used to call the Emscripten compiler from the command line. It is effectively a drop-in replacement for a standard compiler like *gcc* or *clang*.

**Command line syntax**
===================

   emcc [options] file...

(Note that you will need "./emcc" if you want to run emcc from your current directory.)

The input file(s) can be either source code files that *Clang* can handle (C or C++), object files (produced by *emcc -c*), or LLVM assembly files.

**Arguments**
---------

Most clang options will work, as will gcc options, for example:

   # Display this information
   emcc --help

   # Display compiler version information
   emcc --version

To see the full list of *Clang* options supported on the version of *Clang* used by Emscripten, run "clang --help".

Options that are modified or new in *emcc* are listed below:

**"-O0"**
   [compile+link] No optimizations (default). This is the recommended setting for starting to port a project, as it includes various assertions.

   This and other optimization settings are meaningful both during compile and during link. During compile it affects LLVM optimizations, and during link it affects final optimization of the code in Binaryen as well as optimization of the JS. (For fast incremental builds "-O0" is best, while for release you should link with something higher.)

**"-O1"**
   [compile+link] Simple optimizations. During the compile step these include LLVM "-O1" optimizations. During the link step this does not include various runtime assertions in JS that *-O0* would do.

**"-O2"**
   [compile+link] Like "-O1", but enables more optimizations. During link this will also enable various JavaScript optimizations.

   Note:

     These JavaScript optimizations can reduce code size by removing things that the compiler does not see being used, in particular, parts of the runtime may be stripped if they are not exported on the "Module" object. The compiler is aware of code in --pre-js and --post-js, so you can safely use the runtime from there. Alternatively, you can use "EXPORTED_RUNTIME_METHODS", see src/settings.js.

**"-O3"**
   [compile+link] Like "-O2", but with additional optimizations that may take longer to run.

   Note:

     This is a good setting for a release build.

**"-Og"**
   [compile+link] Like "-O1". In future versions, this option might disable different optimizations in order to improve debuggability.

**"-Os"**
   [compile+link] Like "-O3", but focuses more on code size (and may make tradeoffs with speed). This can affect both Wasm and JavaScript.

**"-Oz"**
   [compile+link] Like "-Os", but reduces code size even further, and may take longer to run. This can affect both Wasm and JavaScript.

   Note:

     For more tips on optimizing your code, see Optimizing Code.

**"-sOPTION[=VALUE]"**
   [different OPTIONs affect at different stages, most at link time]
   Emscripten build options. For the available options, see src/settings.js.

   Note:

     If no value is specified it will default to "1".

   Note:

     It is possible, with boolean options, to use the "NO_" prefix to reverse their meaning. For example, "-sEXIT_RUNTIME=0" is the same as "-sNO_EXIT_RUNTIME=1" and vice versa.  This is not recommended in most cases.

   Note:

     Lists can be specified as comma separated strings:

        -sEXPORTED_FUNCTIONS=foo,bar

   Note:

     We also support older list formats that involve more quoting. Lists can be specified with or without quotes around each element and with or without brackets around the list.  For example, all the following are equivalent:

        -sEXPORTED_FUNCTIONS="foo","bar"
        -sEXPORTED_FUNCTIONS=["foo","bar"]
        -sEXPORTED_FUNCTIONS=[foo,bar]

   Note:

     For lists that include brackets or quote, you need quotation marks (") around the list in most shells (to avoid errors being raised). Two examples are shown below:

        -sEXPORTED_FUNCTIONS="['liblib.so']"
        -s"EXPORTED_FUNCTIONS=['liblib.so']"

   You can also specify that the value of an option will be read from a file. For example, the following will set "EXPORTED_FUNCTIONS" based on the contents of the file at **path/to/file**.

      -sEXPORTED_FUNCTIONS=@/path/to/file

   Note:

     * In this case the file should contain a list of symbols, one per line.  For legacy use cases JSON-formatted files are also supported: e.g. "["_func1", "func2"]".

     * The specified file path must be absolute, not relative.

     * The file may contain comments where the first character of the line is "'#'".

   Note:

     Options can be specified as a single argument with or without a space between the "-s" and option name.  e.g. "-sFOO" or "-s FOO". It's highly recommended you use the notation without space.

**"-g"**
   [compile+link] Preserve debug information.

   * When compiling to object files, this is the same as in *Clang* and *gcc*, it adds DWARF debug information to the object files.

   * When linking, this is equivalent to -g3.

**"-gseparate-dwarf[=FILENAME]"**
   [same as -g3 if passed at compile time, otherwise applies at link]
   Preserve debug information, but in a separate file on the side. This is the same as "-g", but the main file will contain no debug info. Instead, debug info will be present in a file on the side, in "FILENAME" if provided, otherwise the same as the Wasm file but with suffix ".debug.wasm". While the main file contains no debug info, it does contain a URL to where the debug file is, so that devtools can find it. You can use "-sSEPARATE_DWARF_URL=URL" to customize that location (this is useful if you want to host it on a different server, for example).

**"-gsplit-dwarf"**
   Enable debug fission, which creates split DWARF object files alongside the wasm object files. This option must be used together with "-c".

**"-gsource-map"**
   [link] Generate a source map using LLVM debug information (which must be present in object files, i.e., they should have been compiled with "-g"). When this option is provided, the **.wasm** file is updated to have a "sourceMappingURL" section. The resulting URL will have format: "<base-url>" + "<wasm-file-name>" + ".map". "<base-url>" defaults to being empty (which means the source map is served from the same directory as the Wasm file). It can be changed using --source-map-base.

**"-g<level>"**
   [compile+link] Controls the level of debuggability. Each level builds on the previous one:

      * "-g0": Make no effort to keep code debuggable.

      * "-g1": When linking, preserve whitespace in JavaScript.

      * "-g2": When linking, preserve function names in compiled code.

      * "-g3": When compiling to object files, keep debug info, including JS whitespace, function names, and LLVM debug info (DWARF) if any (this is the same as -g).

**"--profiling"**
   [same as -g2 if passed at compile time, otherwise applies at link]
   Use reasonable defaults when emitting JavaScript to make the build readable but still useful for profiling. This sets "-g2" (preserve whitespace and function names) and may also enable optimizations that affect performance and otherwise might not be performed in "-g2".

**"--profiling-funcs"**
   [link] Preserve function names in profiling, but otherwise minify whitespace and names as we normally do in optimized builds. This is useful if you want to look at profiler results based on function names, but do *not* intend to read the emitted code.

**"--tracing"**
   [link] Enable the Emscripten Tracing API.

**"--reproduce=<file.tar>"**
   [compile+link] Write tar file containing inputs and command to reproduce invocation.  When sharing this file be aware that it will contain any object files, source files and libraries that were passed to the compiler.

**"--emit-symbol-map"**
   [link] Save a map file between function indexes in the Wasm and function names. By storing the names on a file on the side, you can avoid shipping the names, and can still reconstruct meaningful stack traces by translating the indexes back to the names.

   Note:

     When used with "-sWASM=2", two symbol files are created.
     "[name].js.symbols" (with WAS

M symbols) and "[name].wasm.symbols" (with names of symbols that can be looked up by the JS side).
     This can also be useful when running an application in a build environment where the source code is not available. It is also useful for analyzing stack traces and profiling performance.

**Additional notes**
=================

You can create your own tools with emcc by simply writing a wrapper script that does what you want, e.g. linking various options or setting up the environment. If you want to add your own options or change existing ones, see "add_emcc_option".

For more complex builds, see "em++" and "emcc" documentation.

For more details, you can refer to the Emscripten documentation and read more about the specific features and use cases of the Emscripten compiler.
