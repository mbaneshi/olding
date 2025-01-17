import{s as i,n as o}from"../chunks/scheduler.seBsrkbn.js";import{S as d,i as c,e as r,c as l,l as p,m as h,g as u,d as g}from"../chunks/index.Dwxb9V0m.js";function m(){return{title:"Chapter 7: Objects and Operator-pending Mode",description:"Some advanced editing techniques that make LazyVim a joy to use",keywords:"vim, lazyvim, neovim, tutorial, editing, navigating, text objects, operator pending mode"}}const b=Object.freeze(Object.defineProperty({__proto__:null,load:m},Symbol.toStringTag,{value:"Module"}));function v(s){let e,t=`<h2 id="_objects_and_operator_pending_mode"><a class="link" href="#_objects_and_operator_pending_mode">Chapter 7. Objects and Operator-Pending Mode</a></h2> <div class="sectionbody"><div class="paragraph"><p>The navigation and motion commands we’ve learned so far are invaluable, but
Neovim also comes with several more advanced motions that can supercharge your
editing workflow. LazyVim further amends this collection of motions with other
powerful navigation capabilities powered by a variety of plugins.</p></div> <div class="paragraph"><p>For example, if you are editing text rather than source code, you will find it
useful to be able to navigate by sentences and paragraphs. A sentence is
basically anything that ends with a <code>.</code>, <code>?</code>, or <code>!</code> followed by whitespace.</p></div> <div class="paragraph"><p>The sentence keybindings are two of the hardest for me to remember. I use them
rarely enough that it hasn’t become muscle memory, and it doesn’t have a good
mnemonic I can remember.</p></div> <div class="paragraph"><p>Have I built enough suspense? Pay attention, because you will forget this. To
move one sentence forward (to the first letter after the whitespace following
sentence ending punctuation), type a <code>)</code> (right parenthesis) command in normal
mode. To move to the start of the current sentence, use <code>(</code>. Press the
parenthesis again to move to the next or previous sentence or a add count if
you want to move by multiple sentences.</p></div> <div class="paragraph"><p>I hate that the command is <code>(</code> since that feels like it should be moving to,
you know, a parenthesis! But it’s not; it’s moving by sentences. Since the <code>.</code>,
<code>!</code>, and <code>?</code> characters rarely mean “sentence” in normal software development,
I just don’t use it that much until I start writing a book (something I keep
telling myself I won’t commit to again, but it never lasts).</p></div> <div class="paragraph"><p>I do use the paragraph motions all the time, though. A paragraph is defined as
all the content between two empty lines, and that is a concept that makes sense
in a programming context. Most developers structure their code with logically
connected statements separated by blanks. The commands to move up or down by
one “paragraph” are the curly braces, <code>{</code> and <code>}</code>. If you need to jump
multiple paragraphs ahead or back, they can, as usual, be prefixed by a count.</p></div> <div class="paragraph"><p>Again, you might expect <code>{</code> to jump to a curly bracket, so it is a bit annoying
that it means “empty line” instead, but once you get used to it, you’ll probably
reach for it a lot.</p></div> <div class="sect2"><h3 id="_unimpaired_mode"><a class="link" href="#_unimpaired_mode">7.1. Unimpaired Mode</a></h3> <div class="paragraph"><p>LazyVim provides a bunch of other motions that can be accessed using square
brackets. It will take a while to internalize them all, but luckily, you can
get a menu by pressing a single <code>[</code> or <code>]</code>. Like the sentence and paragraph
motions, the square brackets allow you to move to the previous or next
<em>something</em>, except the <em>something</em> depends what key you type after the
square bracket.</p></div> <div class="paragraph"><p>Collectively, these pairs of navigation techniques are sometimes referred to as
“Unimpaired mode”, as they harken back to a foundational Vim plugin called
<a href="https://github.com/tpope/vim-unimpaired">vim-unimpaired</a> by a famous Vim plugin
author named Tim Pope. LazyVim doesn’t use this plugin directly, but the spirit
of the plugin lives on.</p></div> <div class="paragraph"><p>Here’s what I see if I type <code>]</code> and then pause for the menu:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-7/unimpaired-menu-dark.png" alt="unimpaired menu dark"/></div> <div class="title">Figure 26. Unimpaired Mode Menu</div></div> <div class="paragraph"><p>Not all of these are related to navigation, and one of them is only there
because I have a Lazy Extra enabled for it. We’ll cover the motion related
ones here and most of the others in later chapters.</p></div> <div class="paragraph"><p>First, the commands to work with <code>(</code>, <code>&lt;</code>, and <code>{</code> are quite a bit more nuanced
than they look. They <strong>don’t</strong> blindly jump to the <em>next</em> (if you started
with <code>]</code>) or <em>previous</em> (if you used <code>[</code>) parenthesis, angle bracket, or curly
bracket. If you wanted to do that, you could just use <code>f(</code> or <code>F(</code>.</p></div> <div class="paragraph"><p>Instead, they will jump to the next <strong>unmatched</strong> parenthesis, angle bracket, or
curly bracket. That effectively means that keystrokes such as <code>[(</code> or <code>]}</code> mean
“jump out”. So if you are in the middle of a block of code surrounded by <code>{}</code>
you can easily jump to the end of that block using <code>]}</code> or to the beginning of
it using <code>[{</code>, no matter how many other curly-bracket delimited code blocks
exist inside that object. This is useful in a wide variety of programming
contexts, so invest some time to get used to it.</p></div> <div class="paragraph"><p>As a shortcut, you can also use <code>[%</code> and <code>]%</code> where the <code>%</code> key is basically a
placeholder for “whatever is bracketing me.” They will jump to the beginning or
end of whichever parenthesis, curly bracket, angle bracket, or square bracket
you are currently in.</p></div> <div class="paragraph"><p>That last one (square bracket), is important, because unlike the others, <code>[[</code>
and <code>]]</code> do <em>not</em> jump out of square brackets, so using <code>[%</code> and <code>]%</code> is your
only option if you need to jump out of them.</p></div> <div class="sect3"><h4 id="_jump_by_reference"><a class="link" href="#_jump_by_reference">7.1.1. Jump by Reference</a></h4> <div class="paragraph"><p>Instead of jumping out of square brackets as you might expect, the easy to
type <code>[[</code> and <code>]]</code> are reserved for a more common operation: jumping to other
references to the variable under the cursor (in the same file).</p></div> <div class="paragraph"><p>This feature typically uses the language server for the current language,
so it is usually smarter than a blind search. Only actual uses of that function
or variable are jumped to instead of instances of that word in the middle of
other variables, types, or comments as would happen with a search operation.</p></div> <div class="paragraph"><p>As you move your cursor, LazyVim will automatically highlight other variable
instances in the file so you can easily see where <code>]]</code> or <code>[[</code> will move the
cursor to.</p></div></div> <div class="sect3"><h4 id="_jump_by_language_features"><a class="link" href="#_jump_by_language_features">7.1.2. Jump by Language Features</a></h4> <div class="paragraph"><p>The <code>[c</code>, <code>]c</code>, <code>[f</code>, <code>]f</code>, <code>[m</code>, and <code>]m</code> keybindings allow you to navigate
around a source code file by jumping to the previous or next class/type
definition, function definition, or method definition. The usefulness of these
features depends a bit on both the language you are using and the way the
Language Service for the language is configured, but it works well in common
languages.</p></div> <div class="paragraph"><p>By default, those keybindings all jump to the <em>start</em> of the previous or next
class/function/method. If you instead want to jump to the <em>end</em>, just add a
<code>Shift</code> keypress: <code>[C</code>, <code>]C</code>, <code>[F</code>, <code>]f</code>, <code>[M</code>, and <code>]M</code> will get you there.</p></div> <div class="paragraph"><p>Note that these are <em>not</em> the same as “jump out” behaviour: if you have a
nested or anonymous function or callback defined inside the function you are
currently editing, the <code>]F</code> keybinding will jump to the end of the nested function,
not to the end of the function after the one you are currently in.</p></div> <div class="paragraph"><p>I personally don’t use these keybindings very much as there are other ways to
navigate symbols in a document that we will discuss later. But if you are
editing a large function and you want to quickly jump to the next function in
the file, <code>]f</code> is probably going to get you there faster than using <code>j</code> with a
count you need to calculate, or even a <code>Control-d</code> followed by <code>S</code> to go to seek
mode.</p></div></div> <div class="sect3"><h4 id="_jump_to_end_of_indention"><a class="link" href="#_jump_to_end_of_indention">7.1.3. Jump to End of Indention</a></h4> <div class="paragraph"><p>If you are working with indentation-based code such as Python or deeply nested
tag-based markup such as HTML and JSX, you may find the mini.indentscope extra
helpful. You can install it by visiting <code>:LazyExtras</code> and searching for
<code>indentscope</code>.</p></div> <div class="paragraph"><p>This plugin provides the <code>[i</code> and <code>]i</code> pairs.</p></div> <div class="paragraph"><p>LazyVim is configured with a plugin called <code>indent-blankline</code> which helps you
visualize the levels of indentation in a file. Here’s an example from a Svelte
component I was working on recently:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-7/indent-guides-dark.png" alt="indent guides dark"/></div> <div class="title">Figure 27. Indent Guides</div></div> <div class="paragraph"><p>This Svelte code uses two spaces for indentation. Each level of indentation has
a (in my theme) grey vertical line to help visualize where that indentation
level begins and ends, and the “current” indentation level is highlighted in
a different colour.</p></div> <div class="paragraph"><p>If I enable the mini.indentscope plugin, these lines get a pretty animation
when I move the cursor. More importantly, it adds the unimpaired commands <code>[i</code>
or <code>]i</code> to jump out of the current indentation level; it will go either to the
top or the bottom of whichever line is currently highlighted.</p></div> <div class="paragraph"><p>I use this functionality all the time when editing Python code and Svelte
components. I use it less often in other languages where <code>[%</code> and <code>]%</code> tend to
get me closer to where I need to go next. But the visual feedback of indent
guides can be super helpful, even in bracket-heavy languages; I may be surprised
by which curly bracket I will “jump out” to, but the indent guides are always
obvious.</p></div></div> <div class="sect3"><h4 id="_jumping_to_diagnostics"><a class="link" href="#_jumping_to_diagnostics">7.1.4. Jumping to Diagnostics</a></h4> <div class="paragraph"><p>I don’t know about you, but when I write code, I tend to introduce a lot of
errors in it. Depending on the language, LazyVim is either preconfigured or can
be configured to give me plenty of feedback about those errors, usually in the
form of a squiggly underline</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">If you aren’t seeing squiggly underlines, go back to Chapter 1 and pick a
better terminal.</td></tr></tbody></table></div> <div class="paragraph"><p>These squiggly underlines are usually created by integration with compilers,
type checkers, linters, and even spell checkers, depending on the language.
Some of them are errors, some are warnings, some are hints. Some are just
distractions, but most of them are opportunities to improve your code.</p></div> <div class="paragraph"><p>Because I am so incredibly talented at introducing problems in my code, a
common navigation task I need to perform is “jump to the next squiggly line”.
Collectively, these are referred to as <strong>d</strong>iagnostics, so the key combinations
are <code>[d</code> and <code>]d</code>. If you only want to focus on errors and ignore hints and
warnings, you can use <code>[e</code> and <code>]e</code>. Analogously, the <code>[w</code> and <code>]w</code> keybindings
navigate between only warnings.</p></div> <div class="paragraph"><p>If you are editing a file in a language that enables spellcheck, or you have
enabled it explicitly with <code>&lt;Space&gt;us</code>, misspellings can be jumped to with <code>[s</code> and
<code>]s</code>. This tripped me up when I started this book because I expected the <code>]d</code>
to take me to the squiggly underlines under misspelled words, but it doesn’t. I
need <code>]s</code> instead.</p></div> <div class="paragraph"><p>Finally, if you use <code>TODO</code> or <code>FIXME</code> comments in your code, you can jump
between them using <code>[t</code> and <code>]t</code>.</p></div> <div class="paragraph"><p>Note that unlike most of the previous <code>]</code> and <code>[</code> keybindings, it is not
possible to combine diagnostic jumps with a verb. So <code>d[d</code> will <strong>not</strong> delete
from the current location to the nearest diagnostic. This is (probably)
just an oversight in how LazyVim defines the keybindings.</p></div></div> <div class="sect3"><h4 id="_jumping_to_git_revisions"><a class="link" href="#_jumping_to_git_revisions">7.1.5. Jumping to Git Revisions</a></h4> <div class="paragraph"><p>This is actually my favourite of the square bracket pairs: <code>[h</code> and <code>]h</code> allow
you to jump to the next git “hunk”. If you aren’t familiar with the word (or if
you’re from a generation that thinks it means a gorgeous man), a “git hunk” just
refers to a section of a file that contains modifications that haven’t been
staged or committed yet.</p></div> <div class="paragraph"><p>A lot of my editing work involves editing a large file in just three or four
places. For example, I might add an import at the top of the file, an argument to
a function call somewhere else in the file, and change the function that
receives that argument in a third place. Once I’ve started editing, I may have
to jump back and forth between those locations. <code>]h</code> and <code>[h</code> are <em>perfect</em> for
this, and I don’t need to remember my jump history or add named marks
(essentially bookmarks) to do it.</p></div> <div class="paragraph"><p>Even better, LazyVim gives you a simple visual indicator as to which lines in
the file have been modified, so you have an idea where it’s going to jump. Have
a look at this screenshot:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-7/git-hunks-dark.png" alt="git hunks dark"/></div> <div class="title">Figure 28. Git Hunk Indicators</div></div> <div class="paragraph"><p>On the left side, to the right of the line numbers, you can see a green
vertical bar where I inserted two lines, an orange bar where I changed a line,
and a small red arrow indicating that I deleted a line. (As a bonus, it also
shows a diagnostic squiggly and a red x-in-circle to the left of the line
numbers on the line where my modification introduced the error). If I place my
cursor at the top of the file and type <code>]h</code> three times, I will jump between
those three places.</p></div> <div class="paragraph"><p>Like diagnostics, <code>[h</code> and <code>]h</code> cannot be combined with a verb.</p></div></div></div> <div class="sect2"><h3 id="_text_objects"><a class="link" href="#_text_objects">7.2. Text Objects</a></h3> <div class="paragraph"><p>Combining verbs with motions is very useful, but it is often more helpful
to combine those same verbs with <em>objects</em> instead of motions. Vim comes with
several common objects, such as words, sentences and the contents of
parenthesis. LazyVim adds a ridiculous pile of other text objects.</p></div> <div class="paragraph"><p>The grammar for objects is <code>&lt;verb&gt;&lt;context&gt;&lt;object&gt;</code>. The verbs are the same
verbs you have already learned for working with motions, so they can be <code>d</code>,
<code>c</code>, <code>gU</code>, etc.</p></div> <div class="paragraph"><p>The context is always either <code>a</code> or <code>i</code>. As you know, these are two commands to
enter Insert mode from Normal mode. But if you have already typed a verb such
as <code>d</code> or <code>c</code>, you are technically not in Normal mode anymore!</p></div> <div class="paragraph"><p>You are in the so-called “Operator Pending Mode”. The navigation keystrokes you
are familiar with are generally also allowed in Operator-Pending mode, which is
the real reason you can perform a motion after a verb. But if a plugin
maintainer neglects to define the operator-pending keymaps, you end up with
situations where you can navigate but not perform a verb.</p></div> <div class="paragraph"><p>It doesn’t make sense to switch to Insert mode after an operator, so the <code>a</code>
and <code>i</code> keystrokes mean completely different things. Typically, you can think
of them as <code>around</code> and <code>inside</code> (though in my head I always just pronounce
them as “a” and “in”). The difference is that <code>a</code> operations tend to select
everything that <code>inside</code> selects <strong>plus</strong> a bit of surrounding context that
depends on the object that is defined.</p></div> <div class="paragraph"><p>For example, one common object is the parenthesis: <code>(</code>. If you type the command
<code>di(</code>, you will delete all the text inside a matched pair of parenthesis.
But if you instead type <code>da(</code>, you will delete all the text inside the parenthesis
as well as the <code>(</code> and <code>)</code> at each end.</p></div> <div class="paragraph"><p>To see a list of many possible text objects in LazyVim, type <code>da</code> and pause. Here’s
what I see:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-7/operator-pending-dark.png" alt="operator pending dark"/></div> <div class="title">Figure 29. Operator Pending Menu</div></div> <div class="paragraph"><p>Let’s cover most of these in detail next.</p></div> <div class="sect3"><h4 id="_textual_objects"><a class="link" href="#_textual_objects">7.2.1. Textual Objects</a></h4> <div class="paragraph"><p>The operators <code>w</code>, <code>s</code>, and <code>p</code> are used to perform an operation on an entire
word, sentence, or paragraph, as defined previously: word is contiguous
non-punctuation, sentence is anything that ends in a <code>.</code>, <code>?</code>, or <code>!</code>, and
paragraph is anything separated by two newlines.</p></div> <div class="paragraph"><p>The difference between <code>around</code> and <code>inside</code> contexts with these objects
is whether or not the surrounding whitespace is also affected.</p></div> <div class="paragraph"><p>For example, consider the following snippet of text and imagine my cursor
is currently at the <code>|</code> character in the middle of the word <code>handful</code> in
the second sentence:</p></div> <div class="listingblock"><div class="title">Listing 18. A Plain Text Paragraph</div> <div class="content"><pre class="pygments highlight"><code data-lang="plain"><span></span>This snippet contains a bunch of words. There are a hand|ful of
sentences.

And two paragraphs.</code></pre></div></div> <div class="paragraph"><p>If I want to delete the word <code>handful</code> while I’m at that location, I <em>could</em> type
<code>bde</code> to jump to the back of the word, then delete to the end of the word.
Or I can use the <code>inside word</code> text object and type <code>diw</code>.</p></div> <div class="paragraph"><p>Either way, I end up with an extra space between <code>a</code> and <code>of</code> because <code>diw</code> is
<code>inside</code> the word and doesn’t touch surrounding whitespace.</p></div> <div class="paragraph"><p>If I instead type <code>daw</code>, it will delete the word and <em>one</em> surrounding space
character, so everything lines up correctly afterward with a single space
between <code>a</code> and <code>of</code>.</p></div> <div class="paragraph"><p>There is also a <code>W</code> (capitalized) operator that has a similar meaning to the
captial <code>W</code> when navigating by words: it will delete everything between two
whitespaces instead of interpreting punctuation as a word boundary.</p></div> <div class="paragraph"><p>Similarly, I can use <code>dis</code> and <code>das</code> from that same cursor position to delete
the entire “There are a handful of sentences.” sentence. The former won’t touch
any of the whitespace before <code>The</code> or after the <code>.</code>, while the latter will sync
up the whitespace correctly.</p></div> <div class="paragraph"><p>Finally, I can delete the entire paragraph with <code>dip</code> or <code>dap</code>. The difference
is that in the former case, the blank line after the paragraph being deleted
will still be there, but in <code>around</code> mode, it will remove the extra blank.</p></div> <div class="paragraph"><p>Typically, I use <code>i</code> when I am changing a word, sentence or paragraph, with a
<code>c</code> verb, since I want to replace it with something else that will need to have
surrounding whitespace. But I use <code>a</code> when I am deleting the textual object
with <code>d</code> because I don’t intend to replace it, so I want the whitespace to
behave as if that object never existed.</p></div></div> <div class="sect3"><h4 id="_quotes_and_brackets"><a class="link" href="#_quotes_and_brackets">7.2.2. Quotes and Brackets</a></h4> <div class="paragraph"><p>The objects <code>&quot;</code>, <code>&#39;</code>, and <code>\`</code> operate on a string of text surrounded with
double quotes, single quotes, or backticks. If you use the command <code>ci&quot;</code>, you
will end up with your cursor in Insert mode between two quotation marks, where
everything inside the string was removed. If you use <code>da&quot;</code>, however, it will
delete the quotation marks as well.</p></div> <div class="paragraph"><p>As a shortcut, you can use the letter <code>q</code> as a text object and LazyVim will
figure out what the nearest quotation mark is, whether single, double, or
backtick, and delete that object. I don’t use this, personally, but I guess it
would save a keypress on double quotes.</p></div> <div class="paragraph"><p>Similarly if you want to apply a verb to an entire block contained in
parentheses or curly, angle, or square brackets, you just have to type one of
those bracketing characters. Consider, these examples: <code>di[</code>, <code>da(</code>, <code>ci{</code> or
<code>ca&lt;</code>. As with quotes, the <code>i</code> versions will leave the surrounding brackets
intact, and the <code>a</code> version will delete the whole thing.</p></div> <div class="paragraph"><p>The shortcut to select whatever the nearest enclosing bracket or parenthesis
type is is the <code>b</code> object. (Mnemonic is “<strong>b</strong>racket”).</p></div> <div class="paragraph"><p>These actually work with counts so you can delete the “third surrounding curly
brackets” instead of the “nearest surrounding curly brackets” if you want to. I
can never remember where to put the count, though! If your memory is better than
mine, the syntax is to place the count <strong>before</strong> the <code>a</code> or <code>i</code>. So for example,
<code>d2a{</code> will delete everything inside the second-nearest set of curly brackets.
I’m not sure if that makes sense, so here’s a visual:</p></div> <div class="listingblock"><div class="title">Listing 19. An Odd Little Class</div> <div class="content"><pre class="pygments highlight"><code data-lang="javascript"><span></span><span class="tok-kd">class</span><span class="tok-w"> </span><span class="tok-nx">Foo</span><span class="tok-w"> </span><span class="tok-p">{</span>
<span class="tok-w">    </span><span class="tok-kd">function</span><span class="tok-w"> </span><span class="tok-nx">bar</span><span class="tok-p">()</span><span class="tok-w"> </span><span class="tok-p">{</span>
<span class="tok-w">       </span><span class="tok-kd">let</span><span class="tok-w"> </span><span class="tok-nx">obj</span><span class="tok-w"> </span><span class="tok-o">=</span><span class="tok-w"> </span><span class="tok-p">{</span><span class="tok-nx">fizz</span><span class="tok-o">:</span><span class="tok-w"> </span><span class="tok-s1">&#39;buzz&#39;</span><span class="tok-p">}</span>
<span class="tok-w">    </span><span class="tok-p">}</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>If my cursor is on the colon between <code>fizz</code> and <code>&#39;buzz&#39;</code> then you can expect
the following effects:</p></div> <div class="ulist"><ul><li><p><code>di{</code> will delete <code>fizz: &#39;buzz&#39;</code> but leave the surrounding curly brackets.</p></li> <li><p><code>c2i{</code> will remove the entire <code>let obj =</code> line and leave my cursor in Insert
mode inside the curly brackets defining the function body.</p></li> <li><p><code>c2a{</code> will do the same thing, but <em>also</em> remove those curly brackets, so I’m
left with a <code>function bar()</code> that has no body.</p></li> <li><p><code>d3i{</code> will remove the entire function and leave me with an empty <code>Foo</code> class.</p></li></ul></div> <div class="paragraph"><p>You can also delete things between certain pieces of punctuation. For example,
<code>ci*</code> and <code>ca_</code> are useful for replacing the contents of text marked as bold
or italic in Markdown files.</p></div> <div class="paragraph"><p>If you want to operate on the entire buffer, use the <code>ag</code> or <code>ig</code> text object.
So <code>cag</code> is the quickest way to scrap everything and start over and <code>yig</code> will
copy the buffer so you can paste it into a pastebin or chatbot. The <code>g</code>
may seem like an odd choice, but it has a symmetry to the fact that <code>gg</code> and
<code>G</code> jump to the beginning or end of the file. If you need a mnemonic,
think of <code>yig</code> as “yank in <strong>g</strong>lobal”.</p></div></div> <div class="sect3"><h4 id="_language_features"><a class="link" href="#_language_features">7.2.3. Language Features</a></h4> <div class="paragraph"><p>LazyVim adds some helpful operators to perform a command on an entire function
or class definition, objects, and (in HTML and JSX), tags. These are summarized
below:</p></div> <div class="ulist"><ul><li><p><code>c</code>: Act on <strong>c</strong>lass or type</p></li> <li><p><code>f</code>: Act on <strong>f</strong>unction or method</p></li> <li><p><code>o</code> Act on an “<strong>o</strong>bject” (the mnemonic is a stretch) such as blocks, loops, or
conditionals</p></li> <li><p><code>t</code> Act on an HTML-like <strong>t</strong>ag (works with JSX)</p></li> <li><p><code>i</code> Act on a “scope”, which is essentially an <strong>i</strong>ndentation level (only
available if the aforementioned mini.indentscope extra is installed)</p></li></ul></div></div> <div class="sect3"><h4 id="_git_hunks"><a class="link" href="#_git_hunks">7.2.4. Git Hunks</a></h4> <div class="paragraph"><p>Remember the git hunks we discussed with Unimpaired mode? You can similarly act
on an entire hunk with the <code>h</code> object. So one way to quickly revert an addition
is to just type <code>dih</code>. But you probably won’t do this much as there are better
ways to deal with git, as we will discuss in Chapter 15.</p></div></div> <div class="sect3"><h4 id="_next_and_last_text_object"><a class="link" href="#_next_and_last_text_object">7.2.5. Next and Last Text Object</a></h4> <div class="paragraph"><p>The text object feature is great if you are already inside the object you want
to operate on, but LazyVim is configured (using a plugin called mini.ai) so
that you can even operate on objects that are only <em>near</em> your cursor position.</p></div> <div class="paragraph"><p>Once installed, the next and last text objects can be accessed by
prefixing the object you want to access with a <code>l</code> or <code>n</code>.</p></div> <div class="paragraph"><p>Consider the <code>Foo.bar</code> Javascript class again:</p></div> <div class="listingblock"><div class="title">Listing 20. That Odd Class Again</div> <div class="content"><pre class="pygments highlight"><code data-lang="javascript"><span></span><span class="tok-kd">class</span><span class="tok-w"> </span><span class="tok-nx">Foo</span><span class="tok-w"> </span><span class="tok-p">{</span>
<span class="tok-w">    </span><span class="tok-kd">function</span><span class="tok-w"> </span><span class="tok-nx">bar</span><span class="tok-p">()</span><span class="tok-w"> </span><span class="tok-p">{</span>
<span class="tok-w">       </span><span class="tok-kd">let</span><span class="tok-w"> </span><span class="tok-nx">obj</span><span class="tok-w"> </span><span class="tok-o">=</span><span class="tok-w"> </span><span class="tok-p">{</span><span class="tok-nx">fizz</span><span class="tok-o">:</span><span class="tok-w"> </span><span class="tok-s1">&#39;buzz&#39;</span><span class="tok-p">}</span>
<span class="tok-w">    </span><span class="tok-p">}</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>If my cursor is on the <code>{</code> of the <code>function bar</code> line, I can type <code>cin{</code> to delete
the contents of the <code>fizz: &#39;buzz&#39;</code> object and place my cursor there in insert
mode. I can save myself an entire navigation with just one extra <code>n</code> keystroke.
I think this is a really neat feature, but I tend to forget it exists…​
hopefully writing about it here will help me remember!</p></div></div></div> <div class="sect2"><h3 id="_seeking_surrounding_objects"><a class="link" href="#_seeking_surrounding_objects">7.3. Seeking Surrounding Objects</a></h3> <div class="paragraph"><p>The flash.nvim plugin that gave us <code>Seek</code> mode, has another trick up its
sleeve: the holy grail of text objects. After specifying a verb, you can use
the <code>S</code> key (there is no <code>i</code> or <code>a</code> required) to be presented with a bunch of
paired labels around the primary code objects surrounding your cursor.</p></div> <div class="paragraph"><p>As an example, I’m going to lean on that <code>Foo</code> class again. I have placed
my cursor on the <code>:</code> and typed <code>cS</code>. The plugin identifies the various objects
surrounding my cursor and places labels at both ends of each object:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-7/seek-object-dark.png" alt="seek object dark"/></div> <div class="title">Figure 30. Seek Surrounding Object</div></div> <div class="paragraph"><p>The labels in this image are in green, and (typically) go in alphabetical order
from “innermost” to “outermost”. The primary difference from Seek mode is that
each label comes in pairs; there are two <code>a</code> labels, two <code>b</code> labels, and so on.
The text object is whatever is between those labels.</p></div> <div class="paragraph"><p>If the next character I press is <code>a</code> (or enter, to accept the default), then I
will change everything inside the curly brackets defining the <code>obj</code>. If I press
<code>b</code>, it will also replace those curly brackets. Pressing <code>c</code> will change the
entire assignment and <code>d</code> will change the contents of the function. Hitting <code>e</code>
replaces the curly brackets as well, and <code>f</code> changes the full function
definition. The <code>g</code> label is the contents of the class, while <code>h</code> changes the
entire class.</p></div> <div class="paragraph"><p>This is a super useful tool when you need to change, delete, or copy a complex
structure that does not immediately map to any of the other objects.</p></div> <div class="sect3"><h4 id="_seeking_surrounding_objects_remotely"><a class="link" href="#_seeking_surrounding_objects_remotely">7.3.1. Seeking Surrounding Objects Remotely</a></h4> <div class="paragraph"><p>The <code>S</code> Operator-pending mode is useful for acting on objects that surround the
cursor, but if your cursor isn’t currently within the object you want to
select, it won’t suffice. You could use <code>s</code> to navigate to inside the object
followed by <code>S</code> to select it, but you can save yourself a few keystrokes by
instead using the <code>R</code> operator.</p></div> <div class="paragraph"><p>With a mnemonic of “<strong>R</strong>emote”, <code>R</code> is easy to use, but hard to explain. It is
an operator-pending operation, so you need to type a verb first, followed by
<code>R</code> (as with <code>S</code> , there is no <code>i</code> or <code>a</code> required).</p></div> <div class="paragraph"><p>At this point, LazyVim is essentially in Seek mode, so you can type a few
characters from a search string to find matches anywhere on the screen.
However, instead of showing a single label at any matches for the string you
searched for, flash.nvim will automatically switch to surrounding object
mode, and show pairs of labels of all constructs that surround the matching
locations.</p></div> <div class="paragraph"><p>To put the icing on the cake, you can also perform a remote seek on any kind of
object without using the surround mode. In this case, you would type a verb
followed by a lowercase <code>r</code> (it still means “<strong>r</strong>emote”). This will also put
you in Seek mode, and you can start typing the matching characters. Single
(normal Seek mode, rather than Surround Seek mode) labels will pop up, and you
can enter a character to temporarily move your cursor to that label, just like
normal Seek mode. But when your cursor arrives there, it is automatically
placed in Operator-pending mode again. So you can now type any other operator
such as <code>aw</code> or <code>i(</code>. Once the operation completes, your cursor will move back
to where it was before you entered the remote Seek mode.</p></div> <div class="paragraph"><p>As a specific example, the command <code>drAth2w</code> will delete two words starting at
the word “At” that gets the label <code>h</code>, then jump your cursor back to the
position it was at before you started the delete. In other words, it is the
same as the command <code>sAthd2w&lt;Control-o&gt;</code>, which will seek to the word “At” at
label h, then delete two words, and use <code>Control-o</code> to jump back to your
previous history location. The remote command is a little shorter, but it’s
another one that I tend to forget to use. My brain goes into “move the cursor”
mode before it figures out “delete” mode, so by the time I realize I could have
done it remotely, it’s too late.</p></div></div></div> <div class="sect2"><h3 id="_operating_on_surrounding_pairs"><a class="link" href="#_operating_on_surrounding_pairs">7.4. Operating on Surrounding Pairs</a></h3> <div class="paragraph"><p>We’ve already seen the text objects to operate on the <em>contents</em> of pairs of
quotation marks or brackets, but what if you want to keep the content but
change the surrounding pair?</p></div> <div class="paragraph"><p>Maybe you want to change a double quoted string such as <code>&quot;hello world&quot;</code> to a
single quoted <code>&#39;hello world&#39;</code>. Or maybe you are changing a
<code>obj.get(some_variable)</code> method lookup to a <code>obj[some_variable]</code> index lookup,
and need to change the surrounding parentheses to square brackets.</p></div> <div class="paragraph"><p>LazyVim ships with the mini.surround plugin for this kind of behaviour, but
it’s not installed by default. It is a recommended extra, so if you followed my
suggestion to enable all the recommended plugins, you may have it already.</p></div> <div class="sect3"><h4 id="_add_surrounding_pair"><a class="link" href="#_add_surrounding_pair">7.4.1. Add Surrounding Pair</a></h4> <div class="paragraph"><p>The default verb for adding a surrounding pair is <code>gsa</code>. That will place your
editor in operator-pending mode, and you now have to type the motion or text
object to cover the text you want to surround with something. Once you have
finished inputting that object, you need to type the character you want to
surround it with, such as <code>&quot;</code> or <code>(</code> or <code>)</code>. The difference between the latter
two is that, while both will surround the text with parentheses, the <code>(</code> will
also put extra spaces <em>inside</em> the parentheses.</p></div> <div class="paragraph"><p>That may sound complicated, but it should make sense after you see some
examples:</p></div> <div class="ulist"><ul><li><p><code>gsai[(</code> will select the contents of a set of square brackets (using <code>i[</code>)
and place parentheses separated by spaces inside the square brackets. So if you
start with <code>[foo bar]</code> and type <code>gsai[(</code>, you will end up with <code>[( foo bar )]</code>.</p></li> <li><p><code>gsai[)</code> does the same thing, except there are no spaces added, so the same
<code>[foo bar]</code> will become <code>[(foo bar)]</code>.</p></li> <li><p><code>gsaa[)</code> will place the parentheses <em>outside</em> the square brackets, because
you selected with <code>a[</code> instead of <code>i[</code>. So this time, our example becomes
<code>([foo bar])</code>.</p></li> <li><p><code>gsa$&quot;</code> will surround all the text between the current cursor position and
the end of the line with double quotation marks.</p></li> <li><p><code>gsaSb&#39;</code> will surround the text object that you select with the label <code>b</code>
after an <code>S</code> operation with single quotation marks.</p></li> <li><p><code>gsaraa3e*</code> will surround the remote object that starts with <code>a</code> that is
labelled with an <code>a</code> followed by the next three words with an asterisk at each
end of the three words.</p></li></ul></div> <div class="paragraph"><p>Depending on the context it can be a lot of characters to type, but it’s
typically fewer characters than navigating to and changing each end of the pair
independently.</p></div></div> <div class="sect3"><h4 id="_delete_surrounding_pair"><a class="link" href="#_delete_surrounding_pair">7.4.2. Delete Surrounding Pair</a></h4> <div class="paragraph"><p>Deleting a pair is a little easier, as you don’t need to specify a text object.
Just use <code>gsd</code> followed by the indicator of whichever pair you want to remove.</p></div> <div class="paragraph"><p>So if you want to delete the <code>[]</code> surrounding the cursor, you can use <code>gsd[</code>.</p></div> <div class="paragraph"><p>If you want to delete deeply nested elements, you need to put a count
<em>before</em> the <code>gsd</code> verb. So use <code>2gsd{</code> to delete the second set of curly braces
outside your current cursor position. For example, if your cursor is
inside the <code>def</code> of the string <code>{abc {def}}</code>, typing <code>2gsd{</code> results in <code>abc
{def}</code>, leaving the “inner” curly braces around <code>def</code>, but removing the second
outer set around the whole.</p></div></div> <div class="sect3"><h4 id="_replace_surrounding_pair"><a class="link" href="#_replace_surrounding_pair">7.4.3. Replace Surrounding Pair</a></h4> <div class="paragraph"><p>Replacing is similar to deleting, except the verb is <code>gsr</code> and you need to type
the character you want to replace the existing character with <em>after</em> you type
the existing character.</p></div> <div class="paragraph"><p>So if you have the text <code>&quot;hello world&quot;</code> and your cursor is inside it, you can use
<code>gsr&quot;&#39;</code> to change the double quotes to single quotes: <code>&#39;hello world&#39;</code>.</p></div></div> <div class="sect3"><h4 id="_navigate_surrounding_characters"><a class="link" href="#_navigate_surrounding_characters">7.4.4. Navigate Surrounding Characters</a></h4> <div class="paragraph"><p>Performing operations on surrounding pairs or on the entire contents of the
pair is convenient, but sometimes you just want to move your cursor to the
beginning or end of the pair. You can often do this using Seek mode, Find mode,
or the Unimpaired mode commands such as <code>[(</code>, but there are other commands that
are more syntax aware if you need them.</p></div> <div class="paragraph"><p>The easiest one has been built into Vim for a long time. If your cursor is
currently on the beginning or ending character of a parenthesis, bracket, or
curly brace pair, just hit <code>%</code> to jump to its mate at the other end of the
parenthetical. If you use <code>%</code> in Normal mode when you aren’t on a pair, it will
jump to the nearest enclosing pair-like object. This only works with
brackets, though, so arbitrary pairs including quotes are not supported.</p></div> <div class="paragraph"><p>The mini.pairs plugin comes with <code>gsf</code> and <code>gsF</code> keybindings, which can be
used to move your cursor to the character in question. I don’t use these,
because the mini.ai plugin provides a similar feature using the <code>g[</code> and <code>g]</code>
shortcuts. These shortcuts both need to be followed by a character type, so
e.g. <code>g[(</code> will jump back to the nearest surrounding open parenthesis, and
<code>g]]</code> will jump to the nearest closing square bracket. If you give it a count,
it will jump out of that many surrounding pairs.</p></div></div> <div class="sect3"><h4 id="_highlighting_surrounding_characters"><a class="link" href="#_highlighting_surrounding_characters">7.4.5. Highlighting Surrounding Characters</a></h4> <div class="paragraph"><p>If you just need to double check where the surrounding characters are, you can
use something like <code>gsh(</code>, where <code>h</code> would mean “<strong>h</strong>ighlight”. This can
sometimes be used as a dry run for a delete or replace operation that is using
counts so you can double check that you are operating on the pairs you think
you are.</p></div></div> <div class="sect3"><h4 id="_bonus_xml_or_html_tags"><a class="link" href="#_bonus_xml_or_html_tags">7.4.6. Bonus: XML or HTML Tags</a></h4> <div class="paragraph"><p>The mini.surround plugin is mostly for working with pairs of <em>characters</em>, but
it can also operate on html-like tags.</p></div> <div class="paragraph"><p>Say you have a block of text and you want to surround it with <code>p</code> tags. String
together the command <code>gsaapt</code>. That is <code>gsa</code> for “add surrounding” followed
by <code>ap</code> for “around paragraph”. So we’re going to add something around a
paragraph. Instead of a quote or bracket, we say the thing we are going to add
is a <code>t</code> for <strong>t</strong>ag.</p></div> <div class="paragraph"><p>mini.surround will understand that you want to add a tag, and pop up
a little prompt window to enter the tag you want to add. Type the <code>p</code>
for the tag you want to create. You don’t need angle brackets; just the
tag name:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-7/surround-tag-dark.png" alt="surround tag dark"/></div> <div class="title">Figure 31. Surround With Tag</div></div> <div class="paragraph"><p>If the tag you want to add has attributes, you can add them to the prompt.
mini.surround is smart enough to know that the attributes only
go on the opening tag.</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-7/surround-tag-attrs-dark.png" alt="surround tag attrs dark"/></div> <div class="title">Figure 32. Suround Tag Attributes</div></div></div> <div class="sect3"><h4 id="_modifying_the_keybindings"><a class="link" href="#_modifying_the_keybindings">7.4.7. Modifying the Keybindings</a></h4> <div class="paragraph"><p>I love the mini.surround behaviour. I use it a lot. So much that I quickly got
tired of typing <code>gs</code> repeatedly. I decided to replace the <code>gs</code> with a <code>;</code> so I
can instead type <code>;d</code> or <code>;r</code> instead of <code>gsd</code> or <code>gsr</code>. For adding surrounds,
I decided to leverage the fact that double keypresses are easy to type, so I
used <code>;;</code> for that action instead of <code>gsa</code> or even <code>;a</code>.</p></div> <div class="paragraph"><p>In order for this to work correctly, I also had to modify the flash.nvim
configuration to remove the <code>;</code> command. (By default the <code>;</code> key can be used as
a “find next” behaviour for the <code>f</code> and <code>t</code> keys, but the way flash is
designed, you don’t need a separate key for it; just press <code>f</code> or <code>t</code> again).</p></div> <div class="paragraph"><p>If you want to do the same thing, just create a new Lua file named whatever you
want (mine is <code>extend-mini-surround.lua</code>) inside the <code>config/plugins</code> directory.</p></div> <div class="paragraph"><p>The contents of the file will be:</p></div> <div class="listingblock"><div class="title">Listing 21. Configuring Mini.surround And Flash</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-p">{</span>
    <span class="tok-s2">&quot;echasnovski/mini.surround&quot;</span><span class="tok-p">,</span>
    <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-n">mappings</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
        <span class="tok-n">add</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;;;&quot;</span><span class="tok-p">,</span>
        <span class="tok-n">delete</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;;d&quot;</span><span class="tok-p">,</span>
        <span class="tok-n">find</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;;f&quot;</span><span class="tok-p">,</span>
        <span class="tok-n">find_left</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;;F&quot;</span><span class="tok-p">,</span>
        <span class="tok-n">highlight</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;;h&quot;</span><span class="tok-p">,</span>
        <span class="tok-n">replace</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;;r&quot;</span><span class="tok-p">,</span>
        <span class="tok-n">update_n_lines</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;;n&quot;</span><span class="tok-p">,</span>
      <span class="tok-p">},</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>

  <span class="tok-p">{</span>
    <span class="tok-s2">&quot;folke/flash.nvim&quot;</span><span class="tok-p">,</span>
    <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-n">modes</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
        <span class="tok-n">char</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
          <span class="tok-n">keys</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-s2">&quot;f&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;F&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;t&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;T&quot;</span> <span class="tok-p">},</span>
        <span class="tok-p">},</span>
      <span class="tok-p">},</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>Since we are modifying <em>two</em> plugins, I put two Lua tables inside a wrapping
Lua table, which Lazy.nvim is smart enough to parse as multiple plugin
definitions. The first passes <code>mappings</code> to the <code>opts</code> that are passed
into mini.surround. These will replace the default keybindings that LazyVim
has defined for that table (the ones that start with <code>gs</code>).</p></div> <div class="paragraph"><p>The second definition also passes a custom <code>opts</code> table. It replaces the
default keys, which include <code>;</code> and <code>,</code> with a new table that only defines <code>f</code>,
<code>F</code>, <code>t</code>, and <code>T</code>.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">If I had known that <code>;</code> was being rebound by flash.nvim, I could have
found this solution by reading the config for flash.nvim on the
<a href="https://www.lazyvim.org">LazyVim website</a> and seeing what needed to be
overwritten. However I wasn’t able to figure out where the <code>;</code> was being
defined, and ended up asking for help on the LazyVim GitHub Discussions. People
are really helpful there, and I encourage you to come say hello if you have any
questions.</td></tr></tbody></table></div></div></div> <div class="sect2"><h3 id="_summary_7"><a class="link" href="#_summary_7">7.5. Summary</a></h3> <div class="paragraph"><p>In this chapter, we learned a bunch of advanced code motion techniques that
LazyVim gives us by its reimplementation of Unimpaired mode. Then we learned
what text objects are and took in a crash course on the many, many text objects
LazyVim provides.</p></div> <div class="paragraph"><p>We then covered the exceptionally useful <code>S</code> motion, which can be used to
pick text objects on the fly, as well as the remote variations of <code>R</code> and <code>r</code>.</p></div> <div class="paragraph"><p>We wrapped up by going over several new verbs that can be used to work with
surrounding pairs of characters such as parentheses, brackets, and quotes.</p></div> <div class="paragraph"><p>In the next chapter, we’ll cover clipboard interactions and registers, as well
as an entire new Visual mode that can be used for text selection.</p></div></div></div>`;return{c(){e=r("div"),e.innerHTML=t,this.h()},l(a){e=l(a,"DIV",{class:!0,"data-svelte-h":!0}),p(e)!=="svelte-s9qt9n"&&(e.innerHTML=t),this.h()},h(){h(e,"class","sect1")},m(a,n){u(a,e,n)},p:o,i:o,o,d(a){a&&g(e)}}}class w extends d{constructor(e){super(),c(this,e,null,v,i,{})}}export{w as component,b as universal};
