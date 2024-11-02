```lua
local wezterm = require 'wezterm'

return {
  keys = {
    {key="t", mods="CTRL|SHIFT", action=wezterm.action{SpawnTab="CurrentPaneDomain"}},
    {key="e", mods="CTRL|SHIFT", action=wezterm.action{SplitVertical={domain="CurrentPaneDomain"}}},
    {key="d", mods="CTRL|SHIFT", action=wezterm.action{SplitHorizontal={domain="CurrentPaneDomain"}}},
  }
}
```

```bash
nvim wezterm_commands_for_mac.md
```
