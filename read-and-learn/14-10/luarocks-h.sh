Usage: luarocks [-h] [--version] [--dev] [--server <server>]
       [--only-server <server>] [--only-sources <url>]
       [--namespace <namespace>] [--lua-dir <prefix>]
       [--lua-version <ver>] [--tree <tree>] [--local] [--global]
       [--no-project] [--force-lock] [--verbose] [--timeout <seconds>]
       [<command>] ...

LuaRocks 3.11.1, the Lua package manager

/opt/homebrew/bin/luarocks - LuaRocks main command-line interface

Options:
   -h, --help            Show this help message and exit.
   --version             Show version info and exit.
   --dev                 Enable the sub-repositories in rocks servers for
                         rockspecs of in-development versions.
   --server <server>     Fetch rocks/rockspecs from this server (takes priority
                         over config file).
   --only-server <server>
                         Fetch rocks/rockspecs from this server only (overrides
                         any entries in the config file).
   --only-sources <url>  Restrict downloads to paths matching the given URL.
   --namespace <namespace>
                         Specify the rocks server namespace to use.
   --lua-dir <prefix>    Which Lua installation to use.
   --lua-version <ver>   Which Lua version to use.
   --tree <tree>         Which tree to operate on.
   --local               Use the tree in the user's home directory.
                         To enable it, see '/opt/homebrew/bin/luarocks help
                         path'.
   --global              Use the system tree when `local_by_default` is `true`.
   --no-project          Do not use project tree even if running from a project
                         folder.
   --force-lock          Attempt to overwrite the lock for commands that require
                         exclusive access, such as 'install'
   --verbose             Display verbose output of commands executed.
   --timeout <seconds>   Timeout on network operations, in seconds.
                         0 means no timeout (wait forever). Default is 30.

Commands:
   help                  Show help for commands.
   completion            Output a shell completion script.
   build                 Build/compile a rock.
   config                Query information about the LuaRocks configuration.
   doc                   Show documentation for an installed rock.
   download              Download a specific rock file from a rocks server.
   init                  Initialize a directory for a Lua project using
                         LuaRocks.
   install               Install a rock.
   lint                  Check syntax of a rockspec.
   list                  List currently installed rocks.
   make                  Compile package in current directory using a rockspec.
   new_version           Auto-write a rockspec for a new version of a rock.
   pack                  Create a rock, packing sources or binaries.
   path                  Return the currently configured package path.
   purge                 Remove all installed rocks from a tree.
   remove                Uninstall a rock.
   search                Query the LuaRocks servers.
   show                  Show information about an installed rock.
   test                  Run the test suite in the current directory.
   unpack                Unpack the contents of a rock.
   upload                Upload a rockspec to the public rocks repository.
   which                 Tell which file corresponds to a given module name.
   write_rockspec        Write a template for a rockspec file.

Variables:
   Variables from the "variables" table of the configuration file can be
   overridden with VAR=VALUE assignments.

Run 'luarocks' without any arguments to see the configuration.
