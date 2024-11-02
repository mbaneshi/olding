import{s as i,n as a}from"../chunks/scheduler.seBsrkbn.js";import{S as l,i as c,e as d,c as p,l as r,m as h,g as u,d as f}from"../chunks/index.Dwxb9V0m.js";function g(){return{title:"Chapter 9: Buffers and Layouts ",description:"Demystifying buffers, windows and tabs in LazyVim.",keywords:"vim, lazyvim, neovim, tutorial, buffer, window, tab, layout"}}const w=Object.freeze(Object.defineProperty({__proto__:null,load:g},Symbol.toStringTag,{value:"Module"}));function m(o){let e,t=`<h2 id="_buffers_and_layouts"><a class="link" href="#_buffers_and_layouts">Chapter 9. Buffers and Layouts</a></h2> <div class="sectionbody"><div class="paragraph"><p>No matter which programming language you are working with, it is inevitable
that you will be working on multiple files at a time. And in multiple areas
within the same file.</p></div> <div class="paragraph"><p>Like all coding editors (other than Notepad), Neovim has a robust system for
working with multiple files. LazyVim is configured with a powerful buffer,
file, and window management system that may feel familiar at first, but is
actually far more powerful than your average editor.</p></div> <div class="sect2"><h3 id="_some_terminology"><a class="link" href="#_some_terminology">9.1. Some Terminology</a></h3> <div class="paragraph"><p>Sometimes it seems like every window management system uses the same words for
different things. If you read the documents for e.g. tmux, emacs, kitty,
vim, and i3, you’ll end up with multiple definitions for words like “window”,
“pane”, “tab”, and “layout”.</p></div> <div class="paragraph"><p>I’ll stick with the Vim definitions of these words so that you can switch
between this book and most Vim and Vim plugin help files, tutorials, and
documentation, without getting confused. Unfortunately, this may mean you get
confused when interacting with any other software!</p></div> <div class="paragraph"><p>This list goes roughly from least to most specific, though understand that
the relationship between most of these elements is a graph rather than a tree;
it’s not a strict hierarchy.</p></div> <div class="dlist"><dl><dt class="hdlist1">Server</dt><dd><p>Neovim can run in a server mode and can have multiple clients
attached. This means you can have multiple views into the same Neovim instance,
and those views could be from different terminals or GUI software, web browsers
or even a VS Code Extension. You will probably not need think about the Neovim
server, and I won’t mention it again in this book. But if you want to do
something interesting such as connect to an existing Neovim instance to open a
commit message rather than opening Neovim in a new window, you now know that
this is possible.</p> </dd><dt class="hdlist1">Client</dt><dd><p>A Neovim application that you are actually running. Normally
connected to its own independent server but can be configured to connect to an
existing or remote one. A client is what starts up when you type <code>nvim</code>, but
other clients include GUIs such as Neovide or VimR.</p> </dd><dt class="hdlist1">Tab</dt><dd><p>One client can have multiple tabs. Each tab is a full screen layout
that is more or less independent from the other tabs. You can have different
buffers visible and different configurations of window splits on each tab. Only
one tab is visible at any one time. This is a much different paradigm from
VS Code and many other environments where each split has its own set of tabs.</p> </dd><dt class="hdlist1">Window</dt><dd><p>Also known as a “pane” or a “split”, a window is a section of the
screen that is dedicated to viewing a buffer. Every tab has one or more windows
on it. Every window is normally entirely visible; there is no overlap between
windows. The excepton is floating windows such as the ones that pop up
when you open a picker or Lazy Extras. If a buffer’s contents don’t fit in a
window the window can be scrolled.</p> </dd><dt class="hdlist1">Buffer</dt><dd><p>This is Vim’s word for a file that is currently open and
available to be viewed/edited. One buffer can be displayed in multiple windows,
which means you can have two side-by-side views into the same file at different
scroll positions or you can view the same buffer in multiple tabs. If a buffer
is visible in two places, they will have the exact same contents (other than
scrolling position). There is only ever <strong>one</strong> underlying buffer open for
each file, no matter how many views of the buffer are visible in different
windows or tabs.</p> </dd><dt class="hdlist1">Fold</dt><dd><p>Within any one view of a buffer, it is possible to “collapse” a
section of that file (for example a function, class, or indentation level) into
a single line, effectively hiding the contents. This allows you to view two
disjointed sections of the same file at the same time while keeping the
unrelated information between those two sections hidden.</p> </dd><dt class="hdlist1">File</dt><dd><p>A file that exists on disk. Each buffer is linked to at most one
file, though it is possible to have buffers with no file (sometimes called
“scratch” buffers, a word borrowed from Emacs parlance). The contents of a
buffer may not be the same as the contents of the file on disk if the buffer
has not been saved.</p></dd></dl></div> <div class="paragraph"><p>So far in this book, all your interactions have happened in a single window in
a single tab, with possibly multiple buffers open. Now, things are about to get
much more <span class="line-through">complicated</span> interesting.</p></div></div> <div class="sect2"><h3 id="_buffers"><a class="link" href="#_buffers">9.2. Buffers</a></h3> <div class="paragraph"><p>If you’ve used Telescope, Neo-tree, or mini.files to open multiple files, you
may well think that a buffer is a tab. In this view, I have three buffers open,
only one of which is currently visible:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-9/buffer-line-dark.png" alt="buffer line dark"/></div> <div class="title">Figure 34. Bufferline With Three Buffers</div></div> <div class="paragraph"><p>Yes, I know they look like tabs in any other software, ever, but that is
because LazyVim has configured the buffer line to look like tabs. With the
buffer line visible, you may actually not need to use (real) Vim tabs very
often, but in Vim, tabs are a completely different concept.</p></div> <div class="paragraph"><p>No matter how many <strong>windows</strong> you have open, there is only one buffer line. In
the following screenshot, I have three buffers open, and two of them are
visible in separate windows, side by side. But there is still only one
buffer line along the top of the editor.</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-9/buffer-line-split-dark.png" alt="buffer line split dark"/></div> <div class="title">Figure 35. Only One Buffer Line</div></div> <div class="paragraph"><p>This implies that buffers are a “global” concept. There is one collection of
buffers for the entire Neovim client, and you can access any of those buffers
from any window (or tab).</p></div> <div class="paragraph"><p>You can, of course, use the mouse to select different buffers from the buffer
line with a single click. But why would you do that when there are <strong>so many</strong>
ways to access buffers with the keyboard in LazyVim?</p></div> <div class="sect3"><h4 id="_navigating_between_open_buffers"><a class="link" href="#_navigating_between_open_buffers">9.2.1. Navigating Between Open Buffers</a></h4> <div class="paragraph"><p>The absolute easiest way to switch between buffers is using the <code>H</code> and <code>L</code>
(i.e. <code>Shift-h</code> and <code>Shift-l</code>) keys. By this point you are hopefully intimately
familiar with the fact that <code>h</code> means left and <code>l</code> means right for cursor
movement. If you press the shift key with these, you will switch the buffer
visible in the currently active window to whichever buffer is to the left or
right of the current buffer in the buffer line.</p></div> <div class="paragraph"><p>Alternatively, you can use the <code>[b</code> and <code>]b</code> commands which map to the same thing.</p></div> <div class="paragraph"><p>Annoyingly, you will find that these keybindings do not accept counts. So you
cannot, by default, use <code>2L</code> to jump two tabs to the right. This frustrated me
because I know the underlying <code>:bnext</code> and <code>:bprev</code> commands <em>do</em> accept a count.</p></div> <div class="paragraph"><p>It turns out that LazyVim maps these to a <code>BufferLineCycleNext</code> command
provided by the underlying plugin, bufferline.nvim, and that plugin doesn’t,
as far as I can tell, support counts.</p></div> <div class="paragraph"><p>Upon investigation I learned that the <code>BufferLineCycle*</code> commands exist because
the plugin can configure some kind of sorting mechanism on the buffer list. But
LazyVim isn’t configured to use that mechanism. So we can use the old-fashioned
commands instead. To do so, create a new file in your <code>plugins</code> configuration
folder named (something like) <code>extend-bufferline.lua</code>:</p></div> <div class="listingblock"><div class="title">Listing 23. Simplify Buffer Navigation Keybindings</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-s2">&quot;akinsho/bufferline.nvim&quot;</span><span class="tok-p">,</span>
  <span class="tok-n">keys</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;L&quot;</span><span class="tok-p">,</span>
      <span class="tok-kr">function</span><span class="tok-p">()</span>
        <span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">cmd</span><span class="tok-p">(</span><span class="tok-s2">&quot;bnext &quot;</span> <span class="tok-o">..</span> <span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">v</span><span class="tok-p">.</span><span class="tok-n">count1</span><span class="tok-p">)</span>
      <span class="tok-kr">end</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Next buffer&quot;</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;H&quot;</span><span class="tok-p">,</span>
      <span class="tok-kr">function</span><span class="tok-p">()</span>
        <span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">cmd</span><span class="tok-p">(</span><span class="tok-s2">&quot;bprev &quot;</span> <span class="tok-o">..</span> <span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">v</span><span class="tok-p">.</span><span class="tok-n">count1</span><span class="tok-p">)</span>
      <span class="tok-kr">end</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Previous buffer&quot;</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;]b&quot;</span><span class="tok-p">,</span>
      <span class="tok-kr">function</span><span class="tok-p">()</span>
        <span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">cmd</span><span class="tok-p">(</span><span class="tok-s2">&quot;bnext &quot;</span> <span class="tok-o">..</span> <span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">v</span><span class="tok-p">.</span><span class="tok-n">count1</span><span class="tok-p">)</span>
      <span class="tok-kr">end</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Next buffer&quot;</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;[b&quot;</span><span class="tok-p">,</span>
      <span class="tok-kr">function</span><span class="tok-p">()</span>
        <span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">cmd</span><span class="tok-p">(</span><span class="tok-s2">&quot;bprev &quot;</span> <span class="tok-o">..</span> <span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">v</span><span class="tok-p">.</span><span class="tok-n">count1</span><span class="tok-p">)</span>
      <span class="tok-kr">end</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Previous buffer&quot;</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>The <code>vim.v.count1</code> variable is set whenever a keybinding is called with a
count, so it can be accessed inside the callback and passed to the Vim command
using string concatenation (the <code>..</code> operator). Restart Neovim and you can do
things like <code>3L</code> to jump three buffers to the right on the buffer line.</p></div> <div class="paragraph"><p>Another keybinding you will want to reach for when jumping between buffers is
<code>&lt;Space&gt;&lt;Backtick&gt;</code>. This one simply jumps between the current file and the
file that was most recently opened in the current window. In Vim parlance, this
is referred to as “the alternate file.”</p></div> <div class="paragraph"><p>If you have a large number of buffers open, the buffer line can get awfully
crowded. At some point, it will show two arrows to the left and/or right of the
buffer bar so you can tell that there are “hidden” buffers. When you navigate
through buffers, it will always ensure the active buffer is visible. Here’s a
very full buffer line with four buffers hidden to the left and two hidden to
the right:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-9/buffer-line-full-dark.png" alt="buffer line full dark"/></div> <div class="title">Figure 36. Full Buffer Line</div></div> <div class="paragraph"><p>If you have this many buffers open, you may find it easier to use Telescope or
Fzf.lua (depending which you have enabled) to search through the open buffers.
The keybinding to pop up a filterable, scrollable list of buffers is
<code>&lt;Space&gt;&lt;comma&gt;</code>. It has the exact same contents as the buffer line, but it’s a
different interaction effect.</p></div> <div class="paragraph"><p>This is useful if you are working on large projects that have so many files
that searching through them with <code>&lt;Space&gt;&lt;Space&gt;</code> is difficult. Open the
relatively low number of files that you actually need to access as active
buffers, so they are easy to filter in the <code>&lt;Space&gt;&lt;comma&gt;</code> buffer list.</p></div> <div class="paragraph"><p>Alternatively, you can use Neo-tree to navigate open buffers. If you show the
Neo-tree sidebar, you’ll see that it has some “accordion”-style widgets,
named <code>Neo-Tree</code>, <code>Neo-Tree Git</code> and <code>Neo-Tree Buffers</code>. Neo-tree has a
variety of sources for navigating tree-like interfaces, though these three
are the only ones preconfigured by LazyVim.</p></div> <div class="paragraph"><p>To switch between the accordions (Neo-tree calls them “sources”), you can
click a different heading with the mouse, or use the <code>&lt;</code> and <code>&gt;</code> keys to cycle
through them. Alternatively, use the <code>&lt;Space&gt;be</code> key sequence to directly show
the “Buffer Explorer”.</p></div> <div class="paragraph"><p>Once the Neo-Tree Buffers view is visible, it
will look something like this:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-9/neotree-buffers-dark.png" alt="neotree buffers dark"/></div> <div class="title">Figure 37. Neotree Buffers</div></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content">If you have buffers open that are not rooted in the current working
directory, they won’t show up in Neo-tree. You’ll have to use a picker for
those.</td></tr></tbody></table></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">If you tend to have the Neo-tree sidebar open all the time, you might
want to consider disabling the bufferline across the top of your screen. It
shows the same information and there’s no reason to spend screen real estate
(that most precious commodity) on having both of them visible all the time.
Be aware that this will disable certain buffer management
keybindings, however.</td></tr></tbody></table></div></div> <div class="sect3"><h4 id="_closing_buffers"><a class="link" href="#_closing_buffers">9.2.2. Closing Buffers</a></h4> <div class="paragraph"><p>You will often want to close the current buffer without closing the split(s)
it is currently open in. The keybinding for this is <code>&lt;Space&gt;bd</code>, where
<code>&lt;Space&gt;b</code> pops up a useful menu of other buffer related functions, and <code>d</code>
means “delete”. You aren’t actually deleting the underlying <em>file</em> when you do
this; you’re just deleting the buffer from Vim’s memory: i.e. closing it.</p></div> <div class="paragraph"><p>You can also just press <code>bd</code> if you currently have Neo-tree’s buffer view focused.</p></div> <div class="paragraph"><p>I find that closing buffers is too common a task to deserve three keys,
so I have added the following to the <code>keys</code> array I defined in
<code>extend-bufferline.lua</code>:</p></div> <div class="listingblock"><div class="title">Listing 24. Close Buffer Keymap</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span>    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;&lt;leader&gt;&lt;delete&gt;&quot;</span><span class="tok-p">,</span>
      <span class="tok-n">LazyVim</span><span class="tok-p">.</span><span class="tok-n">ui</span><span class="tok-p">.</span><span class="tok-n">bufremove</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Close current buffer&quot;</span>
    <span class="tok-p">},</span></code></pre></div></div> <div class="paragraph"><p>Here are several other commands you can use to close buffers:</p></div> <table class="tableblock frame-all grid-all stretch"><caption class="title">Table 1. Closing Buffer Commands</caption> <colgroup><col style="width: 33.3333%;"/> <col style="width: 33.3333%;"/> <col style="width: 33.3334%;"/></colgroup> <thead><tr><th class="tableblock halign-left valign-top">Keybinding</th> <th class="tableblock halign-left valign-top">Description</th> <th class="tableblock halign-left valign-top">Mnemonic</th></tr></thead> <tbody><tr><td class="tableblock halign-left valign-top"><p class="tableblock"><code>&lt;Space&gt;bD</code></p></td> <td class="tableblock halign-left valign-top"><p class="tableblock">Close buffer and the window split it is in.</p></td> <td class="tableblock halign-left valign-top"><p class="tableblock"><strong>D</strong>elete buffer, but “bigger”</p></td></tr> <tr><td class="tableblock halign-left valign-top"><p class="tableblock"><code>&lt;Space&gt;bl</code></p></td> <td class="tableblock halign-left valign-top"><p class="tableblock">Close all buffers to the right in the tab line</p></td> <td class="tableblock halign-left valign-top"></td></tr> <tr><td class="tableblock halign-left valign-top"><p class="tableblock"><code>&lt;Space&gt;bh</code></p></td> <td class="tableblock halign-left valign-top"><p class="tableblock">Close all buffers to the left in the tab line</p></td> <td class="tableblock halign-left valign-top"></td></tr> <tr><td class="tableblock halign-left valign-top"><p class="tableblock"><code>&lt;Space&gt;bo</code></p></td> <td class="tableblock halign-left valign-top"><p class="tableblock">Close all buffers other than the active one</p></td> <td class="tableblock halign-left valign-top"><p class="tableblock">“<strong>o</strong>nly” this buffer</p></td></tr> <tr><td class="tableblock halign-left valign-top"><p class="tableblock"><code>&lt;Space&gt;bP</code></p></td> <td class="tableblock halign-left valign-top"><p class="tableblock">Delete all non-pinned buffers</p></td> <td class="tableblock halign-left valign-top"><p class="tableblock">“P” is opposite of “p”</p></td></tr></tbody></table> <div class="paragraph"><p>The last one needs some clarification. You can toggle a “pin” on any active
buffer using <code>&lt;Space&gt;bp</code>. You’ll see a pin icon show up to the left of the
buffer name. The only purpose of this pin is to keep it open if you want to
close all the “less important” (unpinned) files using <code>&lt;Space&gt;bP</code>. I personally
don’t use buffer pinning, so for me, <code>&lt;Space&gt;bP</code> is a shortcut for
“close all buffers”; useful when I complete one task and am ready to start
another.</p></div> <div class="paragraph"><p>You can also close buffers directly from the Telescope or FZF buffer picker
interface (from <code>&lt;Space&gt;,</code>). If you use FZF, just hit <code>Control-x</code> to close the
buffer that the cursor is on. If you use Telescope, the <code>Alt-d</code> keybinding
should do the same.</p></div> <div class="paragraph"><p>Now that you know all about buffers, let’s discuss windows.</p></div></div></div> <div class="sect2"><h3 id="_windows_2"><a class="link" href="#_windows_2">9.3. Windows</a></h3> <div class="paragraph"><p>In most modern environments, “windows” refer to the OS-level windows such as
the terminal you are running Neovim in. Since Vi predates such environments,
they were able to use the word window to refer to what are nowadays more
commonly described as “panes” or “splits” in other environments.</p></div> <div class="paragraph"><p>The window management commands are collected in the <code>&lt;Space&gt;w</code> submode menu:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-9/window-menu-dark.png" alt="window menu dark"/></div> <div class="title">Figure 38. Window Menu</div></div> <div class="paragraph"><p>We’ll cover many of these in the following sections.</p></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content"><div class="paragraph"><p>This menu can also be accessed with <code>Control-w</code>. Historically, this is the
the keybinding that is enabled by default in Vim and Neovim, though LazyVim
has added some extra keybindings to it. However, <code>&lt;Space&gt;w</code> is a bit easier
to type.</p></div></td></tr></tbody></table></div> <div class="sect3"><h4 id="_creating_window_splits"><a class="link" href="#_creating_window_splits">9.3.1. Creating Window Splits</a></h4> <div class="paragraph"><p>Windows in LazyVim can be created on the fly at any time. To split the current
window in half “vertically” with one window on the left and a new window on the
right, use the <code>&lt;Space&gt;wv</code> keymap.</p></div> <div class="paragraph"><p>When you create a split, the new window will contain another view of the buffer
you were already viewing, side by side. But once the split is opened, you can
switch the buffer in that window using any of the buffer management commands or
by opening a new file with any of the tools we’ve previously discussed for
opening files.</p></div> <div class="paragraph"><p>To create a horizontal split between two windows (one above the other), use <code>&lt;Space&gt;ws</code>.
The mnemonic for this is unfortunately just “split”. They weren’t able to
reuse <code>&lt;Space&gt;wh</code> because that is already used for switching windows.</p></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content">LazyVim also allows you to create a vertical split with <code>&lt;Space&gt;|</code> where
the <code>|</code> is the vertical bar when you <code>Shift-Backslash</code>, and <code>&lt;Space&gt;&lt;Minus&gt;</code>
for a horizontal split. I find <code>&lt;Space&gt;ws</code> and <code>&lt;Space&gt;wv</code> easier to type.</td></tr></tbody></table></div></div> <div class="sect3"><h4 id="_creating_splits_when_opening_files"><a class="link" href="#_creating_splits_when_opening_files">9.3.2. Creating Splits When Opening Files</a></h4> <div class="paragraph"><p>You already know you can open a file in the current window from Neo-Tree by
moving your cursor to the file and pressing <code>&lt;Enter&gt;</code>. You can also use the <code>s</code>
key in Neo-Tree to open it in a <em>vertical</em> split (irritatingly asymmetric with
the <code>&lt;Space&gt;ws</code> key to create a <em>horizontal</em> split in a normal buffer). The
shifted form, <code>S</code> in Neo-Tree is used to create a horizontal split.</p></div> <div class="paragraph"><p>If you are using Telescope or Fzf.lua to open files, you’ll use yet another set
of keybindings! To open a file in a vertical split, use the <code>Control-v</code>
keybinding. This works in both Insert and Normal mode in the Telescope prompt
area, but only in Insert mode with Fzf.lua. To open it in a horizontal split
you use <code>Control-x</code> (I know: WTF, right?)</p></div> <div class="paragraph"><p>Finally, if you use mini.files, you can open a file in a split sensibly using
the same keybindings as in a normal window (<code>&lt;Space&gt;wv</code>  and <code>&lt;Space&gt;ws</code>).</p></div></div> <div class="sect3"><h4 id="_navigating_between_windows"><a class="link" href="#_navigating_between_windows">9.3.3. Navigating Between Windows</a></h4> <div class="paragraph"><p>You can move your cursor between window splits by holding the control key along
with any of the <code>h</code>, <code>j</code>, <code>k</code>, or <code>l</code> home row &quot;arrow-key&quot; directions. They can
also be prefixed with numerical counts if you want to skip over a window to get
to the next one.</p></div> <div class="paragraph"><p>Alternatively, you can use the same keys with <code>&lt;Space&gt;w</code>. So <code>&lt;Space&gt;wh</code> will
move to the window to the left of the current one.</p></div> <div class="sect4"><h5 id="_smart_splits"><a class="link" href="#_smart_splits">Smart Splits</a></h5> <div class="paragraph"><p>I suggest the
<a href="https://github.com/mrjones2014/smart-splits.nvim">mrjones2014/smart-splits.nvim</a>
plugin, which can be configured to navigate between Vim windows and Kitty,
Wezterm, or Tmux panes with the same keybindings. Consider this screenshot:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-9/vim-kitty-splits-dark.png" alt="vim kitty splits dark"/></div> <div class="title">Figure 39. Kitty and Vim Splits</div></div> <div class="paragraph"><p>I have three Kitty Terminal panes open. The left one is running Neovim with two
windows in it, one above the other. The right is split into two normal terminal
panes. By default, if I want to navigate between the three Kitty panes, I have
to use one set of keybindings, and if I want to navigate between the two Neovim
windows, I have to use another set of keybindings. With the smart-splits.nvim
plugin, I can navigate between all the windows with the same keybindings, no
matter where my cursor is.</p></div> <div class="paragraph"><p>Setting up the terminal integration for smart splits is beyond the scope of
this book (documentation on the README in the GitHub repository should be
sufficient), but to configure the smart-splits plugin in Neovim, create a file
in the plugins directory called e.g. <code>smart-splits.lua</code>:</p></div> <div class="listingblock"><div class="title">Listing 25. Smart-splits configuration</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-s2">&quot;mrjones2014/smart-splits.nvim&quot;</span><span class="tok-p">,</span>
  <span class="tok-n">build</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;./kitty/install-kittens.bash&quot;</span><span class="tok-p">,</span>
  <span class="tok-n">keys</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;&lt;A-h&gt;&quot;</span><span class="tok-p">,</span>
      <span class="tok-kr">function</span><span class="tok-p">()</span>
        <span class="tok-nb">require</span><span class="tok-p">(</span><span class="tok-s2">&quot;smart-splits&quot;</span><span class="tok-p">).</span><span class="tok-n">move_cursor_left</span><span class="tok-p">()</span>
      <span class="tok-kr">end</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Move to left window&quot;</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;&lt;A-l&gt;&quot;</span><span class="tok-p">,</span>
      <span class="tok-kr">function</span><span class="tok-p">()</span>
        <span class="tok-nb">require</span><span class="tok-p">(</span><span class="tok-s2">&quot;smart-splits&quot;</span><span class="tok-p">).</span><span class="tok-n">move_cursor_right</span><span class="tok-p">()</span>
      <span class="tok-kr">end</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Move to right window&quot;</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;&lt;A-j&gt;&quot;</span><span class="tok-p">,</span>
      <span class="tok-kr">function</span><span class="tok-p">()</span>
        <span class="tok-nb">require</span><span class="tok-p">(</span><span class="tok-s2">&quot;smart-splits&quot;</span><span class="tok-p">).</span><span class="tok-n">move_cursor_down</span><span class="tok-p">()</span>
      <span class="tok-kr">end</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Move to below window&quot;</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
    <span class="tok-p">{</span>
      <span class="tok-s2">&quot;&lt;A-k&gt;&quot;</span><span class="tok-p">,</span>
      <span class="tok-kr">function</span><span class="tok-p">()</span>
        <span class="tok-nb">require</span><span class="tok-p">(</span><span class="tok-s2">&quot;smart-splits&quot;</span><span class="tok-p">).</span><span class="tok-n">move_cursor_up</span><span class="tok-p">()</span>
      <span class="tok-kr">end</span><span class="tok-p">,</span>
      <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Move to above window&quot;</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>If you are using WezTerm or Tmux you won’t need the <code>build =</code> line, but for all
three environments, you’ll also need to add some configuration to your Kitty,
WezTerm, or Tmux configuration as described in the plugin’s README.</p></div></div></div> <div class="sect3"><h4 id="_closing_a_window_split"><a class="link" href="#_closing_a_window_split">9.3.4. Closing a Window Split</a></h4> <div class="paragraph"><p>You can close a window at any time using one of three keybindings:</p></div> <div class="ulist"><ul><li><p><code>&lt;Space&gt;wq</code> closes the window, and if it is the only window open,
exits (<strong>q</strong>uits) Neovim.</p></li> <li><p><code>&lt;Space&gt;wc</code> <strong>c</strong>loses the window unless it is the only window open,
in which case it displays an error and refuses to close.</p></li> <li><p><code>&lt;Space&gt;wd</code> <strong>d</strong>eletes the window. It is actually doing exactly
the same operation as <code>&lt;Space&gt;wc</code>, but it is helpful for muscle memory
for its symmetry with <code>&lt;Space&gt;bd</code> to “delete” an open buffer.</p></li></ul></div> <div class="paragraph"><p>In all three cases, the <strong>buffer</strong> remains open in the bufferline. Only
the window split is closed.</p></div> <div class="paragraph"><p>If, instead, you want to close all splits except the active one, use <code>&lt;Space&gt;wo</code> for
“<strong>o</strong>nly this window” or “close <strong>o</strong>ther” (whichever is easier to
remember).</p></div></div> <div class="sect3"><h4 id="_resizing_windows"><a class="link" href="#_resizing_windows">9.3.5. Resizing Windows</a></h4> <div class="paragraph"><p>In my unconventional opinion, the easiest way to resize Vim splits is to use…​
<em>the mouse</em>. There is a vertical bar between vertical splits that you can click
and drag on. The mouse cursor doesn’t change to give you any feedback that you
can click and drag on it, but it works.</p></div> <div class="paragraph"><p>For horizontal splits (when two windows are one above the other), there is no
obvious bar to click. But you can actually just drag on the status bar of the
“upper” window to move it up or down.</p></div> <div class="paragraph"><p>If you insist on using the keyboard, the keybindings are in the  <code>&lt;Space&gt;w</code>
menu: <code>&lt;Space&gt;w+</code> and <code>&lt;Space&gt;w-</code> to increase or decrease the height of the
active window in a horizontal split, and <code>&lt;Space&gt;w&gt;</code> or <code>&lt;Space&gt;w&lt;</code> to increase
or decrease the width of a vertical split. They only move by one row or column
at a time, so you will almost certainly want to prefix these commands with a
count greater than 10, or use “Hydra” mode, discussed next.</p></div> <div class="paragraph"><p>To change everything to a “default” size, use <code>&lt;Space&gt;w=</code> which will make
all the windows “equally high and wide.”</p></div></div> <div class="sect3"><h4 id="_hydra_mode"><a class="link" href="#_hydra_mode">9.3.6. Hydra Mode</a></h4> <div class="paragraph"><p>Occasionally, you’ll want to run several window commands in a row, for example
when resizing a window or creating a layout containing several splits. Having
to type <code>&lt;Space&gt;w</code> between each command would be rather tedious in these situations,
so the <code>which-key</code> plugin gives us Hydra mode.</p></div> <div class="paragraph"><p>To enter Hydra window mode, press <code>&lt;Space&gt;w&lt;Space&gt;</code>. All this does is “pin”
the window menu open, so you can issue multiple keypresses from it without
automatically leaving the menu. For example, <code>&lt;Space&gt;w&lt;Space&gt;vvvs</code> will create
four splits (three vertical and one horizontal).</p></div> <div class="paragraph"><p>To leave Hydra mode just hit <code>&lt;Escape&gt;</code> and return to your normal editing.</p></div></div></div> <div class="sect2"><h3 id="_tabs"><a class="link" href="#_tabs">9.4. Tabs</a></h3> <div class="paragraph"><p>Tabs in Vim are rather unusual. Some other paradigms might describe them as
“Layouts”. All tabs are connected to the same list of currently open buffers,
which is different from most tab models, but each tab can be split into
different window layouts. So you might have one tab with three vertical splits
and a second tab with four windows open in a grid, for example. In each of the
seven splits you can have any buffer you like open, possibly in multiple
locations.</p></div> <div class="paragraph"><p>LazyVim has a dedicated tab menu that is accessed by pressing <code>&lt;Space&gt;&lt;Tab&gt;</code>:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-9/tab-menu-dark.png" alt="tab menu dark"/></div> <div class="title">Figure 40. Space Tab Menu</div></div> <div class="paragraph"><p>To create a new tab, just press <code>&lt;Space&gt;&lt;Tab&gt;&lt;Tab&gt;</code>. If you want to “move”
the currently open window split into a new tab, use <code>&lt;Space&gt;wT</code> (that’s a
capital T). This will effectively close the current window split and create a
new tab with the same buffer in that tab.</p></div> <div class="paragraph"><p>After you create a tab, you’ll likely have trouble finding it again! The tabs
are grouped at the right end of the buffer line:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-9/tabs-in-buffer-line-dark.png" alt="tabs in buffer line dark"/></div> <div class="title">Figure 41. Tabs in Buffer Line</div></div> <div class="paragraph"><p>This screenshot has <strong>two</strong> tabs, numbered 1 and 2 at the right with an <code>X</code>
beside them. The two buffers at the left <em>are not tabs</em>. Have I emphasized
that too many times?</p></div> <div class="paragraph"><p>Unfortunately, other than numbers, the tabs don’t do anything to make
themselves look unique; it is not possible to preview which buffers are active
in each tab or what layout they have.</p></div> <div class="paragraph"><p>To navigate between tabs, you can click the numbers, or you can use the default
vim keybindings of <code>gt</code> and <code>gT</code> to go to the next or previous tab.
Alternatively, the <code>&lt;Space&gt;&lt;Tab&gt;[</code> and <code>&lt;Space&gt;&lt;Tab&gt;]</code> keybindings provided by
LazyVim can also switch tabs. To go to a specific tab by number, use that
number as the count when calling <code>gt</code>. For example <code>3gt</code> will show the tab
number 3 rather than jumping three tabs to the right.</p></div> <div class="paragraph"><p>There are several ways to close a tab:</p></div> <div class="ulist"><ul><li><p>Just close the last window in the tab (i.e. with <code>&lt;Space&gt;wq</code>) and the tab will
disappear.</p></li> <li><p>The <code>&lt;Space&gt;&lt;tab&gt;d</code> keybinding will close all the <em>windows</em> in a tab as well
as the tab itself. The <em>buffers</em> will stay open.</p></li> <li><p>Click the <code>X</code> icon to the right of the tabs in the tab bar.</p></li></ul></div></div> <div class="sect2"><h3 id="_code_folding"><a class="link" href="#_code_folding">9.5. Code Folding</a></h3> <div class="paragraph"><p>Vim’s code folding system is almost too robust, probably because it has had
many iterations of “best practices” over the years. LazyVim is configured with
the <em>current</em> best practices, so you generally only need a small subset of the
complete list of folding commands.</p></div> <div class="paragraph"><p>If you are unfamiliar with the concept, code folding allows you to hide entire
sections of code by collapsing them into a single line. Visually, this has a
similar effect to splitting a window horizontally and then reading two sections
of the same file above and below the split, but when you use folding only one
view of the buffer is visible and it scrolls as a single entity.</p></div> <div class="paragraph"><p>Consider this section of code:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-9/no-folds-dark.png" alt="no folds dark"/></div> <div class="title">Figure 42. Code With No Folds</div></div> <div class="paragraph"><p>While I’m editing, imagine that I am interested in the <code>clearExistingTimeout</code>
function at the top of the screenshot and the <code>addTodo</code> function at the bottom,
but not currently interested in the contents of the two <code>save</code> callbacks. I can
collapse those sections and my screen looks like this:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-9/folds-dark.png" alt="folds dark"/></div> <div class="title">Figure 43. Collapsed Folds</div></div> <div class="paragraph"><p>Most fold operations are accessible from the <code>z</code> mode menu accessible by typing
<code>z</code> in Normal mode (we discussed some of the <code>z</code> mode operations in chapter 3
when we were dealing with scrolling). To collapse a section of code into a
fold, use whatever navigation operations you like to get to that section and
type <code>zc</code> for “<strong>c</strong>ollapse fold”.</p></div> <div class="paragraph"><p>To open it again, use <code>zo</code> for “<strong>o</strong>pen fold”.</p></div> <div class="paragraph"><p>Alternatively, if you only want to remember a single keybinding, <code>za</code> will
toggle a fold, collapsing if you are not on a folded line and expanding if you
are.</p></div> <div class="paragraph"><p>If you have collapsed some folds and want to quickly get back to a point where
there are no folds collapsed, use <code>zR</code> to open all folds. I had no idea what
mnemonic is supposed to work with <code>R</code>, but an early reader helpfully pointed
out that <code>zr</code> is “reduce folding”, so <code>zR</code> is “Reduce folding BUT BIGGER”.</p></div> <div class="paragraph"><p>You can even nest folds by folding already folded code. If you want to open
folds recursively, use <code>zO</code>, which will open a fold and any folds that are
nested under that fold.</p></div> <div class="paragraph"><p>The way LazyVim is configured, you don’t have much control over what gets
folded, but it will usually do something close to what you expect based on
where your cursor is in the document. “What you expect” depends on both the LSP
and the TreeSitter grammar for the language you are working on, but I find it
best to just let it do its thing and not disagree with it.</p></div> <div class="paragraph"><p>If you find that you want way more control over code folding, I recommend
reading <code>:help folding</code> in its entirety. More than likely, you’ll decide that
actually, you don’t want more control over folding and just want LazyVim to
handle it for you!</p></div></div> <div class="sect2"><h3 id="_sessions"><a class="link" href="#_sessions">9.6. Sessions</a></h3> <div class="paragraph"><p>After a long hard day of coding, you probably have several buffers open and
your splits and tabs configured with all the files in just the right places.
Wouldn’t it be nice to put the code away for the evening and come back to all
those buffers, tabs, and splits just as they were?</p></div> <div class="paragraph"><p>LazyVim has built-in session management enabled by default. Simply close
LazyVim with <code>&lt;Space&gt;qq</code> and you’re done. Tomorrow morning, open it to the
dashboard with the <code>nvim</code> command and hit <code>s</code> to be on your way.</p></div> <div class="paragraph"><p>If you forgot to open it right away and the dashboard is long gone, you can use
<code>&lt;Space&gt;qs</code> to restore Neovim to wherever it was when you last closed it
(though any files you modified and saved in the meantime will still have their
new contents).</p></div> <div class="paragraph"><p>If you have opened Neovim temporarily and want to close it without wiping out
the session that was saved the last time you closed it, hit <code>&lt;Space&gt;qd</code> at any
time after you open Neovim and before you close it. In some contexts (notably,
git commit messages), this happens automatically so you don’t have to worry
about making a commit after you close the editor and then losing your session.</p></div></div> <div class="sect2"><h3 id="_summary_9"><a class="link" href="#_summary_9">9.7. Summary</a></h3> <div class="paragraph"><p>In this chapter, we learned about Vim’s buffers, windows and tabs, and how they
are different not only from each other, but also from many other window
management paradigms. Vim has the same concepts as other editors, but they are
sometimes mixed or named in different ways.</p></div> <div class="paragraph"><p>We also covered code folding to make it easier to wrangle large files, and
session management to return to your window configuration and come back to it
later. This is particularly useful when combined with LazyVim’s lightning fast
startup time. There’s no reason to keep your code editor open consuming memory
when you aren’t actually, you know, editing code.</p></div> <div class="paragraph"><p>In the next chapter, we’ll dig into some of the terrific programming language
support that LazyVim provides. This is arguably the one thing that made VS Code
amazing, but the Vim community has learned from its competitors and eventually
outmatched them.</p></div></div></div>`;return{c(){e=d("div"),e.innerHTML=t,this.h()},l(s){e=p(s,"DIV",{class:!0,"data-svelte-h":!0}),r(e)!=="svelte-1lp45yh"&&(e.innerHTML=t),this.h()},h(){h(e,"class","sect1")},m(s,n){u(s,e,n)},p:a,i:a,o:a,d(s){s&&f(e)}}}class y extends l{constructor(e){super(),c(this,e,null,m,i,{})}}export{y as component,w as universal};
