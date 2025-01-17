import{s as n,n as s}from"../chunks/scheduler.seBsrkbn.js";import{S as d,i as l,e as c,c as r,l as p,m as h,g,d as u}from"../chunks/index.Dwxb9V0m.js";function m(){return{title:"Chapter 15: Source Control",description:"LazyVim ships with a variety of tools for interacting with git repositories.",keywords:"vim, lazyvim, neovim, tutorial, course, book, tips, source control, version control, git"}}const w=Object.freeze(Object.defineProperty({__proto__:null,load:m},Symbol.toStringTag,{value:"Module"}));function f(o){let e,a=`<h2 id="_source_control"><a class="link" href="#_source_control">Chapter 15. Source Control</a></h2> <div class="sectionbody"><div class="paragraph"><p>LazyVim ships with several features to manage your source control history, and
there are some excellent third-party plugins you can use as well. Some of these
plugins work with multiple version control systems, while others are
git-centric. This book will assume you use git because, well, you probably do,
even if you use other systems as well.</p></div> <div class="sect2"><h3 id="_the_integrated_terminal_a_rant"><a class="link" href="#_the_integrated_terminal_a_rant">15.1. The Integrated Terminal (A Rant)</a></h3> <div class="paragraph"><p>For reasons I cannot explain, Neovim ships with a terminal emulator. It is
bizarre to me that an editor that <em>runs in a terminal</em> ships a terminal. It is
literally possible to open a terminal, open Neovim, open a terminal in Neovim,
and open Neovim in a terminal in Neovim.</p></div> <div class="paragraph"><p>Add some nested ssh sessions if you really want to make a mess.</p></div> <div class="paragraph"><p>I don’t need a terminal in my editor. I have a terminal already, an excellent
one. I just use Kitty splits, tabs, and windows when I need a new terminal
window. The smart-splits plugin allows me to switch between editor and terminal
seamlessly and Kitty even manages installing itself over ssh for me.</p></div> <div class="paragraph"><p>Or I press <code>Control-z</code>, which is the traditional way Vim users used to access a
terminal. It is a shortcut that I really wish hadn’t gone out of style.
Pressing <code>Control-z</code> “suspends” Neovim. If you’re not in the know, you’ll think it
closed your editor without saving, because the window disappears and returns
you to your terminal.</p></div> <div class="paragraph"><p>But fear not! It is merely suspended, as indicated by the <code>&#39;nvim&#39; has stopped</code>
message in the output:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-15/suspended-neovim-dark.png" alt="suspended neovim dark"/></div> <div class="title">Figure 74. Suspended Neovim</div></div> <div class="paragraph"><p>As this screenshot also shows, you can see the list of stopped (or running)
background jobs using the <code>jobs</code> command in any shell. The <code>fg</code> (short for
foreground) command starts the suspended Neovim process back up. If you have
multiple suspended jobs, the <code>fg %#</code> command can be used to choose a specific
job id (e.g. <code>fg %1</code> will run the job with id <code>1</code> in the first column of the
<code>jobs</code> output).</p></div> <div class="paragraph"><p>This is not a Neovim-specific feature. The <code>Control-z</code> trick works with (almost)
any long-running shell command. You can even set a suspended task to keep
running in the background by using the <code>bg</code> command instead of <code>fg</code> (though if
the background job prints to stdout you’ll quickly become confused).</p></div> <div class="paragraph"><p>Between terminal splits and <code>Control-z</code>, there’s just no need for the editor to
have its own terminal embedded with it. Still, Neovim ships with an integrated
terminal, so I should probably explain how to use it.</p></div></div> <div class="sect2"><h3 id="_the_integrated_terminal_for_real_this_time"><a class="link" href="#_the_integrated_terminal_for_real_this_time">15.2. The Integrated Terminal (For Real This Time)</a></h3> <div class="paragraph"><p>You can pop up a terminal at any time in Lazyvim using the keybinding <code>Control-/</code>.
It will appear in front of all your other editor windows (unless you have
the Edgy extra enabled, in which case it will show up in the bottom half of the
editor) and can be dismissed with <code>Control-/</code> again.</p></div> <div class="paragraph"><p>Neovim’s terminal window is a super weird hybrid terminal and Vim window. Once
the terminal is open, you can use Normal mode commands to navigate around it.</p></div> <div class="paragraph"><p>However, unlike Insert mode, the <code>Escape</code> key WILL NOT put you in Normal mode,
even though your fingers are, by now, conditioned to hit <code>Escape</code> reflexively.
This actually makes sense because <code>Escape</code> is a common key to need to type in
various terminal programs, so it would be rude for Neovim to steal it. LazyVim
has set up the keybinding <code>&lt;Escape&gt;&lt;Escape&gt;</code> (press <code>Escape</code> twice quickly) to
switch to normal mode from terminal mode, or you can use the hard-to-type
default incantation <code>&lt;Control-\\&gt;&lt;Control-n&gt;</code>.</p></div> <div class="paragraph"><p>Once in Normal mode, you can navigate anywhere in the Terminal window using any
of the navigation keys including Seek and Search modes. This can occasionally
be helpful if you need to yank some outputted text to the clipboard.</p></div> <div class="paragraph"><p>Pressing a key such as <code>a</code> or <code>i</code> will send you back to “Terminal mode” which
effectively just sends every keystroke to the program currently running in the
terminal (probably your shell).</p></div> <div class="paragraph"><p>Annoyingly, this means you can’t use Normal mode to reposition your cursor on
the command line; it will go back to wherever it was when you last entered
normal mode.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">If you want to use Vim Normal modes to edit your command line (in any
terminal; not just inside Neovim) configure your shell to use “Vi mode.” All
modern shells support some version of this, and it usually allows you to use
<code>Escape</code> to put the shell in a pseudo-normal mode. It gives you commands like
<code>w</code> and <code>b</code> for navigation and basic line-editing commands like <code>d</code> and <code>c</code>
to edit the command line.</td></tr></tbody></table></div> <div class="paragraph"><p>There are third-party plugins that try to make the terminal experience more
consistent and enjoyable, but in my opinion, they are not worth the trouble. I
can just press <code>cmd-enter</code> to get a new Kitty terminal pane and have a
perfectly normal terminal experience.</p></div></div> <div class="sect2"><h3 id="_checking_your_git_status"><a class="link" href="#_checking_your_git_status">15.3. Checking Your Git Status</a></h3> <div class="paragraph"><p>Lazyvim is preconfigured with a handful of carefully configured plugins that
make your version control life much better.</p></div> <div class="paragraph"><p>The simplest of these uses your configured file picker (Telescope or
Fzf.lua, as discussed in Chapter 4) to list files that have changed since the
last commit. This will behave similarly to other file picker operations, except
it only lists files that have modifications in git.</p></div> <div class="paragraph"><p>You can open it with <code>&lt;Space&gt;gs</code>. I use it a lot for switching between files
related to whatever feature I am currently working on, and actually prefer
it to the buffer picker (which only shows opened files) we discussed in
Chapter 9.</p></div> <div class="paragraph"><p>The popup behaves slightly differently depending on whether you use Telescope
or Fzf.lua. I’ll explain with Telescope first, and mention how Fzf.lua is
different afterwards. (Please, can we just collectively settle on one best
picker and use it?)</p></div> <div class="sect3"><h4 id="_with_telescope"><a class="link" href="#_with_telescope">15.3.1. With Telescope</a></h4> <div class="paragraph"><p>This Telescope screenshot shows that I have modified two files since my last
commit:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-15/telescope-gitstatus-dark.png" alt="telescope gitstatus dark"/></div> <div class="title">Figure 75. Git Status Picker</div></div> <div class="paragraph"><p>The preview pane shows the diff of lines I have added and removed. On the left,
you can see that I have <code>page.svx</code> focused, and a preview of some of the changes
in this file on the right.</p></div> <div class="paragraph"><p>The confusing bit to pay attention to is the first two columns. They indicate
your git status, and their meaning can be devilishly hard to remember. The
symbols themselves are straightforward:</p></div> <div class="ulist"><ul><li><p><code>~</code> means the file on that line contains modifications since the last commit</p></li> <li><p><code>-</code> means it has been deleted</p></li> <li><p><code>?</code> means it is an untracked file (has been added to the working directory
but not staged or committed)</p></li> <li><p><code>+</code> means it is a new file that has been staged in git</p></li></ul></div> <div class="paragraph"><p>If the sign shows up in the <em>first</em> column, it means the file has been staged
and will be included in the next commit. If it is in the <em>second</em> column, then it
means the file is not yet staged. If a <code>~</code> is in both columns, some parts of it
have been staged and some parts have not.</p></div> <div class="paragraph"><p>I had to use this picker quite a few times before I could remember which of
column 1 or column 2 means “staged”. Worse, if all or none of the files are
staged it can be hard to tell which column is empty.</p></div> <div class="paragraph"><p>In addition to allowing you to effectively view your git status, this picker
also allows you to <em>stage</em> entire files. To do so, focus a file and hit the
<code>&lt;Tab&gt;</code> key. If it is staged it will become unstaged and vice versa, moving
the symbol between the first and second columns.</p></div></div> <div class="sect3"><h4 id="_with_fzf_lua"><a class="link" href="#_with_fzf_lua">15.3.2. With Fzf.lua</a></h4> <div class="paragraph"><p>Fzf.lua behaves similarly, but not identically to Telescope. If you’ve
installed the Fzf.lua extra, the same keybinding (<code>&lt;Space&gt;gs</code>) pops up an Fzf.lua
window instead :</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-15/fzf-gitstatus-dark.png" alt="fzf gitstatus dark"/></div> <div class="title">Figure 76. Git Status in FzF.lua</div></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">Ensure the delta-pager CLI tool is installed to get the pretty diffs.</td></tr></tbody></table></div> <div class="paragraph"><p>The main difference is that you use the left and right arrow keys to stage or
unstage a file instead of <code>Tab</code>, and you can additionally use the <code>Control-x</code>
keybinding to reset an entire file to the last commit state. Unlike Telescope,
these keybindings are helpfully written across the top of the picker so you
don’t have to memorize them.</p></div> <div class="paragraph"><p>The two columns are labelled <code>+</code> and <code>-</code>. I’m not sure why those symbols were
chosen, as they don’t reflect whether files or lines are added or deleted. The
<code>+</code> column holds files that have been staged to go in the next commit, while
the <code>-</code> column holds a status for files that have changed but have not yet been
staged. This is the same as Telescope, but it’s a little bit clearer which is
which with the heading symbols on there.</p></div></div> <div class="sect3"><h4 id="_other_pickers"><a class="link" href="#_other_pickers">15.3.3. Other Pickers</a></h4> <div class="paragraph"><p>Telescope and Fzf.lua both come with pickers to view and search commit history
(<code>&lt;Space&gt;gc</code>), kind of like a log browser, and to check out a branch. The
latter doesn’t have a keybinding for some reason, but you can bind one to
<code>:Telescope git_branches</code> or <code>:FzfLua git_branches</code> if you like the picker UI
for this task.</p></div> <div class="paragraph"><p>There are a variety of less commonly-used git-related pickers you can find by
typing either <code>:FzfLua</code> or <code>:Telescope</code> and then <code>Enter</code>. This shows a list
of all installed pickers. Type <code>git</code> to filter down to the git specific ones.</p></div></div></div> <div class="sect2"><h3 id="_git_files_in_neo_tree"><a class="link" href="#_git_files_in_neo_tree">15.4. Git Files in Neo-tree</a></h3> <div class="paragraph"><p>Neo-tree also has a Git status viewer. You can open it with <code>&lt;Space&gt;ge</code>, where
<code>e</code> means “explore”. It has the advantage of displaying any changed files
inside a folder hierarchy. Here are the same two files from the previous
example as rendered in Neo-tree:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-15/neotree-gitstatus-dark.png" alt="neotree gitstatus dark"/></div> <div class="title">Figure 77. Git Files in Neo-tree</div></div> <div class="paragraph"><p>To stage and unstage a file with Neo-tree, use <code>ga</code> (git add) and <code>gu</code> (git
unstage) while your cursor is over that line. The <code>A</code> keybinding will
stage all unstaged files.</p></div> <div class="paragraph"><p>You can also use <code>gc</code> to commit the current state. This pops up a crappy little
text entry window that is absolutely not suitable for typing a proper-length
commit message, so I suggest avoiding it.</p></div> <div class="paragraph"><p>Use <code>gp</code> to push the current branch to the remote repository. I recommend using
the <code>lazygit</code> integration discussed later instead, but these commands are
available if you spend a lot of time in Neo-tree.</p></div></div> <div class="sect2"><h3 id="_status_of_the_currently_focused_file"><a class="link" href="#_status_of_the_currently_focused_file">15.5. Status of the Currently Focused File</a></h3> <div class="paragraph"><p>Every buffer has a couple subtle indications of the changes in that file.
Consider this screenshot:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-15/git-signs-dark.png" alt="git signs dark"/></div> <div class="title">Figure 78. Git Status in Signs Column</div></div> <div class="paragraph"><p>Notice the left sidebar, to the right of the line numbers. It contains a green
bar, a small red triangle, and a short orange bar. These indicators show
that lines have been added, removed, and modified, respectively.</p></div> <div class="paragraph"><p>Additionally, in the status bar, just to the left of the file progress
indicator we see these icons, which summarize the same information:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-15/git-statusbar-dark.png" alt="git statusbar dark"/></div> <div class="title">Figure 79. Git Status in Status Bar</div></div></div> <div class="sect2"><h3 id="_staging_from_the_editor"><a class="link" href="#_staging_from_the_editor">15.6. Staging From the Editor</a></h3> <div class="paragraph"><p>You can add files to git’s index (so they are ready to commit) right from the
editor. The <code>&lt;Space&gt;gh</code> menu (mnemonic is “<strong>g</strong>it <strong>h</strong>unks”) has a bunch of
interesting subcommands:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-15/hunks-menu-dark.png" alt="hunks menu dark"/></div> <div class="title">Figure 80. Git Hunks Menu</div></div> <div class="paragraph"><p>You can use <code>&lt;Space&gt;ghS</code> to stage an entire file, which would move it to the
left column in the git status pickers we discussed above. If you want to stage
a patch containing a subset of your changes, navigate to the hunk you want to stage
(<code>[h</code> and <code>]h</code> are super handy for this) and hit <code>&lt;Space&gt;ghs</code>.</p></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content">Most people have an unfortunate habit of just committing everything instead of
properly curating their history, but if you are one of the rare folks who uses
git properly (please be that person), you’ll use the <code>&lt;Space&gt;ghs</code> command a lot.</td></tr></tbody></table></div> <div class="paragraph"><p>You can also reset a hunk (effectively making it the same as it was at the time
the last commit was made) using <code>&lt;Space&gt;ghr</code>. If you want to reset the entire
file, use the “but bigger” <code>&lt;Space&gt;ghR</code>. Resetting is a destructive operation, so
be careful (though <code>u</code> for <strong>u</strong>ndo can usually get you back to where you were).</p></div> <div class="paragraph"><p>If you accidentally stage a hunk, use <code>&lt;Space&gt;ghu</code> to unstage it. Unlike reset,
this won’t change the file; the changes will still be there; they just
won’t be staged anymore.</p></div></div> <div class="sect2"><h3 id="_git_information_keybindings"><a class="link" href="#_git_information_keybindings">15.7. Git Information Keybindings</a></h3> <div class="paragraph"><p>The blame line (<code>&lt;Space&gt;ghb</code>) command shows the commit that last changed the line the
cursor is currently on, useful for answering the all-important question “Why
on Earth did I do that?”</p></div> <div class="paragraph"><p>Preview hunk (<code>&lt;Space&gt;ghp</code>) temporarily renders the original and changed
version of a hunk (one above the other) so you can see exactly what changed.</p></div> <div class="paragraph"><p>The <code>Diff this</code> (<code>&lt;Space&gt;ghd</code> and <code>&lt;Space&gt;ghD</code>)commands do the same except in a
side-by-side view that we will discuss later in this chapter.</p></div> <div class="paragraph"><p>Personally, I use many of these commands too often for the number of keystrokes
required to pop them up. So I’ve created an <code>extend-gitsigns.lua</code> file in my
plugins directory that copies them from <code>&lt;Space&gt;gh</code> to <code>&lt;Space&gt;h</code>:</p></div> <div class="listingblock"><div class="title">Listing 48. Git Hunks Menu Keymaps</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-s2">&quot;lewis6991/gitsigns.nvim&quot;</span><span class="tok-p">,</span>
  <span class="tok-n">keys</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;&lt;leader&gt;hb&quot;</span><span class="tok-p">,</span>
      <span class="tok-s2">&quot;&lt;cmd&gt;Gitsigns blame_line&lt;cr&gt;&quot;</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Blame Line&quot;</span>
    <span class="tok-p">},</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;&lt;leader&gt;hs&quot;</span><span class="tok-p">,</span>
      <span class="tok-s2">&quot;&lt;cmd&gt;Gitsigns stage_hunk&lt;cr&gt;&quot;</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Stage Hunk&quot;</span>
    <span class="tok-p">},</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;&lt;leader&gt;hS&quot;</span><span class="tok-p">,</span>
      <span class="tok-s2">&quot;&lt;cmd&gt;Gitsigns stage_buffer&lt;cr&gt;&quot;</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Stage Buffer&quot;</span>
    <span class="tok-p">},</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;&lt;leader&gt;hr&quot;</span><span class="tok-p">,</span>
      <span class="tok-s2">&quot;&lt;cmd&gt;Gitsigns reset_hunk&lt;cr&gt;&quot;</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Reset Hunk&quot;</span>
    <span class="tok-p">},</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;&lt;leader&gt;hR&quot;</span><span class="tok-p">,</span>
      <span class="tok-s2">&quot;&lt;cmd&gt;Gitsigns reset_buffer&lt;cr&gt;&quot;</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Reset Buffer&quot;</span>
    <span class="tok-p">},</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;&lt;leader&gt;hu&quot;</span><span class="tok-p">,</span>
      <span class="tok-s2">&quot;&lt;cmd&gt;Gitsigns undo_stage_hunk&lt;cr&gt;&quot;</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Undo Stage Hunk&quot;</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>I got these by copying them from the git-signs config on the LazyVim website
and converting from <code>map</code> calls to the <code>keys =</code> format.</p></div></div> <div class="sect2"><h3 id="_lazygit"><a class="link" href="#_lazygit">15.8. Lazygit</a></h3> <div class="paragraph"><p>Lazygit (which, despite sharing the <code>Lazy</code> namespace with LazyVim and
Lazy.nvim, is by an entirely different developer) is a terminal UI tool for
interacting with git. It is a separate program that you will need to install
with your operating system’s package manager (e.g. <code>brew install lazygit</code>) if
you want to use it.</p></div> <div class="paragraph"><p>LazyVim is preconfigured to show lazygit in a terminal window using the
keybinding <code>&lt;Space&gt;gg</code>. I won’t go into all the details of how to use this
third-party program. It can do almost anything git can do in a much more
user-friendly interface.</p></div> <div class="paragraph"><p>Lazygit takes a bit of study to get used to, but it has helpful menus and
mnemonics for its keybindings so the learning curve is relatively gentle.</p></div> <div class="paragraph"><p>Ironically, I used lazygit (in its standalone format from the command line) a
lot more before I started using LazyVim. I used to stage changes using lazygit,
but now I use the <code>&lt;Space&gt;h</code> menu we just covered instead.</p></div> <div class="paragraph"><p>I also now do most of my git work with the exceptional
<a href="https://graphite.dev">Graphite</a> tool, which simplifies many of the flows I used
to use lazygit for (especially rebasing). I still use lazygit every day; I just
don’t have it open 100% of the time like I used to.</p></div></div> <div class="sect2"><h3 id="_diff_mode"><a class="link" href="#_diff_mode">15.9. Diff Mode</a></h3> <div class="paragraph"><p>Neovim comes with a powerful, but slightly hard-to-learn diff viewing
mode. It shows “before” and “after” files side by side and can even be
configured to show the “parent” and changed state if you want a fancy merge
tool.</p></div> <div class="paragraph"><p>There are several different ways to get yourself into Diff mode. The basic way
is to specify it when you open two files on the command line:</p></div> <div class="listingblock"><div class="title">Listing 49. Open In Diff Mode</div> <div class="content"><pre class="pygments highlight"><code data-lang="console"><span></span><span class="tok-go">nvim -d file1 file2</span></code></pre></div></div> <div class="paragraph"><p>This opens the indicated files side by side in a linked diff view. Most often,
you won’t have two separate files, though. Instead, you’ll want to see the
difference between the current file and the staging index, which you can do
with the shortcut <code>&lt;Space&gt;ghd</code>. Or use <code>&lt;Space&gt;ghD</code> to show the differences
between the current file and the last commit, regardless of what has been
staged.</p></div> <div class="admonitionblock important"><table><tbody><tr><td class="icon"><iconify-icon class="icon-important" icon="fa6-solid:triangle-exclamation"></iconify-icon></td> <td class="content">Once you are done operating in Diff mode, it can be tricky to
get back to the normal file. The issue is that when a file is in <code>diff</code> mode,
it stays that way, even if other windows are opened or closed. The secret is
to use the <code>:diffoff</code> command, which will disable “diff view” for the current
buffer. This doesn’t close the two side-by-side windows, though; you’ll need
to use normal window and buffer management tooling such as <code>&lt;Space&gt;bd</code> and
<code>&lt;Control-w&gt;q</code> to do that.</td></tr></tbody></table></div> <div class="paragraph"><p>Note that by default, the diff view will collapse any code that is identical
between the two files into a single fold. Use the code unfolding command <code>zo</code>
to expand a section.</p></div> <div class="sect3"><h4 id="_editing_diffs"><a class="link" href="#_editing_diffs">15.9.1. Editing Diffs</a></h4> <div class="paragraph"><p>If you use the <code>&lt;Space&gt;ghd</code> command to show your file in diff view against the
index mode, you can keep editing the file to make additional changes. If you do
this, only edit the file on the <em>right</em>. This is the “working” file. The file
on the left is the “index” file; it shows the staged changes. If you want to
“edit” the file on the left, use the <code>&lt;Space&gt;ghs</code>, <code>&lt;Space&gt;ghr</code>, and
<code>&lt;Space&gt;ghu</code> to stage, reset, and unstage hunks from the right side. It is not
<em>forbidden</em> to edit the index file directly, but it will confuse the Diff mode
machinery, so stick to editing, staging, and unstaging from the right side.</p></div> <div class="paragraph"><p>When working with diff view like this, I find that the stage, reset, and
unstage keybindings best match the mental model I am used to. However, there
are two kind of weird commands built into Neovim that you may sometimes need to
reach for: <code>:diffget</code> and <code>:diffput</code>. These are more commonly typed as <code>:diffg</code>
and <code>:diffp</code> to save a couple keystrokes.</p></div> <div class="paragraph"><p>These commands are most often used in Visual mode (or with a range), and they
essentially mean that (within that range) we should either “make this file the
same as the other file” or “make the other file the same as this file”,
respectively.</p></div> <div class="paragraph"><p>Consider these two files that are slightly different:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-15/diff-mode-dark.png" alt="diff mode dark"/></div> <div class="title">Figure 81. Diff Mode</div></div> <div class="paragraph"><p>The file on the left represents the state of my index, while the file on the
right is my working copy. The indexed version was missing the word “Two”, so I
have added that on the right. It also had an extra “Four Point Five” line that
I have removed on the right. And I modified the spelling of the word “Six”.</p></div> <div class="paragraph"><p>Let’s explore a couple ways to make these files identical with <code>:diffg</code> and
<code>:diffp</code>. You can use these commands on either file, but it usually makes sense
to operate on only one of them. For this example, assume I’m working on the
right-hand file.</p></div> <div class="paragraph"><p>I can use any navigation commands to jump to the second line of the file. If
you are editing a real git indexed file, the <code>[h</code> and <code>]h</code> keybinding are
probably useful for jumping between hunks. However, when you are in “diff” mode
you can also use the <code>[c</code> and <code>]c</code>, which mean “jump between changes,” but
<strong>only</strong> when you are in “diff” mode. (In a non-diff window, LazyVim has bound
those keys to jump between classes or types.) I usually just use <code>[h</code> and <code>]h</code>,
but in those instances where I am using a diff view that is not attached to
git history, <code>[c</code> and <code>]c</code> should not be forgotten.</p></div> <div class="paragraph"><p>So with my cursor on the first line of the file, <code>[c</code> or <code>[h</code> will jump to the
second line, which contains the word <code>Two</code> in my file, but not the index.</p></div> <div class="paragraph"><p>I want to stage this change, so I type <code>:diffp</code>, which means “make the other file
the same as this one.”</p></div> <div class="paragraph"><p>The next line is <code>Four Point Five</code> in the left file, but was deleted in the
right file. For the sake of argument, let’s say I want to “unstage” this
change, which is to say “make the right file the same as the left file”. To do
this from the right window, I can use <code>Shift-V</code> to enter Visual Line Mode, and
select the lines containing <code>Four</code> and <code>Five</code> as well as the blank red space
between those two lines representing the deleted line. Now I can type <code>:diffg</code>
or <code>:diffget</code> which means “get the contents of the other window and make my
window match it.” Since <code>:diffget</code> and <code>:diffput</code> accept ranges, it passes
the visual selection with the usual <code>&#39;&lt;</code> and <code>&#39;&gt;</code> marks.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">If you find you like the above diff interface, but figuring out which
files have differences is frustrating, you may want to configure the
<a href="https://github.com/sindrets/diffview.nvim">diffview.nvim</a> plugin. I personally
just use the git status telescope picker, but the <code>diffview.nvim</code> plugin has a
nice interface and some handy commands.</td></tr></tbody></table></div></div></div> <div class="sect2"><h3 id="_configuring_vim_diff_as_merge_tool"><a class="link" href="#_configuring_vim_diff_as_merge_tool">15.10. Configuring Vim Diff as Merge Tool</a></h3> <div class="paragraph"><p>Everyone seems to hate resolving merge conflicts. Armed with Diff mode and
rebasing, I actually find the process kind of enjoyable. The trick is to have a
slightly complicated <code>~/.gitconfig</code> (and a very large monitor).</p></div> <div class="paragraph"><p>I can’t help you with the monitor, but the <code>.gitconfig</code> needs to look like this:</p></div> <div class="listingblock"><div class="title">Listing 50. Git Mergetool Configuration</div> <div class="content"><pre class="pygments highlight"><code data-lang="ini"><span></span><span class="tok-k">[diff]</span>
<span class="tok-w">    </span><span class="tok-na">tool</span><span class="tok-w"> </span><span class="tok-o">=</span><span class="tok-w"> </span><span class="tok-s">vimdiff</span>
<span class="tok-k">[merge]</span>
<span class="tok-w">    </span><span class="tok-na">tool</span><span class="tok-w"> </span><span class="tok-o">=</span><span class="tok-w"> </span><span class="tok-s">vimdiff</span>
<span class="tok-w">    </span><span class="tok-na">conflictstyle</span><span class="tok-w"> </span><span class="tok-o">=</span><span class="tok-w"> </span><span class="tok-s">zdiff3</span>
<span class="tok-k">[mergetool &quot;vimdiff&quot;]</span>
<span class="tok-w">    </span><span class="tok-na">cmd</span><span class="tok-w"> </span><span class="tok-o">=</span><span class="tok-w"> </span><span class="tok-s">nvim -d $LOCAL $BASE $REMOTE $MERGED </span>\\
<span class="tok-w">          </span><span class="tok-s">-c &#39;$wincmd w&#39; -c &#39;wincmd J&#39;</span></code></pre></div></div> <div class="paragraph"><p>The <code>zdiff3</code> conflict style makes diffs a bit easier to read by automatically
resolving identical lines. The two <code>tool =</code> lines say to use the <code>vimdiff</code> merge
tool that is configured on the last line.</p></div> <div class="paragraph"><p>That last line is a command to open Neovim with a whopping FOUR windows open
and focuses the appropriate one.</p></div> <div class="paragraph"><p>To demonstrate this, I made a new git repo with two branches with conflicting
changes. When I went to rebase
(I always use rebase rather than merge commits because it
allows me to deal with conflicts in the isolation of one change. This is why
it’s important to me that every commit have only one change!), one branch
onto the other, of course, I end up with this error:</p></div> <div class="listingblock"><div class="title">Listing 51. A Dreaded Git Conflict</div> <div class="content"><pre class="pygments highlight"><code data-lang="console"><span></span><span class="tok-go">✦ ❯ git rebase main</span>
<span class="tok-go">Auto-merging file</span>
<span class="tok-go">CONFLICT (content): Merge conflict in file</span>
<span class="tok-go">error: could not apply f611b6f... Uppercase</span>
<span class="tok-go">Could not apply f611b6f... Uppercase</span></code></pre></div></div> <div class="paragraph"><p>To resolve this conflict, I run <code>git mergetool</code>. Because of the git configuration
above, it will open Neovim with these four different diff windows:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-15/mergetool-dark.png" alt="mergetool dark"/></div> <div class="title">Figure 82. Merge Tool on Steroids</div></div> <div class="paragraph"><p>There are three windows across the top and one in a big pane (also pain) in the
bottom.</p></div> <div class="dlist"><dl><dt class="hdlist1">Upper-left window</dt><dd><p>Shows the “local” changes. The meaning of “local”
depends on exactly what commands you used to get into the conflict situation.
In typical rebase flows, it returns to “the current state of the main branch”.
So when there is a conflict, it would contain “the other person’s
changes”, so “local” doesn’t seem applicable.</p> </dd><dt class="hdlist1">Middle window</dt><dd><p>Contains the “common ancestor” or “base” of the changes.
Which is to say, this is the state of the file before either you or “the other
person” made any changes. This window is not commonly included in merge-tool
tutorials, but I find it can be quite helpful when trying to figure out what
changed between the base and each of the two side windows.</p> </dd><dt class="hdlist1">Upper-right window</dt><dd><p>Contains the “Remote” changes, which, like local, can be a
misnomer. In rebase flows, it usually means, “the changes I made on the branch I
am rebasing onto main.”</p> </dd><dt class="hdlist1">Bottom window</dt><dd><p>Contains “the current state of the file”, which at the time
the rebase failed includes messy conflict markers. This is the only file
you should make edits to.</p></dd></dl></div> <div class="paragraph"><p>All four files will feature code folding if there are long sections of common
code. Also, if you scroll or move the cursor in the lower file, the upper files
will also scroll so everything stays in sync, and an underline in the top three
windows will indicate which line the diff tool thinks is the “current” one with
respect to the cursor position in the lower window.</p></div> <div class="paragraph"><p>Most rebase flows start with using <code>vag</code> and <code>:diffg</code> from the lower window to
make it identical to one of the upper windows. Then you would use <code>diffget</code> to
get hunks from the left or right window, depending on context. You’ll also
usually have to do some manual editing.</p></div> <div class="paragraph"><p>The problem is, <code>:diffg</code> doesn’t know which window to get things from because
there are multiple windows open:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-15/mergetool-buffer-error-dark.png" alt="mergetool buffer error dark"/></div> <div class="title">Figure 83. Diffget Error</div></div> <div class="paragraph"><p>Instead, we need to use the command <code>:%diffg 2</code>. The <code>2</code> is a buffer number.
When you run merge-tool directly from the command line, the buffers are
numbered in the order they are open. So <code>1</code> is the left-hand buffer, <code>2</code> is the
middle one, <code>3</code> is the right-hand one, and <code>4</code> is the lower window. If you
aren’t sure, you can use the <code>&lt;Space&gt;&lt;comma&gt;</code> keybinding to show the buffer
list:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-15/mergetool-buffer-numbers-dark.png" alt="mergetool buffer numbers dark"/></div> <div class="title">Figure 84. Buffer Numbers In Picker</div></div> <div class="paragraph"><p>In this list, the first column holds the buffer number. This number generally
increases monotonically from the most recent time Neovim opened, so it can get
pretty high if you’ve been editing for a while. But when you use <code>git
mergetool</code>, it typically opens a brand new Neovim instance and <code>1-4</code> are
expected.</p></div> <div class="paragraph"><p>After running <code>vag</code> and the <code>:%diffg 2</code> command, the bottom window looks the
same as the middle window, which is the state everything was before either
branch was created. If I used <code>vag</code> and then <code>:%diffg 1</code> it would look the
same as <code>main</code>, and <code>vag</code> followed by <code>:%diffg 3</code> would make it look the
same as my branch. Then I could selectively look at differences between
buffers and use <code>:diffg #</code> to get changes from the left or right one
respectively.</p></div> <div class="paragraph"><p>Merge conflicts can always be somewhat stressful, but I find the four window
view often makes it easier to understand what changed and why. That said, I
only reach for it when I’m in a particularly knotty merge situation. Normally,
I use the git-conflict.nvim plugin.</p></div></div> <div class="sect2"><h3 id="_git_conflict_nvim"><a class="link" href="#_git_conflict_nvim">15.11. Git-conflict.nvim</a></h3> <div class="paragraph"><p>While merge-tool is very helpful when working with particularly complicated
merges, for simple conflicts, I usually find it quicker to just edit the file
with the conflict markers in it directly. A plugin called git-conflict.nvim
provides syntax highlighting and some keybindings to help navigate conflicts.</p></div> <div class="paragraph"><p>Set it up with a config something like this:</p></div> <div class="listingblock"><div class="title">Listing 52. Git Conflict Configuration</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-s2">&quot;akinsho/git-conflict.nvim&quot;</span><span class="tok-p">,</span>
  <span class="tok-n">lazy</span> <span class="tok-o">=</span> <span class="tok-kc">false</span><span class="tok-p">,</span>
  <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-n">default_mappings</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-n">ours</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;&lt;leader&gt;ho&quot;</span><span class="tok-p">,</span>
      <span class="tok-n">theirs</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;&lt;leader&gt;ht&quot;</span><span class="tok-p">,</span>
      <span class="tok-n">none</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;&lt;leader&gt;h0&quot;</span><span class="tok-p">,</span>
      <span class="tok-n">both</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;&lt;leader&gt;hb&quot;</span><span class="tok-p">,</span>
      <span class="tok-nb">next</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;]x&quot;</span><span class="tok-p">,</span>
      <span class="tok-n">prev</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;[x&quot;</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
  <span class="tok-n">keys</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;&lt;leader&gt;gx&quot;</span><span class="tok-p">,</span>
      <span class="tok-s2">&quot;&lt;cmd&gt;GitConflictListQf&lt;cr&gt;&quot;</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;List Conflicts&quot;</span>
    <span class="tok-p">},</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;&lt;leader&gt;gr&quot;</span><span class="tok-p">,</span>
      <span class="tok-s2">&quot;&lt;cmd&gt;GitConflictRefresh&lt;cr&gt;&quot;</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Refresh Conflicts&quot;</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>I use the <code>&lt;Space&gt;h</code> prefix that I set up previously for staging hunks and add
a few new commands to it. After enabling this extension, if you open a file
with conflicts, it highlights the conflict markers in a different colour.
On my plaintext sample file it looks like this:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-15/git-conflict-dark.png" alt="git conflict dark"/></div> <div class="title">Figure 85. Conflict Markers</div></div> <div class="paragraph"><p>The conflict markers include the “current” (whatever is on main) code above, and
the “new” (whatever is being rebased) code below, with the original or base code
(before either change) in the middle.</p></div> <div class="paragraph"><p>I can use the <code>]x</code> keybinding to quickly jump to the next conflict (in this
case there is only one). Then I can use one of the following keybindings
to resolve the conflict:</p></div> <div class="ulist"><ul><li><p><code>&lt;Space&gt;ho</code> Choose the top version</p></li> <li><p><code>&lt;Space&gt;ht</code> Choose the bottom version</p></li> <li><p><code>&lt;Space&gt;hb</code> Choose both</p></li> <li><p><code>&lt;Space&gt;h0</code> Go back to whatever is in the middle</p></li></ul></div> <div class="paragraph"><p>The <code>o</code> and <code>t</code> keybindings are hard to remember. Technically they mean “ours”
and “theirs”, but depending on which order you did a merge or rebase, it
doesn’t always semantically map to your own or somebody else’s commit. I just
remember that <code>o</code> is before <code>t</code> in the alphabet, so it means the upper change.
You could also map them to more mnemonic keybindings if you want.</p></div> <div class="paragraph"><p>In all cases, but especially in the latter two, you will likely need to do
some manual editing to make the code look correct. This is normal. None of the
conflict management extensions uses AI to semantically understand what the changes
<em>intended</em> to do, so you still need to do that part yourself!</p></div> <div class="paragraph"><p>About ninety percent of the time, this plugin is all I need to resolve a
conflict. I only use the mergetool when things are particularly hairy or
complicated.</p></div></div> <div class="sect2"><h3 id="_summary_15"><a class="link" href="#_summary_15">15.12. Summary</a></h3> <div class="paragraph"><p>This chapter introduced a lot of different ways of interacting with git and
version control from inside LazyVim. You probably won’t use all of it, but
I wanted to present multiple options so you can decide which ones work best
for you.</p></div> <div class="paragraph"><p>Perhaps you want to use Lazygit, or maybe you want to stay in the editor and
use the functionality that git-signs and native Vim diff mode provide. Maybe
you want to install some extra plugins such as git-conflict.nvim or
diffview.nvim to streamline your experience (others you might want to look at
include Neogit and mini.git).</p></div> <div class="paragraph"><p>Or maybe you don’t want to manage this stuff from your editor at all and just
want to drop to Terminal mode and use <code>git</code> or a wrapper like <code>graphite</code>. Whatever
works for you, LazyVim provides the integrations you need.</p></div> <div class="paragraph"><p>In the next chapter we’ll admit that it’s not 2020 anymore and talk about
artificial intelligence.</p></div></div></div>`;return{c(){e=c("div"),e.innerHTML=a,this.h()},l(t){e=r(t,"DIV",{class:!0,"data-svelte-h":!0}),p(e)!=="svelte-3jaqg0"&&(e.innerHTML=a),this.h()},h(){h(e,"class","sect1")},m(t,i){g(t,e,i)},p:s,i:s,o:s,d(t){t&&u(e)}}}class k extends d{constructor(e){super(),l(this,e,null,f,n,{})}}export{k as component,w as universal};
