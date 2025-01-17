import{s as p,n as e}from"../chunks/scheduler.seBsrkbn.js";import{S as i,i as c,e as l,c as r,l as d,m as u,g as h,d as g}from"../chunks/index.Dwxb9V0m.js";function k(){return{title:"Chapter 19: Comprehensive Guide to Plugin Configuration ",description:"Configuring plugins in LazyVim is usually trivial, but when it's not, it can take some digging to get it right.",keywords:"vim, lazyvim, neovim, tutorial, course, book, plugins, configuration"}}const y=Object.freeze(Object.defineProperty({__proto__:null,load:k},Symbol.toStringTag,{value:"Module"}));function v(o){let s,n=`<h2 id="_comprehensive_guide_to_lazyvim_configuration"><a class="link" href="#_comprehensive_guide_to_lazyvim_configuration">Chapter 19. Comprehensive Guide to LazyVim Configuration</a></h2> <div class="sectionbody"><div class="paragraph"><p>We covered basic plugin configuration in Chapter 5, and I’ve given details on
how to deal with more complicated situations when I needed them to configure a
specific plugin, but it’s scattered throughout the book.</p></div> <div class="paragraph"><p>This chapter will start with a bit of a review of all that and then attempt to
give you the tools you need to find and configure other Neovim plugins that are
not available as Lazy Extras.</p></div> <div class="sect2"><h3 id="_plugins_directory"><a class="link" href="#_plugins_directory">19.1. Plugins Directory</a></h3> <div class="paragraph"><p>As we covered in Chapter 5, plugins are managed by the Lazy.nvim plugin
manager. It is configured to automatically load any <code>.lua</code> file in your config
folder’s <code>lua/plugins</code> directory. Typically, this will be
<code>~/config/nvim/lua/plugins</code> where <code>~</code> is your home directory. However, if you
use the <code>NVIM_APPNAME</code> environment variable, then it will be
<code>~/.config/$NVIM_APPNAME/lua/plugins</code>.</p></div> <div class="paragraph"><p>Lua files in this directory should always return a Lua table. Therefore, they
will be structured like this:</p></div> <div class="listingblock"><div class="title">Listing 74. Empty Plugin</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>

<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>This Lua table can contain either a plugin specification or a table containing
multiple plugin specifications in their own Lua table. For example,
the structure will either be:</p></div> <div class="listingblock"><div class="title">Listing 75. Basic Single Plugin</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-s2">&quot;username/plugin&quot;</span><span class="tok-p">,</span>
  <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{...},</span>
  <span class="tok-n">keys</span> <span class="tok-o">=</span> <span class="tok-p">{...}</span>
  <span class="tok-p">...</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>for a single plugin specification, or:</p></div> <div class="listingblock"><div class="title">Listing 76. Multiple Plugins in One File</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-p">{</span>
    <span class="tok-s2">&quot;username/plugin&quot;</span><span class="tok-p">,</span>
    <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{...},</span>
    <span class="tok-n">keys</span> <span class="tok-o">=</span> <span class="tok-p">{...}</span>
  <span class="tok-p">},</span>
  <span class="tok-p">{</span>
    <span class="tok-s2">&quot;username2/plugin2&quot;</span><span class="tok-p">,</span>
    <span class="tok-p">...</span>
  <span class="tok-p">}</span>

<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>Personally, I usually place each plugin in its own file so they are easy to
search for when I use the <code>&lt;Space&gt;fc</code> shortcut. However, I do use the multiple
plugin format when the existence of one plugin requires me to modify the
configuration of another.</p></div></div> <div class="sect2"><h3 id="_plugin_specifications_cascade"><a class="link" href="#_plugin_specifications_cascade">19.2. Plugin Specifications Cascade</a></h3> <div class="paragraph"><p>Any one plugin can be specified multiple times in your configuration and
LazyVim will merge everything together. There are a few cases
where this is useful:</p></div> <div class="ulist"><ul><li><p>Some people like to configure keybindings in a separate area from the plugin
options and configuration.</p></li> <li><p>Sometimes you want your primary plugin configuration to be in one file, and
then have a second, related plugin configure some overrides for that plugin.</p></li> <li><p>(Most Common) LazyVim pre-configures many plugins with sensible defaults, but
you will occasionally want to override those defaults with your preferred
keybindings or options.</p></li></ul></div></div> <div class="sect2"><h3 id="_plugin_specification"><a class="link" href="#_plugin_specification">19.3. Plugin Specification</a></h3> <div class="paragraph"><p>The simplest plugin specification is just a table containing a single string
with the GitHub username and repo separated by a <code>/</code>. Occasionally, this is all
you need, especially for VimScript plugins. If the plugin in question isn’t
hosted on GitHub, you can omit this first argument and pass either
<code>dir=/path/to/a/folder</code> or <code>url=https://domain.com/path/to/plugin</code>.</p></div> <div class="paragraph"><p>If you need to pin your plugin to a specific version or git branch, you can
pass the <code>branch</code>, <code>tag</code>, <code>commit</code>, or <code>version</code>. For GitHub-hosted plugins,
you can find the values for these version specifiers on GitHub. You will likely
use this only rarely, as it is normal to install the <code>main</code> branch of the
plugin. But if you know that a recent change in a plugin is causing issues for
you, or if you want to try out some bleeding edge feature that hasn’t been
merged yet, you’ll want to set one of these.</p></div> <div class="paragraph"><p>There are almost two dozen options you can pass to a Lazy.nvim plugin
specification, all documented at <a href="https://lazy.folke.io/spec" class="bare">https://lazy.folke.io/spec</a>. We discussed
some of them in Chapter 5, namely <code>enabled</code>, <code>opts</code>, and <code>keys</code>. Now we’ll
touch on several of the others.</p></div></div> <div class="sect2"><h3 id="_plugin_lifecycle_methods"><a class="link" href="#_plugin_lifecycle_methods">19.4. Plugin Lifecycle Methods</a></h3> <div class="paragraph"><p>There are several options that are invoked at various times during the lifecycle
of a plugin. You only need to specify these rarely, but they can be very useful
to control when code executes, especially if you are trying to port “raw config”
installation instructions to Lazy.nvim config.</p></div> <div class="sect3"><h4 id="_build"><a class="link" href="#_build">19.4.1. Build</a></h4> <div class="paragraph"><p>The <code>build</code> option is called once when the plugin is installed or updated, and
is not called during the normal startup or execution of Neovim. We saw an
example of it in the <code>smart-splits</code> configuration in chapter 9. In that
example, we passed a string path to a shell script that ships with the plugin.
Every time the plugin is installed or upgraded, that build command is run,
ensuring that the relevant Kitty scripts are installed. In addition to a string
pathname, <code>build</code> can also be a:</p></div> <div class="ulist"><ul><li><p>Lua function that accepts the plugin spec as its only argument.</p></li> <li><p>path to an arbitrary Lua file.</p></li> <li><p>the string “rockspec”, which will build a <code>luarocks</code> package. Luarocks is a
package manager and index for Lua modules not unlike pypi, npm, or crates in
the Python, Javascript, and Rust ecosystems respectively.</p></li> <li><p>string starting with <code>:</code>, which will execute an arbitrary Vim command.</p></li> <li><p>list of one or more of the above.</p></li></ul></div> <div class="paragraph"><p>As a plugin consumer, you will likely only specify the <code>build</code> function if the
plugin’s documentation instructs you to do so.</p></div></div> <div class="sect3"><h4 id="_init"><a class="link" href="#_init">19.4.2. Init</a></h4> <div class="paragraph"><p>The <code>init</code> option is executed during program startup, so to keep the
startup time short, it’s best to avoid it unless absolutely necessary. It
accepts a Lua function with a single argument holding any specs for that
plugin. (Specifically, it is an instance of
<a href="https://github.com/folke/lazy.nvim/blob/main/lua/lazy/types.lua">LazyPlugin</a>).</p></div> <div class="paragraph"><p>I’ve never actually had to specify <code>init</code> in any of my plugin configurations.
Typically, if I need the plugin to execute at startup, I use <code>lazy=false</code> so it
configures the whole thing on startup. I can see <code>init</code> being helpful if there
are legitimate two-step setups, but in my experience, all of those are in
plugins that LazyVim is managing on my behalf, so I’ve never needed it.</p></div></div> <div class="sect3"><h4 id="_config"><a class="link" href="#_config">19.4.3. Config</a></h4> <div class="paragraph"><p>The <code>config</code> option is the one you are most likely to specify, but try
to only reach for it if you’ve run out of other options. It is called
whenever the plugin is loaded, which may be on startup, or only when it
is first used, depending on how it is configured.</p></div> <div class="paragraph"><p>The first thing you need to understand about <code>config</code> is its default behaviour
if you don’t specify it.</p></div> <div class="paragraph"><p>There is a de facto standard in Lua-based plugins of providing a <code>setup</code>
function that accepts a single argument which is a table of options for that
plugin. The vast majority of plugins you encounter will have instructions
in their README to write code something like this:</p></div> <div class="listingblock"><div class="title">Listing 77. Non-LazyVim Setup Call</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-nb">require</span><span class="tok-p">(</span><span class="tok-s1">&#39;pluginName&#39;</span><span class="tok-p">).</span><span class="tok-n">setup</span><span class="tok-p">({</span><span class="tok-n">key</span> <span class="tok-o">=</span> <span class="tok-n">value</span><span class="tok-p">,</span> <span class="tok-n">key2</span> <span class="tok-o">=</span> <span class="tok-n">value2</span><span class="tok-p">...})</span></code></pre></div></div> <div class="paragraph"><p>They’ll tell you to put this in your <code>init.lua</code>. These are good instructions
if you’re not using Lazy.nvim, but it’s not for us.</p></div> <div class="paragraph"><p>The default <code>config</code> function that Lazy.nvim provides invokes this code
automatically if your spec contains any <code>opts</code>. So the above code should
always be ported to something like this:</p></div> <div class="listingblock"><div class="title">Listing 78. LazyVim Options</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-s1">&#39;username/plugin&#39;</span><span class="tok-p">,</span>
  <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{</span><span class="tok-n">key</span> <span class="tok-o">=</span> <span class="tok-n">value</span><span class="tok-p">,</span> <span class="tok-n">key2</span> <span class="tok-o">=</span> <span class="tok-n">value2</span><span class="tok-p">}</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>Under the hood, if you supply <code>opts</code> in the plugin spec, the <code>config</code> function
will call the <code>.setup</code> code for you.</p></div> <div class="paragraph"><p>This is a wonderful thing because LazyVim does automatic merging of <code>opts</code>
tables if you provided multiple specs for the same plugin in different places.
If you override <code>config</code>, you won’t so easily be able to take advantage of this
merging behaviour.</p></div> <div class="paragraph"><p>However, if the plugin you are configuring is non-standard or requires you to
run additional code when it is starting up, you’ll need to specify <code>config</code>
yourself.</p></div> <div class="paragraph"><p>The <code>config</code> function is always a Lua function that accepts two arguments. The
first is the same <code>LazyPlugin</code> spec that <code>init</code> receives. The second is the
table of <code>opts</code> that Lazy.nvim has created for you, possibly by merging opts
from multiple definitions.</p></div> <div class="paragraph"><p>The main place where this becomes a problem is when you want to customize the
default LazyVim configuration for a plugin and that default configuration
overrides config.</p></div> <div class="paragraph"><p>Unlike with <code>opts</code> and <code>keys</code>, only one <code>config</code> function is called (the last
one loaded). So if you specify <code>config</code> for a plugin, the LazyVim one will not
execute.</p></div> <div class="paragraph"><p>Typically, these overridden configs can be modified with judicious use of
<code>opts</code> or <code>keys</code>, but if you need to do imperative tasks that differ from
whatever LazyVim provides, there’s a good chance you’ll be copying the entire
configuration for that plugin from the <a href="https://lazyvim.org" class="bare">https://lazyvim.org</a> website into your
personal config.</p></div> <div class="paragraph"><p>While that’s not a great outcome, it’s still better than if you didn’t use
LazyVim at all, because then you’d have to write the entire configuration from
scratch instead of copying and modifying a trusted source.</p></div></div></div> <div class="sect2"><h3 id="_modifying_options_in_place"><a class="link" href="#_modifying_options_in_place">19.5. Modifying Options In-place</a></h3> <div class="paragraph"><p>The “merging” that LazyVim does on <code>opts</code> if you supply a table may not always
do the right thing, especially with nested tables or if you want to remove,
instead of add, a key. Sometimes it is better to specify opts as a Lua
function that takes the existing <code>opts</code> as input and modifies it in place. A
great example of this is the LazyVim
<a href="https://www.lazyvim.org/configuration/recipes">recipe</a> for adding a <code>nvim-cmp</code>
source:</p></div> <div class="listingblock"><div class="title">Listing 79. Modifying Options With Function</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-p">{</span>
  <span class="tok-s2">&quot;hrsh7th/nvim-cmp&quot;</span><span class="tok-p">,</span>
  <span class="tok-n">dependencies</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-s2">&quot;hrsh7th/cmp-emoji&quot;</span> <span class="tok-p">},</span>
  <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-kr">function</span><span class="tok-p">(</span><span class="tok-n">_</span><span class="tok-p">,</span> <span class="tok-n">opts</span><span class="tok-p">)</span>
    <span class="tok-nb">table.insert</span><span class="tok-p">(</span><span class="tok-n">opts</span><span class="tok-p">.</span><span class="tok-n">sources</span><span class="tok-p">,</span> <span class="tok-p">{</span> <span class="tok-n">name</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;emoji&quot;</span> <span class="tok-p">})</span>
  <span class="tok-kr">end</span><span class="tok-p">,</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>Here, <code>opts</code> is specified as a function that takes two arguments, and we modify
the second one, which is the Lua table LazyVim is building to pass into
<code>config</code>. In the case of <code>nvim-cmp</code> the LazyVim spec does not override config,
so those opts will be passed to the default <code>config</code>
which calls <code>require(&#39;nvim-cmp).setup(opts)</code>.</p></div></div> <div class="sect2"><h3 id="_complex_plugin_example_telescope_live_grep_args"><a class="link" href="#_complex_plugin_example_telescope_live_grep_args">19.6. Complex Plugin Example: Telescope-live-grep-args</a></h3> <div class="paragraph"><p>LazyVim’s plugin abstractions are usually very elegant, but occasionally can
get in the way. I wanted to include a complicated example in the hopes it will
help you navigate the hairier situations.</p></div> <div class="paragraph"><p>The Telescope <code>live_grep</code> integration that ships with LazyVim doesn’t allow us
to pass arguments to ripgrep by default. However, there is a
<code>telescope-live-grep-args</code> extension that does permit customizing the ripgrep
arguments.</p></div> <div class="paragraph"><p>Start by visiting the
<a href="https://github.com/nvim-telescope/telescope-live-grep-args.nvim">telescope-live-grep-args.nvim</a>
repository. You’ll find installation instructions for Lazy.nvim (that’s the
plugin manager, NOT the LazyVim distro itself) that, at time of writing look
like this:</p></div> <div class="listingblock"><div class="title">Listing 80. Incorrect Configuration for Telescope Plugin</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-c1">-- This is not helpful with LazyVim</span>
<span class="tok-n">use</span> <span class="tok-p">{</span>
  <span class="tok-s2">&quot;nvim-telescope/telescope.nvim&quot;</span><span class="tok-p">,</span>
  <span class="tok-n">dependencies</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-p">{</span>
        <span class="tok-s2">&quot;nvim-telescope/telescope-live-grep-args.nvim&quot;</span> <span class="tok-p">,</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
  <span class="tok-n">config</span> <span class="tok-o">=</span> <span class="tok-kr">function</span><span class="tok-p">()</span>
    <span class="tok-nb">require</span><span class="tok-p">(</span><span class="tok-s2">&quot;telescope&quot;</span><span class="tok-p">).</span><span class="tok-n">load_extension</span><span class="tok-p">(</span><span class="tok-s2">&quot;live_grep_args&quot;</span><span class="tok-p">)</span>
  <span class="tok-kr">end</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>The reason I added the “not helpful” comment there is the call to <code>config</code>.
LazyVim already configures Telescope with a fairly complex function that you
can find under the <code>editor</code> section of the plugins menu on the LazyVim website
(click the <code>Full spec</code>) tab.</p></div> <div class="paragraph"><p>For the most part, LazyVim does a good job of merging its own defaults with any
customizations you do with the various plugins it sets up. It’s easy to change
or remove keybindings or override the options that get passed into a <code>setup</code>
function, for example.</p></div> <div class="paragraph"><p>But it’s not easy to override <code>config</code>.</p></div> <div class="paragraph"><p>You <em>could</em> do something like this:</p></div> <div class="listingblock"><div class="title">Listing 81. Another Incorrect Configuration for Telescope Plugin</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-n">config</span> <span class="tok-o">=</span> <span class="tok-kr">function</span><span class="tok-p">(</span><span class="tok-n">_</span><span class="tok-p">,</span> <span class="tok-n">opts</span><span class="tok-p">)</span>
  <span class="tok-nb">require</span><span class="tok-p">(</span><span class="tok-s2">&quot;telescope&quot;</span><span class="tok-p">).</span><span class="tok-n">setup</span><span class="tok-p">(</span><span class="tok-n">opts</span><span class="tok-p">)</span>
  <span class="tok-nb">require</span><span class="tok-p">(</span><span class="tok-s2">&quot;telescope&quot;</span><span class="tok-p">).</span><span class="tok-n">load_extension</span><span class="tok-p">(</span><span class="tok-s2">&quot;live_grep_args&quot;</span><span class="tok-p">)</span>

<span class="tok-kr">end</span></code></pre></div></div> <div class="paragraph"><p>This works because the default behaviour of <code>config</code> in Lazy.nvim is to call
<code>require(&lt;the_plugin&gt;).setup(opts)</code>. So we’re basically copying the contents of
that function into our custom function. But if LazyVim happened to have a very
complicated <code>config</code> for Telescope, you would have to copy the whole thing in,
and it would eventually get out of date with any changes that LazyVim makes in
the future. That wouldn’t be fun for you to maintain. More importantly, it
runs a very real risk of clobbering any Telescope-related changes that LazyVim
makes with other plugins or extras.</p></div> <div class="paragraph"><p>In general, I try very hard to avoid implementing <code>config</code> when overriding
LazyVim’s defaults. It’s fine to have a custom implementation of <code>config</code> if I
am adding a new plugin that LazyVim isn’t aware of, since I’m already
responsible for maintaining it. But when I’m <em>customizing</em> plugins, I try not
to override <code>config</code>.</p></div> <div class="paragraph"><p>The secret (in this case) is to use the “dependencies” feature of Lazy.nvim.
The “Full Spec” on the LazyVim website has an example of how to set up the
telescope-fzf-native.nvim extension, which looks something
like this</p></div> <div class="listingblock"><div class="title">Listing 82. How LazyVim Configures Telescope-fzf-native</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span>  <span class="tok-n">dependencies</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;nvim-telescope/telescope-fzf-native.nvim&quot;</span><span class="tok-p">,</span>
      <span class="tok-c1">-- snipped some build instructions</span>
      <span class="tok-n">config</span> <span class="tok-o">=</span> <span class="tok-kr">function</span><span class="tok-p">()</span>
        <span class="tok-n">LazyVim</span><span class="tok-p">.</span><span class="tok-n">on_load</span><span class="tok-p">(</span><span class="tok-s2">&quot;telescope.nvim&quot;</span><span class="tok-p">,</span> <span class="tok-kr">function</span><span class="tok-p">()</span>
          <span class="tok-c1">-- snipped loading the extension</span>
        <span class="tok-kr">end</span><span class="tok-p">)</span>
      <span class="tok-kr">end</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span></code></pre></div></div> <div class="paragraph"><p>This is showing us how to have a mini-config for a dependent plugin, which is
<em>exactly</em> what we want. Further, if we customize our spec, <code>dependencies</code> is
one of the tables that Lazy.nvim will <em>merge</em> with the parent spec (the one
created by LazyVim). So we <strong>don’t</strong> need to copy the above code into our
Telescope extension file so it doesn’t get clobbered. Instead we only need to
create a single new table.</p></div> <div class="paragraph"><p>Here’s the configuration (I put it in <code>extend-telescope.lua</code>):</p></div> <div class="listingblock"><div class="title">Listing 83. Correct Configuuration for Telescope Plugin</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-p">{</span> <span class="tok-s2">&quot;nvim-telescope/telescope-live-grep-args.nvim&quot;</span> <span class="tok-p">},</span>
  <span class="tok-p">{</span>
    <span class="tok-s2">&quot;nvim-telescope/telescope.nvim&quot;</span><span class="tok-p">,</span>
    <span class="tok-n">dependencies</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-p">{</span>
        <span class="tok-s2">&quot;nvim-telescope/telescope-live-grep-args.nvim&quot;</span><span class="tok-p">,</span>
        <span class="tok-n">config</span> <span class="tok-o">=</span> <span class="tok-kr">function</span><span class="tok-p">()</span>
          <span class="tok-n">LazyVim</span><span class="tok-p">.</span><span class="tok-n">on_load</span><span class="tok-p">(</span><span class="tok-s2">&quot;telescope.nvim&quot;</span><span class="tok-p">,</span> <span class="tok-kr">function</span><span class="tok-p">()</span>
            <span class="tok-nb">require</span><span class="tok-p">(</span>
              <span class="tok-s2">&quot;telescope&quot;</span>
            <span class="tok-p">).</span><span class="tok-n">load_extension</span><span class="tok-p">(</span><span class="tok-s2">&quot;live_grep_args&quot;</span><span class="tok-p">)</span>
          <span class="tok-kr">end</span><span class="tok-p">)</span>
        <span class="tok-kr">end</span><span class="tok-p">,</span>
      <span class="tok-p">},</span>
    <span class="tok-p">},</span>
  <span class="tok-p">}</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>It’s kind of verbose, but this should be all you need to enable the plugin.</p></div> <div class="paragraph"><p>Next, you need to set up a keybinding to invoke the plugin. You can choose to
override the existing <code>&lt;Space&gt;/</code> keybinding, or perhaps you would use
<code>&lt;Space&gt;?</code> if you want to have separate “default live_grep” and
“live_grep_args” mode.</p></div> <div class="paragraph"><p>Your first attempt, if you are following the live-grep-args README might look
like this:</p></div> <div class="listingblock"><div class="title">Listing 84. Incorrect configuration for Live Grep Args</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-c1">-- This won&#39;t work</span>
<span class="tok-n">keys</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
  <span class="tok-p">{</span>
    <span class="tok-s2">&quot;&lt;leader&gt;/&quot;</span><span class="tok-p">,</span>
    <span class="tok-nb">require</span><span class="tok-p">(</span>
      <span class="tok-s2">&quot;telescope&quot;</span>
    <span class="tok-p">).</span><span class="tok-n">extensions</span><span class="tok-p">.</span><span class="tok-n">live_grep_args</span><span class="tok-p">.</span><span class="tok-n">live_grep_args</span><span class="tok-p">,</span>
    <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Grep with Args&quot;</span><span class="tok-p">,</span>
  <span class="tok-p">},</span>
<span class="tok-p">},</span></code></pre></div></div> <div class="paragraph"><p>Unfortunately, this is too easy for LazyVim. Because the <code>live_grep_args</code>
plugin has been set up to run in a <code>LazyVim.on_load</code>, it is not defined at the
time this keys array is created.</p></div> <div class="paragraph"><p>The solution is to wrap the call in another function, so the import only
happens after you press the keybinding. That works because the <code>onLoad</code> handler
will have been called by that point:</p></div> <div class="listingblock"><div class="title">Listing 85. Correct Configuration for Live Grep Args</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-n">keys</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
  <span class="tok-c1">-- Other telescope-related keybindings</span>
  <span class="tok-p">{</span>
    <span class="tok-s2">&quot;&lt;leader&gt;/&quot;</span><span class="tok-p">,</span>
    <span class="tok-kr">function</span><span class="tok-p">()</span>
      <span class="tok-nb">require</span><span class="tok-p">(</span>
        <span class="tok-s2">&quot;telescope&quot;</span>
      <span class="tok-p">).</span><span class="tok-n">extensions</span><span class="tok-p">.</span><span class="tok-n">live_grep_args</span><span class="tok-p">.</span><span class="tok-n">live_grep_args</span><span class="tok-p">()</span>
    <span class="tok-kr">end</span><span class="tok-p">,</span>
    <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Grep with Args (root dir)&quot;</span><span class="tok-p">,</span>
  <span class="tok-p">},</span>
<span class="tok-p">},</span></code></pre></div></div> <div class="paragraph"><p>Before we move on to actually <strong>using</strong> the live-grep-args plugin, there is one
more place you need to apply this weird nested function calls trick.
Telescope-live-grep-args suggests hooking up <code>ctrl-k</code> to the <code>quote_prompt()</code>
action, like so:</p></div> <div class="listingblock"><div class="title">Listing 86. Incorrect Configuration for Live Grep Args Keymaps</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-c1">-- Don&#39;t do this</span>
<span class="tok-kd">local</span> <span class="tok-n">lga_actions</span> <span class="tok-o">=</span> <span class="tok-nb">require</span><span class="tok-p">(</span><span class="tok-s2">&quot;telescope-live-grep-args.actions&quot;</span><span class="tok-p">)</span>
<span class="tok-n">telescope</span><span class="tok-p">.</span><span class="tok-n">setup</span> <span class="tok-p">{</span>
  <span class="tok-n">extensions</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-n">live_grep_args</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-n">mappings</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-c1">-- extend mappings</span>
        <span class="tok-n">i</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
          <span class="tok-p">[</span><span class="tok-s2">&quot;&lt;C-k&gt;&quot;</span><span class="tok-p">]</span> <span class="tok-o">=</span> <span class="tok-n">lga_actions</span><span class="tok-p">.</span><span class="tok-n">quote_prompt</span><span class="tok-p">(),</span>
        <span class="tok-p">},</span>
      <span class="tok-p">},</span>
    <span class="tok-p">}</span>
  <span class="tok-p">}</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>The table passed into <code>setup</code> there just comes from our <code>opts</code> array, but we
again need to avoid importing <code>telescope-live-grep-args</code> at the top-level like
that. Instead, we need a new function. But there are a couple gotchas:</p></div> <div class="ulist"><ul><li><p><code>quote_prompt()</code> is a function that returns a different function. So we need
to invoke that function with a odd-looking <code>()()</code> syntax.</p></li> <li><p>Telescope mappings accept an integer argument (the internal id of the picker),
so we need to forward that to the called function.</p></li></ul></div> <div class="paragraph"><p>The resulting <code>opts</code> array looks like this:</p></div> <div class="listingblock"><div class="title">Listing 87. Correct Configuration For Live Grep Args Keymaps</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-n">extensions</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-n">live_grep_args</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
        <span class="tok-n">mappings</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
          <span class="tok-n">i</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
            <span class="tok-p">[</span><span class="tok-s2">&quot;&lt;C-k&gt;&quot;</span><span class="tok-p">]</span> <span class="tok-o">=</span> <span class="tok-kr">function</span><span class="tok-p">(</span><span class="tok-n">picker</span><span class="tok-p">)</span>
              <span class="tok-nb">require</span><span class="tok-p">(</span>
                <span class="tok-s2">&quot;telescope-live-grep-args.actions&quot;</span>
              <span class="tok-p">).</span><span class="tok-n">quote_prompt</span><span class="tok-p">()(</span><span class="tok-n">picker</span><span class="tok-p">)</span>
            <span class="tok-kr">end</span><span class="tok-p">,</span>
          <span class="tok-p">},</span>
        <span class="tok-p">},</span>
      <span class="tok-p">},</span>
    <span class="tok-p">},</span>
  <span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>For completeness (and because all the above snippets on their own may not make
indentational sense), here is my entire Telescope configuration:</p></div> <div class="listingblock"><div class="title">Listing 88. Complete Configuration for Live Grep Args</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-p">{</span> <span class="tok-s2">&quot;nvim-telescope/telescope-live-grep-args.nvim&quot;</span> <span class="tok-p">},</span>
  <span class="tok-p">{</span>
    <span class="tok-s2">&quot;nvim-telescope/telescope.nvim&quot;</span><span class="tok-p">,</span>
    <span class="tok-n">dependencies</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-p">{</span>
        <span class="tok-s2">&quot;nvim-telescope/telescope-live-grep-args.nvim&quot;</span><span class="tok-p">,</span>
        <span class="tok-n">config</span> <span class="tok-o">=</span> <span class="tok-kr">function</span><span class="tok-p">()</span>
          <span class="tok-n">LazyVim</span><span class="tok-p">.</span><span class="tok-n">on_load</span><span class="tok-p">(</span><span class="tok-s2">&quot;telescope.nvim&quot;</span><span class="tok-p">,</span> <span class="tok-kr">function</span><span class="tok-p">()</span>
            <span class="tok-nb">require</span><span class="tok-p">(</span>
              <span class="tok-s2">&quot;telescope&quot;</span>
            <span class="tok-p">).</span><span class="tok-n">load_extension</span><span class="tok-p">(</span><span class="tok-s2">&quot;live_grep_args&quot;</span><span class="tok-p">)</span>
          <span class="tok-kr">end</span><span class="tok-p">)</span>
        <span class="tok-kr">end</span><span class="tok-p">,</span>
      <span class="tok-p">},</span>
    <span class="tok-p">},</span>
    <span class="tok-n">keys</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-p">{</span>
        <span class="tok-s2">&quot;&lt;leader&gt;/&quot;</span><span class="tok-p">,</span>
        <span class="tok-kr">function</span><span class="tok-p">()</span>
          <span class="tok-nb">require</span><span class="tok-p">(</span>
            <span class="tok-s2">&quot;telescope&quot;</span>
          <span class="tok-p">).</span><span class="tok-n">extensions</span><span class="tok-p">.</span><span class="tok-n">live_grep_args</span><span class="tok-p">.</span><span class="tok-n">live_grep_args</span><span class="tok-p">()</span>
        <span class="tok-kr">end</span><span class="tok-p">,</span>
        <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Grep with Args (root dir)&quot;</span><span class="tok-p">,</span>
      <span class="tok-p">},</span>
    <span class="tok-p">},</span>
    <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-n">extensions</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
        <span class="tok-n">live_grep_args</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
          <span class="tok-n">mappings</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
            <span class="tok-n">i</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
              <span class="tok-p">[</span><span class="tok-s2">&quot;&lt;C-k&gt;&quot;</span><span class="tok-p">]</span> <span class="tok-o">=</span> <span class="tok-kr">function</span><span class="tok-p">(</span><span class="tok-n">picker</span><span class="tok-p">)</span>
                <span class="tok-nb">require</span><span class="tok-p">(</span>
                  <span class="tok-s2">&quot;telescope-live-grep-args.actions&quot;</span>
                <span class="tok-p">).</span><span class="tok-n">quote_prompt</span><span class="tok-p">()(</span><span class="tok-n">picker</span><span class="tok-p">)</span>
              <span class="tok-kr">end</span><span class="tok-p">,</span>
            <span class="tok-p">},</span>
          <span class="tok-p">},</span>
        <span class="tok-p">},</span>
      <span class="tok-p">},</span>
    <span class="tok-p">},</span>
  <span class="tok-p">}</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>It’s a mess, I know. Part of the mess is because Telescope is pretty generic,
and that mess would still exist if you were managing your own config. But part
of the mess is because we need to cooperate with LazyVim when we enter our
customizations, and the config is necessarily more complicated than it would
be. As usual, I’m ok with this because I have to do it rarely enough and I
appreciate not having to manage <em>most</em> of my configuration by myself.</p></div></div> <div class="sect2"><h3 id="_configuring_non_plugin_options"><a class="link" href="#_configuring_non_plugin_options">19.7. Configuring Non-plugin Options</a></h3> <div class="paragraph"><p>Vim is a highly configurable editor and Neovim is even more so. There are over
three hundred options in the <code>:help option-list</code> output. The default Vim
configuration for most of these is fine, though there are a few that have silly
defaults for historical reasons. Neovim has fixed a few of these and LazyVim
sets almost a third of them so the out-of-the-box experience approximates what most
modern developers would want.</p></div> <div class="paragraph"><p>However, you’ll probably still want to change a few options to suit your taste.
This is typically done in the <code>lua/config/options.lua</code> file. LazyVim loads this
file by default.</p></div> <div class="paragraph"><p>For any given option, you <em>probably</em> want to set the <code>vim.opt.&lt;optionname&gt;</code>
field. <code>vim.opt</code> is a special Lua table that allows you to interact with Vim
settings as…​ well, a special Lua table. If you are searching for a Vim
setting and see something saying you should call <code>:set option=value</code>, that will
work, if you want to do it temporarily. But if you want to store the setting
for the next time you start Neovim, you need to translate it to <code>vim.opt.option
= value</code>.</p></div> <div class="paragraph"><p><em>Sometimes</em>, and after 25 years using Vim I’m <em>still</em> not sure exactly when,
you’ll need to set <code>vim.g.&lt;optionname&gt; = value</code> instead. The <code>g</code> in this case
means global. If you see an instruction to set a variable such as <code>let
g:varname = value</code>, you may need to use <code>vim.g.varname = value</code>. Some options
are inherently global while others only apply to the current buffer <em>unless</em>
you specify <code>g</code>. Some plugins, especially older non-Lua plugins, are configured
with global variables, and this is the syntax you would use for them as well.</p></div> <div class="paragraph"><p>In general, use <code>vim.opt</code> unless you see <code>vim.g</code> or <code>g:</code> in the documentation
or code you are copying from.</p></div></div> <div class="sect2"><h3 id="_setting_the_colour_scheme_theme"><a class="link" href="#_setting_the_colour_scheme_theme">19.8. Setting the Colour Scheme (Theme)</a></h3> <div class="paragraph"><p>Vim has two options for setting the colour scheme and they can interact in unexpected
ways.</p></div> <div class="paragraph"><p>First, you can set your window background to be either <code>dark</code> or <code>light</code>. You
can toggle this setting at runtime with the <code>&lt;Space&gt;ub</code> keybinding under the
“Ui” menu. <strong>Usually</strong> when you toggle the background, the colour scheme will change
the foreground colours to suit the chosen background, but this isn’t always reliable.
Sometimes it even changes the colour scheme to a related one that is more suitable
when the background is light. For example, if you have <code>catpuccin-mocha</code> enabled,
and change your background to light, <code>catpuccin-latte</code> will become the selected
colour scheme.</p></div> <div class="paragraph"><p>If you want to change the background permanently, set <code>vim.opt.background = &quot;light&quot;</code>
or <code>vim.opt.background = &quot;dark&quot;</code> in your <code>options.lua</code> file.</p></div> <div class="paragraph"><p>To change to a different colour scheme altogether, use <code>&lt;Space&gt;uC</code> where the C
is capitalized. This will pop up a Telescope picker with all currently
installed colour schemes. Neovim ships with a few default colour schemes, and
LazyVim adds several variations of <code>Catpuccin</code> and <code>Tokyo Night</code> (the default).
The advantage of these colour schemes over the Neovim-provided ones is that
they have a ton of extra highlight groups for the various plugins LazyVim installs.</p></div> <div class="paragraph"><p>If you want to change the colour scheme permanently, it should be set as an
<code>opt</code> on the <code>LazyVim/LazyVim</code> plugin. I prefer the <code>catpuccin</code> colour scheme,
so I have a <code>plugins/core.lua</code> file that looks like this:</p></div> <div class="listingblock"><div class="title">Listing 89. Colour Scheme Configuration</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-p">{</span>
    <span class="tok-s2">&quot;LazyVim/LazyVim&quot;</span><span class="tok-p">,</span>
    <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-n">colorscheme</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;catppuccin&quot;</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>However if you want to set the colour scheme to something that isn’t shipped
with LazyVim by default, you <em>also</em>  need to install the plugin that ships that
colour scheme. For example, the popular standby gruvbox can be installed like
this:</p></div> <div class="listingblock"><div class="title">Listing 90. Third Party Colour Scheme</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-p">{</span> <span class="tok-s2">&quot;ellisonleao/gruvbox.nvim&quot;</span> <span class="tok-p">},</span>
  <span class="tok-p">{</span>
    <span class="tok-s2">&quot;LazyVim/LazyVim&quot;</span><span class="tok-p">,</span>
    <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-n">colorscheme</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;gruvbox&quot;</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">When looking for new colour schemes, try to find well-maintained
repositories that feature &quot;treesitter support&quot; and provide highlight groups for
all the plugins you use regularly (including those that ship with LazyVim). You
can find colour schemes on the
<a href="https://github.com/rockerBOO/awesome-neovim/">Awesome Neovim list</a>.</td></tr></tbody></table></div></div> <div class="sect2"><h3 id="_lazy_loading"><a class="link" href="#_lazy_loading">19.9. Lazy Loading</a></h3> <div class="paragraph"><p>LazyVim automatically lazy-load plugins on demand instead of during program
startup. This can shave milliseconds off your startup time (that oh-so-precious
resource).</p></div> <div class="paragraph"><p>LazyVim knows to load the plugin whenever its code is <code>require</code>d, or when any of
the keybindings specified in the <code>keys</code> array are pressed. This is usually
exactly when you want it to load. However, if you encounter plugins that are
not working as expected, you may need to tweak the lazy loading configuration.</p></div> <div class="paragraph"><p>First, try adding <code>lazy = false</code> to the plugin spec. This will ensure the plugin
loads on startup. If the plugin works after you add that, you have two options:</p></div> <div class="ulist"><ul><li><p>Just leave <code>lazy = false</code> and get on with your day.</p></li> <li><p>Micro-optimize to try to force the plugin to load lazily at the right time.</p></li></ul></div> <div class="paragraph"><p>For the most part, I recommend the first option. Micro-optimization makes sense
in the context of optimizing plugins for public consumption. Plugin maintainers
might use it in their packages, and certainly distro maintainers such as Folke
himself spend a lot of time on it. But it’s not likely worth it for you.</p></div> <div class="paragraph"><p>Run the plugin with lazy enabled and disabled and check the startup time in the
dashboard. If it makes a difference that you want to solve for, read on.</p></div> <div class="paragraph"><p>If a plugin should only be specified for certain filetypes, then add a <code>ft</code> key
to the spec. This key accepts a string or list of strings representing the
filetype. (To get the filetype for the current buffer, type <code>:set ft&lt;Enter&gt;</code>).</p></div> <div class="paragraph"><p>If instead the plugin should only be loaded if certain commands are called,
specify a list of strings with the command names under the <code>cmd</code> key.</p></div> <div class="paragraph"><p>You can also specify a Neovim <code>event</code> that should trigger the plugin to load.
There are way too many of these to list in this book, so I’ll refer you to
<code>:help events</code>. The most common ones to trigger plugin loading would be
<code>BufEnter</code>, <code>BufRead</code>, and <code>BufWrite</code>.</p></div></div> <div class="sect2"><h3 id="_filetype_specific_configuration"><a class="link" href="#_filetype_specific_configuration">19.10. Filetype-specific Configuration</a></h3> <div class="paragraph"><p>If you need to configure something to run for a specific filetype, you’ll
need the <code>nvim_create_autocmd</code> function. Technically you can place this call
anywhere, including <code>init.lua</code> or the <code>config</code> or <code>init</code> for a specific plugin,
but the LazyVim convention is to put them in the <code>lua/config/autocmds.lua</code> file.</p></div> <div class="paragraph"><p>I actually only have one autocmd because LazyVim does such a good job of
configuring filetype-specific behaviours for me (usually using the appropriate
<code>lang.*</code> LazyVim Extra). That command looks like so:</p></div> <div class="listingblock"><div class="title">Listing 91. Filetype-specific Autocommands</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">api</span><span class="tok-p">.</span><span class="tok-n">nvim_create_autocmd</span><span class="tok-p">({</span> <span class="tok-s2">&quot;BufRead&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;BufNewFile&quot;</span> <span class="tok-p">},</span> <span class="tok-p">{</span>
<span class="tok-n">pattern</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;</span><span class="tok-err">\\</span><span class="tok-s2">*.svx&quot;</span><span class="tok-p">,</span>
<span class="tok-n">command</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;setlocal filetype=markdown&quot;</span><span class="tok-p">,</span>
<span class="tok-p">})</span></code></pre></div></div> <div class="paragraph"><p>The first argument is a keyless Lua table of string event names; in this case any
time I create or read a file, the autocommand is run. There are other events
you can use, but for the most part you’ll only need these two unless you are
writing your own plugin (see <code>:help autocmd-events</code> for a whole list).</p></div> <div class="paragraph"><p>The second argument contains the options for the autocommand. In this case I am
including a <code>pattern</code>, which is a Vim regex for the type of file I want to
match. I specifically said “Vim regex” to excuse the goofy <code>\\*</code>, as discussed
in Chapter 12.</p></div> <div class="paragraph"><p>In this case I’m using the <code>command</code> key to execute a command whenever I read
a <code>*.svx</code> file. You can instead specify a <code>callback</code> key where the value is a
Lua function that will be called whenever the event occurs.</p></div></div> <div class="sect2"><h3 id="_per_project_configuration"><a class="link" href="#_per_project_configuration">19.11. Per-project Configuration</a></h3> <div class="paragraph"><p>Sometimes, you’ll want to have a custom LazyVim configuration for a specific
project. For example, most of my Typescript projects are in Svelte, which means
I can’t (yet) use the exceptional <code>biome</code> linter/formatter for them. That means
I’m using <code>prettier</code> for formatting in these repos. My <code>extend-conform.lua</code>
plugin specification looks like this:</p></div> <div class="listingblock"><div class="title">Listing 92. Prettier in Default Configuration</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-p">{</span>
    <span class="tok-s2">&quot;stevearc/conform.nvim&quot;</span><span class="tok-p">,</span>
    <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-n">formatters_by_ft</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
        <span class="tok-p">[</span><span class="tok-s2">&quot;typescript&quot;</span><span class="tok-p">]</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-s2">&quot;prettier&quot;</span> <span class="tok-p">},</span>
        <span class="tok-p">[</span><span class="tok-s2">&quot;markdown&quot;</span><span class="tok-p">]</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-s2">&quot;prettier&quot;</span> <span class="tok-p">},</span>
        <span class="tok-p">[</span><span class="tok-s2">&quot;yaml&quot;</span><span class="tok-p">]</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-s2">&quot;prettier&quot;</span> <span class="tok-p">},</span>
        <span class="tok-p">[</span><span class="tok-s2">&quot;svelte&quot;</span><span class="tok-p">]</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-s2">&quot;prettier&quot;</span> <span class="tok-p">},</span>
      <span class="tok-p">},</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>However, for my Typescript API servers, I <strong>can</strong> use Biome, and I want to override
my configuration for those projects only.</p></div> <div class="paragraph"><p>LazyVim makes this dead simple: just create a <code>.lazy.lua</code> file in your project.
It can return any valid plugin spec, and it will be called after any other plugins
are loaded, overwriting them. So my Hono api server has a <code>.lazy.lua</code> file that
looks like this:</p></div> <div class="listingblock"><div class="title">Listing 93. Project-specific <code>.lazy.lua</code></div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-p">{</span>
    <span class="tok-s2">&quot;stevearc/conform.nvim&quot;</span><span class="tok-p">,</span>
    <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-n">formatters_by_ft</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
        <span class="tok-p">[</span><span class="tok-s2">&quot;typescript&quot;</span><span class="tok-p">]</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-s2">&quot;biome&quot;</span> <span class="tok-p">},</span>
      <span class="tok-p">},</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>You can choose to commit this with your project or <code>.gitignore</code> it depending on the
standards of the project.</p></div></div> <div class="sect2"><h3 id="_lazyvim_recipes"><a class="link" href="#_lazyvim_recipes">19.12. LazyVim Recipes</a></h3> <div class="paragraph"><p>LazyVim helpfully collects some of the most commonly requested features as
recipes on their <a href="https://www.lazyvim.org/configuration/recipes">home page</a>.
Most of these can simply be copied directly into any file in your <code>lua/plugins</code>
folder. Remember to add <code>return</code> in front of them so that whatever table they
give you is exported.</p></div> <div class="paragraph"><p>Most of the recipes are just providing a set of suggested <code>opts</code> to trigger
the behaviour in question. These <code>opts</code> are always plugin-specific and you’ll
need to visit the help file or README for the plugin to understand what
they are doing.</p></div></div> <div class="sect2"><h3 id="_summary_19"><a class="link" href="#_summary_19">19.13. Summary</a></h3> <div class="paragraph"><p>This chapter was all about configuring LazyVim. Much of it may have been review
of examples I’ve used throughout the book when adding plugins to support
specific features. However, I wanted to make sure there was coverage in one
place for when you want to look things up.</p></div></div></div>`;return{c(){s=l("div"),s.innerHTML=n,this.h()},l(a){s=r(a,"DIV",{class:!0,"data-svelte-h":!0}),d(s)!=="svelte-1l2aud3"&&(s.innerHTML=n),this.h()},h(){u(s,"class","sect1")},m(a,t){h(a,s,t)},p:e,i:e,o:e,d(a){a&&g(s)}}}class w extends i{constructor(s){super(),c(this,s,null,v,p,{})}}export{w as component,y as universal};
