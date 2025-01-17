import{s as n,n as o}from"../chunks/scheduler.seBsrkbn.js";import{S as r,i as l,e as c,c as d,l as h,m as p,g as u,d as m}from"../chunks/index.Dwxb9V0m.js";function g(){return{title:"Chapter 11: Navigating Source Files",description:"LazyVim makes it easy to navigate between source files, definitions, and references using LSP, treesitter, and pickers.",keywords:"vim, lazyvim, neovim, tutorial, course, book, Language Server, LSP, Telescope, fzf.lua, navigating, marks"}}const b=Object.freeze(Object.defineProperty({__proto__:null,load:g},Symbol.toStringTag,{value:"Module"}));function y(s){let e,a=`<h2 id="_navigating_source_files"><a class="link" href="#_navigating_source_files">Chapter 11. Navigating Source Files</a></h2> <div class="sectionbody"><div class="paragraph"><p>In previous chapters, we’ve learned many different ways to navigate within
a single buffer, as well as between open tabs and windows. This chapter
will go into detail of different ways to navigate between source files.</p></div> <div class="sect2"><h3 id="_go_to_definition"><a class="link" href="#_go_to_definition">11.1. Go To Definition</a></h3> <div class="paragraph"><p>In my opinion, “Go to Definition” is the most valuable feature language servers
have brought us. Major IDEs have supported it for compiled languages for eons,
but dynamically typed languages—​such as my beloved Python—​have always been
hell for static analysis, and such features were often pretty hit or miss.</p></div> <div class="paragraph"><p>As one of the best-named editor features of all time, “Go to Definition” jumps
your cursor from whatever keyword it is currently sitting on to the place where
that keyword is defined, regardless of what file it is in.</p></div> <div class="paragraph"><p>Most often, I use this when I am looking at a call site for a function and want
to see the function itself. A simple press of <code>gd</code> (go to definition also has one
of the more memorable LazyVim keybindings of all time) will take me there.</p></div> <div class="paragraph"><p>Depending on how good the LSP for the language I am editing is, this often even
allows me to jump into library files or type declarations for third party modules
so I can see what is really going on.</p></div> <div class="paragraph"><p>Go to definition is context dependent, but will usually do exactly what you
expect. If you are looking at a variable, <code>gd</code> will jump to wherever the
variable is initialized. If your cursor is on a class name, it will jump to
wherever the class is defined.</p></div> <div class="paragraph"><p>Typically, once you’ve jumped to a definition and learned what you need to
learn from that file, you’ll immediately want to jump back to where you
started. You can do this easily using <code>Control-o</code>, as we discussed in Chapter 3
(and <code>Control-i</code> can move forward in your jump history).</p></div></div> <div class="sect2"><h3 id="_go_to_references"><a class="link" href="#_go_to_references">11.2. Go To References</a></h3> <div class="paragraph"><p>The inverse of the Go to Definition command is “Go to References”. If you are
looking at a function, variable, type, etc, and want to see all the places
that variable is accessed, use the <code>gr</code> command.</p></div> <div class="paragraph"><p>Unlike with a definition or declaration, there will typically be more than one
reference to a given word (a variable in isolation is a useless variable,
indeed). So when you type <code>gr</code> it usually won’t immediately jump to a location.
Instead it will pop up a picker view of all the references to the word that was
under your cursor, with all the preview and filtering luxury that Telescope and
Fzf.lua always bring.</p></div> <div class="paragraph"><p>It is common to want to perform some action—​such as a rename or adding an
argument or what have you—​at every reference. You <em>could</em> keep showing the
picker by hitting <code>gr</code> again or by using the <code>&lt;Space&gt;sR</code> keybinding
which resumes your previous picker search. However, it is often much more
useful to use the Trouble list that we learned about in Chapter 10.</p></div> <div class="paragraph"><p>To do that, use <code>gr</code> to show the references in a picker as usual. Then use
<code>Control-t</code> to show each of the matches in the Trouble window. Now you can use <code>]q</code>
and <code>[q</code> to jump between them without going to the trouble of showing the
picker again. If you’d rather use the less fancy Quick Fix window, use <code>Control-q</code>
from the picker instead of <code>Control-t</code>.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content"><code>Control-t</code> and <code>Control-q</code> work on most pickers. I recommend getting used
to using them any time you want a less-temporary list of items than the pickers
will give you.</td></tr></tbody></table></div></div> <div class="sect2"><h3 id="_context_specific_help"><a class="link" href="#_context_specific_help">11.3. Context-specific Help</a></h3> <div class="paragraph"><p>Most non-modal editors show you some help or “hover” text when you hold your
mouse over a word or symbol. The quantity and value of this text varies widely
depending on the LSP, but usually includes a function signature and
documentation for the word under the cursor.</p></div> <div class="paragraph"><p>It’s probably possible to set up Neovim to show help texts on hover, but why
would you move your hand to the mouse when LazyVim has such amazing navigation
on the keyboard? Instead, use the (shifted) <code>K</code> keybinding. Yeah, <code>K</code> is a pretty
stupid mnemonic to remember, but <code>H</code> and <code>?</code> were already taken.</p></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content">In fact, the <code>K</code> stands for “keywordprog”, which is a legacy Vim concept
that has been superseded by language servers in the modern world. So LazyVim
reappropriated the keybinding.</td></tr></tbody></table></div></div> <div class="sect2"><h3 id="_listing_symbols"><a class="link" href="#_listing_symbols">11.4. Listing Symbols</a></h3> <div class="paragraph"><p>Another handy LSP feature is to search all the symbols in the current file or
project. If you are editing a particularly long file and need to jump to a
function that is not terribly close to your cursor, you might use the
<code>&lt;Space&gt;ss</code> command (mnemonic is “search symbols”). As hinted by the double
<code>s</code>, this is expected to be a fairly common action.</p></div> <div class="paragraph"><p>The dialog that pops up should be fairly familiar by now, as it’s the usual
picker:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-11/telescope-symbols-dark.png" alt="telescope symbols dark"/></div> <div class="title">Figure 49. Picker Symbols</div></div> <div class="paragraph"><p>So you already know how to use it. However, I want to remind you of a couple
Picker tips that make it more useful:</p></div> <div class="paragraph"><p>Most of the time when I’m using this symbol picker, I only care about
functions, or sometimes classes. So the fields and properties scattered in the
screenshot above are just a distraction. It <strong>is</strong> possible to configure the
picker to only show certain kinds of symbols, but I prefer a quick trick that
allows me to narrow it down to just functions: type (part of) the word
<code>function</code>.</p></div> <div class="paragraph"><p>Since the picker includes the word “function” in the second column of the
results, it merrily filters out all the lines that don’t have that
word in them. Handy.</p></div> <div class="paragraph"><p>Better yet, I can input a space <em>after</em> the word “function” to inform the picker
to perform subsequent searching back in the first column. So “func api”
filters all functions that have the word “api” in them.</p></div> <div class="paragraph"><p>My second tip is to not forget about the <code>Control-t</code> and <code>Control-q</code> shortcuts
to dump picker results into the Quick Fix or Trouble list. It generates a
quick and dirty table of contents of whatever symbols you filtered for.</p></div> <div class="paragraph"><p>If you want to search all the symbols in your whole project, use the “but
bigger” mnemonic. <code>&lt;Space&gt;sS</code> will perform such a search. However, be warned
that not all LSPs support workspace symbol search. Some only search in
currently open files, and even many of those that fully support workspace
symbol search are unusably slow.</p></div></div> <div class="sect2"><h3 id="_neo_tree_also_has_a_symbols_outline"><a class="link" href="#_neo_tree_also_has_a_symbols_outline">11.5. Neo-tree Also has a Symbols Outline</a></h3> <div class="paragraph"><p>If you like the Neo-tree sidebar for file picking, you may appreciate that it
also supports a symbol list for the currently focused file. At the time of
writing, Neo-tree claims that the symbol picker is “experimental” in its
Readme, so there isn’t a keybinding to display it, at least by default.</p></div> <div class="paragraph"><p>Instead, use the command <code>:Neotree document_symbols</code> to render the symbol
picker in your Neo-tree sidebar:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-11/neotree-symbols-dark.png" alt="neotree symbols dark"/></div> <div class="title">Figure 50. Neo-tree Symbols</div></div> <div class="paragraph"><p>You can navigate to a symbol in the document either by double clicking it with
your mouse or by moving your cursor to the line that contains the symbol you
want to jump to and pressing <code>&lt;Enter&gt;</code>. You can also use <code>s</code> or <code>S</code> to open a
new view of the buffer at the given symbol in a vertical or horizontal split.</p></div> <div class="paragraph"><p>If you find that you just can’t get enough of the Neo-tree symbol picker, you’ll
probably want to add a keyboard shortcut for that command. Just add the following
configuration to a file in your plugins directory:</p></div> <div class="listingblock"><div class="title">Listing 30. Neo-tree Document Symbols Keybinding</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-p">{</span>
    <span class="tok-s2">&quot;nvim-neo-tree/neo-tree.nvim&quot;</span><span class="tok-p">,</span>
    <span class="tok-n">keys</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-p">{</span>
        <span class="tok-s2">&quot;&lt;leader&gt;sO&quot;</span><span class="tok-p">,</span>
        <span class="tok-s2">&quot;&lt;cmd&gt;Neotree document_symbols&lt;cr&gt;&quot;</span><span class="tok-p">,</span>
        <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Document Symbols (Neo-tree)&quot;</span><span class="tok-p">,</span>
      <span class="tok-p">},</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>Feel free to use a different keymap if <code>&lt;Space&gt;s&lt;Shift-O&gt;</code> doesn’t suit.</p></div> <div class="paragraph"><p>This is especially useful if you decide to extend or customize other aspects of
the Neo-tree configuration in addition to keymaps.</p></div></div> <div class="sect2"><h3 id="_and_so_does_trouble"><a class="link" href="#_and_so_does_trouble">11.6. …​And So Does Trouble!</a></h3> <div class="paragraph"><p>You can also open a symbols outline using the Trouble plugin. The keybinding is
<code>&lt;Space&gt;cs</code>, which you may have trouble finding because it is in the <code>Code</code>
menu rather than the <code>Search</code> menu. Unlike most Trouble windows, it opens in a
right sidebar by default. It creates a lovely tree view and you can even
collapse and expand the tree nodes using the folds keybindings we discussed in
Chapter 9.</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-11/trouble-symbols-dark.png" alt="trouble symbols dark"/></div> <div class="title">Figure 51. Trouble Symbols</div></div> <div class="paragraph"><p>You can resize the Trouble window using the same keybindings you usually use
for resizing windows (<code>&lt;Space&gt;w&lt;</code> and <code>&lt;Space&gt;w&gt;</code>). As you move the cursor over
the Trouble window, the symbol it is over will automatically scroll into
view.</p></div> <div class="paragraph"><p>The fastest way to use the Trouble window is to use Seek mode. Recall that
Seek mode can jump to <em>any</em> currently visible window, which includes Trouble.
So if I am currently editing the above file and my cursor is currently somewhere
near the end of the file, I can use <code>spub</code> to enter Seek mode and search for
the characters “pub”. This will place a label on the <code>publicKeyToken</code> in
the Trouble window. If I hit that label, my cursor jumps to the trouble
window and my editor window immediately scrolls to the function in question.
Now I just have to hit <code>Enter</code> to move the cursor back to the file I’m editing.</p></div></div> <div class="sect2"><h3 id="_context"><a class="link" href="#_context">11.7. Context</a></h3> <div class="paragraph"><p>The <code>nvim-treesitter-context</code> extra is a helpful way to know where you are in
the current file. It uses treesitter to figure out which functions and types
you are in, and then pins the lines that define those types to the top of the
editor. Enable it as usual by visiting <code>:LazyExtras</code> and hitting <code>x</code> over the
line that contains <code>nvim-treesitter-context</code>.</p></div> <div class="paragraph"><p>This plugin keeps track of which class or function your cursor is currently in.
If the function or type definition is so long that the signature scrolls off
the screen, it will helpfully copy that signature into the first line or lines
of the code window, highlighted with a slightly different background colour.</p></div> <div class="paragraph"><p>This is easier to describe with a reference image, so consider this screenshot:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-11/context-dark.png" alt="context dark"/></div> <div class="title">Figure 52. Treesitter Context</div></div> <div class="paragraph"><p>In this image, the first two lines, which are <em>slightly</em> shaded, are providing
context, rather than being part of the buffer. The first line tells me that I
am in the <code>DexieApiClient</code> class and the second line tells me that I’m
currently looking at the <code>forceAddMemberToRealm</code> method in that class.</p></div> <div class="paragraph"><p>Especially notice the relative line number column. The <code>class DexieApiClient</code>
line is 109 lines above my current cursor position, and the <code>async
forceAddMemberToRealm</code> line is 27 lines above it. In contrast, the first
<em>visible</em> line of the function is only 13 lines above my current cursor
position.</p></div> <div class="paragraph"><p>The effect is quite subtle, but the definitions that make their way into this
context section tend to be exactly what you need while coding. If they fit on
one line I can see function signatures and return types. You really don’t
notice how often you have to scroll up to see what a variable is named in a
function signature until you don’t have to do it anymore! And if you DO need to
scroll up to the signature, simply type the relative line number followed by
<code>k</code> and you’re there with no searching required.</p></div> <div class="paragraph"><p>If you need to disable the context temporarily, use the keybinding <code>&lt;Space&gt;ut</code>.
We haven’t seen much of the <code>&lt;Space&gt;u</code> menu yet, where you can toggle various
User Interface effects. This is largely because the default user interface is
configured well enough that you don’t want to change it often!</p></div></div> <div class="sect2"><h3 id="_navigating_with_bookmarks"><a class="link" href="#_navigating_with_bookmarks">11.8. Navigating with (Book)marks</a></h3> <div class="paragraph"><p>You already know how to navigate through your history with <code>Control-o</code> and
<code>Control-i</code>, and to jump around documents effectively using a wide variety of
motions.</p></div> <div class="paragraph"><p>Vim also includes a “bookmarks” feature, although it’s referred to as
“marks” I assume because the <code>m</code> character was still free on the Vim keymaps.</p></div> <div class="paragraph"><p>Marks are built-into Vim and LazyVim has (as usual) added a few minor
improvements.</p></div> <div class="paragraph"><p>Much like the registers that we covered in Chapter 8, marks can be
assigned to each letter of the alphabet. Additionally, certain punctuation
characters represent special system-set marks that you can jump to, but not
set.</p></div> <div class="paragraph"><p>To set a mark on a line, precede any letter character with the letter <code>m</code>. So
<code>ma</code> will set the mark <code>a</code> on the current line. You can tell that this line
is marked with an <code>a</code> because there is an <code>a</code> character in the gutter to the
left:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-11/mark-a-dark.png" alt="mark a dark"/></div> <div class="title">Figure 53. Mark in Sign Column</div></div> <div class="paragraph"><p>Now I can jump to the line marked with <code>a</code> from anywhere <em>in the current file</em>
by using an apostrophe followed by <code>a</code>.</p></div> <div class="paragraph"><p>I don’t use this very often because other tools tend to be more useful for
navigating within a file than manually setting a mark. However, if I had marked
the line with a capital letter (e.g. <code>mA</code>), I would be able to jump to the mark
no matter which file is currently open using <code>&#39;A</code>.</p></div> <div class="paragraph"><p>So essentially, you can have up to 26 local marks within each file you ever open,
as well as 26 global marks that you can access from any file.</p></div> <div class="paragraph"><p>Conveniently, if I just type a single apostrophe (in Normal mode), LazyVim will
pop up a menu of all the marks currently available to jump to:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-11/marks-dark.png" alt="marks dark"/></div> <div class="title">Figure 54. Marks Menu</div></div> <div class="paragraph"><p>This list shows the lowercase <code>a</code> mark that I’ve set in this file, several
system marks that I can jump to using punctuation (notice the descriptions
for each of those marks to the right so you don’t have to memorize them),
two global marks I use to jump to my kitty and fish configuration files,
and the ten numbered marks.</p></div> <div class="paragraph"><p>I find the numbered marks to be kind of useless. They essentially refer to the
file and cursor location of the last time you closed Neovim. I don’t close
Neovim that often unless I’m editing a commit message or pull request
description in a temporary instance, so my numbered marks are mostly just those
kinds of temporary files. If I need to get back to where I was previously, the
<code>&lt;Space&gt;qs</code> keybinding to restore session is typically more useful than the
numbered marks.</p></div> <div class="paragraph"><p>The menu that pops up when you press the apostrophe key is usually sufficient
to find marks, but you can also use the <code>&lt;Space&gt;sm</code> keybinding to search marks
in a picker. I don’t usually have enough marks active for this to be useful,
but if you’ve got a lot of global and local marks set and you can’t remember
which letter is associated with a given one, it might help to use the picker to
search for the contents of the line you have marked.</p></div> <div class="paragraph"><p>Once you’ve set a mark, you’ll eventually be dogged by the question “how do I
get rid of it?” Deleting marks is probably up there with “how do I quit Vim”
for most common queries! There isn’t a keybinding for deleting marks. Instead,
you need to use the command <code>:delmarks &lt;mark&gt;</code> to delete the given mark. This
can be shortened to <code>:delm &lt;mark&gt;</code>. So to get rid of the <code>a</code> mark in this
file, I used the command <code>:delmarks a</code>. You don’t have to be on the marked
line to delete the mark.</p></div> <div class="paragraph"><p>In Command mode, marks can be used in place of line numbers in ranges. For example,
if you want to write the text between mark <code>a</code> and mark <code>b</code> to a file, you could
do <code>:&#39;a,&#39;bwrite somefile.txt</code>. If you’ve seen the <code>&#39;&lt;,&#39;&gt;</code> in front of colon lines
when you have text selected, that is because <code>&#39;&lt;</code> and <code>&#39;&gt;</code> represent the start
and end of the most recent visual selection. So rather than manually setting
<code>ma</code> and <code>mb</code> you can visually select the thing you want to write and
have those marks pre-filled for you.</p></div> <div class="paragraph"><p>You can also use <code>&#39;&lt;</code> and <code>&#39;&gt;</code> to jump to the beginning or end of the most
recent selection even if it has since been deselected.</p></div> <div class="paragraph"><p>The other symbol mark that I use frequently <code>&#39;.</code> which jumps to the last place
I inserted or changed text. This can sometimes be quicker than a series of
<code>Control-o</code> keypresses.</p></div></div> <div class="sect2"><h3 id="_summary_11"><a class="link" href="#_summary_11">11.9. Summary</a></h3> <div class="paragraph"><p>In this chapter, we learned how to navigate code files using go to definition
and references, and various “document symbol” plugins.</p></div> <div class="paragraph"><p>We saw how LazyVim gives us context on our current location in the document and
how to look up documentation for the symbol under the cursor.</p></div> <div class="paragraph"><p>Finally, we covered Vim marks, a more manual process of tracking locations that
you may want to jump to.</p></div> <div class="paragraph"><p>In the next chapter, we’ll learn all about searching text both in the current
file and globally across a project.</p></div></div></div>`;return{c(){e=c("div"),e.innerHTML=a,this.h()},l(t){e=d(t,"DIV",{class:!0,"data-svelte-h":!0}),h(e)!=="svelte-1dcrt34"&&(e.innerHTML=a),this.h()},h(){p(e,"class","sect1")},m(t,i){u(t,e,i)},p:o,i:o,o,d(t){t&&m(e)}}}class w extends r{constructor(e){super(),l(this,e,null,y,n,{})}}export{w as component,b as universal};
