import{s as i,n as e}from"../chunks/scheduler.seBsrkbn.js";import{S as p,i as l,e as c,c as d,l as r,m as h,g as u,d as g}from"../chunks/index.Dwxb9V0m.js";function m(){return{title:"Chapter 5: Plugin Basics",description:"Some gotchas and techniques for basic configuration with LazyVim",keywords:"vim, lazyvim, neovim, tutorial, plugins, lazy extras, configuration"}}const v=Object.freeze(Object.defineProperty({__proto__:null,load:m},Symbol.toStringTag,{value:"Module"}));function f(n){let s,t=`<h2 id="_configuration_and_plugin_basics"><a class="link" href="#_configuration_and_plugin_basics">Chapter 5. Configuration and Plugin Basics</a></h2> <div class="sectionbody"><div class="paragraph"><p>I’ve talked about plugins several times and you even got to see the
Lazy.nvim plugin manager in action back in Chapter 1. LazyVim has a unique
multi-layered approach to managing plugins that requires a bit of description,
but is quite elegant in practice.</p></div> <div class="paragraph"><p>Installing plugins allows you to configure Neovim to do things it can’t do by
default. Plugins are typically written in either Lua or VimScript, though other
languages are supported with Neovim’s remote plugin architecture.</p></div> <div class="sect2"><h3 id="_the_three_categories_of_plugins_in_lazyvim"><a class="link" href="#_the_three_categories_of_plugins_in_lazyvim">5.1. The Three Categories of Plugins in LazyVim</a></h3> <div class="paragraph"><p>The simplest plugins to use in LazyVim are pre-installed by LazyVim itself.
You’ve used many of them already. Some, such as Neo-Tree, Telescope, and
Lazy.nvim provide custom UI components to interact with them. Others, such as
flash.nvim and which-key provide new commands or modes to work with. Still
others operate quietly in the background auto-matching parentheses or tags and
drawing indent guides.</p></div> <div class="paragraph"><p>These plugins are preconfigured in LazyVim with (generally) sane defaults.
Because they are so well integrated, customizing those defaults is doable, but
sometimes requires a few tricks that we will cover in this and later chapters.</p></div> <div class="paragraph"><p>The second category of plugin in LazyVim are the “Lazy Extras”. These plugins
are <strong>not</strong> enabled by default, but can be enabled with just a couple of
keystrokes if you want them. Lazy Extras exist to make it easy to install
popular plugins with a configuration that is guaranteed to play nicely with the
other plugins that ship with LazyVim.</p></div> <div class="paragraph"><p>The third category includes third-party plugins that LazyVim has no awareness
of. You will have to configure these plugins from scratch and do your own due
diligence to ensure that keybindings and visual artifacts don’t conflict with
the plugins that LazyVim manages. In a non-LazyVim configuration, all plugins
fell in this category, and it could be a headache to maintain as plugins
evolved and fell out of use over time. In LazyVim, this category includes
relatively few plugins, so the whole experience is much more pleasant.</p></div> <div class="paragraph"><p>As some specific examples consider these three Neovim plugins for file
management, two of which we discussed in the previous chapter:</p></div> <div class="dlist"><dl><dt class="hdlist1">Neo-tree.nvim</dt><dd><p>ships with LazyVim and is active by default. The LazyVim
configuration for Neo-tree does not conflict with other LazyVim plugins by
default. However, if you want to tweak that configuration, there may be some
hoops to jump through.</p> </dd><dt class="hdlist1">Mini.files</dt><dd><p>ships as a Lazy Extra, and is basically a “one click” (or, since
this is Vim we’re talking about, one keypress!) install that is expected to
cooperate well with LazyVim.</p> </dd><dt class="hdlist1">Oil.nvim</dt><dd><p>is an alternative plugin for filesystem management that LazyVim
does not explicitly support. You can install it in LazyVim with a few lines of
configuration, but it’s not quite as easy to set up as mini.files and there
is no guarantee it won’t have conflicts you need to sort out yourself.</p></dd></dl></div> <div class="paragraph"><p>From Neovim’s point of view, all these plugins are exactly the same, as Neovim
only knows about third-party plugins. LazyVim just comes with a bit of extra
structure that you need to think about when using plugins. Usually this
structure simplifies things, but occasionally it adds extra hassle.</p></div></div> <div class="sect2"><h3 id="_lazy_extras"><a class="link" href="#_lazy_extras">5.2. Lazy Extras</a></h3> <div class="paragraph"><p>In the previous chapter, I covered how to use Fzf.lua and mini.files, but I was
pretty terse on the installation instructions. Now we’ll get to dive deep.</p></div> <div class="paragraph"><p>The Lazy Extras mode can be accessed by pressing <code>x</code> from the dashboard. If you
aren’t on the dashboard, you’ll need to enter Command mode with <code>:</code> and type
<code>LazyExtras</code> followed by the usual <code>Enter</code> to confirm a command (Incidentally,
you can also show the dashboard at any time by typing the command
<code>:Dashboard</code>).</p></div> <div class="paragraph"><p>Either way, you’ll be presented with a list of possible plugins to install. On
my setup this looks as follows:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-5/lazy-extras-dark.png" alt="lazy extras dark"/></div> <div class="title">Figure 25. Lazy Extras</div></div> <div class="paragraph"><p>I’ve installed over a dozen extras at the moment, mostly for the various
programming languages I dabble in. You can navigate this file using all the
standard navigation commands such as <code>j</code>, <code>k</code>, or <code>s</code>.</p></div> <div class="paragraph"><p>No matter how you get there, once your cursor is on the extra you want to
install (such as <code>editor.mini-files</code>) line, just hit the <code>x</code> key to install the
extra. If you want to uninstall it, do the same thing; move to the appropriate
line (now under the list of <code>Enabled</code> extras), and hit <code>x</code> to disable the
extra. The mnemonic here is that <code>x</code> means “E<strong>x</strong>tra”.</p></div> <div class="paragraph"><p>You may need to quit and restart Neovim for Lazy.nvim to pick up that the
extra has been installed and sync its dependencies.</p></div> <div class="paragraph"><p>While we’re in the <code>LazyExtras</code> screen, I recommend enabling the <code>lang.*</code>
extras for whichever programming languages you use most frequently. You should
also install all the plugins in the “Recommended plugins” section (they have
star icons beside them) except for:</p></div> <div class="ulist"><ul><li><p><code>ui.mini-animate</code> unless you have a much much faster machine than I do. This
plugin is extremely laggy on my 2020-era Intel IMac Pro.</p></li> <li><p><code>editor.fzf</code> unless you have decided that you prefer it to Telescope, as we
discussed in Chapter 4.</p></li></ul></div> <div class="paragraph"><p>I wouldn’t install any other non-recommended extras until you’ve either
encountered them later in this book or had a chance to research them after you
finish the book. Otherwise, they may change behaviours in ways that I won’t
have the foresight to write about.</p></div> <div class="paragraph"><p>You can find more information on each extra by visiting <a href="https://lazyvim.org" class="bare">https://lazyvim.org</a> and
clicking the “Extras” menu item on the left menu bar. It includes links to the
list of plugins each extra installs as well as the configuration LazyVim brings
for that extra.</p></div></div> <div class="sect2"><h3 id="_disabling_a_built_in_plugin"><a class="link" href="#_disabling_a_built_in_plugin">5.3. Disabling a Built-in Plugin</a></h3> <div class="paragraph"><p>Sooner or later, you’re going to want to edit your LazyVim configuration. The
out-of-the-box defaults are wonderful, but the odds are that they don’t 100%
exactly match your personal needs.</p></div> <div class="paragraph"><p>While the vast majority of LazyVim’s default plugins are no-brainers that you
want to keep, you may find there are one or two plugins that you just don’t
need. In most cases, it doesn’t matter, since LazyVim only loads plugins when
you actually use them, so you can just ignore the ones that aren’t relevant to
you.</p></div> <div class="paragraph"><p>The only LazyVim plugin I have disabled is Neo-tree. I’ll show how to do
that and you can adapt it to any other plugins you want to disable.</p></div> <div class="paragraph"><p>First I want to give an introduction to the LazyVim configuration directory.
You can open the config directory from the dashboard by simply pressing the
<code>c</code> key. Or you can use Space mode to access the configuration files at any
time using <code>&lt;Space&gt;fc</code> for “Find Config Files”.</p></div> <div class="paragraph"><p>This will load the LazyVim config folder in your file picker. This folder is
typically <code>$HOME/.config/nvim</code>. Neovim loads <code>$HOME/.config/nvim/init.lua</code> by
default, and if you weren’t using LazyVim, this is where you would do all your
configuration.</p></div> <div class="paragraph"><p>With LazyVim, <code>init.lua</code> just uses the Lua <code>require</code> statement to include the
LazyVim configuration infrastructure. <strong>You will normally not have to touch
this file</strong>, even though most third party plugins have installation files that
presume your configuration is in that file. Instead follow the “LazyVim way” as
outlined in this chapter.</p></div> <div class="paragraph"><p>In addition to a barebones <code>init.lua</code>, LazyVim has put a few configuration
files and a bit of folder structure in the configuration directory.</p></div> <div class="paragraph"><p>For now, the main thing we need to know is that <em>any</em> Lua files inside the
<code>lua/plugins</code> subdirectory will automatically be loaded by LazyVim, no matter
what their name is. I have a number of different files in this folder for my
custom configurations.</p></div> <div class="paragraph"><p>I call the one that holds my disabled plugins <code>disabled.lua</code>. The easiest way
to create this file is to open one of the existing config files and use either
Neo-tree or mini.files to create a new file in the same folder, as described in
Chapter 4.</p></div> <div class="paragraph"><p>When I created my <code>disabled.lua</code> file in the <code>lua/plugins</code> directory, my
intention was to collect all the LazyVim plugins I don’t want in it because
I assumed LazyVim wouldn’t quite match my needs. In reality,
it’s a really short list! The contents of this file is simply:</p></div> <div class="listingblock"><div class="title">Listing 12. Disabling LazyVim Plugins</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-p">{</span> <span class="tok-s2">&quot;nvim-neo-tree/neo-tree.nvim&quot;</span><span class="tok-p">,</span> <span class="tok-n">enabled</span> <span class="tok-o">=</span> <span class="tok-kc">false</span> <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>If there are any other plugins that LazyVim enables by default that you don’t
want to use, just follow the same syntax. The first argument in each Lua table
is a string containing the github repo (with owner) you want to disable. The
second argument is to set <code>enabled = false</code>. That’s it!</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">You will inevitably forget the <code>return</code> statement at the beginning
of a plugins file at some point. Now you know to watch out for it.</td></tr></tbody></table></div> <div class="paragraph"><p>If you don’t know the Lua language…​ honestly, don’t worry about it. I’ve
never formally studied it, but I’ve picked up enough by osmosis to easily
maintain my Neovim configuration.</p></div> <div class="paragraph"><p>If you’re less foolish than me, you might want to type <code>:help lua</code> and read the
official Neovim docs on the topic. Then check out <code>:help lua-guide-api</code> to
learn about the vim-specific APIs.</p></div></div> <div class="sect2"><h3 id="_modifying_keybindings_example"><a class="link" href="#_modifying_keybindings_example">5.4. Modifying Keybindings (Example)</a></h3> <div class="paragraph"><p>Keybindings are one of the few things I don’t love about working with LazyVim,
although it’s not strictly LazyVim’s fault. I just never quite know <strong>where</strong> to
define them!</p></div> <div class="paragraph"><p>There are three possible places to configure keybindings, depending on how any
one plugin is configured:</p></div> <div class="ulist"><ul><li><p>In <code>.config/nvim/lua/config/keymaps.lua</code>. This is typically where you configure or
modify keybindings that are not specific to plugins, but rather modify core
Neovim or LazyVim functionality.</p></li> <li><p>In the <code>keys</code> field of the Lua table (in Lua, a “table” is like a combination
of an array and a record or dict in many other dynamic languages) passed to a
plugin. This is typically where you map global Normal mode keybindings to set
up a plugin. This is what we will do with mini.files.</p></li> <li><p>In the <code>opts</code> (options) argument passed into a plugin’s configuration. The
format of the options for any one plugin are plugin-specific, but many plugins
prefer to set up keymaps on your behalf through options instead of having you
do the mapping yourself. This is especially true if the keymaps define a
different “mode” or only apply if the plugin is currently open or active. I’ll
give an example of this with mini.files as well.</p></li></ul></div> <div class="paragraph"><p>To demonstrate, I want to “fix” the fact that mini files doesn’t have a “open
in root” option. I like the “open in directory of current file” option, but I
also want to be able to open in the root directory.</p></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content">Remember that the root directory is the top level directory of the
current project according to the existence of some language-specific file such
as <code>package.json</code> or <code>Cargo.toml</code>. The <code>cwd</code> is the current working directory
of the editor.</td></tr></tbody></table></div> <div class="paragraph"><p>Since I’ve disabled Neo-tree, I’m going to steal the <code>&lt;Space&gt;e</code> and
<code>&lt;Space&gt;E</code> keybindings and reuse them for mini.files, then I’ll remap the
existing <code>&lt;Space&gt;fm</code> keybinding to open the root so I can access all three
commands. You can, of course, choose different keybindings if they map better to
your mental model or you are keeping Neo-tree around.</p></div> <div class="paragraph"><p>I used mini.files to create a new file named <code>extend-mini-files.lua</code> in my
<code>.config/nvim/lua/config/plugins/</code> directory. As with the <code>disabled.lua</code> file,
this file can be named anything so long as it’s in the <code>plugins</code> directory.</p></div> <div class="paragraph"><p>I have a habit of prefixing any configuration that I am using to change the
defaults provided by LazyVim with the word <code>extend</code>. This makes it easy to
distinguish it from non-LazyVim plugins I’ve installed when I’m listing the
directory using mini.files or Telescope.</p></div> <div class="paragraph"><p>Inside this new file, I used this code:</p></div> <div class="listingblock"><div class="title">Listing 13. Mini.files Custom Keymaps</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-s2">&quot;echasnovski/mini.files&quot;</span><span class="tok-p">,</span>
  <span class="tok-n">keys</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;&lt;leader&gt;e&quot;</span><span class="tok-p">,</span>
      <span class="tok-kr">function</span><span class="tok-p">()</span>
        <span class="tok-nb">require</span><span class="tok-p">(</span><span class="tok-s2">&quot;mini.files&quot;</span><span class="tok-p">).</span><span class="tok-n">open</span><span class="tok-p">(</span><span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">api</span><span class="tok-p">.</span><span class="tok-n">nvim_buf_get_name</span><span class="tok-p">(</span><span class="tok-mi">0</span><span class="tok-p">),</span> <span class="tok-kc">true</span><span class="tok-p">)</span>
      <span class="tok-kr">end</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Open mini.files (directory of current file)&quot;</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;&lt;leader&gt;E&quot;</span><span class="tok-p">,</span>
      <span class="tok-kr">function</span><span class="tok-p">()</span>
        <span class="tok-nb">require</span><span class="tok-p">(</span><span class="tok-s2">&quot;mini.files&quot;</span><span class="tok-p">).</span><span class="tok-n">open</span><span class="tok-p">(</span><span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">uv</span><span class="tok-p">.</span><span class="tok-n">cwd</span><span class="tok-p">(),</span> <span class="tok-kc">true</span><span class="tok-p">)</span>
      <span class="tok-kr">end</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Open mini.files (cwd)&quot;</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;&lt;leader&gt;fm&quot;</span><span class="tok-p">,</span>
      <span class="tok-kr">function</span><span class="tok-p">()</span>
        <span class="tok-nb">require</span><span class="tok-p">(</span><span class="tok-s2">&quot;mini.files&quot;</span><span class="tok-p">).</span><span class="tok-n">open</span><span class="tok-p">(</span><span class="tok-n">LazyVim</span><span class="tok-p">.</span><span class="tok-n">root</span><span class="tok-p">(),</span> <span class="tok-kc">true</span><span class="tok-p">)</span>
      <span class="tok-kr">end</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Open mini.files (root)&quot;</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>I constructed this by pulling relevant function calls from the default
configuration for the Telescope find files and Neo-tree plugins conveniently
provided on the LazyVim website.</p></div> <div class="paragraph"><p>To satisfy the contract with Lazy.nvim, we need to return a Lua table, wrapped
in curly braces. Lua tables can act like an array and a dictionary at the same
time. In this case, the first element in the table is the string
<code>&quot;echasnovski/mini.files&quot;</code>. It doesn’t have a named key, so it’s kind of like a
“positional argument”.</p></div> <div class="paragraph"><p>The second element in the table is more like a “named argument” in that it is
indexed with the name <code>keys</code>, and the value is another Lua table. However, that
second table acts more like an “array” of three values (three more separate Lua
tables) because it doesn’t have named indices.</p></div> <div class="paragraph"><p>It is important to understand that the <code>keys</code> field is <strong>merged</strong> with the keys
that are provided by the default LazyVim (extras) configuration for
mini.files. If there are conflicts (such as with <code>&lt;space&gt;fm</code>), my values take
precedence over the defaults.</p></div> <div class="paragraph"><p>This is a powerful feature of LazyVim that allows you to use hosted
configuration provided by LazyVim but override it as needed. Older Neovim
distros tended not to have this much flexibility, so you were either stuck with
their configuration or had to copy the whole thing and edit it, which made
updates a nightmare.</p></div> <div class="paragraph"><p>To be clear, <code>keys</code> is a LazyVim concept (technically, it’s actually part of
the underlying Lazy.nvim plugin manager). Any plugin configuration can have a
<code>keys</code> array table, and those keybindings will be merged with the default Neovim
keybindings, the LazyVim keybindings, your custom global keybindings, AND any
other plugin keybindings.</p></div> <div class="paragraph"><p>Yes, that’s a lot of potential for conflicts, which is why I’m so glad LazyVim
has done most of the configuration for me!</p></div> <div class="sect3"><h4 id="_structure_of_a_keys_entry"><a class="link" href="#_structure_of_a_keys_entry">5.4.1. Structure of a Keys Entry</a></h4> <div class="paragraph"><p>Each item in the <code>keys</code> table is another Lua table with (in this case) three
fields. The first two fields are positional and represent the keybinding name
and the Lua callback function that gets called whenever that keybinding is
invoked. The third field is a named field, <code>desc</code> and provides a string
description that will be shown in the Space mode menu.</p></div> <div class="paragraph"><p>The keybinding sequence in the first entry is using a standard syntax that
comes from Vim. Note that <code>&lt;leader&gt;</code> is an old Vim concept that allows you to
configure which key is used as the prefix for custom keybindings. In LazyVim
(and indeed, for most modern Neovim users), the leader is <code>&lt;Space&gt;</code>. Special
keys are indicated to Vim’s keybinding engine using angle brackets, so you will
often see notations such as <code>&lt;Space&gt;</code>, <code>&lt;Right&gt;</code>, <code>&lt;Left&gt;</code> or <code>&lt;BS&gt;</code>.</p></div> <div class="paragraph"><p>After the <code>&lt;leader&gt;</code> string, we include any additional keys that need to be
pressed. For the simple ones, we have <code>e</code> and <code>E</code> to replace the Neo-tree
keybindings we disabled with new mini.files keybindings. The third one is a
bit more complicated, as the <code>f</code> indicates that this action will be available
under the <code>file/find</code> submenu in Space mode, and the <code>m</code> indicates which letter
will be in this menu.</p></div> <div class="paragraph"><p>For the callbacks, we use Lua functions, which always start with <code>function</code> and
end with <code>end</code>. These are anonymous (unnamed) functions, and they don’t accept
any parameters inside the parentheses. In the function bodies, we call specific
code to <em>open</em> mini.files the way we want. In two cases I just copied this code
from LazyVim’s default mini.files configuration, and in the third, I cobbled it
together by combining code from the Neo-tree and mini.files configurations. The
LazyVim global is a handy library with a collection of utility functions to
aid with configuration. The <code>LazyVim.root</code> function is used to find the root of
a project and returns a string that we pass to <code>mini.files.open</code>.</p></div></div> <div class="sect3"><h4 id="_customizing_mini_files_options"><a class="link" href="#_customizing_mini_files_options">5.4.2. Customizing Mini.files Options</a></h4> <div class="paragraph"><p>As I mentioned, the <code>keys</code> table is merged with the default <code>keys</code> table that
LazyVim has configured for mini.files. Similarly, most Neovim plugins can be
configured with an <code>opts</code> table that contains custom configuration specific to
that plugin. If you supply an opts <code>table</code>, it will be <em>merged</em> with the
default LazyVim one (if there is one).</p></div> <div class="paragraph"><p>You’ll need to read each plugin’s documentation (often available on Github, and
usually available with <code>:help plugin-name</code>) to know exactly what options are
available for it. You’ll also need to review the default configuration that
LazyVim sets up for that plugin so you understand how it will merge.</p></div> <div class="paragraph"><p>In my case, I pass the following <code>opts</code> array to mini.files:</p></div> <div class="listingblock"><div class="title">Listing 14. Mini.files Custom Opts</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-s2">&quot;echasnovski/mini.files&quot;</span><span class="tok-p">,</span>
  <span class="tok-n">keys</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-c1">-- the keybindings from above</span>
  <span class="tok-p">},</span>
  <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-n">mappings</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-n">go_in</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;&lt;Right&gt;&quot;</span><span class="tok-p">,</span>
      <span class="tok-n">go_out</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;&lt;Left&gt;&quot;</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
    <span class="tok-n">windows</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-n">width_nofocus</span> <span class="tok-o">=</span> <span class="tok-mi">20</span><span class="tok-p">,</span>
      <span class="tok-n">width_focus</span> <span class="tok-o">=</span> <span class="tok-mi">50</span><span class="tok-p">,</span>
      <span class="tok-n">width_preview</span> <span class="tok-o">=</span> <span class="tok-mi">100</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
    <span class="tok-n">options</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-n">use_as_default_explorer</span> <span class="tok-o">=</span> <span class="tok-kc">true</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>The mappings table in mini.files is used to override the default keymappings
that are active <em>while</em> the mini.files view is open. This is different from
the <em>global</em> keymaps we defined earlier to open mini.files. In my case, I
have mapped <code>go_in</code> and <code>go_out</code> to use the arrow keys instead of <code>h</code> and <code>l</code>
because of the left-handed Dvorak Kinesis weirdness I described previously. I
don’t recommend you make this change; <code>h</code> and <code>l</code> will work better for most
anybody who isn’t me.</p></div> <div class="paragraph"><p>The window options are there because I have a 32-inch 6k monitor, which means I can
afford to have larger-than-normal explorer columns. Refer to  <code>:help mini.files</code>
for more information on these and other options.</p></div> <div class="paragraph"><p>So now you know a little bit about configuring plugins in LazyVim. It is both a
little bit easier and a little bit harder than configuring plugins from
scratch:</p></div> <div class="ulist"><ul><li><p>It is easier because you only need to change the values that are non-default,
instead of setting up an entire configuration, and LazyVim comes with sane
defaults.</p></li> <li><p>But it is harder because you sometimes have to think about how the option and
keybinding merging happens, which wouldn’t be necessary if you just had one
great big configuration object to begin with. This merging can get quite
tricky for plugins that have complicated default LazyVim configurations. We’ll
see some examples later.</p></li></ul></div></div></div> <div class="sect2"><h3 id="_modifying_existing_options"><a class="link" href="#_modifying_existing_options">5.5. Modifying Existing Options</a></h3> <div class="paragraph"><p>Sometimes the “merging” behaviour LazyVim uses to overwrite options with the
ones you provide in your plugin overrides is too simplistic. This most often
happens when you are modifying a plugin that calls or defines a function for
options behaviour instead of customizing it.</p></div> <div class="paragraph"><p>To support this situation, the <code>opts</code> entry in a Lazy.nvim plugin’s
configuration table can be a function instead of a static table. The function
accepts the previous <code>opts</code> table as it was configured by LazyVim as an
argument. Your function needs to <em>modify</em> this table to suit your desired
behaviour.</p></div> <div class="admonitionblock caution"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-solid:fire-flame-curved"></iconify-icon></td> <td class="content">The function based version of <code>opts</code> <strong>does not</strong> return a new <code>opts</code>
table; it needs to <strong>modify</strong> the one that was passed in.</td></tr></tbody></table></div> <div class="paragraph"><p>For example, the default LazyVim configuration for the <code>nvim-cmp</code> plugin is a
pretty long and complicated function. The <code>nvim-cmp</code> plugin is responsible for
the completion pop-up menu that provides suggestions as you type. It is an
insanely useful feature, but I don’t like that by default (in LazyVim),
selecting a completion is done with an <code>Enter</code> keypress. This drives me nuts
when editing book content because I press enter for new lines all the time,
often ignoring the pop-up.</p></div> <div class="paragraph"><p>There are a couple recipes for modifying this behaviour in the LazyVim docs,
and other recipes you can try in the <code>nvim-cmp</code> README. In my case, I’ve
configured it as follows:</p></div> <div class="listingblock"><div class="title">Listing 15. <code>nvim-cmp</code> Options Function</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-p">{</span>
    <span class="tok-s2">&quot;hrsh7th/nvim-cmp&quot;</span><span class="tok-p">,</span>
    <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-kr">function</span><span class="tok-p">(</span><span class="tok-n">_</span><span class="tok-p">,</span> <span class="tok-n">opts</span><span class="tok-p">)</span>
      <span class="tok-kd">local</span> <span class="tok-n">cmp</span> <span class="tok-o">=</span> <span class="tok-nb">require</span><span class="tok-p">(</span><span class="tok-s2">&quot;cmp&quot;</span><span class="tok-p">)</span>
      <span class="tok-n">opts</span><span class="tok-p">.</span><span class="tok-n">mapping</span> <span class="tok-o">=</span> <span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">tbl_extend</span><span class="tok-p">(</span>
        <span class="tok-s2">&quot;force&quot;</span><span class="tok-p">,</span>
        <span class="tok-n">opts</span><span class="tok-p">.</span><span class="tok-n">mapping</span><span class="tok-p">,</span>
        <span class="tok-p">{</span>
          <span class="tok-p">[</span><span class="tok-s2">&quot;&lt;Right&gt;&quot;</span><span class="tok-p">]</span> <span class="tok-o">=</span> <span class="tok-n">cmp</span><span class="tok-p">.</span><span class="tok-n">mapping</span><span class="tok-p">.</span><span class="tok-n">confirm</span><span class="tok-p">({</span> <span class="tok-nb">select</span> <span class="tok-o">=</span> <span class="tok-kc">true</span> <span class="tok-p">}),</span>
          <span class="tok-p">[</span><span class="tok-s2">&quot;&lt;CR&gt;&quot;</span><span class="tok-p">]</span> <span class="tok-o">=</span> <span class="tok-kr">function</span><span class="tok-p">(</span><span class="tok-n">fallback</span><span class="tok-p">)</span> <span class="tok-n">cmp</span><span class="tok-p">.</span><span class="tok-n">abort</span><span class="tok-p">()</span> <span class="tok-n">fallback</span><span class="tok-p">()</span> <span class="tok-kr">end</span><span class="tok-p">,</span>
        <span class="tok-p">}</span>
      <span class="tok-p">)</span>
    <span class="tok-kr">end</span><span class="tok-p">,</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>This <code>opts</code> function accepts the LazyVim-defined <code>opts</code> table as its second
parameter. My code changes those <code>opts</code> using the <code>tbl_extend</code> function
provided by Neovim. I add a new <code>[&quot;&lt;Right&gt;&quot;]</code> key to accept the suggestion
(this matches fish shell behaviour) and overwrite the <code>&lt;CR&gt;</code> key with abort
completion behaviour.</p></div> <div class="paragraph"><p>This is harder to maintain than if I just had the whole configuration the way I
wanted it in the first place, but easier to maintain than if I had to write
that entire configuration from scratch. I am willing to accept that tradeoff
for all the places that LazyVim configures things better than I would have done
  on my own.</p></div></div> <div class="sect2"><h3 id="_installing_third_party_plugins"><a class="link" href="#_installing_third_party_plugins">5.6. Installing Third-Party Plugins</a></h3> <div class="paragraph"><p>Installing a third-party plugin is little different from configuring a LazyVim
provided plugin, except that you don’t have to worry about how the keys and
opts are merged with a default config.</p></div> <div class="paragraph"><p>Simply create a new Lua file in the <code>plugins</code> directory (named appropriately
for the plugin). Inside the file, return a Lua table where the first entry is
the GitHub repo and name of the plugin, with other configuration (<code>opts</code> and
<code>keys</code>, among others) after that name.</p></div> <div class="paragraph"><p>For example, I like the guess-indent.nvim plugin to set my shift width based
on the contents of the file I am currently editing. It is maintained by the
github user <code>nmac427</code>, so my <code>plugins/guess-indent.lua</code> file looks like this:</p></div> <div class="listingblock"><div class="title">Listing 16. Guess-indent.nvim Third Party Plugin</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-s2">&quot;nmac427/guess-indent.nvim&quot;</span><span class="tok-p">,</span>
  <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-n">auto_cmd</span> <span class="tok-o">=</span> <span class="tok-kc">true</span><span class="tok-p">,</span>
    <span class="tok-n">override_editorconfig</span> <span class="tok-o">=</span> <span class="tok-kc">true</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>The <code>opts</code> table depends entirely on what the plugin expects. In this case, I
read the guess-indent.nvim README and found two options that I wanted to set.</p></div> <div class="paragraph"><p>Most modern Lua plugins will be documented as having to call a <code>setup</code> function
with a Lua table containing the configuration. If the plugin you are trying to
set up does not have explicit Lazy.nvim instructions, don’t worry: Whatever
gets passed into that <code>setup</code> function is what you need to include in the
<code>opts</code> passed to the LazyVim plugin manager.</p></div> <div class="paragraph"><p>For example, another third-party plugin I recommend is
<code>chrisgrieser/nvim-spider</code>, which subtly changes the <code>w</code>, <code>e</code>, and <code>b</code> commands
to support navigating within CamelCase and snake_case words. I have a file
named <code>nvim-spider.lua</code> in my <code>plugins</code> directory as follows:</p></div> <div class="listingblock"><div class="title">Listing 17. <code>nvim-spider</code> Third Party Plugin</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-s2">&quot;chrisgrieser/nvim-spider&quot;</span><span class="tok-p">,</span>
  <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{},</span>
  <span class="tok-n">keys</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;w&quot;</span><span class="tok-p">,</span>
      <span class="tok-s2">&quot;&lt;cmd&gt;lua require(&#39;spider&#39;).motion(&#39;w&#39;)&lt;CR&gt;&quot;</span><span class="tok-p">,</span>
      <span class="tok-n">mode</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-s2">&quot;n&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;o&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;x&quot;</span> <span class="tok-p">},</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Move to start of next of word&quot;</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;e&quot;</span><span class="tok-p">,</span>
      <span class="tok-s2">&quot;&lt;cmd&gt;lua require(&#39;spider&#39;).motion(&#39;e&#39;)&lt;CR&gt;&quot;</span><span class="tok-p">,</span>
      <span class="tok-n">mode</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-s2">&quot;n&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;o&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;x&quot;</span> <span class="tok-p">},</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Move to end of word&quot;</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;b&quot;</span><span class="tok-p">,</span>
      <span class="tok-s2">&quot;&lt;cmd&gt;lua require(&#39;spider&#39;).motion(&#39;b&#39;)&lt;CR&gt;&quot;</span><span class="tok-p">,</span>
      <span class="tok-n">mode</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-s2">&quot;n&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;o&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;x&quot;</span> <span class="tok-p">},</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Move to start of previous word&quot;</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>This plugin doesn’t automatically set up keybindings, so I pass a
<code>keys =</code> table to the plugin configuration. This array is <strong>not</strong> passed to the
plugin. Rather, the keys are parsed by the Lazy.nvim plugin manager and added
to the global keybindings. It is convenient to keep the keys with the plugin so
all the configuration is in one place.</p></div> <div class="paragraph"><p>I am satisfied with the default options that <code>nvim-spider</code> passes to its
<code>setup</code> function (after reading the README), so I pass an empty <code>opts</code> array.</p></div> <div class="paragraph"><p>The best resource for finding third-party plugins is the github repository
<a href="https://github.com/rockerBOO/awesome-neovim">rockerBOO/awesome-neovim</a>. The
list is well-maintained and (most importantly) pruned regularly, so there are
few outdated or unmaintained plugins on the list.</p></div> <div class="paragraph"><p>In practice, LazyVim already ships with the best-in-class versions of most
plugins (built-in or as extras), so you won’t have to add too many. But if
you come across any “I wish LazyVim could…​” scenarios, the answer is probably
“it does and the plugin to do it is listed in the Awesome Neovim repo”.</p></div></div> <div class="sect2"><h3 id="_summary_5"><a class="link" href="#_summary_5">5.7. Summary</a></h3> <div class="paragraph"><p>In this chapter, we learned about how LazyVim integrates with the
wider Neovim plugin ecosystem. It provides sane default plugins and
configuration, but makes it easy to customize that configuration for your own
needs.</p></div> <div class="paragraph"><p>We learned that built-in, extras, and unknown third party plugins are all treated
slightly differently (though consistently), and saw examples of how to install
some third-party plugins.</p></div> <div class="paragraph"><p>Now that you know how to open files and configure plugins, we can get back to some
of the nuts and bolts of modal editing. You already know how to switch between
Normal and Insert mode and you can navigate around your code. In the next chapter,
we’ll cover some basic editing features that blur the line between navigating
and inserting text.</p></div></div></div>`;return{c(){s=c("div"),s.innerHTML=t,this.h()},l(a){s=d(a,"DIV",{class:!0,"data-svelte-h":!0}),r(s)!=="svelte-hqssy"&&(s.innerHTML=t),this.h()},h(){h(s,"class","sect1")},m(a,o){u(a,s,o)},p:e,i:e,o:e,d(a){a&&g(s)}}}class b extends p{constructor(s){super(),l(this,s,null,f,i,{})}}export{b as component,v as universal};
