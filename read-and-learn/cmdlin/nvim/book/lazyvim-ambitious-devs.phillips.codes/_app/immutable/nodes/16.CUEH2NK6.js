import{s,n as t}from"../chunks/scheduler.seBsrkbn.js";import{S as d,i as r,e as c,c as l,l as h,m,g as p,d as u}from"../chunks/index.Dwxb9V0m.js";function y(){return{title:"Chapter 2: What is Modal Editing, Anyway?",description:"An overview of modal editing with LazyVim.",keywords:"vim, lazyvim, neovim, tutorial, modal editing"}}const b=Object.freeze(Object.defineProperty({__proto__:null,load:y},Symbol.toStringTag,{value:"Module"}));function g(i){let e,a=`<h2 id="_what_is_modal_editing_anyway"><a class="link" href="#_what_is_modal_editing_anyway">Chapter 2. What is Modal Editing, Anyway?</a></h2> <div class="sectionbody"><div class="paragraph"><p>As the letters on the dashboard suggest, LazyVim is keyboard-centric. As many
actions as possible can be performed without moving your hands between mouse
and keyboard. Of course, it’s still possible to use the mouse. You can click
anywhere in the editor, interact with buttons and modals when they pop up, use
the scroll wheel or touchpad gestures to scroll, and resize editor panes by
dragging their borders. But you can also do all of these things using the
keyboard, and usually more efficiently.</p></div> <div class="paragraph"><p>More importantly, you can do most things by holding at most two keys, and
usually just one. You will only rarely have to contort your hands into painful
(and dangerous) positions to <code>Control + Shift + Alt + &lt;some key&gt;</code>.</p></div> <div class="paragraph"><p>How does Vim do this? Modal editing.</p></div> <div class="sect2"><h3 id="_introduction_to_modal_editing"><a class="link" href="#_introduction_to_modal_editing">2.1. Introduction to Modal Editing</a></h3> <div class="paragraph"><p>“Modes” in LazyVim simply mean that different keystrokes mean different
things depending on which mode is currently active. For example, when you start
the editor up, you are in a “Dashboard Mode”, and the most common
interpretation of each keystroke in that mode are listed right on the dashboard.
This discoverability of keybindings in a given mode is a common theme in
LazyVim, and a huge improvement over the opaque default behaviour of Neovim
itself.</p></div> <div class="paragraph"><p>To see what I mean, press the spacebar to enter “Space mode”. Space mode is a
LazyVim concept; it does not exist in a raw Neovim installation (though you
could install various plugins to recreate the effect if you want Space Mode
without LazyVim).</p></div> <div class="paragraph"><p>Entering Space mode pops up a menu along the bottom of your screen. It will
look something like this (my menu contains some customizations, so yours won’t
be identical):</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-2/space-mode-dark.png" alt="space mode dark"/></div> <div class="title">Figure 4. Space Mode</div></div> <div class="paragraph"><p>That’s a big menu. The important thing to focus on right now is the <code>f</code> key,
which we will use to understand modal editing.</p></div> <div class="paragraph"><p>If you are in Dashboard mode and press the <code>f</code> key, you will open the <code>Find
file</code> dialog using a picker plugin we’ll discuss later. However, now that you
are in Space mode, if you press the <code>f</code> key, it will instead open the
<code>file/find</code> Space mode submenu.</p></div> <div class="paragraph"><p>This is the crux of what modal editing means: The behaviour of a given key
depends on the current mode. As indicated by the line at the bottom of
the Space mode menu, you can press the <code>Escape</code> key to exit Space mode
and return to the dashboard. Go ahead and do that.</p></div> <div class="paragraph"><p>Now you’re back in Dashboard mode, and you can press the <code>n</code> key to create
a new, empty buffer.</p></div> <div class="paragraph"><p>Pay close attention to the lower left corner of that buffer, where you’ll see
the word <code>INSERT</code>:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-2/insert-mode-dark.png" alt="insert mode dark"/></div> <div class="title">Figure 5. Insert Mode</div></div> <div class="paragraph"><p>Remember how I said Space mode is a LazyVim concept? Insert mode is an original Vi
concept, that the successors Vim, then Neovim, and now LazyVim have all
inherited. In Insert mode, the vast majority of keystrokes do what you would
expect in any editor: they insert text. So you can touch type as usual.</p></div> <div class="paragraph"><p>You can access <em>some</em> keyboard shortcuts in Insert mode using <code>Control</code> and
<code>Alt</code> keys. For example, you can hit <code>Control-r</code> to enter the “Registers”
mini-mode, which pops up a list of “registers” you can paste from. We’ll cover
registers in detail in Chapter 8. For now, it is enough to know that
<code>Control-r</code> followed by the plus key (i.e. <code>Shift-=</code>) will paste text from the
clipboard when in Insert mode.</p></div> <div class="paragraph"><p>However, you will much more often change to <em>Normal</em> mode to perform any
non-text-entry operations, including pasting text. Normal mode is another
major Vim mode that has been around since the days of Vi.</p></div> <div class="paragraph"><p>To get into Normal mode from Insert mode, hit the <code>Escape</code> key. The cursor
will change from a bar to a block and the indicator in the lower left corner
will change to a blue <code>NORMAL</code>:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-2/normal-mode-dark.png" alt="normal mode dark"/></div> <div class="title">Figure 6. Normal Mode</div></div> <div class="paragraph"><p>In Normal mode, pressing various keyboard characters will <strong>not</strong> insert text
like it does in Insert mode. For example, pressing <code>p</code> will, rather than
inserting a literal <code>p</code> character into the document, instead paste from the
system clipboard.</p></div> <div class="paragraph"><p>Vim and Neovim aren’t very discoverable, but they ARE generally memorable. As
often as possible, the keyboard shortcuts to perform an action start with a
letter that makes sense for the action being performed. You might think <code>p</code>
stands for “<strong>p</strong>aste”, but in fact the concept has been around for longer than
the clipboard abstraction. You are welcome to think of it as “paste” if that’s
easier for you, but in Vim parlance, it actually stands for “put”, and we’ll
use that word throughout the book.</p></div> <div class="paragraph"><p>For some contrast, the <code>Control-r</code> key that pops up the list of registers in
Insert mode does <strong>not</strong> pop up a list of registers in Normal mode. Instead,
<code>Control-r</code> means “redo” (i.e. undo an undo). In order to enter the Registers
mini-mode from Normal mode, you would press the <code>&quot;</code> (quote, as in
<code>&lt;Shift&gt;-apostrophe</code>) key instead.</p></div> <div class="paragraph"><p>If that sounds confusing, don’t worry. Your brain and muscle memory will adapt
more quickly than you expect and you’ll always understand that behaviours in
Normal mode are not the same as in Insert mode.</p></div> <div class="paragraph"><p>I hardly ever use non-text-entry commands in Insert mode. I find it is easier
to switch back to Normal mode and then perform the command from Normal mode. It
doesn’t usually take a higher number of keystrokes to do so and I don’t have to
hold down multiple keys at once.</p></div> <div class="paragraph"><p>The universal key to exit Insert mode and return to Normal mode is <code>Escape</code>. And
that brings us to an important point: You will be using this key a lot, but
moving your hands from the home row to the Escape key in the upper left corner
and back again is somewhat inefficient.</p></div> <div class="paragraph"><p>You can choose from a few common solutions to this situation:</p></div> <div class="ulist"><ul><li><p>If you have a customizable keyboard you can put the <code>Escape</code> key in a more
accessible location. This is what I do. I have a Kinesis Advantage 360, and I
remapped the keys so that escape is in the “thumb key” section of this
admittedly bizarre keyboard. It’s as easy to hit as <code>Enter</code>, <code>Space</code>, and
<code>Backspace</code>, other keys that I use very frequently.</p></li> <li><p>Your operating system is probably also capable of remapping keys. A lot of modal
users replace the useless <code>Capslock</code> with the <code>Escape</code> key. (For non-modal
paradigms it can be more comfortable to remap <code>Capslock</code> to the commonly-held
<code>Control</code> key, especially on laptop keyboards).</p></li> <li><p>Neovim itself is also able to remap keys. We’ll discuss how to do this in
LazyVim later. One common pattern is to map a series of uncommon keystrokes
that you wouldn’t likely type together when inserting text to the escape key.
So you can set it up to map something like <code>jk</code>, <code>jj</code> or <code>;;</code> in Insert mode to
switch to Normal mode. I’ve tried this and don’t care for it as it introduces a
timing thing when you hit the first character and Neovim is waiting to see if
you’re going to type a command or let text insertion continue, but you might
like it.</p></li> <li><p>The <code>Control-C</code> keyboard combination also works to exit Insert mode, with no
remapping required. I don’t like this because it’s two keystrokes and on my
Dvorak keyboard, <code>Control-C</code> is harder to hit than on a qwerty keyboard where
C is on the bottom row near the <code>Control</code> key.</p></li></ul></div> <div class="paragraph"><p>Don’t worry about actually changing it for now; just start getting used to
using <code>Escape</code> where it is and see if you find it annoying.</p></div> <div class="paragraph"><p>Once you’re in Normal mode, you’ll obviously want to get back to Insert mode to
enter text at some point! There are several different ways to do this. Here are
a couple of the most common ones:</p></div> <div class="paragraph"><p>The <code>i</code> key always inserts text <em>before</em> the current cursor position. This
means that you could (very clumsily) move your cursor left by pressing
<code>i &lt;Escape&gt; i &lt;Escape&gt;</code> repeatedly. When you press <code>i</code>, you insert text before
the current position, and then <code>Escape</code> takes you out of Insert mode at that new
“before” position.</p></div> <div class="paragraph"><p>Commonly, you want to enter Insert mode <em>after</em> the current cursor
position. To do that, use the <code>a</code> key instead (mnemonic: i for <strong>I</strong>nsert Before,
a for <strong>A</strong>ppend, although I usually think of it as <strong>A</strong>fter).</p></div> <div class="paragraph"><p>You’ll find that you need to alternate between these a lot as you are
navigating a document because the various navigation commands we’ll cover later
will often put you just before or just after the position you need to insert
at. So it’s important to remember both of them.</p></div> <div class="paragraph"><p>Two other very common operations are to insert at the very beginning or the
very end of the current line. You <em>could</em> use navigation commands to move to
the start or end and then use <code>i</code> and <code>a</code>, but it’s easier to use the commands
<code>I</code> and <code>A</code> instead (The difference is that they are capitalized, so you need
the <code>Shift</code> key with them).</p></div> <div class="sect3"><h4 id="_a_note_on_keybinding_mnemonics"><a class="link" href="#_a_note_on_keybinding_mnemonics">2.1.1. A Note on Keybinding Mnemonics</a></h4> <div class="paragraph"><p>It is very common for related keybindings like these to be assigned to the
lowercase and uppercase versions of the same key. You will often find that the
lower case version means “do something” and the uppercase version means
either “do the same thing only BIGGER” or “do the OPPOSITE thing”,
depending on the situation. In this case, <code>i</code> and <code>a</code> mean “insert one
character before or after the cursor” and <code>I</code> and <code>A</code> are “insert before or
after the cursor, only BIGGER (i.e. at the beginning or end of the line)”.</p></div> <div class="paragraph"><p>To illustrate the “do the opposite thing” situation, consider the <code>o</code> and
(shifted) <code>O</code> keys, which are two more ways to get into Insert mode.</p></div> <div class="paragraph"><p>The <code>o</code> key is used to enter Insert mode on a new line <em>below</em> the current
one. For the “do the opposite thing” scenario, the shifted <code>O</code> means “create
a new line <em>above</em> the current one and enter Insert mode on it”.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">The mnemonic “<strong>O</strong>pen a new line above/below” can help you remember
the otherwise not terribly memorable <code>o</code> command.</td></tr></tbody></table></div> <div class="paragraph"><p>One final useful command that takes two keystrokes is <code>gi</code>. That is a single
press and release of <code>g</code> followed by <code>i</code>. It means “Go to the last place you
entered Insert mode, and enter Insert mode again”. In this case, the <code>g</code> key
is actually switching to a new mini-mode I call “Go To” mode, though not all
the commands accessible from it are strictly related to going places. You can
see the entire list of commands available in “Go To” mode by pressing the <code>g</code>
key in Normal mode and waiting for the menu to pop up at the bottom of the
window:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-2/goto-mode-dark.png" alt="Go To Mode"/></div> <div class="title">Figure 7. Go To Mode</div></div> <div class="paragraph"><p>We’ll cover most of them later, but notice that the <code>i</code> key is in there
labelled “Move to the last insertion and INSERT”. So if you forget how to go to
the last insertion point, you can enter Go To mode and scan the menu to find
the <code>i</code> again.</p></div> <div class="paragraph"><p>Try all of those commands (<code>a</code>, <code>i</code>, <code>o</code>, <code>A</code>, <code>I</code>, <code>O</code>, and <code>gi</code>) repeatedly,
entering some text and pressing <code>Escape</code> to return to Normal mode. Then try it
again. Move your cursor around the text using the mouse (we’ll get to keyboard
navigation soon, I promise), and try using the commands again to see how they
behave in new locations.</p></div> <div class="paragraph"><p>Get <em>really</em> comfortable with switching between Normal and Insert mode. You
might think you’ll spend most of your time in Insert mode, but the truth is
code is edited far more often than it is written afresh, and you’ll be
alternating between them constantly.</p></div></div></div> <div class="sect2"><h3 id="_visual_mode"><a class="link" href="#_visual_mode">2.2. Visual Mode</a></h3> <div class="paragraph"><p>The other major mode that LazyVim inherits from its ancestors is “Visual”
mode. Visual mode is used to select text. In general, you can enter Visual mode
and then use many of the same navigation keys you would use in Normal mode to
move your cursor around. Since we haven’t covered those navigation keystrokes
yet, I’m going to defer a detailed discussion of Visual Mode until Chapter 8,
when we will have the necessary foundation.</p></div></div> <div class="sect2"><h3 id="_command_mode"><a class="link" href="#_command_mode">2.3. Command Mode</a></h3> <div class="paragraph"><p>Command mode is different from the other modes we’ve seen, which were mostly
either submenus or the editor-level “major” modes. You can get into command
mode from Normal mode by using the <code>:</code> (i.e. <code>Shift-&lt;semicolon&gt;</code>) command. In
LazyVim, this will pop up a little widget where you can type what is known as
an “Ex Command.” This name comes from <code>vi</code>&#39;s predecessor, <code>ex</code>, which
hasn’t really been used (other than as part of Vim) in decades.</p></div> <div class="paragraph"><p>Essentially, you can enter a wide variety of commands into this widget and
expect certain behaviours to happen as a result. It is actually more similar to
the command palette popularized by Sublime Text and VS Code than anything else,
though it is quite a different experience.</p></div> <div class="paragraph"><p>You already know one ex command from Chapter 1! Remember
<code>&lt;Escape&gt;&lt;Colon&gt;q!&lt;Enter&gt;</code> the command to exit the editor? You now know that
the <code>Escape</code> is to enter Normal mode from whatever mode you are in. The colon
is used to switch to Command mode, and the <code>q</code> is short for quit (You could
type the full word <code>quit</code> if you didn’t feel the need to conserve keystrokes).
The exclamation point says “without saving&quot; and the <code>Enter</code> means &quot;submit the
ex command”.</p></div> <div class="paragraph"><p>As another example, let’s consider the <code>write</code> ex command. Type <code>:</code> followed by
<code>write myfile.txt</code> like this:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-2/command-mode-write-dark.png" alt="command mode write dark"/></div> <div class="title">Figure 8. Write Command</div></div> <div class="paragraph"><p>Press <code>Enter</code> to confirm and execute the command, which will save the file with
the given name.</p></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content">Most commands can be shortened to their shortest unique common prefix.
You usually type <code>:w myfile.txt</code> instead of <code>:write myfile.txt</code>. The most popular
commands even have special combined commands, so <code>:wq</code> will save and exit,
although you’ll probably prefer <code>:x</code> as it’s even shorter.</td></tr></tbody></table></div> <div class="paragraph"><p>Command mode is kind of weird. It’s like an Insert mode in the sense that you
can type text into it, and some of the keybindings that work in Insert mode
also work in Command mode (including <code>Control-r</code> to paste from a register). But
other keybindings work differently in Command mode. The most important one is
the <code>Tab</code> key, which will do a sort of “tab completion” on the command. For
example, <code>:q&lt;Tab&gt;</code> pops up a menu like this:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-2/command-tab-dark.png" alt="command tab dark"/></div> <div class="title">Figure 9. Tab in Command</div></div> <div class="paragraph"><p>This completion menu is disturbingly unintuitive to navigate. You’re probably
going to want to bookmark this section or take some notes to refer to until you
get used to it!</p></div> <div class="paragraph"><p>First, if you want to select a different entry in the menu, you would surely
think you can use the arrow keys, right? Well, you can, but it’s a mind-mess
because you need to use <code>Left</code> and <code>Right</code> to move the cursor <code>Up</code> and <code>Down</code>.
I know! WTF, right?</p></div> <div class="paragraph"><p>This is mostly because the menu looks different in LazyVim than it did
in the original Vim, but the keys haven’t been remapped. So instead, I suggest
using <code>Tab</code> and <code>Shift-Tab</code> to select different entries from the menu. It’s
easier to remember and much easier on the muscle memory: Tab once to show the
menu, tab again to cycle through other entries in the menu.</p></div> <div class="paragraph"><p>Second, there is some nuance around <em>confirming</em> one of those menu entries.
In the above example, you can just press <code>Enter</code> to confirm the selection
<strong>and execute it</strong>. However, there are often cases where you want to confirm
the selection and then continue editing the command. An excellent example
is the <code>:e</code> or <code>:edit</code> command.</p></div> <div class="paragraph"><p>This command is used to open a file on your filesystem, but you have to type
the entire path to the file. For example, if you have the following directory
structure:</p></div> <div class="listingblock"><div class="title">Listing 5. Nested Directory Structure</div> <div class="content"><pre class="pygments highlight"><code data-lang="shell"><span></span>.
└──<span class="tok-w"> </span>foo
<span class="tok-w">    </span>├──<span class="tok-w"> </span>bar
<span class="tok-w">    </span>└──<span class="tok-w"> </span>baz
<span class="tok-w">    </span>│<span class="tok-w">   </span>└──<span class="tok-w"> </span>fizz.txt</code></pre></div></div> <div class="paragraph"><p>…​and you have Neovim open, you would have to type the following to open the
<code>fizz.txt</code> file:</p></div> <div class="listingblock"><div class="title">Listing 6. Edit File Command</div> <div class="content"><pre class="pygments highlight"><code data-lang="shell"><span></span>:e<span class="tok-w"> </span>foo/baz/fizz.txt</code></pre></div></div> <div class="paragraph"><p>That’s a lot of typing if you need to get to deeply nested directories.
Luckily, you <em>can</em> use tab completion for this. You can type <code>:e
f&lt;tab&gt;b&lt;tab&gt;&lt;tab&gt;&lt;tab&gt;</code> to select <code>foo/baz</code>, but at this point the menu is still
open:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-2/edit-baz-dark.png" alt="edit baz dark"/></div> <div class="title">Figure 10. Edit Command with Completion Menu</div></div> <div class="paragraph"><p>If you press <code>Enter</code> now, it’s going to open the <code>baz</code> <em>folder</em> instead of just
confirming the selection, which is not what you want. And if you press <code>Tab</code>
again it will cycle through the menu some more.</p></div> <div class="paragraph"><p>Instead, you have a couple of options. The <code>Down</code> arrow key will
(unintuitively) move “into” the selected directory, allowing you to tab through
the files inside it. Alternatively, use the <code>Control-y</code> (<code>y</code> for “<strong>y</strong>es”) key
combination. This will confirm the <code>baz</code> selection and close the menu but leave
you in Command mode. Now you can press tab again to complete the <code>fizz.txt</code>
portion of the command.</p></div> <div class="paragraph"><p>It <strong>is</strong> possible to remap these keys to be more like other software, and I
honestly think this is one thing LazyVim should do by default. I haven’t found
a combination that I like, though, so I just stick with the default
keybindings.</p></div> <div class="paragraph"><p>You probably won’t spend a lot of time in Command mode. There are easier ways
to open files in LazyVim, for example, as well as to quit the editor. And if
you need to do something more complex with command history, there is a special
window you can use to edit commands with Insert and Normal mode that we will
cover later.</p></div> <div class="paragraph"><p>For now, remember <code>&lt;Tab&gt;</code> and <code>Control-y</code> and you’ll be able to navigate the
Command menu when you need to.</p></div> <div class="paragraph"><p>The most important command, by the way, is <code>:help</code>. Vim was created before
folks had ready access to the Internet, so it has a tradition of shipping all
of its documentation with the editor. So for example, if you can’t remember the
keyboard shortcut to <code>put</code> text, try <code>:help put</code>. Or, if you want to know what
the <code>Control-R</code> keyboard shortcut does, try <code>:help CTRL-R</code>. Of course, the
Vim help documents have also been indexed by your favourite search engines and
AI chat bots, so you can go all new-school and ask them if you prefer.</p></div></div> <div class="sect2"><h3 id="_summary_2"><a class="link" href="#_summary_2">2.4. Summary</a></h3> <div class="paragraph"><p>In this chapter, we became comfortable with the concept of modal editing and
the most important LazyVim modes. There are other mini-modes that will come up
as we progress through this book, but becoming comfortable with Normal, Insert,
and Command mode (and how to switch between them) will take you a long way on
your LazyVim journey.</p></div> <div class="paragraph"><p>In the next chapter, we’ll learn a whole bunch of different ways to move the
cursor around inside a document.</p></div></div></div>`;return{c(){e=c("div"),e.innerHTML=a,this.h()},l(o){e=l(o,"DIV",{class:!0,"data-svelte-h":!0}),h(e)!=="svelte-x7nvu0"&&(e.innerHTML=a),this.h()},h(){m(e,"class","sect1")},m(o,n){p(o,e,n)},p:t,i:t,o:t,d(o){o&&u(e)}}}class w extends d{constructor(e){super(),r(this,e,null,g,s,{})}}export{w as component,b as universal};
