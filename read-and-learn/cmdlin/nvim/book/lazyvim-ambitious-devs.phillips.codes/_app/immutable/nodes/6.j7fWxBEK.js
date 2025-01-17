import{s as n,n as t}from"../chunks/scheduler.seBsrkbn.js";import{S as r,i as l,e as d,c,l as p,m as h,g as u,d as g}from"../chunks/index.Dwxb9V0m.js";function m(){return{title:"Chapter 10: Programming Language Support",description:"Language servers changed text ediiting for the better. NeoVim has integrated language servers and LazyVim has made configuration as seamless as possible.",keywords:"vim, lazyvim, neovim, tutorial, course, book, Language Server, LSP"}}const k=Object.freeze(Object.defineProperty({__proto__:null,load:m},Symbol.toStringTag,{value:"Module"}));function v(o){let e,s=`<h2 id="_programming_language_support"><a class="link" href="#_programming_language_support">Chapter 10. Programming Language Support</a></h2> <div class="sectionbody"><div class="paragraph"><p>Visual Studio Code brought the world the concept of language servers, and all
other text editors jumped on the idea. Early incarnations of language server
protocol in Vim were frustrating and clunky and required plugins that tended
to be fragile and complicated.</p></div> <div class="paragraph"><p>Then Neovim decided to build support for language servers into the editor
itself. Neovim’s built-in support is still frustrating and clunky, but over
time, robust and simple plugins have evolved to make the language server
experience almost automatic. LazyVim represents the pinnacle of that evolution.</p></div> <div class="paragraph"><p>In addition, Neovim also has built-in support for TreeSitter, a powerful
library for parsing and identifying abstract syntax trees in source code while
it is being edited, and LazyVim is configured with the plugins needed to make
TreeSitter Just Work™.</p></div> <div class="paragraph"><p>Language Server protocol gives us support for things like code navigation,
signature help, auto-completion, certain highlighting and formatting
behaviours, diagnostics, and more. TreeSitter gives us better syntax
highlighting, code folding, and syntax based navigation such as provided by the
<code>S</code> command you already know.</p></div> <div class="paragraph"><p>There are two main tools for working with language servers in LazyVim: various
language Lazy Extras, and the Mason.nvim plugin. We’ll get to know both of
these and then learn how to better use some of the tooling they provide.</p></div> <div class="sect2"><h3 id="_the_lang_lazy_extras"><a class="link" href="#_the_lang_lazy_extras">10.1. The lang.* Lazy Extras</a></h3> <div class="paragraph"><p>We’ve already used LazyVim extras for plugin configuration, and I told you to
install the extras for whichever languages you use regularly. These extras
include preconfigured plugins that give best-in-class support for common
programming languages. Most ship with preconfigured language servers and many
include additional Neovim plugins that are useful with those languages.</p></div> <div class="paragraph"><p>Once you install these extras things will usually work out of the box, and you
won’t have to learn any new keybindings for the commands each language
provides. However, it wouldn’t hurt to read the Readmes for the plugins the
extra installs (accessible by looking up the Extra’s documentation on the
LazyVim website and clicking the headings) to make sure you aren’t missing out
on any commands the language provides. For example, the Python extra ships with
the venv-selector.nvim plugin that allows you to activate many types of Python
virtual environments either automatically or on demand. LazyVim installs a
keybinding to open the virtualenv selector using <code>&lt;Space&gt;cs</code> where <code>&lt;Space&gt;c</code>
is the “Code” submode.</p></div></div> <div class="sect2"><h3 id="_mason_nvim"><a class="link" href="#_mason_nvim">10.2. Mason.nvim</a></h3> <div class="paragraph"><p>The Lazy Extras may not install everything you need. For example, instead of
the default Typescript formatting and linting tools, I prefer to use a new
hyper-fast up-and-comer called Biome.</p></div> <div class="paragraph"><p>To install things like this, you can use the Mason.nvim plugin, which is
pre-installed with LazyVim. To open Mason, use the <code>&lt;Space&gt;cm</code> keybinding. The
window that pops up looks similar to the Lazy.nvim and Lazy Extras floating
window, although it ships with annoyingly unrelated keybindings.</p></div> <div class="paragraph"><p>Mason is a very large database of programming language support tooling,
including language servers, formatters, and linters, along with the
instructions to install them.</p></div> <div class="paragraph"><p>Mason.nvim <em>does</em> assume a certain baseline is already installed on your
system; for example if you are going to install something that is Rust-based,
you better have a <code>cargo</code> binary, and if you are going to install something
that requires Python support, Python and pip need to be available. In most
cases, if you are coding in a given language, you already have the tools Mason
needs to do its thing. The main thing that Mason takes care of is ensuring that
the tools are installed in such a way that other Neovim plugins can find
them.</p></div> <div class="paragraph"><p>The hardest task with Mason is knowing what tool you want to install. I was
already using Biome when I set up LazyVim, so I knew I was going to need to
install editor support for it. That was no problem; just find <code>biome</code> in the
Mason list (like any window, it is scrollable, searchable, and seekable, and
Mason helpfully puts everything in alphabetical order).</p></div> <div class="paragraph"><p>But when I started working on this book, I decided I needed an advanced
Markdown formatter, and I had no idea which one to use. I could search the
window for <code>markdown</code> and then press <code>Enter</code> on any matching lines, which gives
a description and some other information, but I had to do some research with a
web browser, (along with a little trial and error) before I found the right
tool for me.</p></div> <div class="paragraph"><p>Unfortunately, I can’t help you with figuring out what is right for you, but
once you find the tool in Mason, just use <code>i</code> to install the package under the
cursor. The only other command you will use frequently in Mason is <code>Shift-U</code> to
update all installed tools, and you can look up the rest with <code>g?</code>.</p></div></div> <div class="sect2"><h3 id="_validating_things_installed_cleanly"><a class="link" href="#_validating_things_installed_cleanly">10.3. Validating Things Installed Cleanly</a></h3> <div class="paragraph"><p>As good as both LazyExtras and Mason are at installing language servers,
linting, and formatting tools, setting them up is one of the places most likely
to go wrong, no matter which editor you are using. So now is a good time to
introduce several commands to validate that things are working as expected.</p></div> <div class="paragraph"><p>First, LazyVim pops up notifications in the upper right corner, as you have
seen with the plugin updates. These disappear after a few seconds. Every once
in a while, you need to be able to refer back to them.</p></div> <div class="paragraph"><p>The secret is to use the keybinding <code>&lt;Space&gt;sn</code> to open the “Noice” search
menu. Noice is the plugin that provides those little popups. Most often, you’ll
want to follow this with either an <code>a</code> or an <code>l</code> to see all recent Noice
messages, or just the last one.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">You can also use <code>&lt;Space&gt;snd</code> to dismiss any currently open notifications,
but honestly, by the time you’ve completed those four keystrokes, they
notifications have probably disappeared themselves already!</td></tr></tbody></table></div> <div class="paragraph"><p>The second command you’ll need for debugging LSPs is <code>&lt;Space&gt;cl</code>, which runs
the command <code>:LspInfo</code>. It displays information about any language servers that
are currently running and which buffers they are attached to. For example,
while editing a Markdown document, my LSPInfo window looks like this:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-10/lsp-info-dark.png" alt="lsp info dark"/></div> <div class="title">Figure 44. Lspinfo Window</div></div> <div class="paragraph"><p>In this case, everything looks fine (though I’m surprised the tailwind server
is associated with Markdown), but if your LSP isn’t behaving correctly, this
window might give you a hint as to what the problem might be.</p></div> <div class="paragraph"><p>If your LSP is having temporary problems—​like showing incorrect diagnostics or
unable to find a file you know is there—​sometimes it just needs to be given a
good kick with <code>:LspRestart</code>. The Svelte language server has a nasty habit of
not picking up new files, so I’ve been using this one often enough lately to
add a keybinding for it.</p></div> <div class="paragraph"><p>Two other super useful commands are <code>:checkhealth</code> and <code>:LazyHealth</code>. Both
provide information about the health of various installed plugins. The former
is a Neovim command that plugins can register themselves with to provide plugin
health information, while the latter provides LazyVim-specific information.
There is a lot of overlap in the output, but I find the <code>:LazyHealth</code> output is
easier to read, and the <code>:checkhealth</code> output to be a bit more comprehensive.
So I usually use <code>:LazyHealth</code> first and switch to <code>checkhealth</code> only if
<code>:LazyHealth</code> didn’t yield the answer I need.</p></div> <div class="paragraph"><p>Don’t expect to see green check marks across the board; you’ll make yourself
crazy. For example, my <code>checkhealth</code> output contains a bunch of warnings from
Mason:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-10/lazy-health-dark.png" alt="lazy health dark"/></div> <div class="title">Figure 45. Lazy Health Warnings</div></div> <div class="paragraph"><p>Tools that I have used recently (and also Ruby for some reason) are installed,
and I have warnings for languages that I don’t generally need to edit files in.
So if you don’t code in Java, there’s no reason to waste cycles trying to make
the <code>java</code> warning go away.</p></div></div> <div class="sect2"><h3 id="_diagnostics"><a class="link" href="#_diagnostics">10.4. Diagnostics</a></h3> <div class="paragraph"><p>Language Servers fulfill several useful functions, including identifying code
problems, linting, formatting, context-aware code navigation, and
documentation. We’ll discuss all of these between this and the next chapter.</p></div> <div class="paragraph"><p>We already got a peek at diagnostics in Chapter 7, when we discussed
jumping between error messages with the unimpaired keybindings <code>[d</code>, <code>[w</code>,
<code>[e</code>, <code>]d</code>, <code>]w</code>, and <code>]e</code>. Diagnostics show up as little squiggles under
specific sections of text and when you jump to them, you usually get a
small overlay window telling you what is wrong at that location. For example,
I have a simple typo causing an error in this screenshot:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-10/diagnostic-dark.png" alt="diagnostic dark"/></div> <div class="title">Figure 46. Diagnostic Overlay</div></div> <div class="paragraph"><p>I misspelled “tracingMiddleware”, and I get a helpful error message on that
line in the virtual text, and a window pops up when I navigate to that error
with <code>]d</code>. This window sometimes has more information than the virtual text. In
addition, the line that imports the correctly spelled variable is showing a
hint telling me that it isn’t used.</p></div> <div class="paragraph"><p>The colour of the diagnostic conveys the severity—​whether it is a hint, a
warning, or an error—​so you can decide whether it is valuable to fix. I generally
try to either fix or silence all diagnostics, as they become less useful if there
is much noise.</p></div> <div class="paragraph"><p>If the window doesn’t pop up when you navigate to the diagnostic, you can
use the <code>&lt;Space&gt;cd</code> keybinding to invoke it as long as your cursor is positioned
somewhere within the underlined text. You can make the window disappear by
moving your cursor with any motion key.</p></div> <div class="sect3"><h4 id="_trouble_and_quick_fix"><a class="link" href="#_trouble_and_quick_fix">10.4.1. Trouble and Quick Fix</a></h4> <div class="paragraph"><p>You can also navigate diagnostics using the Trouble menu. Trouble is a LazyVim
plugin that provides an “enhanced quick fix” experience. Which is probably
meaningless to you if you are new to Vim and don’t know what “quick fix” means!</p></div> <div class="paragraph"><p>The Quick Fix window is essentially a list of files and line numbers that have
been tagged as “interesting” for some reason, where that reason depends on
context. It can be used to represent multi-file search results, diagnostics,
compiler error messages, and more, depending on how you open it. You can easily
hop between the targeted locations, making changes or corrections without
losing the context of what you were originally searching for.</p></div> <div class="paragraph"><p>In its simpler form, Trouble is the same thing, just a little bit prettier to
look at, with colours, icons, and nice groupings when fix locations are in
multiple files.</p></div> <div class="paragraph"><p>The <em>contents</em> of the Quick Fix and Trouble windows depend entirely on how
you open them. Most of them are accessible from the <code>&lt;space&gt;x</code> (I assume the <code>x</code>
stands for “fi<strong>X</strong>”) menu, which looks something like this:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-10/diagnostics-menu-dark.png" alt="diagnostics menu dark"/></div> <div class="title">Figure 47. Diagnostic Menu</div></div> <div class="paragraph"><p>Let’s take to-dos as an example, as I have a lot of them in this book.
It’s weird saying that because they’ll be gone by the time you see it,
but this screenshot will live on:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-10/todos-dark.png" alt="todos dark"/></div> <div class="title">Figure 48. To-Dos List</div></div> <div class="paragraph"><p>The cool thing about this list of locations is that they are not all in the
same file. Without Trouble, I could navigate between to-dos in the <em>current</em> file
using the <code>[t</code> and <code>]t</code> keys. However, using Trouble, I can navigate between
to-dos in multiple files by moving my cursor to the appropriate line in the
Trouble window and hitting <code>Enter</code>. It will open the file and move the cursor
right to the “troubling” line.</p></div> <div class="paragraph"><p>Or you can use the commands <code>[q</code> and <code>]q</code>, which will navigate between Quick Fix
OR Trouble locations, no matter which file they are in, without ever focusing
the Trouble window.</p></div> <div class="paragraph"><p>For diagnostics, open the Trouble menu with <code>&lt;Space&gt;xx</code> or <code>&lt;Space&gt;xX</code>. The
lowercase version shows the diagnostics in the current file for a quick
overview while the “but bigger” uppercase X shows all the diagnostics in the
current workspace (although it depends a bit on the language servers; some
language servers only show you diagnostics for all currently open buffers, not
the whole project).</p></div> <div class="paragraph"><p>If you’re wondering what the “Location List” is, it’s a Quick Fix window that is
associated with the current window (NOT buffer). I never use it; my brain can
only handle fixing one problem at a time, even if it is in hundreds of files!</p></div></div></div> <div class="sect2"><h3 id="_code_actions"><a class="link" href="#_code_actions">10.5. Code Actions</a></h3> <div class="paragraph"><p>One of the things that made VS Code seem magical when it came out was code
actions. Not that they existed, as the concept has been around for a long time,
but that they WORKED. Nowadays, I kind of take them for granted.</p></div> <div class="paragraph"><p>You may be used to accessing code actions by moving your hands to the mouse and
clicking a light bulb or right clicking a diagnostic. In LazyVim it is (of
course) a keybinding. Navigate to a diagnostic using whatever keybindings work
for you (I live by <code>]d</code>) and then invoke the <code>&lt;Space&gt;ca</code> menu where <code>c</code> and <code>a</code>
mean “code action.” A picker menu will pop up with a list of any actions
you can take. You can use the arrow keys or <code>&lt;Escape&gt;</code> followed by <code>j</code> and
<code>k</code> to navigate between them, or you can enter a number or any text from the
line to filter. Hit <code>&lt;Enter&gt;</code> to perform the action, or <code>&lt;Escape&gt;&lt;Escape&gt;</code> to
cancel the menu (just one escape allows you to enter Normal mode in the
search box so you can use the many LazyVim navigation keystrokes that you
are, by now, accustomed to).</p></div></div> <div class="sect2"><h3 id="_linting"><a class="link" href="#_linting">10.6. Linting</a></h3> <div class="paragraph"><p>Linting is <em>mostly</em> handled using the <code>nvim-lint</code> plugin instead of the LSP.
This was a major pain point in my pre-LazyVim days because getting the LSP and
linter cooperating often required some serious troubleshooting. And then throw
formatting into the mix and I’d lose a day or two. To be fair, this was true
when I used VS Code, too.</p></div> <div class="paragraph"><p>Using LazyVim, it is actually likely that you don’t know who is doing the
linting for you. I honestly don’t. Some of my diagnostics come from the LSP and
others come from the linter. I don’t bother to question the source of the
errors; I just fix them.</p></div> <div class="paragraph"><p>The hard part with linting (at least, when it doesn’t work automatically) will
be making sure that the appropriate linter is installed (Mason has your back
here), and configured correctly. If you are lucky and the languages you love to
work in have Lazy Extras, then it is probably already configured correctly.
Otherwise, you may have to do a little tweaking. The tweaking involved is,
sadly, language-dependent, but you’ll probably need something like this
in a (for example) <code>extend-nvim-lint.lua</code> file in your plugins directory:</p></div> <div class="listingblock"><div class="title">Listing 26. Nvim-lint Customization</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-s2">&quot;mfussenegger/nvim-lint&quot;</span><span class="tok-p">,</span>
  <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-n">linters_by_ft</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-n">typescript</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
        <span class="tok-c1">-- lint settings for Typescript</span>
      <span class="tok-p">}</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>Read <code>:help nvim-lint</code> for more information and refer to the LazyVim
documentation for this configuration if you need further clarification.</p></div> <div class="paragraph"><p>The nice thing is that once you have your linting configured, the errors will
show up using the same diagnostics described above and you can engage with them
using the same keybindings, Trouble window, code actions, etc.</p></div></div> <div class="sect2"><h3 id="_formatting"><a class="link" href="#_formatting">10.7. Formatting</a></h3> <div class="paragraph"><p>Similar to linting, code formatting <em>can</em> be handled by some LSPs, but people
have realized that using the language server is often more complicated than
just invoking a formatter directly. So LazyVim ships with the conform.nvim
plugin.</p></div> <div class="paragraph"><p>Also similar to linting, if you are lucky, it will Just Work™ after you
install the appropriate Lazy Extra and/or Mason tool. However, if you don’t
like the default formatter (or it’s not working), you will have to familiarize
yourself with the LazyVim and conform.nvim documentation to figure out
the exact incantation required.</p></div> <div class="paragraph"><p>The only formatter I’ve had to manually configure is using Prettier for
Markdown. It looks eerily similar to the <code>nvim-lint</code> configuration:</p></div> <div class="listingblock"><div class="title">Listing 27. Conform Customization</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-s2">&quot;stevearc/conform.nvim&quot;</span><span class="tok-p">,</span>
  <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-n">formatters_by_ft</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-p">[</span><span class="tok-s2">&quot;markdown&quot;</span><span class="tok-p">]</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-s2">&quot;prettier&quot;</span> <span class="tok-p">},</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p><em>Once</em> it’s set up (I acknowledge this may be no mean feat), formatting in
LazyVim is typically fire and forget: save your file and it formats. If you
want to invoke it manually without saving, use the <code>&lt;Space&gt;cf</code> keybinding. I
can’t stress how lucky you are that this is the case; without LazyVim,
countless hours have been wasted trying to get the autocommands for “format on
save” to work!</p></div></div> <div class="sect2"><h3 id="_configuring_non_standard_lsps"><a class="link" href="#_configuring_non_standard_lsps">10.8. Configuring Non-standard LSPs</a></h3> <div class="paragraph"><p>If you have installed an LSP that LazyVim isn’t aware of, you may need to tweak
the <code>nvim-lspconfig</code> plugin. You will minimally need to let it know that your
language server is available, and possibly to configure it to your needs. For
example, one of my favourite programming languages is Rescript, which doesn’t
have a huge ecosystem and therefore, has no LazyVim extra. I was able to
install the language server with Mason easily enough, but I also needed to add
the following to my <code>extend-lspconfig.lua</code> file for LazyVim to pick it up:</p></div> <div class="listingblock"><div class="title">Listing 28. Third-party LSP server</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-s2">&quot;neovim/nvim-lspconfig&quot;</span><span class="tok-p">,</span>
  <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-n">servers</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-n">rescriptls</span> <span class="tok-o">=</span> <span class="tok-p">{},</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>As a second example, the <code>css_variables</code> language server, which I use with the
excellent open-props CSS framework, works out of the box for <code>css</code> files, but I
needed to use a different configuration to activate it in <code>svelte</code> files:</p></div> <div class="listingblock"><div class="title">Listing 29. Css Variable LSP Config</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-p">{</span>
    <span class="tok-s2">&quot;neovim/nvim-lspconfig&quot;</span><span class="tok-p">,</span>
    <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-n">servers</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
        <span class="tok-n">css_variables</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
          <span class="tok-n">filetypes</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-s2">&quot;css&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;scss&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;less&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;svelte&quot;</span> <span class="tok-p">},</span>
        <span class="tok-p">},</span>
      <span class="tok-p">},</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div></div> <div class="sect2"><h3 id="_summary_10"><a class="link" href="#_summary_10">10.9. Summary</a></h3> <div class="paragraph"><p>In this chapter, we learned how LazyVim integrates the language server protocol
that VS Code brought to the world. It is <em>usually</em> quick and painless, which is
more than can be said for manually configuring LSPs. However, there may be some
headaches especially around linting and formatting. This is true in any editor,
sometimes they hold your hand and sometimes they get in your way. If you get
stuck, hit us up in the LazyVim discussions group on GitHub (but search it
first; you’re probably not the first person to have trouble).</p></div> <div class="paragraph"><p>In the next chapter, we’ll learn more about navigating <em>code</em> using LSPs,
TreeSitter, and several plugins.</p></div></div></div>`;return{c(){e=d("div"),e.innerHTML=s,this.h()},l(a){e=c(a,"DIV",{class:!0,"data-svelte-h":!0}),p(e)!=="svelte-tu0wrm"&&(e.innerHTML=s),this.h()},h(){h(e,"class","sect1")},m(a,i){u(a,e,i)},p:t,i:t,o:t,d(a){a&&g(e)}}}class w extends r{constructor(e){super(),l(this,e,null,v,n,{})}}export{w as component,k as universal};
