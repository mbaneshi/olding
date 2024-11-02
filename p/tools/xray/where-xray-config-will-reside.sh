/opt/homebrew/etc/xray/config.json

 brew install xray                                                                                🕙 00:53:07 28-09-2024 Saturday September  
==> Auto-updating Homebrew...
Adjust how often this is run with HOMEBREW_AUTO_UPDATE_SECS or disable with
HOMEBREW_NO_AUTO_UPDATE. Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
==> Downloading https://ghcr.io/v2/homebrew/portable-ruby/portable-ruby/blobs/sha256:e7340e4a1d7cc0f113686e461b93114270848cb14676e9037a1a2ff3b1a0ff32
############################################################################################################################################### 100.0%
==> Pouring portable-ruby-3.3.5.arm64_big_sur.bottle.tar.gz
==> Auto-updated Homebrew!
==> Updated Homebrew from 99c4716cf9 to 3b26dd859d.
Updated 3 taps (homebrew/services, homebrew/core and homebrew/cask).
==> New Formulae
postgresql@17                                                               roxctl
==> New Casks
rouvy

You have 15 outdated formulae and 2 outdated casks installed.

==> Downloading https://ghcr.io/v2/homebrew/core/xray/manifests/1.8.24
############################################################################################################################################### 100.0%
==> Fetching xray
==> Downloading https://ghcr.io/v2/homebrew/core/xray/blobs/sha256:441bb2842199a775229b590d1f87ce2c3344d255265ea54cc164af64e4977a35
############################################################################################################################################### 100.0%
==> Verifying attestation for xray
==> Pouring xray--1.8.24.arm64_sequoia.bottle.tar.gz
==> Caveats
An example config is installed to /opt/homebrew/etc/xray/config.json

To start xray now and restart at login:
  brew services start xray
Or, if you don't want/need a background service you can just run:
  /opt/homebrew/opt/xray/bin/xray run --config /opt/homebrew/etc/xray/config.json
==> Summary
🍺  /opt/homebrew/Cellar/xray/1.8.24: 12 files, 42.2MB
==> Running `brew cleanup xray`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).

