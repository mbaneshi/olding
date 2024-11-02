import{s as d,n as o}from"../chunks/scheduler.seBsrkbn.js";import{S as r,i as n,e as c,c as l,l as h,m as p,g as u,d as m}from"../chunks/index.Dwxb9V0m.js";function y(){return{title:"Chapter 8: Clipboard, Registers, and Selection ",description:"LazyVim's clipboard is a bit more nuanced than you`re used to",keywords:"vim, lazyvim, neovim, tutorial, course, clipboard, registers, selection, copy, paste"}}const w=Object.freeze(Object.defineProperty({__proto__:null,load:y},Symbol.toStringTag,{value:"Module"}));function g(i){let e,a=`<h2 id="_clipboard_registers_and_selection"><a class="link" href="#_clipboard_registers_and_selection">Chapter 8. Clipboard, Registers, and Selection</a></h2> <div class="sectionbody"><div class="paragraph"><p>Vim has a robust copy and paste experience that predates the operating system
clipboard you are used to in other editors. Happily, the LazyVim configuration
sets up the Neovim clipboard system to work with the OS clipboard
automatically.</p></div> <div class="paragraph"><p>In fact, you already know how to cut text to the system clipboard: Just delete
it.</p></div> <div class="paragraph"><p>That’s right. Any time you use the <code>d</code> or <code>c</code> verb, the text that you deleted
is automatically cut to clipboard. This is usually very convenient,
and occasionally somewhat annoying, so I’ll show you a workaround to avoid
saving deleted text later in this chapter.</p></div> <div class="sect2"><h3 id="_pasting_text"><a class="link" href="#_pasting_text">8.1. Pasting Text</a></h3> <div class="paragraph"><p>Pasting (typically referred to as “putting” in Vim) text uses the <code>p</code> command
I mentioned briefly in Chapter 1. In Normal mode, the single command <code>p</code> will
place whatever is in the system clipboard at the current cursor position. This
is usually the text you most recently deleted, but it can be an URL you copied
from the browser or text copied from an e-mail or any other system clipboard
object.</p></div> <div class="paragraph"><p>The position of the text you inserted can be somewhat surprising, but it
usually does what you want. Normally, if you deleted a few words or a string
that is not an entire line, it goes immediately after the current cursor
position. However, if you used a command that operates on an entire line, such
as <code>dd</code> or <code>cc</code>, the text will be placed on the next line. This saves a few
keystrokes when you are moving lines around, a common task in code editing.</p></div> <div class="paragraph"><p>The <code>p</code> command can be used with a count, so in the unlikely event you want to
paste 5 consecutive copies of whatever is in the clipboard, you can use <code>5p</code>.</p></div> <div class="paragraph"><p>When you paste with <code>p</code>, your cursor will stay where it was, and the text is
inserted after the cursor. If you want to instead paste the text <em>before</em> the
current cursor position, use a capital <code>P</code>, where the shifting action is
interpreted as “do <code>p</code> in the other direction.” As with <code>p</code>, the text will be
inserted directly before the cursor position unless it was a line-level edit
such as <code>dd</code>, in which case it will be placed on the previous line.</p></div> <div class="paragraph"><p>If you are already in Insert mode and need to paste something and keep typing,
you can use the <code>Control-r</code> command, followed by the <code>+</code> key. The <code>r</code> may be
hard to remember, but it stands for “<strong>r</strong>egister.” We’ll go into more
detail about what registers really are, soon.</p></div></div> <div class="sect2"><h3 id="_copying_text"><a class="link" href="#_copying_text">8.2. Copying Text</a></h3> <div class="paragraph"><p>Copying text requires a new verb: <code>y</code>. It behaves similarly to <code>d</code> and <code>c</code>,
except it doesn’t modify the buffer; it just copies the text defined by
whatever motion or text object comes after the <code>y</code>.</p></div> <div class="paragraph"><p>“Why <code>y</code>?” you might ask? It stands for “yank”, which is Vim speak for “copy.”
I have no idea why <code>vi</code> called it “yank,” but my guess is that it was a reverse
acronym. The original authors probably noticed that <code>y</code> was currently free on
the keyboard and decided to come up with a word that matches it. The concept of
a clipboard or copy/paste had not been standardized yet, so they were free to
use whatever terminology worked for them.</p></div> <div class="paragraph"><p>The <code>y</code> command works with all of the motions and text objects you already
know. It is especially useful with the <code>r</code> and <code>R</code> Remote Seek commands. If you
need to copy text from somewhere else in the editor (even a different window)
to your current cursor location, <code>yR&lt;search&gt;&lt;label&gt;p</code> is the quickest way to be
on your way without adding unnecessary jumps to your history.</p></div> <div class="paragraph"><p>The <code>yy</code> and <code>Y</code> commands yank an entire line, and from the cursor to the end of
the line, analogous to their counterparts when deleting and changing text.</p></div> <div class="paragraph"><p>LazyVim will briefly highlight the text you yanked to give a nice
indicator as to whether your motion command copied the correct text.</p></div></div> <div class="sect2"><h3 id="_selecting_text_first"><a class="link" href="#_selecting_text_first">8.3. Selecting Text First</a></h3> <div class="paragraph"><p>Your Vim editing experience so far has not involved the concept of selecting
text. Isn’t that weird? We’re 8 chapters in! In normal word processors and VS
Code-like text editors, you have to select text before you can perform an
operation such as deleting, copying, cutting, or changing it. Considering how
awkward text selection is in those editors (you have to use your mouse or some
combination of shift, and cursor movements, with extra modifier keys to make
bigger movements), it’s amazing anyone gets anything done!</p></div> <div class="paragraph"><p>In Vim-land, you normally perform the verb first and follow up with a text
motion or object to implicitly select the text before manipulating it. This is
<em>usually</em> the most effective way to operate, but in some situations it is
convenient to invert the mental model and highlight text <em>before</em> operating on
it.</p></div> <div class="paragraph"><p>This is where Visual mode comes in. Visual mode is a Vim major mode, like
Normal and Insert mode. Technically, there are three sub-modes of Visual mode.
We’ll start with “Visual Character mode” and dig into the other two shortly.</p></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content">You might think that it makes sense to always select text first so you
can see what you are acting on. Two newish editors called Kakoune and Helix
have been experimenting with this paradigm. They are pretty cool, but I found
that the “select text first” model was kind of a let-down. The editor isn’t
able to determine whether any given motion is meant to <strong>move</strong> the selection or
to <strong>extend</strong> the selection, so you end up with an extra keypress to tell it to
do an extension. At that point, it’s no different from pressing <code>v</code> to enter
Visual mode in Neovim. After using Helix for several months, I determined
that it actually required more keystrokes on average than Neovim and I
switched back.</td></tr></tbody></table></div> <div class="paragraph"><p>To enter Visual Character Mode, use the <code>v</code> command from Normal mode. Then move
the cursor using most of the motions that you are used to from Normal mode. I
say “most” only because Visual mode keymaps are independent of Normal mode
keymaps, and plugins occasionally neglect to set them up for both modes.
LazyVim is really good about keymaps, though, so you will rarely be surprised.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">You can also get into Visual mode by clicking and dragging with your mouse.</td></tr></tbody></table></div> <div class="paragraph"><p>Once you have text selected in Visual mode, you can use the same verbs you
usually use to delete, change, or yank the selection. The difference is they
will happen instantly to the selection rather than requiring a motion. You can
even use single character verbs like <code>x</code> (which does the same thing as <code>d</code>) or
<code>r</code> to replace all the characters with the same character. After you complete
the verb, the editor automatically switches back to Normal mode. You can also
exit visual mode without performing an action using either <code>Escape</code> or another
<code>v</code>.</p></div> <div class="paragraph"><p>You can exit Visual mode temporarily without completely losing your selection.
From Normal mode, use the <code>gv</code> (“<strong>g</strong>o to last <strong>v</strong>isual selection”)
command to return to the selection. This is useful if you are about to perform
a visual operation and realize you need to look something up, make an edit, or
copy something from elsewhere in the file, then go back to the selection.</p></div> <div class="paragraph"><p>Use the <code>o</code> (for “<strong>o</strong>ther end”) command to move the cursor to the opposite
end of the block. Useful if e.g. you’ve selected a few words, and realize you
forgot one at the other end of the block. You can’t get into Insert mode from
Visual mode, so the <code>o</code> command gets reused for this purpose.</p></div> <div class="sect3"><h4 id="_line_wise_visual_mode"><a class="link" href="#_line_wise_visual_mode">8.3.1. Line-wise Visual Mode</a></h4> <div class="paragraph"><p>The <code>v</code> command is useful for fine-grained selections, but if you know that
your selection is going to start and end on line boundaries, you can use a
(shifted) <code>V</code> instead, to get into Line-wise Visual mode. Now wherever you move
the cursor, the entire line the cursor lands on will be selected.</p></div> <div class="paragraph"><p>Other than selecting entire lines, the main difference with Line-wise Visual
mode is that when you apply a verb that manipulates the clipboard, (including
<code>d</code>, <code>c</code>, and <code>y</code>), the lines will be cut or copied in Line-wise mode. When you
put them later they will show up on the next or previous line instead of
immediately after the cursor.</p></div></div> <div class="sect3"><h4 id="_block_wise_visual_mode"><a class="link" href="#_block_wise_visual_mode">8.3.2. Block-wise Visual Mode</a></h4> <div class="paragraph"><p>Block-wise Visual mode is a neat feature that is kind of unique to Vim. It
allows you to visually select and manipulate a block of text that is
vertically, but not horizontally contiguous. For example, I have selected
several characters on each of four separate lines in the following screenshot:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-8/visual-block-dark.png" alt="visual block dark"/></div> <div class="title">Figure 33. Block-wise Visual Mode</div></div> <div class="paragraph"><p>To enter block-wise Visual mode, use <code>Control-v</code> instead of <code>v</code> or <code>V</code> for
Visual and Line-wise Visual mode.</p></div> <div class="paragraph"><p>In plain text like this, Block-wise Visual mode doesn’t appear to be very
useful, but it is handy if you need to cut and paste columns of tabular data in
a csv file or markdown table, for example. I don’t use it for that
functionality terribly often, but when I need it, I know there is no other way
to efficiently perform the action I need.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">If you use <code>Control-V$</code>, you will get a slight adaptation of Block-wise
Visual Mode where the block extends to the end of each line, in the block. This
is handy if you need the block to extend to the longest line as opposed to the
line your cursor is currently on.</td></tr></tbody></table></div> <div class="paragraph"><p>Block-wise Visual mode can also be used as a (poor) imitation of multiple
cursors. If you use the <code>I</code> or <code>A</code> command after selecting a visual block, and
then enter some text followed by <code>Escape</code>, the text you entered will get copied
at either the beginning or end of the visual block. A common operation for this
feature is to add <code>*</code> characters at the beginning of Markdown ordered lists or
a block comment that needs a frame.</p></div></div></div> <div class="sect2"><h3 id="_registers"><a class="link" href="#_registers">8.4. Registers</a></h3> <div class="paragraph"><p>Registers are a way to store a string of text to be accessed later (so think of
the Assembly-language definition of the word). In that regard, they are no
different from a clipboard. In fact, the system clipboard in Vim <strong>is</strong> a
register that LazyVim has set up as the default register.</p></div> <div class="paragraph"><p>But Vim has dozens of other registers. This means you can have <em>custom
clipboards</em> that each contain totally different sequences of text. This feature
is pretty useful, for example, when you are refactoring something and need to
paste copies of several different pieces of code at multiple call sites.</p></div> <div class="paragraph"><p>There are several different types of registers, but I’ll introduce the concept
with the named registers, first. There are over two dozen named registers, one
for each letter of the alphabet.</p></div> <div class="paragraph"><p>To access a register from Normal mode, use the <code>&quot;</code> character (i.e,
<code>Shift-&lt;Apostrophe&gt;</code>) followed by the name of the register you want to access.
Then issue the verb and motion you want to perform on that register.</p></div> <div class="paragraph"><p>So if I want to delete three words and store them in the <code>a</code> register <em>instead</em>
of the system clipboard, I would use the command <code>&quot;ad3w</code>. <code>&quot;a</code> to select the
register, and <code>d3w</code> as the normal command to delete three words. And if I later
want to put that same text somewhere else, I would use <code>&quot;ap</code> instead of just
<code>p</code>, so the text gets pasted from the <code>a</code> register instead of the default register.</p></div> <div class="paragraph"><p><code>&quot;ad&lt;motion&gt;</code> will always <em>replace</em> the contents of the <code>a</code> register with
whatever text motion or object you selected. However, you can also build up
registers from multiple delete commands using the capitalized name of the
register. So <code>&quot;Ad&lt;motion&gt;</code> will <em>append</em> the text you deleted to the existing <code>a</code>
register.</p></div> <div class="paragraph"><p>I find this useful when I am copying several lines of code from one
function to another but there is a conditional or something in the source
function that I don’t need in the destination. Copy the text before the
conditional using <code>&quot;ay</code> and append the text after the conditional using <code>&quot;Ay</code>,
and then paste the whole thing in one operation with <code>&quot;ap</code>.</p></div> <div class="paragraph"><p>I can copy totally different text into the <code>b</code> register using e.g
<code>&quot;byS&lt;label&gt;</code>. Now I can paste from either the <code>a</code> or <code>b</code> register at any time
using <code>&quot;ap</code> and <code>&quot;bp</code>.</p></div> <div class="paragraph"><p>If you forgot which register you put text in, just press <code>&quot;</code> and wait for a
menu to pop up showing you the contents of all registers. If that menu is too
hard to navigate, you can instead use the <code>&lt;Space&gt;s&quot;</code> command to open a
picker dialog that allows you to search all registers. Just enter a few
characters that you know are in the register you want to paste, use the usual
picker commands to navigate the list, and hit <code>Enter</code> to paste that text at
the last cursor position.</p></div> <div class="paragraph"><p>To show the same menu from Insert or Command mode, use <code>Ctrl-r</code> instead of <code>&quot;</code>.</p></div> <div class="paragraph"><p>If you’re in the <code>&lt;Space&gt;s&quot;</code> picker dialog, you’ll notice a bunch of other
registers besides the named alphabet registers. I’ll discuss each of those
next.</p></div> <div class="sect3"><h4 id="_clipboard_registers"><a class="link" href="#_clipboard_registers">8.4.1. Clipboard Registers</a></h4> <div class="paragraph"><p>In LazyVim, by default, the registers named <code>*</code> and <code>+</code> are always identical to
the default (unnamed) register, and represent the contents of the system
clipboard.</p></div> <div class="paragraph"><p>To understand why, we need some history: vi had registers, and then operating
systems got excited about the ideas of clipboards and vi users wanted to copy
stuff to the system clipboard. A default (non-lazy) Vim configuration means
that if you want to copy text to the system clipboard, you have to always type
<code>&quot;+</code> before the <code>y</code>. The three extra keystrokes (<code>Shift</code>, <code>&#39;</code>, and <code>+</code>) can get
pretty monotonous in modern workflows where you’re copying stuff into browsers,
AI chat clients, and e-mails on a regular basis.</p></div> <div class="paragraph"><p>On top of that, some operating systems (Unix-based, usually) actually have
<em>two</em> Operating System clipboards, an implicit one for text you select, and one
for text you explicitly copy with <code>Control-c</code> (in most programs). This text would
be stored in the <code>&quot;*</code> register and the OS lets you paste it elsewhere with
(typically) a middle click.</p></div> <div class="paragraph"><p>I recommend sticking with LazyVim’s synced clipboard configuration, but if you
already have muscle memory from using Vim the old way or you’re tired of
deleted text arbitrarily overwriting your system clipboard, you can disable
this integration so that the three registers behave as described above instead
of being linked together. To do so use <code>space f c</code> to open the <code>options.lua</code>
configuration file and add the following line:</p></div> <div class="listingblock"><div class="title">Listing 22. Disable Clipboard Sync</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">opt</span><span class="tok-p">.</span><span class="tok-n">clipboard</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;&quot;</span></code></pre></div></div> <div class="paragraph"><p>Speaking of having your clipboard contents randomly overwritten, if you know in
advance that you don’t want a specific delete or change operation to overwrite
the clipboard contents, use the “Black Hole” register, <code>&quot;_</code> (that’s an
underscore). So type <code>&quot;_d&lt;motion&gt;</code> to delete text without storing it in any
registers including the system clipboard.</p></div> <div class="paragraph"><p>If you want to copy the <em>contents</em> of one register to another
register, you can use the ex command <code>:let @a = @b</code> where <code>a</code> and <code>b</code> are the
names of the registers you want to copy to and from. The most common use of
this operation is to copy the contents of the system clipboard (which may have
come from a different program) into a named register so it doesn’t get lost the
next time you issue a verb. For example, <code>:let @b = @+</code> will copy the system
clipboard into register <code>b</code>.</p></div></div> <div class="sect3"><h4 id="_the_last_yanked_or_last_inserted_text"><a class="link" href="#_the_last_yanked_or_last_inserted_text">8.4.2. The Last Yanked or Last Inserted Text</a></h4> <div class="paragraph"><p>Whenever you issue a <code>y</code> command without specifying a destination register,
the text will always be stored in the <code>&quot;0</code> register <em>as well as</em> the default
register. And it will stay in <code>&quot;0</code> until the next yank operation, no matter
how many deletes or changes you do to change the default register.</p></div> <div class="paragraph"><p>So if you yank the text <code>abc</code> and then delete the text <code>def</code>, the <code>p</code> command
will paste the text <code>def</code>, but you still can paste <code>abc</code> using <code>&quot;0p</code>.</p></div> <div class="paragraph"><p>You can also use the <code>&quot;.</code> (period) register to paste a copy of the text that
was most recently inserted. So if you type the command <code>ifoo&lt;Escape&gt;</code> somewhere
in the document and move somewhere else in the document and type <code>&quot;.p</code>, it will
insert the word “foo” at the new cursor position. <code>&quot;.</code> is a register that you
may occasionally want to copy into a named register if you have inserted text
you want to reuse. Use the previously discussed <code>:let @c = @.</code> command to do
this.</p></div></div> <div class="sect3"><h4 id="_the_delete_numbered_registers"><a class="link" href="#_the_delete_numbered_registers">8.4.3. The Delete (Numbered) Registers</a></h4> <div class="paragraph"><p>The numbered registers <em>should</em> be really useful, but I find them rather
confusing. The registers <code>&quot;1</code> through <code>&quot;9</code> always contain the text that you
most recently changed or deleted, in ascending order. So after a delete
operation, whatever was in <code>&quot;1</code> gets moved to <code>&quot;2</code>, <code>&quot;2</code> moves to <code>&quot;3</code> and so
on, and whatever is in <code>&quot;9</code> gets dropped.</p></div> <div class="paragraph"><p>I can <em>never</em> remember the order of my recent deletes, so I would normally have
to use the <code>&quot;</code> menu to see the contents of the numbered registers. It’s handy
that my recently deleted text is stored and I can find it this way. However, I
usually use the yanky.nvim plugin (discussed later in this chapter) instead,
so the numbered registers are not that useful to me.</p></div> <div class="paragraph"><p>There is also a “small delete register” that can be accessed with <code>&quot;-</code>.
Whenever you delete any text, it will be stored in the numbered registers, but
if that text is less than one line long, it will <em>also</em> be stored in this minus
register. I have little use for this feature, as the majority of my changes
are smaller than one line. That means it gets cleared before it drops out of
the numbered registers.</p></div></div> <div class="sect3"><h4 id="_the_current_files_name"><a class="link" href="#_the_current_files_name">8.4.4. The Current File’s Name</a></h4> <div class="paragraph"><p>The name of the file that you are currently editing is stored in the <code>&quot;%</code>
register. It is always relative to the current working directory of the editor
(usually the folder you were in when you started Neovim). The only time I ever
want to access this register is to copy the filename to the system clipboard
with <code>:let @+ = @%</code> so I can paste it into a GUI app or my terminal.</p></div></div></div> <div class="sect2"><h3 id="_recording_to_registers"><a class="link" href="#_recording_to_registers">8.5. Recording to Registers</a></h3> <div class="paragraph"><p>Remember the recording commands I told you about in Chapter 6: <code>qq</code> to record
and <code>Q</code> to play back the recording? Turns out I was a little overly
simplistic there.</p></div> <div class="paragraph"><p>Recorded commands are actually stored in a named register. In that chapter, I
arbitrarily chose the <code>q</code> register when I said to use <code>qq</code> to start recording.
But you can just as easily store it in the <code>a</code> register using <code>qa</code> or the <code>f</code>
register using <code>qf</code>.</p></div> <div class="paragraph"><p>The <code>qQ</code> command to “append to recording” operation is analogous to the
capitalized <code>&quot;A&lt;command&gt;</code> used to append to a register. In this case, <code>Q</code> is
still an arbitrary name. You can append a recording to a different named
register besides <code>q</code>, using <code>qA</code> or <code>qZ</code>, for example.</p></div> <div class="paragraph"><p>Having multiple sets of recordings can be really handy when you are performing
a complex refactoring that requires you to make one of several different
repetitive changes in different locations across your codebase.</p></div> <div class="paragraph"><p>The <code>Q</code> command to play back a recording always plays back the most recently
recorded command, regardless of register. If you want to play back from a
different register, you would use the <code>@</code> command, followed by the name of the
register. So if you recorded using <code>qa</code>, you would play it back with <code>@a</code>. As a
shortcut, <code>@@</code> will always replay whichever register you most recently <em>played</em>
(which is different from <code>Q</code> which always plays back the most recent
<em>recording</em>).</p></div> <div class="sect3"><h4 id="_editing_recordings"><a class="link" href="#_editing_recordings">8.5.1. Editing Recordings</a></h4> <div class="paragraph"><p>To be clear, recordings are placed in normal registers. So if you record a
sequence of keystrokes to a register using <code>qa</code> and then put the register using
<code>&quot;ap</code>, you will actually see the list of Vim commands you recorded.</p></div> <div class="paragraph"><p>This can be useful if you mess up while recording and need to modify the
keystrokes. After recording the keystroke, paste it to a new line using e.g.
<code>&quot;a]p</code>. At this point it’s just a normal line of text that happens to contain
vim commands. You can modify it to add other Vim commands, since they are all
just normal keystrokes.</p></div> <div class="paragraph"><p>For example, let’s say I recorded a command as <code>qadw2wdeq</code>, which records to
the <code>a</code> register (<code>qa</code>), deletes a word (<code>dw</code>), skips ahead two words (<code>2w</code>),
and then deletes the next word (<code>de</code>), then ends the recording with <code>q</code>. But
too late, I realize I should have skipped over 3 words, not two words.</p></div> <div class="paragraph"><p>I can use <code>&quot;ap</code> to paste the contents of the recording, which will look
like this: <code>dw2wde</code>. Then I can use <code>f2</code> to jump to the <code>2</code> digit, followed
by <code>r3</code> to replace it with a <code>3</code>. Now I can use <code>&quot;ayiw</code> to replace the contents
of the register with <code>dw3wde</code>.</p></div> <div class="paragraph"><p>Now if I want to play back that modified command, I can just use <code>@a</code> as usual.</p></div></div></div> <div class="sect2"><h3 id="_the_yanky_nvim_plugin"><a class="link" href="#_the_yanky_nvim_plugin">8.6. The Yanky.nvim Plugin</a></h3> <div class="paragraph"><p>Yanky.nvim has some niceties such as improving the highlighting of text on yank and
preserving your cursor position so that you can keep typing after pasting, but
its primary feature is better management of your clipboard history. LazyVim
also configures it with several new keybindings to make putting text more
pleasant.</p></div> <div class="paragraph"><p>The plugin is not enabled by default, but it is a recommended extra, so if you
followed my suggestion of installing all recommended extras back in Chapter 5,
you may have it enabled already. If not, head to <code>:LazyExtras</code>, find
yanky.nvim and hit <code>x</code>. Then restart Neovim.</p></div> <div class="paragraph"><p>Now that Yanky is enabled, the easiest interface to see your clipboard history
can be accessed with <code>&lt;Space&gt;p</code>. It pops up a picker menu of all your recent
clipboard entries. Up to a hundred entries are stored, which is a lot more than
you get in the numbered registers, and it stores your yanks, not just your
deletes and changes. If you need to paste something that is no longer in the
clipboard, <code>&lt;Space&gt;p</code> is probably the quickest way to find it.</p></div> <div class="paragraph"><p>Another super useful keybinding is <code>[y</code>. If you invoke this command
<em>immediately</em> after a put operation, the text that was put will be replaced
with the text that was cut or copied prior to the most recent yank. And if you
press it again, it will go back one more step in history, up to 100 steps. So
if you aren’t sure exactly which numbered register a delete operation is in, or
you want to access text that was yanked but is no longer in the <code>&quot;0</code> register,
you can use <code>p[y[y[y…​</code> until you find the text you really wanted to pasted.
If you go too far, you can cycle forward with <code>]y</code>.</p></div> <div class="paragraph"><p>LazyVim also creates some useful keybindings to improve how text is put,
especially with respect to indentation. The two most useful useful are <code>[p</code> and
<code>]p</code>.</p></div> <div class="paragraph"><p>These commands will paste the text in the clipboard on the line above or below
the current line, depending on whether you used <code>[</code> or <code>]</code>. You may think this
would be identical to the automatic Line-wise pasting described above, but it’s
slightly different for two reasons:</p></div> <div class="ulist"><ul><li><p>It pastes on a new line regardless of what command was used to cut or
copy the text that is in the clipboard.</p></li> <li><p>It automatically adjusts the indentation of the text on the new line
to match the indentation of the current line.</p></li></ul></div> <div class="paragraph"><p>So if you’re moving code into a nested block and need to change indentation,
use <code>]p</code> instead of relying on Line-wise paste. Then you don’t have to format it
afterwards. (Not that formatting is hard in LazyVim; it happens on save).</p></div> <div class="paragraph"><p>You can also use <code>&gt;p</code>, <code>&lt;p</code>, <code>&gt;P</code>, and <code>&lt;P</code> to automatically add or remove
indentation when you put code.</p></div></div> <div class="sect2"><h3 id="_summary_8"><a class="link" href="#_summary_8">8.7. Summary</a></h3> <div class="paragraph"><p>This chapter was all about selecting and copying text. We learned the <code>yank</code>
verb for copying text and then dug into the various Visual modes that can be
used for selecting text.</p></div> <div class="paragraph"><p>Then we learned that Vim has multiple “clipboards” called registers, and how to
cut and copy to or paste from those registers. We even went into more detail
about using registers to record multiple separate command sequences before
discussing the yanky.nvim plugin to make your pasting life a little easier.</p></div> <div class="paragraph"><p>In the next chapter, we’ll learn about various ways to view and work with
multiple open files as well as how to show and hide code with folding.</p></div></div></div>`;return{c(){e=c("div"),e.innerHTML=a,this.h()},l(t){e=l(t,"DIV",{class:!0,"data-svelte-h":!0}),h(e)!=="svelte-all896"&&(e.innerHTML=a),this.h()},h(){p(e,"class","sect1")},m(t,s){u(t,e,s)},p:o,i:o,o,d(t){t&&m(e)}}}class b extends r{constructor(e){super(),n(this,e,null,g,d,{})}}export{b as component,w as universal};
