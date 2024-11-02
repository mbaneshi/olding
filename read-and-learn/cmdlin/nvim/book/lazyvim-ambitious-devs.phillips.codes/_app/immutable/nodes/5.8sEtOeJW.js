import{s as n,n as t}from"../chunks/scheduler.seBsrkbn.js";import{S as r,i as l,e as d,c,l as h,m as p,g as m,d as u}from"../chunks/index.Dwxb9V0m.js";function v(){return{title:"Chapter 1: Introduction and Installation",description:"Choosing a terminal and installation instructions for the LazyVim distribution for Neovim.",keywords:"vim, lazyvim, neovim, tutorial, installation"}}const w=Object.freeze(Object.defineProperty({__proto__:null,load:v},Symbol.toStringTag,{value:"Module"}));function y(o){let e,i=`<h2 id="_introduction_and_installation"><a class="link" href="#_introduction_and_installation">Chapter 1. Introduction and Installation</a></h2> <div class="sectionbody"><div class="paragraph"><p>This book is meant for all the developers out there who are intrigued by the
power modal editing can bring, but are either intimidated or bored by the sheer
amount of configuration that even introductory tutorials on the topic force
upon them.</p></div> <div class="paragraph"><p>I’m guessing you’re a Visual Studio Code user (a great editor that I used for a
few years) but you may be coming to modal editing from numerous other
integrated development environments and code editors. You’ve probably heard of
Vim and now you want to try it out.</p></div> <div class="sect2"><h3 id="_why_vim"><a class="link" href="#_why_vim">1.1. Why Vim</a></h3> <div class="paragraph"><p>Vim has a <em>very</em> ancient history. It was created in the early &#39;90s as an
improvement on the (much) older Vi editor, written in the 1970’s. The name
“Vim” actually stands for “Vi, improved”. Its predecessor, Vi is short for
“Visual”, as it was an iteration on an even earlier (1971) non-visual line
editing experience called <code>ed</code>.</p></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content">Interestingly, <code>ed</code> is somehow still available on modern Unix systems, and if
you use a MacOS or Linux environment, you can probably access it by typing <code>ed</code>
in any terminal. (If you made the mistake of trying it, <code>Control-D</code> will get you
out again). You now know as much as I do about <code>ed</code>, and trust me, you don’t
want to know more.</td></tr></tbody></table></div> <div class="paragraph"><p>You may also be familiar with another iteration of <code>ed</code> called <code>sed</code>, the stream
editor. To this day it is still used for modifying text in a shell pipeline.</p></div> <div class="paragraph"><p>The <code>ed</code> command was also <strong>ex</strong>tended to create another line editor called <code>ex</code>,
which isn’t really used anymore, except (extensively) as a submode of Vim.
In fact, if you install Neovim and type <code>ex</code> on your command line, you will
get a very crippled instance of Neovim that only supports <code>ex</code> commands.</p></div> <div class="paragraph"><p>So that’s quite the family tree, but ancestry alone is not a great predictor of
quality, as any fourth generation somebody can attest.</p></div> <div class="paragraph"><p>There are many reasons to use any one editor, but, the ones that stand out for
Vim are:</p></div> <div class="dlist"><dl><dt class="hdlist1">Health Benefits</dt><dd><p>This is the big one for me. I used Vim a lot through my
early career, though, like many developers, I switched to VS Code when it came
out in 2015. I spend a lot of time at my keyboard, and by 2020, I was so
crippled by RSI that I spent six months exclusively coding by voice (a blog
article on the topic has made me more famous than I expected). A friend
suggested I switch back to modal editing, and it made a huge difference for
me. The vast majority of Vim keystrokes do not require you to hold down
multiple keys with the same hand, something that really aggravates carpal
tunnel syndrome.</p> </dd><dt class="hdlist1">Performance</dt><dd><p>Most IDEs have some sort of “vi emulation” layer or plugin
that allows you to reap some of the health benefits of modal editing without
fully switching to a new editor. But waiting for VS Code to start up and load
all the extensions you know and love has become a meditative exercise for many
(or an opportunity to return to doom scrolling). In contrast, when I load my
LazyVim configuration, it helpfully tells me how long it took to load: 56.98
milliseconds. To my slow, human eyes, it’s instant.</p> </dd><dt class="hdlist1">Developer Velocity</dt><dd><p>This is debatable and subjective. Any tool is only as
good as the trades-person who wields it, and I certainly know excellent coders
who can really fly with their VS Code, Emacs, or JetBrains configurations.
Still, I really believe that a finely-tuned Vim configuration can outpace any
of them.</p> </dd><dt class="hdlist1">Open Ecosystem</dt><dd><p>I have a lot of respect for how Microsoft treats open
source software since Nadella took the reigns, but VS Code is showing
increasing signs of proprietary lock-in (especially with its AI integrations).
In contrast, the Neovim ecosystem is a vibrant open community, and innovative
plugins arrive every week that would never be attempted in VS Code.</p></dd></dl></div></div> <div class="sect2"><h3 id="_why_neovim_specifically"><a class="link" href="#_why_neovim_specifically">1.2. Why Neovim, Specifically</a></h3> <div class="paragraph"><p>If you decide to use Vim, you’ll quickly discover that there are two modern
variations: Vim, and Neovim. Both are direct descendants of that original open
source &#39;90s Vim code. Neovim was forked from Vim in 2014 with a vision of
refactoring and modernizing the codebase and feature set.</p></div> <div class="paragraph"><p>Both are actively maintained and both have the potential to feel polished and
modern, though it takes some configuration to reach that potential. They each
have extremely strong plugin ecosystems, but Neovim has one killer feature: It
has introduced the Lua programming language for plugin development (and
configuration) in addition to the native VimScript that its sibling uses.</p></div> <div class="paragraph"><p>By itself, Lua doesn’t make Neovim inherently better than Vim. However, where
most Vim plugins also run on Neovim, the inverse is not always true, and there
are best-in-class Lua plugins that only work with Neovim.</p></div> <div class="paragraph"><p>For the purposes of this book, your decision is already made for you: The
LazyVim distribution this book is about only works with Neovim.</p></div></div> <div class="sect2"><h3 id="_introducing_lazyvim"><a class="link" href="#_introducing_lazyvim">1.3. Introducing LazyVim</a></h3> <div class="paragraph"><p>The chief drawback of both Vim and Neovim is that while they have the
capability to have the same (or better) modern editing experience as any other
IDE, they don’t start out that way. Vim has a long tradition of maintaining
compatibility with the outdated <code>vi</code> tool and Neovim has only marginally
diverged from that tradition. When you first install Neovim, you get a pretty
bland code editing experience.</p></div> <div class="paragraph"><p>When I switched back to Vim in 2020, after becoming used to the great
functionality VS Code brought to the editor ecosystem, it took me <strong>two weeks</strong>
to get my configuration where I wanted it and I tweaked it incessantly for
months after. It came in at about 300 lines of Vimscript, which I later ported
to around 250 lines of Lua code. To be fair, I’m a heavy customizer in
general, and my VS Code configuration was actually longer than either of those!
But I’ll happily admit that the VS Code out-of-the-box experience was much
better.</p></div> <div class="paragraph"><p>I looked at several so-called Neovim “distributions” (preconfigured setups).
I won’t go into details of the comparison, but LazyVim is the clear winner by
far, mostly because it balances a dead simple out-of-the-box experience with
relatively easy customization and configuration.</p></div> <div class="paragraph"><p>To be clear, LazyVim is Vim. The editing experience is identical. It’s not a
new iteration or version of Vim in the way that Neovim is. Instead, LazyVim is
a mindset; it starts with an agreement on what constitutes the best plugin
configurations for modern development, and a configuration that makes them work
well together (keeping different plugins&#39; keybindings from conflicting with
each other is one of the major painpoints when managing editor configurations
manually).</p></div> <div class="paragraph"><p>But if you go into using LazyVim with the mindset that this experience will be
better than any other editing experience you’ve worked with before, and accept
that you will be retraining some keyboard muscle memory, you will find that it
is extremely well thought out. In my experience, it is <em>exactly</em> what a
2020s-era modal editing experience should be.</p></div></div> <div class="sect2"><h3 id="_choosing_a_terminal"><a class="link" href="#_choosing_a_terminal">1.4. Choosing a Terminal</a></h3> <div class="paragraph"><p>If you’ve made it this far, you probably think you’re ready to install Neovim.
Actually, you still have one decision to make.</p></div> <div class="paragraph"><p>Neovim can run in a lot of different contexts (you can even run it inside Visual Studio
Code!) By default it is a terminal program, but there are also tons of GUIs
available. I have tried almost all of them, and, honestly, I don’t think they
have any inherent advantage over running Neovim directly in the terminal.</p></div> <div class="paragraph"><p>We will briefly discuss hooking up Neovim to a few GUIs much later in the book,
but for starting out, I recommend running Neovim in a terminal. A very good
terminal, to be specific.</p></div> <div class="paragraph"><p>To get the best Vim editing experience, you want a GPU accelerated terminal.
What’s that mean? Basically that you will be using the chip designed to render
photo-realistic video for rendering source code. Makes as much sense as using
it for artificial intelligence, right?</p></div> <div class="paragraph"><p>You will need to do your own research on the following options, so ask your
favourite search engine or the AI Chat bot de jour to help you decide:</p></div> <div class="dlist"><dl><dt class="hdlist1"><a href="https://sw.kovidgoyal.net/kitty/">Kitty Terminal</a></dt><dd><p>is my personal preference. I
find it well-documented, easy to configure, and fully featured.</p> </dd><dt class="hdlist1"><a href="https://alacritty.org">Alacritty</a></dt><dd><p>is probably the winner for raw speed, but
configuration is awkward, and it is less featureful.</p> </dd><dt class="hdlist1"><a href="https://wezfurlong.org/wezterm/index.html">Wezterm</a></dt><dd><p>has some very nifty
features, but I found the documentation to be lacking and had trouble getting
some aspects to work.</p> </dd><dt class="hdlist1"><a href="https://github.com/microsoft/terminal?tab=readme-ov-file">Windows Terminal</a></dt><dd><p>if
you are a Windows user, does claim to be GPU accelerated, though I found that
Neovim was occasionally unresponsive in it.</p> </dd><dt class="hdlist1"><a href="https://www.warp.dev">Warp Terminal</a></dt><dd><p>If you’re already on the Warp train and you
just can’t live without it, Neovim <em>will</em> work inside it. I found the
experience a little choppy, and I didn’t enjoy the look and feel of Warp (or
the fact that I needed to sign in to use it).</p></dd></dl></div> <div class="paragraph"><p>So install one or more of those until you find one that you like. You <em>can</em> use
other terminal emulators if you want to. You probably won’t even notice that
the experience is inferior, but I can promise that if you later switch to a
GPU-accelerated experience, you’ll notice the <em>improvement</em>.</p></div></div> <div class="sect2"><h3 id="_setting_up_your_terminal_font"><a class="link" href="#_setting_up_your_terminal_font">1.5. Setting Up Your Terminal Font</a></h3> <div class="paragraph"><p>LazyVim and its plugins look beautiful in a terminal, and you would almost not
believe that they are not a GUI application. To do this, they depend on special
fonts that have a TON of glyphs for coding related things. Most notably, this
gives you access to icons representing the type of file you have open, but also
provide nice frames and window-like behaviour in the terminal.</p></div> <div class="paragraph"><p>To get the best LazyVim experience, you will need to install one of these
special fonts and configure your terminal to use it. Indeed, you should really
be using one of these fonts in your terminal even if you aren’t a heavy Neovim
user. A lot of modern terminal apps (there’s a phrase, eh?) look better if you
have them installed.</p></div> <div class="paragraph"><p>Visit <a href="https://nerdfonts.com">Nerd Fonts</a> for more information. If you use Kitty,
you simply need to install the <code>NerdFontsSymbolsOnly</code> font, and it will automatically
pull symbols from that font if it can’t find them in your configured monospace
font. For other terminals, you will likely need to install and configure a &quot;patched&quot;
font as discussed on the Nerd Fonts site. There are many to choose from.</p></div> <div class="paragraph"><p>You can choose from many of the most popular programming fonts. Downloading and
installing them is very much operating system dependent, so I’ll leave the
guide on the Nerd Fonts website to explain it to you.</p></div></div> <div class="sect2"><h3 id="_install_neovim"><a class="link" href="#_install_neovim">1.6. Install Neovim</a></h3> <div class="paragraph"><p>Neovim works pretty much anywhere software can be installed, and it only relies
on standard system dependencies. The chief problem is that no matter which
operating system you use, you are spoiled for choice!</p></div> <div class="paragraph"><p>You can visit the <a href="https://neovim.io/">Neovim home page</a> and click the “Install
Now” button to get the latest instructions for your operating system of choice
(or of necessity) from the Neovim developers.</p></div> <div class="sect3"><h4 id="_which_version_should_i_install"><a class="link" href="#_which_version_should_i_install">1.6.1. Which Version Should I Install?</a></h4> <div class="paragraph"><p>Neovim development happens at a super fast pace compared to their release
cycle, so it is not uncommon for folks to run the latest nightly build. I have
only rarely encountered bugs in builds cut from the master branch on Github, so
it’s generally safe. I usually run off the latest stable release when it comes
out, and then when some new plugin update says “here’s a cool feature if you
use Neovim nightly,” I’ll install the latest Neovim build instead.</p></div> <div class="paragraph"><p>I suggest starting with the latest stable version of Neovim for now, which at
time of writing is 0.10.0. Avoid older instances if possible. LazyVim does tend
to add features from the nightly release, so if you start to get as excited
about this distro as I am, it will be a perfectly natural progression to switch
to the pre-release.</p></div></div> <div class="sect3"><h4 id="_windows"><a class="link" href="#_windows">1.6.2. Windows</a></h4> <div class="paragraph"><p>On Windows, I recommend using the Windows Subsystem for Linux (WSL) and doing
all development in there. WSL is way outside the scope of this book, but it is
well-documented by Microsoft and many online tutorials. Once you have chosen a
WSL-compatible Linux distribution, set it up, and have it running in your
chosen terminal, you can install Neovim using the Linux instructions below.</p></div> <div class="paragraph"><p>If you have a reason—or preference—to develop on native Windows, the easiest
thing to do is grab the MSI installer from the Releases section of the
<a href="https://github.com/neovim/neovim/">neovim/neovim</a> repository on GitHub.</p></div> <div class="paragraph"><p>If you already use Winget, Chocolatey, or Scoop to manage packages on your
Windows machine, there is a Neovim package in each of them.</p></div> <div class="paragraph"><p>Note that if you use Windows without WSL, you will also need to install a C
compiler in order to get treesitter support (this basically means better syntax
highlighting and code navigation support). This is, sadly, not a trivial task.
It is documented in the
<a href="https://github.com/nvim-treesitter/nvim-treesitter">nvim-treesitter/nvim-treesitter</a>
GitHub repo, so I won’t go into detail here.</p></div></div> <div class="sect3"><h4 id="_macos"><a class="link" href="#_macos">1.6.3. MacOS</a></h4> <div class="paragraph"><p>Most developers on MacOS use Homebrew so if you don’t have it already, I
recommend installing it by following the instructions at
<a href="https://brew.sh/">brew.sh</a>.</p></div> <div class="paragraph"><p>Once you have brew up and running, the command <code>brew install neovim</code> will
install Neovim.</p></div> <div class="paragraph"><p>If you want to live on the edge, <code>brew install --HEAD neovim</code> will install the
latest nightly version of Neovim, which is probably, but not guaranteed to be,
stable.</p></div> <div class="paragraph"><p>I find the brew experience to be much kinder than other MacOS installation
options for Neovim, so if you aren’t already a Homebrew user, I strongly
recommend setting it up. There are other open source tools that you
will want to install as we get deeper into the LazyVim journey, and brew will
be the easiest way to get them all.</p></div> <div class="paragraph"><p>If you don’t want to use Homebrew, things are a bit more annoying. The Neovim
dev team doesn’t maintain a MacOS installer, so you’ll have to download a
tarball and extract it, then link to the binary from somewhere on your system
path. If you don’t know what any of that means, honestly, use Homebrew, it’s
easier!</p></div></div> <div class="sect3"><h4 id="_linux"><a class="link" href="#_linux">1.6.4. Linux</a></h4> <div class="paragraph"><p>If Neovim isn’t available using your distribution’s default package manager,
you have a very strange Linux distribution, indeed!</p></div> <div class="paragraph"><p>So just run <code>sudo pacman -S neovim</code>, <code>sudo apt install neovim</code>, <code>sudo dnf
install neovim</code>, or the appropriate command for whichever more esoteric package
manager you prefer.</p></div> <div class="paragraph"><p>Some distros ship with painfully outdated Neovim versions, though. If you want
a nightly version, you may find the instructions on the <code>neovim/neovim</code> GitHub
Releases page, or will have to dig into your distro’s documentation.</p></div> <div class="paragraph"><p>You will also need to install a C compiler in the unlikely event that your
Linux distribution didn’t come with one. For most distros, just install the
<code>gcc</code> package and you should be good to go.</p></div></div></div> <div class="sect2"><h3 id="_try_neovim_raw_if_you_dare"><a class="link" href="#_try_neovim_raw_if_you_dare">1.7. Try Neovim Raw (If You Dare)</a></h3> <div class="paragraph"><p>Once you have Neovim installed, you can try it out by simply typing <code>nvim</code> (or
<code>nvim &lt;filename&gt;</code> to open a specific file) into the terminal you installed a
few sections ago. If Neovim is installed correctly and on your path, you’ll get
a visually unappealing editor that looks like it was forked from something
written in the 90s and had the express intent of looking like it was written
in the 70s.</p></div> <div class="paragraph"><p>So, at least it’s honest?</p></div> <div class="paragraph"><p>Unfortunately, you’re now trapped. To save you the frantic “how do I exit Vim”
Google search, the command to quit is <code>Escape</code> followed by the three characters <code>:q!</code>
followed by <code>Enter</code>. The whole sequence will therefore be
<code>&lt;Escape&gt;</code> <code>&lt;Colon&gt;</code> <code>q</code> <code>&lt;Exclamation&gt;</code> <code>&lt;Enter&gt;</code>.</p></div> <div class="paragraph"><p>Seriously, “How do I exit Vim” is one of the top three autocompletes on Google
for “How do I exit…​”. Apparently only a Samsung TV plus and full screen mode
on MacOS are less intuitive to get out of! We’ll understand why this incantation
works after we dig deeper into the vim mental model and command mode.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">If you want to, you can run the command <code>&lt;Escape&gt;:Tutor&lt;Enter&gt;</code> to
open an interactive text file that you can read through and edit while
learning the basics of Neovim. I do recommend doing this at some point, but
now may not be the right time. A lot of things that are “normal” in the
Vim tutor are different (better!) using LazyVim. The rest of this book does
<strong>not</strong> assume you have gone through the tutor.</td></tr></tbody></table></div></div> <div class="sect2"><h3 id="_install_lazyvim"><a class="link" href="#_install_lazyvim">1.8. Install LazyVim</a></h3> <div class="paragraph"><p>Now that you have Neovim up and running, let’s get it configured to look like
it was developed this century.</p></div> <div class="paragraph"><p>Installing LazyVim requires a bit of work with <code>git</code>. Since you are reading
this book, I am assuming you are a software developer and therefore somewhat
familiar with <code>git</code>.</p></div> <div class="paragraph"><p>The git commands to install LazyVim are more or less the same for the various
operating systems, though paths and environment variables are slightly different.</p></div> <div class="sect3"><h4 id="_start_with_a_clean_slate"><a class="link" href="#_start_with_a_clean_slate">1.8.1. Start With a Clean Slate</a></h4> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">If you already have a Neovim config and you want to try LazyVim without
losing your existing configuration, set the <code>NVIM_APPNAME=lazyvim</code> environment
variable. Skip to the <code>Clone the starter template</code> section below, and
clone into <code>~/.config/lazyvim</code> instead of <code>~/.config/nvim</code>. If you want
to make the changes permanent, either set <code>NVIM_APPNAME</code> in your
shell’s startup file or rename that <code>lazyvim</code> config folder to <code>nvim</code>.</td></tr></tbody></table></div> <div class="paragraph"><p>First, remove or back up all existing Neovim state. This step is largely
optional if you’ve never used Neovim before, but I recommend making sure the
following directories have been removed or moved:</p></div> <div class="sect4"><h5 id="_clean_up_windows_with_wsl_macos_and_linux"><a class="link" href="#_clean_up_windows_with_wsl_macos_and_linux">Clean up: Windows with WSL, MacOS, and Linux</a></h5> <div class="paragraph"><p>Remove or back up (with <code>mv</code> instead of <code>rm</code>) the following directories:</p></div> <div class="listingblock"><div class="title">Listing 1. Unix Cleanup Commands</div> <div class="content"><pre class="pygments highlight"><code data-lang="console"><span></span><span class="tok-gp">$ </span>rm<span class="tok-w"> </span>-rf<span class="tok-w"> </span>~/.config/nvim
<span class="tok-gp">$ </span>rm<span class="tok-w"> </span>-rf<span class="tok-w"> </span>~/.local/share/nvim
<span class="tok-gp">$ </span>rm<span class="tok-w"> </span>-rf<span class="tok-w"> </span>~/.local/state/nvim
<span class="tok-gp">$ </span>rm<span class="tok-w"> </span>-rf<span class="tok-w"> </span>~/.cache/nvim</code></pre></div></div></div> <div class="sect4"><h5 id="_clean_up_windows_without_wsl"><a class="link" href="#_clean_up_windows_without_wsl">Clean Up: Windows Without WSL</a></h5> <div class="paragraph"><p>The location of the config and data folders is a little bit different on
Windows, but the idea is the same as for the Unix systems. Just use Powershell
commands instead of the Unix core-tools:</p></div> <div class="listingblock"><div class="title">Listing 2. Powershell Cleanup Commands</div> <div class="content"><pre class="pygments highlight"><code data-lang="console"><span></span><span class="tok-gp">$ </span>Move-Item<span class="tok-w"> </span><span class="tok-nv">$env</span>:LOCALAPPDATA<span class="tok-se">\\n</span>vim<span class="tok-w"> </span><span class="tok-nv">$env</span>:LOCALAPPDATA<span class="tok-se">\\n</span>vim.bak
<span class="tok-gp">$ </span>Move-Item<span class="tok-w"> </span><span class="tok-nv">$env</span>:LOCALAPPDATA<span class="tok-se">\\n</span>vim-data<span class="tok-w"> </span><span class="tok-nv">$env</span>:LOCALAPPDATA<span class="tok-se">\\n</span>vim-data.bak</code></pre></div></div></div></div> <div class="sect3"><h4 id="_install_other_recommended_dependencies"><a class="link" href="#_install_other_recommended_dependencies">1.8.2. Install Other Recommended Dependencies</a></h4> <div class="paragraph"><p>I strongly recommend installing <code>lazygit</code>, <code>ripgrep</code> and <code>fd</code>, which are used
by LazyVim to provide enhanced git, string searching, and file searching
behaviours. Most operating system package managers will have these available
for trivial installation. You can find more specific installation instructions
on their respective GitHub repositories:</p></div> <div class="ulist"><ul><li><p><a href="https://github.com/jesseduffield/lazygit">jesseduffield/lazygit</a></p></li> <li><p><a href="https://github.com/BurntSushi/ripgrep">BurntSushi/ripgrep</a></p></li> <li><p><a href="https://github.com/sharkdp/fd">sharkdp/fd</a></p></li></ul></div></div> <div class="sect3"><h4 id="_clone_the_lazyvim_starter_template"><a class="link" href="#_clone_the_lazyvim_starter_template">1.8.3. Clone The LazyVim Starter Template</a></h4> <div class="paragraph"><p>You’ll use a <code>git clone</code> command to download the starter template and copy it
into the user config directory for Neovim, then remove the <code>.git</code> folder.</p></div> <div class="paragraph"><p>The starter is just that: a starter. So you won’t ever need to pull changes
from this repo. Instead, LazyVim will manage updating itself and all its
plugins for you. The only reason the starter is a git repo is that it’s easy
for the LazyVim maintainers to maintain. From your point of view you’re just
downloading the current state of the repo and don’t need to know about the past
or future state.</p></div> <div class="sect4"><h5 id="_clone_starter_repository_wsl_macos_and_linux"><a class="link" href="#_clone_starter_repository_wsl_macos_and_linux">Clone Starter Repository: WSL, MacOS, and Linux</a></h5> <div class="paragraph"><p>On Unix systems, use these commands:</p></div> <div class="listingblock"><div class="title">Listing 3. Unix Clone Starter</div> <div class="content"><pre class="pygments highlight"><code data-lang="console"><span></span><span class="tok-gp">$ </span>git<span class="tok-w"> </span>clone<span class="tok-w"> </span>https://github.com/LazyVim/starter<span class="tok-w"> </span>~/.config/nvim
<span class="tok-gp">$ </span>rm<span class="tok-w"> </span>-rf<span class="tok-w"> </span>~/.config/nvim/.git</code></pre></div></div></div> <div class="sect4"><h5 id="_clone_starter_repository_windows_without_wsl"><a class="link" href="#_clone_starter_repository_windows_without_wsl">Clone Starter Repository: Windows without WSL</a></h5> <div class="paragraph"><p>On native Windows, use these commands:</p></div> <div class="listingblock"><div class="title">Listing 4. Powershell Clone Starter</div> <div class="content"><pre class="pygments highlight"><code data-lang="console"><span></span><span class="tok-gp">$ </span>git<span class="tok-w"> </span>clone<span class="tok-w"> </span>https://github.com/LazyVim/starter<span class="tok-w"> </span><span class="tok-nv">$env</span>:LOCALAPPDATA<span class="tok-se">\\n</span>vim
<span class="tok-gp">$ </span>Remove-Item<span class="tok-w"> </span><span class="tok-nv">$env</span>:LOCALAPPDATA<span class="tok-se">\\n</span>vim<span class="tok-se">\\.</span>git<span class="tok-w"> </span>-Recurse<span class="tok-w"> </span>-Force</code></pre></div></div></div></div></div> <div class="sect2"><h3 id="_the_dashboard"><a class="link" href="#_the_dashboard">1.9. The Dashboard</a></h3> <div class="paragraph"><p>Ok, you have completed the most difficult section of this book and you’re
finally ready to start LazyVim! Use the same terminal command as before:
<code>nvim</code>.</p></div> <div class="paragraph"><p>You’ll see a flurry of activity as LazyVim sets everything up and downloads the
plugins it thinks are essential. You may see it compile and install a bunch of
treesitter grammars; if you see a message to “Show More” use <code>G</code> (i.e.
<code>Shift+g</code>) to skip to the end.</p></div> <div class="paragraph"><p>Once everything is installed, you’ll see a summary of the plugins that were
installed inside a window managed by a plugin called Lazy.nvim that we will
discuss shortly. For now, once you get to the Lazy.nvim screen, you can press
the <code>q</code> key. The plugin will interpret this as “quit Lazy.nvim” and the window
will close.</p></div> <div class="paragraph"><p>Now you can see the LazyVim dashboard, which is the first thing you’ll
see every time you start LazyVim. It’s a little more friendly than the
out of the box Neovim experience:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-1/dashboard-dark.png" alt="dashboard dark"/></div> <div class="title">Figure 1. LazyVim Dashboard</div></div> <div class="paragraph"><p>As you can see, there are several commands that allow you to interact with the
dashboard via a single keystroke. Most importantly, of course, is the <code>q</code>
keystroke to quit!</p></div> <div class="paragraph"><p>Most of these options are self-explanatory, but we’ll discuss a few of them more
deeply in later chapters.</p></div></div> <div class="sect2"><h3 id="_lazy_nvim_plugin_manager"><a class="link" href="#_lazy_nvim_plugin_manager">1.10. Lazy.nvim Plugin Manager</a></h3> <div class="paragraph"><p>When you first open LazyVim, it checks for any plugins that are available to be
updated, and gives you an overview in a message notification that will look
something like this:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-1/plugin-updates-dark.png" alt="plugin updates dark"/></div> <div class="title">Figure 2. Plugin Update Notification</div></div> <div class="paragraph"><p>Because Neovim is pretty barebones by default, LazyVim ships with a ton of
useful plugins ready to go. And there’s a good chance they are out of date
because plugin development in the Neovim world happens at a ridiculously fast
pace.</p></div> <div class="paragraph"><p>In the old old days, plugin management was a completely manual process. In the
less old, but still old days, it was managed by a variety of plugins that did
the job but felt like they were lacking something.</p></div> <div class="paragraph"><p>Then came the plugin manager called Lazy.nvim, created by the same person
that later created LazyVim. The Lazy.nvim plugin manager should not be confused
with LazyVim itself, though both are maintained by the same person. Lazy.nvim
is strictly a plugin manager, whereas LazyVim is a collection of plugins and
configurations that ship together. One of those plugins is Lazy.nvim.</p></div> <div class="paragraph"><p>Lazy.nvim has a ton of slick features, most notably loading plugins only when
needed (hence the name “Lazy”) so that your editor is lightning fast to start
up. It also has a nice UI for managing plugin installation and updates.</p></div> <div class="paragraph"><p>You can access this UI from the dashboard simply by pressing the <code>l</code> key, which
is labelled in the dashboard as <code>Lazy</code>. The label should probably be <code>Lazy
PLugin Manager</code> to make it a bit clearer, but now you know what <code>Lazy</code> means so
you won’t forget.</p></div> <div class="paragraph"><p>If you are not actively displaying the dashboard, you can show the plugin
manager at any time by entering Space mode. We’ll cover Space mode in detail in
the next chapter, but for now: First make sure you are in Normal mode by
checking the lower left corner of the active window. If not, press <code>Esc</code> to
enter Normal mode. Then press <code>Space</code> to enter Space mode, followed by <code>l</code> to
bring up the Lazy.nvim plugin manager.</p></div> <div class="paragraph"><p>(Don’t worry, those keybindings will all be second nature within a week.)</p></div> <div class="paragraph"><p>The Lazy.nvim plugin manager interface looks like this:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-1/plugin-manager-dark.png" alt="plugin manager dark"/></div> <div class="title">Figure 3. Lazy.nvim Plugin Manager</div></div> <div class="paragraph"><p>The window that has popped up is called a floating window. You’ll see these in
a few different situations, usually when there is interactive data that you
need to work with. This particular floating window comes with its own set of
keybindings. The keybindings are listed across the top, and pay attention to
the fact that all of them are capitalized, so you need to use the <code>Shift</code> key
when invoking them.</p></div> <div class="paragraph"><p>Typically, the only Lazy.nvim keybinding I use is <code>S</code>, for <code>Sync</code>. This is
equivalent to  running install, clean, and update in a single action. It
guarantees that the versions of plugins that are actually installed are exactly
consistent with the ones specified in the LazyVim configuration.</p></div> <div class="paragraph"><p>So when the “Plugin Updates” notification pops up, just press
<code>Space-l</code> and then <code>S</code> and wait for the sync to complete. Then press <code>q</code> to
close the Lazy.nvim Plugin mode and floating window and return to what you were
doing.</p></div></div> <div class="sect2"><h3 id="_a_note_on_managing_dot_files"><a class="link" href="#_a_note_on_managing_dot_files">1.11. A Note on Managing Dot Files</a></h3> <div class="paragraph"><p>If you work on multiple different computers, you’ll quickly find that you don’t
want to set up your LazyVim configuration separately on all of them. LazyVim
does not have the equivalent of VS Code’s “settings sync”, though such plugins
exist.</p></div> <div class="paragraph"><p>The alternative I recommend is to store your config files in a git repository.
You’ll probably find there are a few other files you want to keep in there such
as your terminal’s config file, your <code>.gitconfig</code> and <code>.zshrc</code> / <code>.bashrc</code> /
<code>.config/fish/config.fish</code>.</p></div> <div class="paragraph"><p>If you use GitHub Codespaces, you may already manage some dot files with git.
If not, my personal recommendation is to follow the advice in the excellent
blog article <a href="https://www.atlassian.com/git/tutorials/dotfiles">Dotfiles: Best
way to store in a bare git repository</a> from the Atlassian blog.</p></div> <div class="paragraph"><p>Before distributions like LazyVim came along, it was very common for people to
store their Vim configuration in a public repository, and borrow ideas from
each other. This practice is not quite dead, and you can find my own dot files
on GitHub in the
<a href="https://github.com/dusty-phillips/dotfiles">dusty-phillips/dotfiles</a> repository.</p></div></div> <div class="sect2"><h3 id="_summary"><a class="link" href="#_summary">1.12. Summary</a></h3> <div class="paragraph"><p>In this chapter, we briefly discussed the history of Vim, Neovim, and LazyVim,
and why they are still relevant today. Then we covered the importance of GPU
accelerated terminals and Nerd Fonts.</p></div> <div class="paragraph"><p>We figured out how to install Neovim and its dependencies under whichever
operating system(s) you use, and finally, installed LazyVim from its starter
template.</p></div> <div class="paragraph"><p>In the next chapter, we’ll discuss Vim’s core feature: Modal Editing, and dig
into the many things you can do with your keyboard in LazyVim.</p></div></div></div>`;return{c(){e=d("div"),e.innerHTML=i,this.h()},l(a){e=c(a,"DIV",{class:!0,"data-svelte-h":!0}),h(e)!=="svelte-12f0p88"&&(e.innerHTML=i),this.h()},h(){p(e,"class","sect1")},m(a,s){m(a,e,s)},p:t,i:t,o:t,d(a){a&&u(e)}}}class b extends r{constructor(e){super(),l(this,e,null,y,n,{})}}export{b as component,w as universal};
