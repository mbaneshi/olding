import{s as n,n as o}from"../chunks/scheduler.seBsrkbn.js";import{S as r,i as d,e as c,c as l,l as h,m as p,g as u,d as m}from"../chunks/index.Dwxb9V0m.js";function f(){return{title:"Chapter 4: Opening Files",description:"How to open files in LazyVim, including Neotree, Telescope, and mini.files.",keywords:"vim, lazyvim, neovim, tutorial, opening, files, Telescope, fzf, mini.files, neo-tree"}}const w=Object.freeze(Object.defineProperty({__proto__:null,load:f},Symbol.toStringTag,{value:"Module"}));function g(a){let e,i=`<h2 id="_opening_files"><a class="link" href="#_opening_files">Chapter 4. Opening Files</a></h2> <div class="sectionbody"><div class="paragraph"><p>In the previous chapter, as a side-effect of learning about Command mode, we
saw how to open files the old-fashioned Vim way, using the <code>:edit</code> command.
Another old-school alternative is to open them directly from the terminal shell
command line, using <code>nvim filename</code>.</p></div> <div class="paragraph"><p>Both of these are occasionally handy, but LazyVim pre-configures more modern
ways of navigating and opening files.</p></div> <div class="sect2"><h3 id="_introducing_file_pickers"><a class="link" href="#_introducing_file_pickers">4.1. Introducing File Pickers</a></h3> <div class="paragraph"><p>LazyVim ships with two different “picker” plugins: tools for selecting items
from a list. We’ll look at both in this chapter with some advice on which to
choose. They look a bit differently, but can largely be used interchangeably.</p></div> <div class="paragraph"><p>By default, LazyVim ships with the Telescope picker enabled. It provides a
picker interface with preview and fuzzy search capabilities. If you’ve used the
command menu in many modern editors (or even Github or Slack), you may know
what I’m talking about. The picker itself doesn’t care what you are picking,
and it is used for a wide variety of tasks built into LazyVim or as third-party
plugins, including opening files, selecting open buffers, project-wide search,
and more.</p></div> <div class="paragraph"><p>The most common picker task you will perform is to open a file using
fuzzy search. I use this command dozens, maybe hundreds of times per day, so
it’s a good thing it’s got a really accessible keybinding.</p></div> <div class="paragraph"><p>The file picker is best illustrated while working in a code
repository with a lot of files. So close Neovim with <code>Space q q</code> and use the
<code>cd</code> command in your terminal to change to the directory of a project you’ve
been working on recently (If you don’t have one close to hand, clone your
favourite open source project and use that instead). Then type <code>nvim</code> to
open Neovim again.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">I had you exit to the terminal above because it’s easy to reason about,
but it is also possible to change directories from inside LazyVim using the
<code>:cd</code> command. Type <code>:cd the/path/to/the/directory</code> and hit <code>Enter</code>,
remembering that you can use the <code>Tab</code> key to autocomplete the path. Now if you
use <code>:e</code> to open files, they will be relative to the directory you specified.
If you are using a file picker, they may be relative to that working directory
or to the project containing the current file, as discussed shortly. Use <code>:pwd</code>
to see what the current directory is.</td></tr></tbody></table></div> <div class="paragraph"><p>Ok, so you’re in the root directory of a large project and you want to open an
arbitrary file. Simply press <code>Space</code> twice (i.e. <code>Space Space</code>) to pop up the
“Files In Current Project” picker. As I mentioned, this is the
easiest keybinding to type on your entire keyboard. The Space bar on most
keyboards is big, and you’re hitting it with your strongest digit: the thumb.
As usual, just one <code>Space</code> will pop up the Space mode menu, and you can see
that a second <code>Space</code> will present you with “Find Files (root dir)”.</p></div> <div class="paragraph"><p>For the project containing the current state of this book, the picker looks
like this:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-4/telescope-current-project-dark.png" alt="telescope current project dark"/></div> <div class="title">Figure 16. Telesscope Picker</div></div> <div class="paragraph"><p>The picker is divided into three main areas: the results list in the upper
left, a preview of the currently selected file on the right, and the Input
area, in this case labelled “Git Files”.</p></div> <div class="paragraph"><p>The input area is actively focused and currently in Insert mode, so you can
just start typing the name of whatever file you want to open. This is a “fuzzy
search”, (a concept popularized by Sublime Text) which means you can skip
letters, saving you oh-so-precious milliseconds. For example, if I type <code>ch3</code>, my
list gets filtered down to the following files:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-4/telescope-ch-3-dark.png" alt="telescope ch 3 dark"/></div> <div class="title">Figure 17. Pick Chapter 3</div></div> <div class="paragraph"><p>Only files whose paths contain those three characters in order, with possibly
other characters in between, are visible. The picker has helpfully highlighted
those three letters in the results so you can easily see why it matched.</p></div> <div class="paragraph"><p>Also notice that by default, the match is case <strong>in</strong>sensitive. I typed the
lowercase letter <code>c</code>, but it matched the uppercase <code>C</code> in the filename. This is
usually sufficient to narrow the search results to what you need. However, if
you <em>do</em> use <strong>any</strong> capitalized letters in your search, it switches to a
case sensitive mode (this is sometimes referred to as “smart case”).</p></div> <div class="paragraph"><p>That means that <code>Ch</code> will match all the <code>Chapters</code>, but <code>cH</code> will not match
anything at all. More interesting, <code>chF</code> will <em>also</em> not match anything at all
because the presence of the capitalized <code>F</code> makes the whole thing case
sensitive, and the chapters are all named with a capital <code>C</code>, so the lowercase
<code>c</code> is not able to match them.</p></div> <div class="paragraph"><p>Sometimes you will start typing a word and realize you need to match something
<em>earlier</em> in the path to distinguish it. For example, I started typing
<code>outline</code> in these source files from <a href="https://www.fablehenge.com">Fablehenge</a>:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-4/telescope-outline-dark.png" alt="telescope outline dark"/></div> <div class="title">Figure 18. Outline in Picker</div></div> <div class="paragraph"><p>“Outline” is a common word in this app. There are 243 matching files, and I
realize I should probably have typed <code>comp</code> in front to narrow it to just files
in the <code>component</code> directory. I <em>could</em> switch to Normal mode and edit the
beginning of the line, but it’s faster to just type <code>&lt;space&gt;comp</code>. The picker
will interpret the space as “filter the lines again, fuzzy matching this new
word from the beginning”. Here we can see that only <code>comp…​outline</code> files have
been matched:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-4/telescope-outline-comp-dark.png" alt="telescope outline comp dark"/></div> <div class="title">Figure 19. Narrow picker to “comp”</div></div> <div class="paragraph"><p>This image might be surprising; the most promising match is obviously
the selected one at the bottom of the list. The other
27 matching lines contain all the letters of the word “outline” <strong>and</strong> all the
letters of the word “comp” in order from left to right. However, because of the
fuzzy matching algorithm, the two can actually overlap! So on e.g. the second-to-last
entry, the <code>c</code> of the matching “comp” is <strong>before</strong> the word <code>outline</code>, the <code>o</code> is
<strong>in</strong> it, and the <code>m</code> and <code>p</code> both come <strong>after</strong> the word outline. The picker
doesn’t care, though it will rank matches with the matching letters closer together
as more important, so they’ll be visible at the bottom of the results.</p></div> <div class="paragraph"><p>You can use the up and down arrow keys to select a different file in the search
results, and its preview will show up in the right-hand window. Once you find
the file you want to open, press the <code>Enter</code> key to open it in the currently
active Neovim window.</p></div> <div class="paragraph"><p>With Telescope, the input area even has its own Normal mode! You can get into
it using a <em>single</em> press of the Escape key. Now if you press <code>j</code> or <code>k</code>,
you’ll be able to select different files in the list without moving your hand
to the arrow keys. Further, the <code>h</code> and <code>l</code> keys will allow you to move the
cursor within the input box and you can use the <code>i</code> or <code>a</code> keys to enter Insert
mode at the new location. The “but bigger” <code>I</code> and <code>A</code> keys allow you to move
the cursor to the beginning or end of the line and enter Insert mode as well.</p></div> <div class="paragraph"><p>You can even use Seek mode, as we discussed in Chapter 3, though it works a bit
differently in the picker. When you press the <code>s</code> key while in the Telescope
picker’s Normal mode, you can skip the part where you enter a character to
search for. Instead, LazyVim will immediately label every line in the picker
with a character to the left of the filename:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-4/telescope-seek-dark.png" alt="telescope seek dark"/></div> <div class="title">Figure 20. Telescope Seek Labels</div></div> <div class="paragraph"><p>These characters are labels for each line in the picker. Simply press one of
the shown letters on your keyboard, and whichever line the label associated
with that letter is on will be selected. Then press <code>Enter</code> to actually open
the file (or, if it is not a file picker, perform the default action for that
picker).</p></div> <div class="paragraph"><p>Finally, if you are in the Telescope window and decide you don’t want to open
any files after all (or you got the information you needed from looking at the
preview), press <code>Escape</code> <em>twice</em>. Once to enter Normal mode in the Telescope
picker, and a second time to close the picker.</p></div> <div class="paragraph"><p>If you need to scroll the <em>preview</em> window to see something lower down in the
file, the same <code>Control-d</code>, <code>Control-u</code>, <code>Control-f</code>, and <code>Control-b</code> keys that
we discussed in the Basic Navigation chapter can be used.</p></div></div> <div class="sect2"><h3 id="_the_difference_between_root_and_cwd"><a class="link" href="#_the_difference_between_root_and_cwd">4.2. The Difference Between “Root” and “Cwd”</a></h3> <div class="paragraph"><p>The <code>&lt;Space&gt;&lt;Space&gt;</code> command is mapped to “Find Files (Root Directory)”. Two
other ways to open the file picker are to use <code>&lt;Space&gt;f</code> to open the
“file/find” menu, and follow it with either <code>f</code> again or <code>F</code>.</p></div> <div class="paragraph"><p><code>&lt;Space&gt;ff</code> is the same as <code>&lt;Space&gt;&lt;Space&gt;</code>. It opens “Find Files (Root
Directory)” and is just another longer way to get there. I assume it exists in
both places so that users can choose to map some other action to
<code>&lt;Space&gt;&lt;Space&gt;</code> and still be able to access the picker functionality through
<code>&lt;Space&gt;ff</code>.</p></div> <div class="paragraph"><p><code>&lt;Space&gt;fF</code>, where the second <code>F</code> is shifted, is similar; it is mapped to an
action called “Find Files (cwd)”. If you run it in your project, you’ll
<em>probably</em> find that it appears to do the exact same thing as “Find Files (Root
Directory)” (depending on how your project is set up), so the purpose of two
separate keybindings may be confusing.</p></div> <div class="sect3"><h4 id="_current_working_directory"><a class="link" href="#_current_working_directory">4.2.1. Current Working Directory</a></h4> <div class="paragraph"><p>“Cwd” stands for “Current Working Directory”, and by default, it refers to
whatever directory your terminal was in when you typed <code>nvim</code> to open the
editor. You can change the <code>cwd</code> for the entire editor by entering Command mode
with <code>:</code> and then typing <code>cd path/to/directory</code> (remember, all commands are
followed by a carriage return, so press <code>Enter</code> or <code>Return</code> afterwards). Now if
you use <code>&lt;Space&gt;fF</code>, the list of files will be shown relative to the new
directory you have changed into.</p></div> <div class="paragraph"><p>If you are unsure what directory you are in, you can use the <code>:pwd</code> (short for
“print working directory”) command to have it pop up in a little notification
window. <code>cd</code> and <code>pwd</code> are the same commands used by <code>bash</code>, <code>zsh</code>, and many
other shells for changing and printing the working directory, so they may
already be familiar to you.</p></div> <div class="paragraph"><p>We haven’t discussed splitting your editor or opening new tabs yet, but for
future reference: It is actually possible to have <em>different</em> working
directories for different windows. The command to change just the current
window’s directory is <code>:lcd</code>, short for “local change directory”. This can be
a powerful way to work on multiple projects at the same time (for example, if
you are a full stack developer working on backend and frontend projects).
However, the LazyVim concept of a “Root” directory can semi-automate this.</p></div></div> <div class="sect3"><h4 id="_root_directory"><a class="link" href="#_root_directory">4.2.2. Root Directory</a></h4> <div class="paragraph"><p>The root directory is not a Vim concept, but is instead a Language Server
Protocol (LSP) concept. LSPs are the reason that VS Code became so popular so
quickly; the idea was that the editor could call out to an external service
running on your computer to find out useful things about the codebase. The LSP
powers a lot of useful stuff such as go to definition and references,
highlighting errors in your code, and showing documentation for a variable or
class. It can even help with formatting and syntax highlighting.</p></div> <div class="paragraph"><p>The root directory is the directory that the LSP infers is the “home”
directory of the currently open file. How the LSP does this is language (and
language server) dependent. For example, in Javascript or Typescript projects
it probably searches parent directories for the presence of a <code>package.json</code> or
<code>tsconfig.json</code> file to detect the root directory. whereas in a Python project
it might instead look for things like <code>pyproject.toml</code> or <code>poetry.lock</code>. and
Rust projects use the directory that contains a <code>Cargo.toml</code>. Alternatively,
some LSPs might just use the presence of a <code>.git</code> folder as the “root” of the
project’s workspace.</p></div> <div class="paragraph"><p>The only reason this root directory is “often the same as your <code>cwd</code>” is that
this is usually the folder you want to work from when you are working on a
project, so it’s the one you <code>cd</code> into before you open Neovim.</p></div> <div class="paragraph"><p>This automatic root directory thing can be super useful if you are working on
multiple projects. Instead of using <code>lcd</code> as discussed in the previous section,
you can just open a file in a different project using <code>:e</code> or one of the file
finding extensions we’ll discuss next. Then if you invoke the “Find files (root
dir)” command using <code>&lt;Space&gt;&lt;Space&gt;</code> or <code>&lt;Space&gt;ff</code>, it will look for other
files in the same root directory as the one you just opened.</p></div> <div class="paragraph"><p>However, it can sometimes be confusing, especially if you are working in a
monorepo or if you have root directories in places you don’t expect. For
example, I have a fairly normal Svelte project that has a <code>package.json</code> file
in it. This project uses Cypress for testing, and the Cypress folder contains a
<code>tsconfig.json</code> file that causes the Typescript language server to interpret
that as a separate root. So if I am working on one of the cypress test files
and press <code>&lt;Space&gt;&lt;Space&gt;</code>, the root directory is considered the Cypress folder
and I can only open other Cypress tests. But often the thing I <em>wanted</em> to do
was open a source file in the main folder to see why a test is failing. In this
case, I have to press <code>&lt;Escape&gt;&lt;Escape&gt;</code> to exit the Telescope picker, then
<code>&lt;Space&gt;fF</code> to open the picker in current working directory mode instead.</p></div></div></div> <div class="sect2"><h3 id="_fzf_lua"><a class="link" href="#_fzf_lua">4.3. Fzf.lua</a></h3> <div class="paragraph"><p>LazyVim recently shipped a new opt-in picker experience as an alternative to
Telescope. I am convinced this was done just to make my life as an author
harder! They are quite similar, but different enough that they need to be
documented separately.</p></div> <div class="paragraph"><p>The main advantage of Fzf.lua is said to be that it provides a “familiar”
interface to people who are used to using the <code>fzf</code> tool on the command line.
Fzf is a handy CLI tool for changing directories or opening files in a deeply
nested filesystem by only typing a handful of characters using fuzzy matching.
I’ve used it for years and highly recommend it. That said, I’ve never really
cared whether my editor had the exact same experience as the CLI tool, so I
don’t consider it a compelling argument.</p></div> <div class="paragraph"><p>The other reason Fzf.lua is suggested is that it is considered to be more
performant than Telescope. I haven’t really noticed a difference on my machine
but if you find Telescope is laggy, you might want to try out Fzf.lua.</p></div> <div class="paragraph"><p>There are a couple downsides to Fzf.lua, though. The main one is that it
secretly runs in a Neovim terminal window, so Normal mode behaves really weird.
Notably, pressing escape once closes the picker instead of entering Normal mode
in the input area like Telescope does.</p></div> <div class="paragraph"><p>The second downside is that Fzf.lua doesn’t have the robust plugin ecosystem
that Telescope does. In practice, there’s only one plugin that I miss when
using Fzf.lua instead of Telescope, but if you become a Telescope power user,
you might notice a lack of options with Fzf.lua.</p></div> <div class="paragraph"><p>If you want to try Fzf.lua, you need to learn about <em>Lazy Extras</em>. I go into
more detail about Lazy Extras in the next chapter, but the short story is they
are optional plugin configurations that you can enable with a single keypress.
To enable Fzf.lua, do the following:</p></div> <div class="ulist"><ul><li><p>Type <code>:LazyExtras&lt;Enter&gt;</code></p></li> <li><p>Move your cursor to the line that contains <code>editor.fzf</code></p></li> <li><p>Press <code>x</code> to install the e<strong>X</strong>tra</p></li> <li><p>Wait a moment for the related plugins to install</p></li> <li><p>Restart Neovim</p></li></ul></div> <div class="paragraph"><p>This will disable Telescope and enable Fzf.lua. You’ll see a slightly different
picker layout when you open it:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-4/fzf-dark.png" alt="fzf dark"/></div> <div class="title">Figure 21. Fzf picker</div></div> <div class="paragraph"><p>The main difference is that the input area is at the top of the left side in
Fzf.lua instead of the bottom as it is with Telescope.</p></div> <div class="paragraph"><p>The picker behaves similarly to Telescope, so I’ll only highlight the
differences here. The biggest one, as I already mentioned, is the weird
Terminal-based Normal mode. If you are in the input area and want to enter
Normal mode, you have to type the bizarre set of keybindings <code>Control-\\</code>
followed by <code>Control-n</code>. This Normal mode does allow you to navigate around the
window and most keybindings will behave the way you expect Normal mode to
behave.</p></div> <div class="paragraph"><p>The most notable exception is that Seek mode doesn’t behave like it does in
Telescope. If you want to get the behaviour of jumping to a line by a label
using Fzf.lua, use the unmemorable <code>Control-x</code> keybinding instead.</p></div> <div class="paragraph"><p>Fzf.lua has several other keybindings configured by default; you can see a
helpful menu of them by hitting <code>F1</code>. The only ones I use regularly are the
annoying Emacs-style <code>Control-a</code> and <code>Control-e</code> to jump to the beginning or
end of the input area, and <code>Control-d</code> and <code>Control-u</code> to scroll the results
window.</p></div> <div class="paragraph"><p>Throughout the rest of this book, I will generally assume you are using
Telescope rather than Fzf.lua, though if there are glaring differences between
the two, I cover them. For now, let’s move on to a completely different file
selecting experience.</p></div></div> <div class="sect2"><h3 id="_the_neo_tree_nvim_plugin"><a class="link" href="#_the_neo_tree_nvim_plugin">4.4. The Neo-tree.nvim Plugin</a></h3> <div class="paragraph"><p>Neo-tree creates a left-sidebar file explorer experience that should be familiar
to users of many modern IDEs and editors. While, like many of those environments,
Neo-tree works with the mouse, it is optimized for keyboard interactions,
making it faster to work with once you learn “Neo-tree mode”.</p></div> <div class="paragraph"><p>I want to be upfront and honest here: I don’t personally use Neo-tree. I find
that the file pickers we just discussed are the fastest way to open files, and
when I need to manipulate the filesystem, I prefer to use mini.files, which
we will discuss later in this chapter. The primary reason I prefer mini.files
is that it uses the same keybindings as Vim Normal mode. Modes are great, but
having more of them than necessary is not!</p></div> <div class="paragraph"><p>However, I suspect that many readers will prefer the familiar tree view
experience Neo-tree provides, and since this plugin ships with LazyVim by
default, I want to make sure it gets fair coverage in this book.</p></div> <div class="paragraph"><p>Let’s start by opening Neo-tree using the <code>&lt;Space&gt;-e</code> keybinding, where the
mnemonic is “<strong>e</strong> for Explore”. If you pop up the Space mode menu, you’ll see
that, as with the fuzzy picker, there are two ways to open the Neo-tree explorer:
<code>&lt;Space&gt;-e</code> for <code>Explore Neo-tree (root directory)</code> and <code>&lt;Space&gt;-E</code> for <code>Explore
Neo-tree (cwd)</code>.</p></div> <div class="paragraph"><p>“Root directory” and “cwd” have the same meanings we discussed in the
previous section, and you will notice the consistent relationship between
lowercase and uppercase letters: <code>&lt;Space&gt;ff</code> and <code>&lt;Space&gt;e</code> both open the root
directory, and <code>&lt;Space&gt;fF</code> and <code>&lt;Space&gt;E</code> both open the current working
directory.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">To hide the Neo-tree explorer window, just press <code>&lt;Space&gt;e</code> again while it is
visible, or press <code>q</code> while it is focused.</td></tr></tbody></table></div> <div class="paragraph"><p>When the explorer is opened, it shows all the files and folders in the relevant
directory, with all the folders collapsed, except for the one containing
the currently active file, if there is one. For example, while editing this
file, my Neo-tree looks as follows:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-4/neo-tree-dark.png" alt="neo tree dark"/></div> <div class="title">Figure 22. Neo-Tree</div></div> <div class="paragraph"><p>The cursor is on the file I’m currently editing. I can move that cursor up and
down using the ubiquitous <code>j</code> and <code>k</code> keys.</p></div> <div class="paragraph"><p>Folders are collected to the top of the view. If you move the cursor to one of
these folders, you can press the <code>Enter</code> key to see the files inside the
folder. And if you move it to a file, you can open the file in the current Vim
window with <code>Enter</code> as well.</p></div> <div class="paragraph"><p>You can also expand and collapse folders and open files by double clicking with
the mouse, but my guess is you won’t want to do that once you learn proper
keyboard navigation.</p></div> <div class="paragraph"><p>Speaking of keyboard navigation, yes, <code>j</code> and <code>k</code> to move up and down can be
super slow if there are a lot of files to navigate. All of the commands that we
discussed in Chapter 3 can be used to move faster. For example, <code>10j</code>
will move the cursor 10 lines down with just three keystrokes compared to
pressing <code>j</code> 10 times, and <code>Control-d</code> or <code>Control-u</code> can be used to scroll the
tree down or up. Most interestingly, <code>s</code> can be used to Seek to any line
in the Neo-tree view, even if Neo-tree is not currently focused.</p></div> <div class="paragraph"><p>Neo-tree will show either the root or cwd as the topmost directory. If you need
to navigate “up” the tree to a higher-level directory, you will need to use the
<code>Backspace</code> key.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">Backspace is often coded as <code>&lt;BS&gt;</code> in Vim, so if you see a
keybinding or instructions telling you that <code>&lt;BS&gt;</code> does something, they
aren’t full of (bull)! It just means Backspace.</td></tr></tbody></table></div> <div class="paragraph"><p>In addition to navigating and opening files, you can even make changes to the
file system using Neo-tree. For example, to delete a file, you can move the
cursor over that file and hit the <code>d</code> key. You’ll be prompted with a popup
window asking if you are sure. Hit <code>y</code> and then <code>Enter</code> to confirm it:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-4/neo-tree-delete-dark.png" alt="neo tree delete dark"/></div> <div class="title">Figure 23. Delete Confirmation in Neo-tree</div></div> <div class="paragraph"><p>To add a file or folder/directory, use the <code>a</code> key and enter a new name. Use a
trailing slash (<code>/</code>) to indicate a folder. You can also use the <code>A</code> key from the
explorer to add a folder without having to type a trailing slash.</p></div> <div class="paragraph"><p>The <code>r</code> key can be used to rename the file or folder under the cursor.</p></div> <div class="paragraph"><p>To copy or move a file, you can use Neo-tree’s pseudo-clipboard. I say
“pseudo-” because you can’t use this to copy a file to be pasted in e.g. MacOS
Finder or Windows Explorer; only to other places in the Neo-tree.</p></div> <div class="paragraph"><p>To <em>cut</em> a file with the intent of moving it somewhere else in the tree, use
the <code>x</code> command. If, instead, you want to <em>copy</em> the file, use <code>y</code>. The
mnemonic for <code>y</code> is <code>yank</code>, and is actually the same key you would use to copy
text in the normal editor. To complete the move or copy, you’ll need to
navigate to the destination folder and use the <code>p</code> key (which you may recall
means “put” or “paste”).</p></div> <div class="paragraph"><p>Neo-tree also has a “Filter” mode that I find quite clumsy; it’s really just a
cheap imitation Telescope/Fzf.lua picker in a smaller window, so I recommend
using your chosen picker instead. If you want to use Neo-tree’s Filter mode,
you can access it using <code>/</code> and enter some characters to limit the search
results to files that match those characters. Then use the up and down arrows
to navigate the list (<code>j</code> and <code>k</code> won’t work here because you’re in a sort of
Insert mode context).</p></div> <div class="paragraph"><p>There is a <em>ton</em> of other cool stuff that Neo-tree can do. We will cover its
use for buffer, git, and symbol navigation later, for example. In the meantime,
you can use the <code>?</code> (mnemonic “ask question for help”) key while the Neo-tree
window is focused to get an overview, or <code>:help neo-tree</code> if you want to drink
from the firehose.</p></div></div> <div class="sect2"><h3 id="_the_mini_files_alternative"><a class="link" href="#_the_mini_files_alternative">4.5. The Mini.files Alternative</a></h3> <div class="paragraph"><p>As I mentioned, I don’t actually use Neo-tree for file navigation. I find that
it feels kind of “foreign and un-vim-like”. To me, it is a completely separate
experience that just happens to be embedded in a Neovim window. That said, I
<em>also</em> don’t like the tree view sidebar experience in VS Code and the editors it
emulates / is emulated by, so it’s possible that tree views just aren’t right
for me.</p></div> <div class="paragraph"><p>These are just <strong>my</strong> opinions, and one of the golden rules of text editors is
“all opinions are valid” (otherwise there would be war). A large number of
Neovim users love Neo-tree, and you should use it if it matches your mental
model.</p></div> <div class="paragraph"><p>That said, I’m clearly not alone in these opinions, because LazyVim optionally
provides a different file management experience with a plugin called
mini.files. It is disabled by default.</p></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content">Mini.files is part of a suite of fairly random Neovim packages known as
mini.nvim. These plugins are independent from each other and provide a lot of
common features that in many cases ought to ship with Neovim. Occasionally, the
mini.nvim plugins are inferior to other plugins that they clone, but many are
best in class. Mini.files is not the only mini.nvim plugin that ships with
LazyVim, and we’ll touch on others later.</td></tr></tbody></table></div> <div class="paragraph"><p>The mini.files file manager is kind of like a Neovim-native experience of the
columnar view that is popular in MacOs finder, among other file managers. The
main reason I like it is that editing the directory listing is just like
editing a normal text buffer. I don’t have to remember that <code>a</code> means “after”
in Normal mode, but it means “add file/folder” in Explorer mode. Instead, in
mini.files, I use the <code>o</code> key to “create a new line below the current line”,
and then enter a new file name in Neovim Insert mode. Later, I tell mini.files
to sync my changes and it will create the file for the new row.</p></div> <div class="paragraph"><p>In order to use mini.files, you have to enable it as a Lazy Extra, similar
to how we enabled the FZF picker. The exact steps are:</p></div> <div class="ulist"><ul><li><p>Type <code>:LazyExtras&lt;Enter&gt;</code></p></li> <li><p>Move your cursor to the line that contains mini.files (Seek mode is fastest)</p></li> <li><p>Press <code>x</code> to install the e<strong>X</strong>tra</p></li> <li><p>Wait a moment for the plugins to install</p></li> <li><p>Restart Neovim</p></li></ul></div> <div class="sect3"><h4 id="_using_mini_files"><a class="link" href="#_using_mini_files">4.5.1. Using Mini.files</a></h4> <div class="paragraph"><p>Once installed, you can show the mini.files view using <code>&lt;Space&gt;fm</code> and
<code>&lt;Space&gt;fM</code>. By default, these are <em>not</em> quite the same as the <code>cwd/root</code>
structure we’ve seen in Telescope, Fzf.lua, and Neo-tree. Instead, they are
listed in the <code>&lt;Space&gt;f</code> menu as follows:</p></div> <div class="listingblock"><div class="title">Listing 11. Mini.files keybindings</div> <div class="content"><pre class="pygments highlight"><code data-lang="plaintext"><span></span>m -&gt; Open mini.files (Directory of Current File)
M -&gt; Open mini.files (cwd)</code></pre></div></div> <div class="paragraph"><p>The default mini.files configuration doesn’t have an open in root option.
I like having the ability to open the directory of the currently open file,
but I don’t like <em>losing</em> the ability to open the root of the current project.
I show how to address this in Chapter 5.</p></div> <div class="paragraph"><p>Instead of a sidebar, the mini.files menu shows up as columns of windows
(known as Miller columns) side-by-side. For example, here’s what happens
when I open mini.files to the current working directory of this book:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-4/mini-files-dark.png" alt="mini files dark"/></div> <div class="title">Figure 24. Mini.files</div></div> <div class="paragraph"><p>The left-hand panel shows the current working directory, and the middle column
shows the contents of the <code>book</code> directory, where my cursor is currently on
chapter 4. The right column shows the preview of that chapter 4 directory,
which contains only one file.</p></div> <div class="paragraph"><p>Interacting with mini.files is <em>very</em> similar to interacting with a standard
vim window. You can use the <code>j</code> and <code>k</code> keys to move the cursor up and down. If
this places your cursor over a folder, the contents of that folder will
immediately show up to the right, and if it is over a file, you will see a
preview of the file.</p></div> <div class="paragraph"><p>If you want to move “into” a folder to interact with the contents of that
folder instead, simply press the <code>l</code> key to move “right”.</p></div> <div class="paragraph"><p>Similarly, pressing <code>h</code> will move “out” of the current folder. If the cursor is
in the left-most column, moving left will open a new left-most column, so you
can navigate right up to the root of your file-system if you need to.</p></div> <div class="paragraph"><p>To open a file in the currently active Neovim window, press <code>l</code> on that file
again. The behaviour here may be a bit surprising; the file will open <em>under</em>
the mini.files view, but it won’t hide the file menu. This allows you to open
multiple files before closing the navigator, which can be done with the <code>q</code>
key.</p></div> <div class="paragraph"><p>The beautiful thing about mini.files compared to Neo-tree is that the little
windows act like normal editors, and all the navigation features you have
become used to are available. For example <code>Seek</code> mode can be used to navigate
to a file. Press the <code>s</code> key and then any number of characters you want to
search for. Any matches to the typed characters will be labelled and you can
jump to them by typing the indicated label.</p></div> <div class="paragraph"><p>Even modifying the filesystem is exactly the same as editing a normal buffer.
We haven’t really covered editing yet (I’m just as surprised as you are),
but here’s a quick overview:</p></div> <div class="ulist"><ul><li><p>To rename a file or folder, navigate to the line that has it, and enter Insert
mode to change or add text.</p></li> <li><p>Deleting a file or folder uses the command <code>dd</code> which is the
keybinding to delete an entire line of text in normal Neovim windows.</p></li> <li><p>Copy a file or folder with <code>yy</code>, the command to copy (“<strong>y</strong>ank”) a line of text.</p></li> <li><p>Put/paste a deleted or yanked file with <code>p</code>.</p></li></ul></div> <div class="paragraph"><p>We’ll discuss these commands and more in Chapter 6. The main point is that
pretty much any navigation or editing command you learn in the future
will work with mini.files.</p></div> <div class="sect4"><h5 id="_saving_filesystem_changes"><a class="link" href="#_saving_filesystem_changes">Saving Filesystem Changes</a></h5> <div class="paragraph"><p>Any modification that you make using these keybindings will not actually be
saved on the filesystem until you type the <code>=</code> key, which is a (rare)
mini.files specific keybinding. I think of it as meaning “make the filesystem
<strong>equal</strong> to what I’ve typed”. This will pop up a little window telling you what
actions mini.files wants to take on your behalf, such as deleting, moving,
renaming, or copying files. You can confirm or decline the changes with a <code>y</code>
or <code>n</code> (<strong>y</strong>es or <strong>n</strong>o, of course).</p></div> <div class="paragraph"><p>I encourage you to play with both Neo-tree and mini.files until you can make a
decision as to which of the two you prefer. Eventually, you will arrive at one
of the following conclusions:</p></div> <div class="ulist"><ul><li><p>You prefer Neo-tree and don’t need mini.files. In this case, revisit the
LazyExtras mode and disable mini.files with the <code>x</code> key.</p></li> <li><p>You use Neo-tree for some interactions (possibly things we haven’t covered
yet, such as navigating git, buffers, or symbols) and mini.files for others.
In this case, you are probably content with the default LazyVim configuration
of the mini.files extra.</p></li> <li><p>You are <em>my kind of weird</em> and don’t want to use Neo-tree at all, preferring
only mini.files. Disabling plugins is discussed in the next chapter.</p></li></ul></div></div></div></div> <div class="sect2"><h3 id="_summary_4"><a class="link" href="#_summary_4">4.6. Summary</a></h3> <div class="paragraph"><p>In this chapter, we learned not one, but four different ways to open files and
interact with the filesystem in LazyVim: Telescope, Fzf.lua, Neo-tree, and
mini.files. Each provides a different mechanism for opening and managing files,
and you will find some of them more comfortable than others.</p></div> <div class="paragraph"><p>As a side-effect of studying these filesystem tools, we got a tiny preview
of configuring plugins and installing LazyVim extras. We will go into
more detail on this in the next chapter.</p></div></div></div>`;return{c(){e=c("div"),e.innerHTML=i,this.h()},l(t){e=l(t,"DIV",{class:!0,"data-svelte-h":!0}),h(e)!=="svelte-181p2bp"&&(e.innerHTML=i),this.h()},h(){p(e,"class","sect1")},m(t,s){u(t,e,s)},p:o,i:o,o,d(t){t&&m(e)}}}class b extends r{constructor(e){super(),d(this,e,null,g,n,{})}}export{b as component,w as universal};
