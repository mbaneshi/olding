import{s as i,n as a}from"../chunks/scheduler.seBsrkbn.js";import{S as p,i as c,e as l,c as d,l as r,m as h,g as m,d as u}from"../chunks/index.Dwxb9V0m.js";function g(){return{title:"Chapter 14: Miscellaneous Editing Tips",description:"A collection of misellaneous editing tips that didn't fit in other chapters.",keywords:"vim, lazyvim, neovim, tutorial, course, book, tips, editing, suggestions"}}const f=Object.freeze(Object.defineProperty({__proto__:null,load:g},Symbol.toStringTag,{value:"Module"}));function v(n){let e,t=`<h2 id="_miscellaneous_editing_tips"><a class="link" href="#_miscellaneous_editing_tips">Chapter 14. Miscellaneous Editing Tips</a></h2> <div class="sectionbody"><div class="paragraph"><p>Before we dive into some of the more “IDE-like” behaviours that LazyVim
enables, I wanted to collect some tips that can make your editing life a little
more fun. This chapter is a bit of a grab bag, and includes some commands and
plugins that I couldn’t fit anywhere else.</p></div> <div class="sect2"><h3 id="_word_counts"><a class="link" href="#_word_counts">14.1. Word Counts</a></h3> <div class="paragraph"><p>Use <code>g&lt;Control-g&gt;</code> to spit out a message containing some helpful info about the
current cursor position:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-14/word-count-dark.png" alt="word count dark"/></div> <div class="title">Figure 71. Word Count</div></div> <div class="paragraph"><p>Most notably, the “Word 110 of 3179” tells me that this chapter has over 3000
words in it (obviously I updated this section after I wrote more
words!)</p></div></div> <div class="sect2"><h3 id="_transposed_characters"><a class="link" href="#_transposed_characters">14.2. Transposed Characters</a></h3> <div class="paragraph"><p>How often do you type so fast that you accidentally transpose two chracters?</p></div> <div class="paragraph"><p>Simply use <code>xp</code> to swap a character with the one to the right of it. For example,
if you have typed <code>ra</code> when you meant to type <code>ar</code>, put your cursor on the <code>r</code> and
hit <code>xp</code>.</p></div> <div class="paragraph"><p>This is not a special custom command. It just uses the default “delete
character” and “put last deleted after the cursor” commands to move the
character from its current position to the next one. You can use a similar idea
to move other text around. For example, move a word with <code>dwwP</code> or use <code>daaWp</code>
to delete an argument and move it later in a function signature.</p></div></div> <div class="sect2"><h3 id="_commenting_and_uncommenting_code"><a class="link" href="#_commenting_and_uncommenting_code">14.3. Commenting and Uncommenting Code</a></h3> <div class="paragraph"><p>LazyVim ships with a plugin for commenting and uncommenting code in older
versions of Neovim, but as of Neovim 0.10, this is actually a native Neovim
feature.</p></div> <div class="paragraph"><p>The verb for toggling comments is <code>gc</code> and can be followed by a motion or text
object. So <code>gc5j</code> will comment this line and the five lines below it, while
<code>gcap</code> will comment out an entire block separated by newlines.</p></div> <div class="paragraph"><p>This command pairs beautifully with the <code>S</code> command to comment out a
surrounding text object. For example <code>gcSh</code> will comment out the function
surrounded by the <code>h</code> labels after the <code>S</code> is invoked.</p></div> <div class="paragraph"><p>To comment out a single line, use the easy-to-type shortcut <code>gcc</code>. This command
can take a count, so <code>5gcc</code> will comment out five lines (a little easier to
type than <code>gc4j</code>).</p></div> <div class="paragraph"><p>As with most verbs, <code>gc</code> can also be applied to a visual selection with e.g.
<code>V5jgc</code>.</p></div> <div class="paragraph"><p>The <code>gc</code> verb is actually a toggle, so if a line is currently commented, it
will uncomment it instead of commenting it a second time. Thus, <code>gccgcc</code> is a
no-op. However, note that if you have a selection that contains commented and
uncommented lines, you will end up with a double comment. This is usually what
you want: If you temporarily comment out a block that contains other comments,
when you uncomment that block, you probably want the original comments to stay
commented.</p></div> <div class="paragraph"><p>As a shortcut, if you want to add a new comment line above or below the current
line, instead of commenting the current line, you can use <code>gcO</code> and <code>gco</code>.
Technically this is a new verb, but for memory’s sake, think of it as combining
<code>gc</code> with the verbs to open a new line (<code>o</code> and <code>O</code>).</p></div></div> <div class="sect2"><h3 id="_incrementing_and_decrementing_numbers"><a class="link" href="#_incrementing_and_decrementing_numbers">14.4. Incrementing and Decrementing Numbers</a></h3> <div class="paragraph"><p>If your cursor is currently on a number in Normal mode, you can use <code>Control-a</code> to
increment that number. This command is somewhat smart and does the “right thing”
if your number needs new digits. So <code>9</code> becomes <code>10</code> and <code>99</code> becomes <code>100</code> when
you press <code>Control-a</code> anywhere in the number.</p></div> <div class="paragraph"><p>To decrement a number, use <code>Control-x</code>.</p></div> <div class="paragraph"><p>I hated these two keybindings for the longest time because they are only
occasionally useful, but when they are useful, I couldn’t remember them. So I
spent a long time manually incrementing numbers and thinking to myself “I need
to look up those number increment commands,” but the only keywords associated
with this help section were the keybindings themselves!</p></div> <div class="paragraph"><p>Eventually I learned about the <code>:helpgrep</code> command, which allows you to search
the help. Long before I memorized the keybindings, I remembered that <code>:helpgrep
Adding and subtracting</code> would help me look them up.</p></div> <div class="paragraph"><p>But there is actually a mnemonic for these keybindings: <code>Control-a</code> is “Add”,
which is easy enough to remember. <code>Control-x</code> is a little harder, but now that
you have <code>Control-a</code> you’ll be able to look it up with <code>:help CTRL-a</code>. I’m not
sure if it will help anyone else, but I think of the <code>x</code> as “&#39;cross&#39; out one
digit to subtract”.</p></div> <div class="paragraph"><p>Use <code>g&lt;Control-a&gt;</code> and <code>g&lt;Control-x&gt;</code> to decrement numbers on consecutive lines
with an additional increment for each line in the count. This is useful if you
are manipulating numbered lists. Say you want to make a list of 10 items. First
type <code>o1.&lt;esc&gt;</code> to make a line that says <code>1.</code>. Then type <code>9.</code> to repeat that
command 9 times. Now you have:</p></div> <div class="listingblock"><div class="title">Listing 37. A Dumb List</div> <div class="content"><pre class="pygments highlight"><code data-lang="plain"><span></span>1.
1.
1.
1.
1.
1.
1.
1.
1.
1.</code></pre></div></div> <div class="paragraph"><p>You can use <code>V&#39;[</code> to select the 9 rows that just got inserted, as the <code>&#39;[</code> mark
is the first character of the previously changed text. Now type <code>g&lt;Control-a&gt;</code>
to increment them and you end up with:</p></div> <div class="listingblock"><div class="title">Listing 38. A Smarter List</div> <div class="content"><pre class="pygments highlight"><code data-lang="plain"><span></span>1.
2.
3.
4.
5.
6.
7.
8.
9.
10.</code></pre></div></div> <div class="paragraph"><p>Not bad for just a handful of odd-looking keystrokes:
<code>oi1.&lt;Esc&gt;9.V&#39;[g&lt;Control-a&gt;</code>!</p></div> <div class="paragraph"><p>If you need to insert a new entry in the middle of a list, add the entry,
select the lines with the remaining entries, and hit <code>Control-a</code> to sync them up.</p></div> <div class="paragraph"><p>Neovim will smartly increment just the first number it encounters on a line.
This means it is easy to e.g. manipulate a book’s outline even if it contains
multiple numbers. Consider this hypothetical outline of a book largely unlike
this one:</p></div> <div class="listingblock"><div class="title">Listing 39. Some Book Chapters</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-n">Chapter</span> <span class="tok-mi">1</span><span class="tok-p">:</span> <span class="tok-n">Intro</span> <span class="tok-ow">and</span> <span class="tok-n">Install</span>
<span class="tok-n">Chapter</span> <span class="tok-mi">2</span><span class="tok-p">:</span> <span class="tok-mi">1</span> <span class="tok-n">Weird</span> <span class="tok-n">modal</span> <span class="tok-n">editing</span> <span class="tok-n">trick</span>
<span class="tok-n">Chapter</span> <span class="tok-mi">3</span><span class="tok-p">:</span> <span class="tok-n">The</span> <span class="tok-n">numbered</span> <span class="tok-n">marks</span> <span class="tok-mi">1</span><span class="tok-o">-</span><span class="tok-mi">9</span>
<span class="tok-n">Chapter</span> <span class="tok-mi">4</span><span class="tok-p">:</span> <span class="tok-n">Navigating</span> <span class="tok-n">things</span>
<span class="tok-p">...</span></code></pre></div></div> <div class="paragraph"><p>Let’s say I want to split Chapter 1 into two different chapters: “Intro” and
“Install”. I can simply add the new chapter using normal text insertion like
this:</p></div> <div class="listingblock"><div class="title">Listing 40. Adding a New Chapter</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-n">Chapter</span> <span class="tok-mi">1</span><span class="tok-p">:</span> <span class="tok-n">Intro</span>
<span class="tok-n">Chapter</span> <span class="tok-mi">2</span><span class="tok-p">:</span> <span class="tok-n">Install</span>
<span class="tok-n">Chapter</span> <span class="tok-mi">2</span><span class="tok-p">:</span> <span class="tok-mi">1</span> <span class="tok-n">Weird</span> <span class="tok-n">modal</span> <span class="tok-n">editing</span> <span class="tok-n">trick</span>
<span class="tok-n">Chapter</span> <span class="tok-mi">3</span><span class="tok-p">:</span> <span class="tok-n">The</span> <span class="tok-n">numbered</span> <span class="tok-n">marks</span> <span class="tok-mi">1</span><span class="tok-o">-</span><span class="tok-mi">9</span>
<span class="tok-n">Chapter</span> <span class="tok-mi">4</span><span class="tok-p">:</span> <span class="tok-n">Navigating</span> <span class="tok-n">things</span>
<span class="tok-p">...</span></code></pre></div></div> <div class="paragraph"><p>Then I can use <code>&lt;Shift-V&gt;}</code> to select the chapters originally numbered 2 and
higher. When I hit <code>Control-a</code>, the chapter numbers are incremented, but
the <code>1</code> in <code>1 Weird trick</code> will not be impacted, nor will the numbered marks
indicators.</p></div> <div class="listingblock"><div class="title">Listing 41. Sync Up the Numbers</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-n">Chapter</span> <span class="tok-mi">1</span><span class="tok-p">:</span> <span class="tok-n">Intro</span>
<span class="tok-n">Chapter</span> <span class="tok-mi">2</span><span class="tok-p">:</span> <span class="tok-n">Install</span>
<span class="tok-n">Chapter</span> <span class="tok-mi">3</span><span class="tok-p">:</span> <span class="tok-mi">1</span> <span class="tok-n">Weird</span> <span class="tok-n">modal</span> <span class="tok-n">editing</span> <span class="tok-n">trick</span>
<span class="tok-n">Chapter</span> <span class="tok-mi">4</span><span class="tok-p">:</span> <span class="tok-n">The</span> <span class="tok-n">numbered</span> <span class="tok-n">marks</span> <span class="tok-mi">1</span><span class="tok-o">-</span><span class="tok-mi">9</span>
<span class="tok-n">Chapter</span> <span class="tok-mi">5</span><span class="tok-p">:</span> <span class="tok-n">Navigating</span> <span class="tok-n">things</span>
<span class="tok-p">...</span></code></pre></div></div> <div class="sect3"><h4 id="_the_dial_nvim_extra"><a class="link" href="#_the_dial_nvim_extra">14.4.1. The Dial.nvim Extra</a></h4> <div class="paragraph"><p>If the increment and decrement keybindings sound kind of like that one weird
kitchen unitasker that is helpful once a month, you might want to consider
installing the <code>editor.dial</code> extra from <code>:LazyExtras</code>.</p></div> <div class="paragraph"><p>This extra installs the dial.nvim plugin which allows you to increment and
decrement a bunch of other cool stuff. I mostly use it to swap boolean
expressions (both <code>Control-a</code> and <code>Control-x</code> will alternate <code>true</code> to <code>false</code> and
vice versa.), but it can also increment words (“first” increments to “second”),
months (“December” increments to “January”), version numbers, Markdown headers,
and more. You can even extend it with your own patterns if you need to.</p></div></div></div> <div class="sect2"><h3 id="_changing_indentation"><a class="link" href="#_changing_indentation">14.5. Changing Indentation</a></h3> <div class="paragraph"><p>The <code>&gt;</code> and <code>&lt;</code> keybindings can be used in Normal mode to indent or dedent
text. Most often, you’ll use them doubled up (as in <code>&lt;&lt;</code> and <code>&gt;&gt;</code>) to change
the indentation of the current line. However, you can also change the
indentation of any motion. Another common one is <code>&gt;Sx</code> to indent a treesitter
entity by some label <code>x</code>, and <code>&gt;ap</code> will indent an entire blanks-delimited
paragraph.</p></div> <div class="paragraph"><p>These verbs can get a little confusing when it comes to using counts. You might
expect <code>2&gt;&gt;</code> to indent the current line by two indentation levels, but instead,
it will indent two lines by one indentation level.</p></div> <div class="paragraph"><p>When you want to change by multiple indents in one command, you will need to
resort to Visual mode. To indent the current line by five indentation widths,
the quickest way is with <code>v5&gt;</code>, compared to typing ten greater-than symbols.
This works with any visual selection, so you can use, for example, <code>va{5&gt;</code> to
indent an entire block five levels.</p></div> <div class="paragraph"><p>Often, all you want to do is “make the indentation correct for this
programming language”. If conform.nvim is configured correctly, the easiest
way to do this is to just save the file. LazyVim has format on save enabled by
default, and if it can find a formatter, it will use it. You can also use <code>gq</code>
with a motion or selection (most commonly <code>gqag</code> to format the entire file) to
apply formatting.</p></div> <div class="paragraph"><p>However, if you don’t want to save, or aren’t using conform.nvim, you can also
use the <code>=</code> verb. The behaviour of <code>=</code> depends a little on the programming
language, but it generally applies the indentation engine to the visually
selected (or motion selected) lines as though you had pressed <code>enter</code> to start
a new line. The end result is that all lines will be indented “correctly” for
some definition of “correctly”.</p></div> <div class="paragraph"><p>You can also adjust indentation without leaving Insert mode. The <code>Control-t</code>
and <code>Control-d</code> keybindings will indent and dedent the current line while
inserting text. The mnemonics are “add <strong>t</strong>ab” and “<strong>d</strong>edent”.</p></div></div> <div class="sect2"><h3 id="_reflowing_text"><a class="link" href="#_reflowing_text">14.6. Reflowing Text</a></h3> <div class="paragraph"><p>I’ve used the <code>gw</code> command a lot while writing this book. It effectively
rewraps (<code>w</code> for wrap) all the text at the eighty character limit (or any ruler
number, configurable with <code>:set textwidth=&lt;number&gt;</code>), without breaking words.</p></div> <div class="paragraph"><p>Most often, I use <code>gww</code> to rewrap the current line so that it has linebreaks at
the appropriate position or <code>gwip</code> to rewrap an entire paragraph. But <code>gw</code>
works with any motion or visually selection. To rewrap an entire file, use
<code>gwig</code>.</p></div> <div class="paragraph"><p>This command relies heavily on the existence of newlines. Effectively, any two
consecutive lines will be joined into a single line (if they fit in 80
characters). For me, this has meant that if I forget to put a newline after a
heading, my first paragraph gets tied up into the heading, which is obviously
not what I want.</p></div></div> <div class="sect2"><h3 id="_filtering_through_external_programs"><a class="link" href="#_filtering_through_external_programs">14.7. Filtering Through External Programs</a></h3> <div class="paragraph"><p>You can also pipe text out to any external program that is a good Unix citizen:
one that processes input on STDIN and outputs it to STDOUT. To do so, visually
select the text you want to pipe in Visual mode. Then type a <code>!</code>. This will
open the command window with the visual selection as a range, and is a shortcut for
<code>:&#39;&lt;,&#39;&gt;!</code>. Then type a command on the path and the selected text will be
replaced with the output of that command.</p></div> <div class="paragraph"><p>Here are some examples, assuming some common Unix tools are installed:</p></div> <div class="ulist"><ul><li><p><code>!grep -v a</code> will replace the selection with the same text, but any lines
that contain the letter “a” will be removed.</p></li> <li><p><code>!tr -s &#39; &#39;</code> will call the translate command, replacing all instances of
multiple spaces with a single space.</p></li> <li><p><code>!jq</code> will format the <code>json</code> text with <code>jq</code></p></li> <li><p><code>!pandoc -f markdown -t html</code> is a handy way to quickly write HTML by
starting with simpler Markdown syntax.</p></li> <li><p><code>!./my-custom-script</code> will pipe the command through an arbitrary script you
wrote.</p></li> <li><p><code>!python ./something.py</code> will pipe the command through a Python script
you wrote.</p></li></ul></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">If you want to run a command without modifying the text, don’t supply a
range. For example, <code>:!mkdir foo</code> will run the <code>mkdir</code> command without
overwriting your file content.</td></tr></tbody></table></div> <div class="paragraph"><p>I think it is unfortunate that this feature is not used more. Many features
that are built into Neovim or supplied as plugins could just as easily be CLI
programs that operate on piped input and output. As just one example, the
<code>:sort</code> command that ships with Neovim is, in my opinion, just bloating the
editor when <code>!sort</code> can run the external sort utility just as well.</p></div></div> <div class="sect2"><h3 id="_spell_check"><a class="link" href="#_spell_check">14.8. Spell Check</a></h3> <div class="paragraph"><p>You can enable or disable spell check with <code>&lt;Space&gt;us</code>. When enabled, errors
that are not recognized by the spell checker are underlined with a curly
underline similar to a diagnostic. But you have to jump between  spelling
errors with <code>[s</code> and <code>]s</code>  instead of the diagnostic keybindings <code>[d</code> and <code>]d</code>.</p></div> <div class="paragraph"><p>To ask Vim to give you suggestions for how to spell the word, use <code>z=</code>. This is
about as unmemorable as you can get, so write it down. If you can remember it
is in the <code>z</code> menu rather than <code>Space</code>, you can at least find it in the menu
again. The spelling suggestions will pop up in a numbered menu; enter a number
to replace the word with that spelling.</p></div></div> <div class="sect2"><h3 id="_insert_mode_keybindings"><a class="link" href="#_insert_mode_keybindings">14.9. Insert Mode Keybindings</a></h3> <div class="paragraph"><p>If you are in Insert mode, and want to perform a single Normal mode action
before going back to Insert mode, you can use <code>ctrl-o</code>. Perform the one Normal
mode command, and you’ll be back in Insert mode immediately. I don’t really
see the point of this, since <code>Control-o&lt;command&gt;</code> adds two keypresses, and so does
<code>&lt;Escape&gt;&lt;command&gt;i</code>.</p></div> <div class="paragraph"><p>While in Insert mode, if you press <code>Control-a</code>, it will Insert whatever text you
inserted in the previous Insert mode session. This is similar to accessing the
<code>&quot;.</code> register.</p></div> <div class="paragraph"><p>To access other registers in Insert mode, use <code>Control-r</code>. This will pop up
the registers menu and you can Insert any of those registers by hitting the appropriate
key. So <code>Control-a</code> in Insert mode is similar to <code>Control-a.</code>. To insert from the
clipboard, use <code>Control-r</code> and then <code>+</code>.</p></div> <div class="paragraph"><p>The <code>CTRL-U</code> keybinding will remove all characters <em>on the current line</em> that
were added since you entered Insert mode. So in a single line edit, it’s
similar to an Undo operation, but if your Insert has included an <code>&lt;Enter&gt;</code>, the
undo would only be on one line.</p></div> <div class="paragraph"><p>Some people like to bind to an unusual sequence of characters in Insert mode.
The most common suggestions are to bind <code>jk</code> to <code>Escape</code> or to bind <code>;;</code> to
<code>Control-O</code> but you can do any combination you like. The former allows you to
switch to Normal mode without pressing <code>Escape</code> or <code>Control</code>, and the latter
allows you to temporarily perform a single Normal mode operation and return
to Insert mode. They don’t save you any keypresses in terms of count, but they
are easy keys to hit.</p></div> <div class="paragraph"><p>If you want to explore this, open your <code>keymaps.lua</code> file and add the following
lines:</p></div> <div class="listingblock"><div class="title">Listing 42. Insert Mode Keymaps</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">keymap</span><span class="tok-p">.</span><span class="tok-n">set</span><span class="tok-p">(</span><span class="tok-s2">&quot;i&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;jk&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;&lt;Esc&gt;&quot;</span><span class="tok-p">,</span> <span class="tok-p">{</span> <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Normal mode&quot;</span> <span class="tok-p">})</span>
<span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">keymap</span><span class="tok-p">.</span><span class="tok-n">set</span><span class="tok-p">(</span><span class="tok-s2">&quot;i&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;;;&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;&lt;C-o&gt;&quot;</span><span class="tok-p">,</span> <span class="tok-p">{</span> <span class="tok-n">desc</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Normal mode single operation&quot;</span> <span class="tok-p">})</span></code></pre></div></div> <div class="paragraph"><p>The important bit here is the <code>&quot;i&quot;</code> as the first argument. This tells Neovim
that the keymapping should happen in Insert mode instead of Normal mode
(<code>&quot;n&quot;</code>). You can also use <code>&quot;x&quot;</code> for operator pending mode and <code>v</code> for visual
mode, among others.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">In normal text and coding, the <code>;</code> key is rarely followed by any character
other than <code>&lt;Space&gt;</code> or <code>&lt;Enter&gt;</code>, so it is a good candidate to use as a prefix
for a variety of Insert mode operations.</td></tr></tbody></table></div> <div class="paragraph"><p>Do not use this technique for expanding a sequence of text to a different
sequence of text, though. For that, you are better off using either
abbreviations or snippets, the topic of the next two sections.</p></div></div> <div class="sect2"><h3 id="_abbreviations_and_filetype_configuration"><a class="link" href="#_abbreviations_and_filetype_configuration">14.10. Abbreviations (and Filetype Configuration)</a></h3> <div class="paragraph"><p>Vim abbreviations have been around since the earliest days of the editor. They
are an easy way to have “shortcut” words that expand to something else entirely
without leaving Insert mode.</p></div> <div class="paragraph"><p>To create a temporary abbreviation, just use the command <code>:iabbr &lt;shortcut&gt;
&lt;expansion&gt;</code>. You can use Vim’s keybinding syntax to represent special
characters like <code>&lt;Enter&gt;</code>, and <code>&lt;Tab&gt;</code> in the expansion. You can even use
e.g. <code>&lt;Left&gt;</code> to reposition the cursor within the abbreviated text.</p></div> <div class="paragraph"><p>For example, consider this command:</p></div> <div class="listingblock"><div class="title">Listing 43. Abbreviation Command</div> <div class="content"><pre class="pygments highlight"><code data-lang="vim"><span></span><span class="tok-p">:</span>iabbr ifmain <span class="tok-k">if</span> __name__ <span class="tok-p">==</span> <span class="tok-s2">&quot;__main__&quot;</span>:<span class="tok-p">&lt;</span>Enter<span class="tok-p">&gt;</span>main<span class="tok-p">()&lt;</span>Left<span class="tok-p">&gt;</span>\`</code></pre></div></div> <div class="paragraph"><p>It will expand the text (when entered in insert mode) <code>ifmain&lt;Space&gt;</code> to the
following, and place the cursor inside the parentheses after <code>main</code>:</p></div> <div class="listingblock"><div class="title">Listing 44. Suggested If Main Expansion</div> <div class="content"><pre class="pygments highlight"><code data-lang="python"><span></span><span class="tok-k">if</span> <span class="tok-vm">__name__</span> <span class="tok-o">==</span> <span class="tok-s2">&quot;__main__&quot;</span><span class="tok-p">:</span>
    <span class="tok-n">main</span><span class="tok-p">(</span> <span class="tok-p">)</span></code></pre></div></div> <div class="paragraph"><p>The <code>i</code> in <code>iabbr</code> means it will work in Insert mode, and <code>abbr</code> is short for
“abbreviate.”</p></div> <div class="paragraph"><p>Note that I didn’t have to explicitly add any indentation after the <code>Enter</code>
because the Python indentation engine takes care of that for me. Note also
that the <code>&lt;Space&gt;</code> I typed after <code>ifmain</code> was inserted between the brackets.
If you need to expand an abbreviation without adding spaces, use the <code>Control-]</code>
keybinding to trigger expansion instead.</p></div> <div class="paragraph"><p>And if you need to insert the words <code>ifmain</code> without expanding them, type
<code>ifmain&lt;Escape&gt;</code> to return to Normal mode without expanding.</p></div> <div class="paragraph"><p>This abbreviation will only exist until I close the editor. To make it
permanent, I need to add it to my LazyVim configuration. Typically,
abbreviations only make sense within the context of a single filetype, so I
collect mine in the <code>autocmds.lua</code> using syntax like this:</p></div> <div class="listingblock"><div class="title">Listing 45. If Main Abbreviation</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">api</span><span class="tok-p">.</span><span class="tok-n">nvim_create_autocmd</span><span class="tok-p">(</span><span class="tok-s2">&quot;FileType&quot;</span><span class="tok-p">,</span> <span class="tok-p">{</span>
  <span class="tok-n">pattern</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-s2">&quot;python&quot;</span> <span class="tok-p">},</span>
  <span class="tok-n">callback</span> <span class="tok-o">=</span> <span class="tok-kr">function</span><span class="tok-p">()</span>
    <span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">cmd</span><span class="tok-p">(</span><span class="tok-s1">&#39;iabbr ifmain if __name__ == &quot;__main__&quot;:&lt;Enter&gt;main()&lt;Left&gt;&#39;</span><span class="tok-p">)</span>
    <span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">cmd</span><span class="tok-p">(</span><span class="tok-s2">&quot;iabbr frang for i in range():&lt;Enter&gt;&lt;Esc&gt;F(i&quot;</span><span class="tok-p">)</span>
    <span class="tok-c1">-- Other Python abbreviations</span>
  <span class="tok-kr">end</span><span class="tok-p">,</span>
<span class="tok-p">})</span></code></pre></div></div> <div class="paragraph"><p>The <code>frang</code> abbreviation shows another neat trick: You can use the string
<code>&lt;Esc&gt;</code> to enter Normal mode and move the cursor. I used <code>F(</code> to “find the
previous open paren” followed by <code>i</code> to enter Insert mode inside the <code>range()</code>
parens.</p></div> <div class="paragraph"><p>Vim abbreviations have been around forever and do the job well. I still use
them (probably because I am old), but the world has largely moved on to
snippets instead.</p></div></div> <div class="sect2"><h3 id="_snippets"><a class="link" href="#_snippets">14.11. Snippets</a></h3> <div class="paragraph"><p>LazyVim ships with the <code>nvim-snippets</code> plugin, an interface to Neovim 0.10’s
built-in snippets interface. It can load
<a href="https://code.visualstudio.com/docs/editor/userdefinedsnippets#_create-your-own-snippets">VS
Code-style snippets</a>.</p></div> <div class="paragraph"><p><code>nvim-snippets</code> integrates with <code>nvim-cmp</code>, which we’ve touched on before, for
completions. By default, <code>nvim-cmp</code> pops up a pretty menu with a bunch of
completions as you type. For example, here’s what I see if I type <code>if</code>
in a Python file:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-14/nvim-cmp-dark.png" alt="nvim cmp dark"/></div> <div class="title">Figure 72. Cmp Menu <code>if</code></div></div> <div class="paragraph"><p>The left column shows possible completions in a neutral text colour. The middle
column indicates two (in this case) different completion sources: Snippets or
the Copilot AI engine (this isn’t enabled by default, but there’s an extra for
it that we’ll discuss in chapter 16). If I was working in a real project, it
would likely also include some functions and classes that I’ve defined.</p></div> <div class="paragraph"><p>I can move my cursor up and down the list with the <em>arrow</em> keys (<code>j</code> and <code>k</code>
won’t work here because I’m still in Insert mode). Most completions
have a preview box pop up with documentation or an example of the completion.</p></div> <div class="paragraph"><p>This snippet was created by the <code>FriendlySnippets</code> plugin, which is a massive
collection of useful snippets that ships with LazyVim. (Also notice that there
is an <code>ifmain</code> snippet much like the abbreviation I apparently didn’t actually
need to define above!)</p></div> <div class="paragraph"><p>If I then press the <code>Control-y</code> key, which confirms a completion (or <code>Enter</code> if
you use the LazyVim defaults or <code>Right Arrow</code> if you have configured nvim-cmp
the way I have), the snippet is inserted into my editor:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-14/snippet-inserted-dark.png" alt="snippet inserted dark"/></div> <div class="title">Figure 73. Inserted Snippet</div></div> <div class="paragraph"><p>The editor is currently in “Select” mode, an uncommon mode that is
superficially similar  to Visual mode. In LazyVim’s default config, I’m not
aware of any way to get into Select mode other than accepting a snippet! So we
won’t go into too much detail about this mode outside the context of snippets.</p></div> <div class="paragraph"><p>The key point is that “condition” is currently highlighted, and I can start
typing immediately to overwrite it, almost as though I was in Insert mode. Once
the condition has been replaced, I can press the <code>&lt;Tab&gt;</code> key, which the
<code>nvim-snippets</code> plugin interprets as “jump to the next field in the snippet.”
Now the <code>pass</code> inside the <code>if</code> is highlighted instead.</p></div> <div class="paragraph"><p>The <code>&lt;Tab&gt;</code> key only works like this if <code>nvim-snippets</code> is aware it is in a
snippet that has fields.</p></div> <div class="sect3"><h4 id="_defining_new_snippets"><a class="link" href="#_defining_new_snippets">14.11.1. Defining New Snippets</a></h4> <div class="paragraph"><p>If the <code>FriendlySnippets</code> snippets aren’t enough for you, you can define your
own snippets using the now-ubiquitous VS Code Snippet syntax and load them in
nvim-snippets. As a quick example, here’s how to create a snippet for a
boilerplate Svelte component:</p></div> <div class="olist arabic"><ol class="arabic"><li><p>If it doesn’t exist, create the <code>~/.config/nvim/snippets/</code> directory to hold
your snippets. This is the default location <code>nvim-snippets</code> looks for
snippets.</p></li> <li><p>Create a subdirectory in that directory for the filetype you want to create a
snippet for. You can discover the Neovim filetype of the currently open file
with the <code>:set ft</code> command. In this case, we’ll create <code>~/.config/nvim/snippets/svelte/</code>.</p></li> <li><p>Create a <code>json</code> file in the <code>svelte</code> directory. It doesn’t matter what name you
give it, but I’ll call mine <code>svelte.json</code>. It can contain multiple snippets.
Here’s how my boilerplate component snippet looks:</p></li></ol></div> <div class="listingblock"><div class="title">Listing 46. Snippet Definition</div> <div class="content"><pre class="pygments highlight"><code data-lang="json"><span></span><span class="tok-p">{</span>
<span class="tok-w">  </span><span class="tok-nt">&quot;Boilerplate Component&quot;</span><span class="tok-p">:</span><span class="tok-w"> </span><span class="tok-p">{</span>
<span class="tok-w">    </span><span class="tok-nt">&quot;prefix&quot;</span><span class="tok-p">:</span><span class="tok-w"> </span><span class="tok-s2">&quot;&lt;scr&quot;</span><span class="tok-p">,</span>
<span class="tok-w">    </span><span class="tok-nt">&quot;description&quot;</span><span class="tok-p">:</span><span class="tok-w"> </span><span class="tok-s2">&quot;Basic svelte boilerplate&quot;</span><span class="tok-p">,</span>
<span class="tok-w">    </span><span class="tok-nt">&quot;body&quot;</span><span class="tok-p">:</span><span class="tok-w"> </span><span class="tok-p">[</span>
<span class="tok-w">      </span><span class="tok-s2">&quot;&lt;script lang=\\&quot;ts\\&quot;&gt;&quot;</span><span class="tok-p">,</span>
<span class="tok-w">      </span><span class="tok-s2">&quot;  $1&quot;</span><span class="tok-p">,</span>
<span class="tok-w">      </span><span class="tok-s2">&quot;&lt;/script&gt;&quot;</span><span class="tok-p">,</span>
<span class="tok-w">      </span><span class="tok-s2">&quot;&quot;</span><span class="tok-p">,</span>
<span class="tok-w">      </span><span class="tok-s2">&quot;\${2:&lt;div&gt;&lt;/div&gt;}&quot;</span><span class="tok-p">,</span>
<span class="tok-w">      </span><span class="tok-s2">&quot;&quot;</span><span class="tok-p">,</span>
<span class="tok-w">      </span><span class="tok-s2">&quot;&lt;style&gt;&quot;</span><span class="tok-p">,</span>
<span class="tok-w">      </span><span class="tok-s2">&quot;  $3&quot;</span><span class="tok-p">,</span>
<span class="tok-w">      </span><span class="tok-s2">&quot;&lt;/style&gt;&quot;</span>
<span class="tok-w">    </span><span class="tok-p">]</span>
<span class="tok-w">  </span><span class="tok-p">}</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>If you are unfamiliar with VS Code snippet syntax:</p></div> <div class="ulist"><ul><li><p><code>prefix</code> is the string you type in Insert mode to trigger the snippet. In this case, it is <code>&lt;scr</code>.</p></li> <li><p><code>description</code> is a string that describes it in the completion menu.</p></li> <li><p><code>body</code> is a list of lines in the snippet.</p></li> <li><p><code>$1</code>, <code>$2</code>, <code>$3</code> represent “tab stops” in the snippet.</p></li> <li><p><code>\${2:&lt;div&gt;&lt;/div&gt;}</code> represents a tab stop with placeholder content that can be typed over.</p></li></ul></div> <div class="paragraph"><p>If I restart Neovim and load a svelte file, I can type <code>&lt;scr</code> to insert this snippet. The
default output looks like this:</p></div> <div class="listingblock"><div class="title">Listing 47. Snippet Output</div> <div class="content"><pre class="pygments highlight"><code data-lang="html"><span></span><span class="tok-p">&lt;</span><span class="tok-nt">script</span> <span class="tok-na">lang</span><span class="tok-o">=</span><span class="tok-s">&quot;ts&quot;</span><span class="tok-p">&gt;</span>
<span class="tok-p">&lt;/</span><span class="tok-nt">script</span><span class="tok-p">&gt;</span>

<span class="tok-p">&lt;</span><span class="tok-nt">div</span><span class="tok-p">&gt;&lt;/</span><span class="tok-nt">div</span><span class="tok-p">&gt;</span>

<span class="tok-p">&lt;</span><span class="tok-nt">style</span><span class="tok-p">&gt;</span>
<span class="tok-p">&lt;/</span><span class="tok-nt">style</span><span class="tok-p">&gt;</span></code></pre></div></div></div></div> <div class="sect2"><h3 id="_summary_14"><a class="link" href="#_summary_14">14.12. Summary</a></h3> <div class="paragraph"><p>This chapter introduced various editing tips, starting with word counts and
transposing characters, and then moving on to managing comments, indentation
and formatting.</p></div> <div class="paragraph"><p>Finally, we covered the old-but-not-busted abbreviation syntax and the new-hotness
Snippets engine that LazyVim ships with.</p></div> <div class="paragraph"><p>In the next chapter, we’ll start discussing something completely different:
version control in LazyVim.</p></div></div></div>`;return{c(){e=l("div"),e.innerHTML=t,this.h()},l(s){e=d(s,"DIV",{class:!0,"data-svelte-h":!0}),r(e)!=="svelte-1u83s7z"&&(e.innerHTML=t),this.h()},h(){h(e,"class","sect1")},m(s,o){m(s,e,o)},p:a,i:a,o:a,d(s){s&&u(e)}}}class w extends p{constructor(e){super(),c(this,e,null,v,i,{})}}export{w as component,f as universal};
