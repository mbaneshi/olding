This command sets the default remote repository to use when querying the
GitHub API for the locally cloned repository.

gh uses the default repository for things like:

 - viewing and creating pull requests
 - viewing and creating issues
 - viewing and creating releases
 - working with GitHub Actions
 - adding repository and environment secrets

USAGE
  gh repo set-default [<repository>] [flags]

FLAGS
  -u, --unset   unset the current default repository
  -v, --view    view the current default repository

INHERITED FLAGS
  --help   Show help for command

EXAMPLES
  Interactively select a default repository:
  $ gh repo set-default
  
  Set a repository explicitly:
  $ gh repo set-default owner/repo
  
  View the current default repository:
  $ gh repo set-default --view
  
  Show more repository options in the interactive picker:
  $ git remote add newrepo https://github.com/owner/repo
  $ gh repo set-default

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual

