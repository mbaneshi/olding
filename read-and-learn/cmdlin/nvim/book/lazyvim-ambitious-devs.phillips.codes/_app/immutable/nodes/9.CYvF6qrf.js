import{s as n,n as a}from"../chunks/scheduler.seBsrkbn.js";import{S as d,i as c,e as r,c as l,l as p,m as h,g as m,d as u}from"../chunks/index.Dwxb9V0m.js";function g(){return{title:"Chapter 13: ...and Replacing",description:"Replacing in LazyVim is its own separate chapter. We discuss how to replace in substitutions as well as the spectre plugin for global replace.",keywords:"vim, lazyvim, neovim, tutorial, course, book, searching, find and replace"}}const b=Object.freeze(Object.defineProperty({__proto__:null,load:g},Symbol.toStringTag,{value:"Module"}));function v(i){let e,o=`<h2 id="_and_replacing"><a class="link" href="#_and_replacing">Chapter 13. …​And Replacing</a></h2> <div class="sectionbody"><div class="paragraph"><p>Vim has a very powerful find and replace mechanism. It…​ takes some getting
used to. On the one hand, it’s pretty hard to go back after you’ve gotten used
to the power of Vim substitution. On the other hand, getting used to it can
take a lifetime.</p></div> <div class="paragraph"><p>Substitution predates Vim and even Vi; it goes back to the legendary <code>ed</code> by
the even more legendary Ken Thompson. He wrote the original paper on regular
expressions, (amoung <strong>many</strong> other foundational tools) so I suspect <code>ed</code> is the
first place they were used in the wild.</p></div> <div class="paragraph"><p>Substitution in <code>ed</code> was so powerful that it has somehow stuck around for over
half a century. Not only is it the primary search and replace mechanism in
modern Vim and Neovim, it is also popular when automating tasks via shell
scripting, using <code>sed</code> (the stream editor, a sequel to <code>ed</code>).</p></div> <div class="paragraph"><p>LazyVim, as usual, enhances the substitution command, mostly by showing you
live previews of your changes as you type.</p></div> <div class="paragraph"><p>Because it is an <code>ex</code> command (ex stands for “extended ed”, much like its
sibling <code>vi</code> was later rewritten as “vi improved”), you access substitution by
entering Command mode (with a <code>:</code>). You could type <code>:substitute</code>, but everybody
shortens it to <code>:s</code> because a) it works, and b) why type more than you need to?</p></div> <div class="paragraph"><p>Then, without pressing enter, type a <code>/</code>. This is just a separator to separate
the command you are issuing (<code>s</code> or <code>substitute</code>) from the term you are
searching for.</p></div> <div class="paragraph"><p>Now type the search pattern. This can be any Vim regular expression, just like
those we covered for a normal search in Chapter 12.</p></div> <div class="paragraph"><p>Here you can see that I have typed <code>:s/pattern</code> into my editor, and the <code>pattern</code>
is highlighted on the line that my cursor was on:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-13/s-pattern-dark.png" alt="s pattern dark"/></div> <div class="title">Figure 57. Substitute Pattern</div></div> <div class="paragraph"><p>Next, type another <code>/</code> to separate the <em>pattern</em> from the <em>replacement</em>, and
then type whatever string you want to replace it with. LazyVim will live update
all instances of the search term with the replacement term so you can preview
what it will look like. Here, I’m going to replace <code>pattern</code> with <code>FOOBAR</code>:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-13/s-replace-dark.png" alt="s replace dark"/></div> <div class="title">Figure 58. Substitute Replace String</div></div> <div class="paragraph"><p>Now press <code>Enter</code> to complete the command and confirm the replacement. So find
and replace is as simple as <code>:s/pattern/replacement&lt;Enter&gt;</code>. That’s not so bad,
is it?</p></div> <div class="paragraph"><p>Maybe it’s not, but we’re not done. Not remotely. For one thing, that command
will only replace the first instance of <code>pattern</code>, and only if the pattern
happens to be on the same line as the cursor.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">It is conventional to use a <code>/</code> after the substitute command, but if you
are performing a substitution on something that has a lot of <code>/</code> characters in
it (e.g a Unix path), you can use another character such as <code>+</code> for the
separator to avoid having to escape a bunch of <code>/</code> characters with <code>\\/</code>. For
example <code>:s+/home/dustyphillips/+/home/yourname/+</code> can be
used instead of <code>%s/\\/home\\/dustyphillips\\//\\/home\\/yourname\\/</code>.</td></tr></tbody></table></div> <div class="sect2"><h3 id="_substitute_ranges"><a class="link" href="#_substitute_ranges">13.1. Substitute Ranges</a></h3> <div class="paragraph"><p>Many Neovim ex commands can be preceded by a range of lines that the command
will operate on. The syntax for ranges can be a little confusing, and to this
day I still have to look it up with <code>:help range</code> if I’m doing anything
non-standard.</p></div> <div class="paragraph"><p>The simplest possible range is the <code>.</code>, which stands for “current line”. It
would look like <code>:.s/pattern/replacement</code>. The <code>.</code> between the <code>:</code> and the <code>s</code>
is the range, in this case. You normally wouldn’t bother, though because <code>.</code>
or “current line” is the default range.</p></div> <div class="paragraph"><p>Probably the second most common range you will use is <code>%</code>. It stands for
“Entire File”. If you are used to the find and replace dialog in most editors
or word processors, you probably expected it to search the “entire file” by
default. But it doesn’t, and if you want to do a find and replace across the
entire file, you would need to use <code>:%s/pattern/replacement</code> (probably with a
<code>/g</code> on the end as described in the next section).</p></div> <div class="paragraph"><p>You could also set a specific line number, such as <code>:5s/pattern/replacement</code> to
replace the word <code>pattern</code> on line 5. But I would normally use <code>5G</code> to move
my cursor to line five and then do a default range substitution instead.</p></div> <div class="paragraph"><p>The name “range” implies that you would can cover a sequence of multiple
lines, and you can indeed separate a start and end position using a comma. So,
for example, <code>:3,8s/…​</code> will perform the substitution on lines 3, 4, 5, 6, 7,
and 8 (the selection is inclusive at both ends): Here I’ve started a pattern
that is highlighting the word <code>hello</code> on lines 3 through 8, but no other lines:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-13/range-3-8-dark.png" alt="range 3 8 dark"/></div> <div class="title">Figure 59. Range 3-8 Inclusive</div></div> <div class="paragraph"><p>You can also use marks such as <code>&#39;a</code> as described in the previous chapter to
define the start or end of a range.</p></div> <div class="paragraph"><p>The most common way you’ll use this is using <code>&#39;&lt;,&#39;&gt;</code>, which specifies the range
for “the most recent visual selection”. Luckily, you won’t need to type those
characters all that often, because if you select some text using e.g. <code>Shift-V</code>
followed by a cursor movement, and then type <code>:</code>, Neovim will automatically
take care of copying that range into the command line.</p></div> <div class="paragraph"><p>This means that if you want to “perform a substitution in the current visually
selected text,” you just have to select the text and type <code>:s/…​</code>. The range
will be inserted between the colon and <code>s</code>, so you’ll get <code>:&#39;&lt;,&#39;&gt;s/…​</code>.</p></div> <div class="paragraph"><p>If your brain is up for some recursive confusion, you can even use a search
pattern to specify one end of the range! In the following example, my cursor
was on line 5 when I started the substitution:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-13/pattern-range-dark.png" alt="pattern range dark"/></div> <div class="title">Figure 60. Pattern Range</div></div> <div class="paragraph"><p>The substitution is <code>:,/hello-10/s/hello/foo</code>. All those forward slashes in
there make it pretty hard to read (looks like a Unix file path!), but it’s
actually easy to write. Let’s break it down from left to right:</p></div> <div class="ulist"><ul><li><p><code>:</code> is the Normal mode “start an ex command” trigger.</p></li> <li><p>There is nothing between the <code>:</code> and the <code>,</code> so the start of the range is the
current line (line 5 in this example).</p></li> <li><p>The first <code>/</code> is a more succinct way of saying “the end of the range is the
first line after the current cursor position that matches some
pattern”.</p></li> <li><p><code>hello-10</code> is the pattern we are searching for to define the end of the
range.</p></li> <li><p>The second <code>/</code> marks the end of the pattern. So our full range is
<code>,/hello-10/</code> and means “from the current line to the line containing
<code>hello-10</code>.”</p></li> <li><p>The <code>s</code> indicates we want to perform a substitution on the lines in that
range.</p></li> <li><p><code>/hello/foo</code> is the pattern “hello” and replacement “foo”, like any
substitution.</p></li></ul></div> <div class="paragraph"><p>There is a ton of other stuff you can do with Vim ranges, but the truth is,
most of them only exist to support outdated editing modes. You will likely find
that <code>%</code>, <code>&#39;&lt;,&#39;&gt;</code>, and <code>,/pattern/</code> cover 95% of your use cases. Read through
<code>:help range</code> once to make sure you know what other sorts of syntaxes are
available, and don’t be afraid to look them up in the rare cases where one
of the above is not sufficient.</p></div></div> <div class="sect2"><h3 id="_flags_global_and_ignore_case_substitutions"><a class="link" href="#_flags_global_and_ignore_case_substitutions">13.2. Flags (Global and Ignore Case Substitutions)</a></h3> <div class="paragraph"><p>You can add “flags” at the end of any substitution (after the last <code>/</code>) to modify
how the search and replace behaves. The most common flag you’ll use is <code>g</code> which
stands for “global”. You’ll append it more often than not.</p></div> <div class="paragraph"><p>By default, <code>substitute</code> only replaces the first instance of a pattern on the line.
So if I have a file full of the overly cheerful words <code>hello hello</code>, then the
substitution <code>:%s/hello/foo</code> will only replace the first instance on each line:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-13/non-global-substitute-dark.png" alt="non global substitute dark"/></div> <div class="title">Figure 61. Substitute Highlights (Non-Global)</div></div> <div class="paragraph"><p>But if I append <code>/g</code> it will replace all the <code>hello</code>&#39;s on each line:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-13/global-substitute-dark.png" alt="global substitute dark"/></div> <div class="title">Figure 62. Substitute Highlights (Global)</div></div> <div class="paragraph"><p>I mentioned earlier that the supremely common use case of “replace everything
in the file” is <code>:%s/pattern/replacement/g</code>. The <code>%</code> is &quot;every line&quot;, and the
<code>g</code> means “every instance in each line”.</p></div> <div class="paragraph"><p>There are almost a dozen flags, but the only other useful ones are <code>i</code>, <code>I</code>,
and (rarely) <code>c</code>. The first two explicitly ignore case or disable ignoring case
in the term being searched for, and you’ll only ever need one or the other
depending on whether you have <code>ignorecase</code> set in your <code>options.lua</code> (it
defaults to true in LazyVim). The <code>c</code> flag means confirm and is useful if you
want to make substitutions in a large file but you know you want to skip some
of them. You will be shown each proposed change and can accept or reject them
one at a time.</p></div> <div class="paragraph"><p>Flags can be combined, so <code>:%s/hello/foo/gc</code> will do a global replace,
confirming each one.</p></div></div> <div class="sect2"><h3 id="_handy_substitute_shortcuts"><a class="link" href="#_handy_substitute_shortcuts">13.3. Handy Substitute Shortcuts</a></h3> <div class="paragraph"><p>You don’t need to memorize this section, but once you get used to substituting,
you’ll probably notice that some actions are rather repetitive and monotonous
and you’d like to type them faster. Read through these tips so you remember to
look them up when you are more comfortable with <code>:substitute</code>.</p></div> <div class="paragraph"><p>If you leave the pattern part of a substitution blank, (as in
<code>:s//replacement/</code>), it will default to whatever pattern you last searched for
<em>or</em> substituted. For example, if you perform these commands in order:</p></div> <div class="ulist"><ul><li><p><code>/foo</code> will search for the word <code>foo</code></p></li> <li><p><code>:s//bar</code> will replace <code>foo</code> with <code>bar</code></p></li> <li><p><code>:s/baz/bar</code> will replace <code>baz</code> with <code>bar</code></p></li> <li><p><code>:s//fizz</code> will now replace <code>baz</code> with <code>fizz</code></p></li></ul></div> <div class="paragraph"><p>This can save a little typing when you search for a term and then decide you
want to replace it, or when you have substituted something in one file and want
to substitute it again in another.</p></div> <div class="paragraph"><p>If you just use <code>:s</code> without any pattern or replacement, it will repeat the
last pattern <strong>and</strong> replacement you did. But be aware that it will not act on the
same range, so if you want to repeat it exactly you’ll need to type the range
again.</p></div> <div class="paragraph"><p>It also won’t repeat flags, but you can (usually) append the flags directly to
<code>:s</code>. For beginners, the most common of these is <code>:%sg</code>, which maps to “repeat
the last substitution on the entire file, globally.” This is helpful when you
typed <code>:s/long-pattern/long-replacement</code> and expected it to do a
global replace, but actually it just replaces the first instance on the current
line. <code>:%sg</code> will repeat the substitution the way you intended it. You might also
reach for <code>&#39;&lt;,&#39;&gt;sg</code> to replace in the last visual selection.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">Don’t forget that you can repeat the last visual selection with <code>gv</code> to
confirm that it is actually selecting what you expected.</td></tr></tbody></table></div> <div class="paragraph"><p>If you want to reuse “whatever was matched in the pattern” in the
replacement, you can use <code>\\0</code> in the replacement string. This is particularly
useful when you are using a regular expression that could potentially match
different things.</p></div> <div class="paragraph"><p>For example, imagine I have the following file:</p></div> <div class="listingblock"><div class="title">Listing 31. An Imaginary File</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-n">hello</span> <span class="tok-n">world</span>
<span class="tok-n">Hello</span> <span class="tok-n">thrift</span> <span class="tok-n">shop</span>
<span class="tok-n">Hellish</span> <span class="tok-n">world</span></code></pre></div></div> <div class="paragraph"><p>For some reason, I want to add an adjective between the first and second words.
This can be accomplished with the command <code>:%s/[hH]ell\\S* /\\0green /</code>:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-13/replace-with-pattern-dark.png" alt="replace with pattern dark"/></div> <div class="title">Figure 63. Substitute With Pattern in Replacement</div></div> <div class="paragraph"><p>That command might be a little intimidating if you aren’t comfortable with
regular expressions, so I’ll break it down again:</p></div> <div class="ulist"><ul><li><p><code>:%</code> means “perform a command on the entire file”</p></li> <li><p><code>s/</code> means “the command to perform is substitute”</p></li> <li><p><code>[hH]</code> means “match h case insensitively (see note)”</p></li> <li><p><code>ell</code> means “match the three characters <code>ell</code> exactly”</p></li> <li><p><code>\\S</code> means “match any non-whitespace character”</p></li> <li><p><code>*</code> means “repeat the <code>\\S</code> match zero or more times”, which takes us to the
end of the word.</p></li> <li><p><code> /</code> includes a space and then the end of the search pattern</p></li> <li><p><code>\\0</code> says “insert whatever was matched by the above pattern into the
replacement”</p></li> <li><p><code>green</code> says “insert that text directly into the replacement”</p></li></ul></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content">The <code>[hH]</code> isn’t necessary if you don’t have <code>vim.opt.ignorecase=false</code>
in your <code>options.lua</code>. An alternative would be to use <code>/i</code> at the end of the
pattern to force ignoring case for this one search. Then <code>[hH]</code> could just be
<code>h</code>.</td></tr></tbody></table></div> <div class="paragraph"><p>You can even reuse <strong>part</strong> of the pattern in the replacement. To do this,
place the part you want to reuse between <code>\\(</code> and <code>\\)</code>. Then use <code>\\1</code> to represent
whatever was matched between brackets in the replacement portion.</p></div> <div class="paragraph"><p>This is easier to understand with an example. If we start with the same three
line example as above, we can use the substitution
<code>:%s/hell\\(\\S*\\)/green\\1 and blue\\1/i</code> to cause the following nonsense substitution:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-13/reuse-partial-dark.png" alt="reuse partial dark"/></div> <div class="title">Figure 64. Substitute with Partial Pattern</div></div> <div class="paragraph"><p>The <code>\\(\\S*\\)</code> matches the same thing as <code>\\S*</code> but it stores the result in a
<em>capture</em>. Then when we want to reuse the capture in the replacement, we use
<code>\\1</code> to refer <em>back</em> to whatever was captured on that match.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">You might guess from the fact that we’re using numbers here that you can have
and refer back to multiple captures, and your guess would be correct!</td></tr></tbody></table></div></div> <div class="sect2"><h3 id="_project_wide_search_and_replace"><a class="link" href="#_project_wide_search_and_replace">13.4. Project-wide Search and Replace</a></h3> <div class="paragraph"><p>LazyVim ships with a plugin called Grug-far.nvim to do a global find and
replace in all files in the project. Without grug-far, you would probably
(unenthusiastically) do this from the command line using <code>sed</code>, the
stream-oriented evolution of <code>ed</code> that I mentioned.</p></div> <div class="admonitionblock caution"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-solid:fire-flame-curved"></iconify-icon></td> <td class="content">It is a good idea to commit your files to version control before
running Grug-far. The changes it makes can be tricky to reverse. You can undo it
file-by-file, but not all in one go. So make sure <code>git reset --hard</code> won’t
cause you to lose any work that wasn’t done by Grug-far.</td></tr></tbody></table></div> <div class="paragraph"><p>Grug-far is a lightweight UI wrapping <code>ripgrep</code>, a command line tool I’ve
mentioned before. But that UI is pretty handy, as <code>ripgrep</code> has some arcane
arguments.</p></div> <div class="paragraph"><p>To show the Grug-far UI, use the keyboard shortcut <code>&lt;Space&gt;sr</code>, where the
mnemonic is r for <strong>r</strong>eplace. A window will open up on the right:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-13/grug-far-empty-dark.png" alt="grug far empty dark"/></div> <div class="title">Figure 65. Empty Grug-far Window</div></div> <div class="paragraph"><p>You can navigate around this window using all the normal Vim motions, but
you’ll mostly just need <code>j</code> and <code>k</code> to jump between fields.</p></div> <div class="paragraph"><p>The search field can accept any regular expression. Because this is using
ripgrep under the hood, it is a slightly less arcane regex syntax. The Files
Filter field is used to isolate your search to a specific path or file
extension, and accepts standard shell glob syntax.</p></div> <div class="paragraph"><p>As you fill in the form entries, Grug-far instantly previews the proposed
changes in a live-updating widget:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-13/grug-far-preview-dark.png" alt="grug far preview dark"/></div> <div class="title">Figure 66. Grug-far With Preview</div></div> <div class="paragraph"><p>After you have inserted the search and replace text, you will need to press
<code>Escape</code> to return to Normal mode. If all the results in the preview area
look acceptable, simply hit <code>\\r</code> to perform the <strong>r</strong>eplacement.</p></div> <div class="paragraph"><p>You also have the option to <em>tweak</em> the search results if some of them
don’t match your needs. Use any standard motions to navigate the preview
window. If there are matches that you don’t want to change, just use
<code>dd</code> to delete them outright. Alternatively, feel free to edit any line,
right in the preview window, to make it look the way you want.</p></div> <div class="paragraph"><p>Once you are satisfied with the preview, use <code>\\s</code> instead of <code>\\r</code> to <strong>s</strong>ync
the changes you’ve made with their original source files.</p></div> <div class="paragraph"><p>You can also jump to the source file of a preview result by placing your cursor
over it and hitting <code>Enter</code>.</p></div> <div class="paragraph"><p>Grug-far keeps track of your recent search and replace operations and allows
you to revisit them with the <code>\\t</code> keybinding. Navigate between them with
standard motions and use <code>Enter</code> to reuse one of them.</p></div> <div class="paragraph"><p>There are a few other useful keybindings in a menu you can pop up with <code>g?</code>,
which I’ll leave you to peruse at your leisure.</p></div></div> <div class="sect2"><h3 id="_perform_vim_commands_on_multiple_lines"><a class="link" href="#_perform_vim_commands_on_multiple_lines">13.5. Perform Vim Commands on Multiple Lines</a></h3> <div class="paragraph"><p>The <code>:substitute</code> command isn’t the only one that can operate on multiple lines at
once, with a range. In fact, if you just want to write a few lines out to a
separate file, you can pass a range to <code>:write</code>. The easiest way to do this is
to select the range in Visual mode and type <code>:write &lt;filename&gt;</code>. Neovim will
automatically convert it to <code>:&#39;&lt;,&#39;&gt;write</code> and only save only those lines.</p></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content"><div class="paragraph"><p>Neovim doesn’t have first class multi-cursor support (yet). Historically, Vim
coders have considered multi-cursor mode to be a crutch required by less
powerful editors that don’t have Vim’s modes. More recently, experimental
editors such as Kakoune and Helix have demonstrated that multiple cursors can
integrate very well with modal editing. Modern developers like multiple
selections, and Neovim is expected to ship with native multiple cursor support
in the future (it’s currently listed as 0.12+ on the roadmap).</p></div> <div class="paragraph"><p>In the meantime, there <em>are</em> multiple cursor plugins, but I find them to be
clumsy and fragile, and recommend avoiding them at this time. Instead, you can
use the commands discussed below or rely on other Vim tools such as repeating
recordings (with <code>q</code> <code>Q</code>, and <code>@@</code>), or Visual Block mode (<code>Control-v</code>) with an
insert or append that modifies multiple lines.</p></div></td></tr></tbody></table></div> <div class="sect3"><h4 id="_the_norm_command"><a class="link" href="#_the_norm_command">13.5.1. The Norm Command</a></h4> <div class="paragraph"><p>When you first use it, <code>:norm</code> feels pretty weird. It allows you to perform a
sequence of arbitrary Vim normal-mode commands (including navigation commands
such as <code>hjkl</code> and <code>web</code> as well as modification commands like <code>d</code>, <code>c</code>, and
<code>y</code>) across multiple lines.</p></div> <div class="paragraph"><p>You can even enter Insert mode from <code>:norm</code>! But you need to know a small
secret to get out of Insert mode because pressing <code>&lt;Escape&gt;</code> while the command
menu is visible will just close the command menu. Instead, use
<code>Control-v&lt;Escape&gt;</code>. When you are in Insert mode or Command mode, the <code>Control-v</code>
keybinding means “Insert the next keypress literally instead of interpreting it
as a command.” The terminal usually renders <code>Control-v&lt;Escape&gt;</code> as <code>^[</code>.</p></div> <div class="paragraph"><p>For example imagine we are editing the following file:</p></div> <div class="listingblock"><div class="title">Listing 32. An Imaginary File</div> <div class="content"><pre class="pygments highlight"><code data-lang="plain"><span></span>foo
Bar
fizz buzz
one two three</code></pre></div></div> <div class="paragraph"><p>For inexplicable (but pedagogical) reasons, we want to perform the following on
each and every line:</p></div> <div class="ulist"><ul><li><p>insert the word “HELLO” at the beginning of the line with a space after it</p></li> <li><p>capitalize the first letter of the first word on the line</p></li> <li><p>insert the word “BEAUTIFUL” after the first word on each line with spaces
surrounding it</p></li> <li><p>append the word “WORLD” to the end of each line with a space before it</p></li></ul></div> <div class="paragraph"><p>Start by typing <code>:%norm</code> to open a command line with a range that operates on
every line in the file (<code>%</code>) and the <code>norm</code> command followed by a space.</p></div> <div class="paragraph"><p>Then add <code>IHELLO</code> to insert the text <code>HELLO</code> at the beginning of each line in
the range. Now hit <code>Control-v</code> and then <code>Escape</code> to insert the escape character
into the command line.</p></div> <div class="paragraph"><p>Now type <code>lgUl</code> to move the cursor right (which puts it on the beginning of the
first word), then uppercase one character to the right (i.e. the first
character of the next word).</p></div> <div class="paragraph"><p>Next is <code>e</code> to jump to the end of the word, followed by <code>a BEAUTIFUL</code> to
append some text after that word. <code>Control-v</code> and <code>Escape</code> will insert another
escape character.</p></div> <div class="paragraph"><p>Finally, add <code>A WORLD</code> to enter Insert mode at the end of the line and add the
text <code>WORLD</code>.</p></div> <div class="paragraph"><p>The entire command would therefore be:</p></div> <div class="listingblock"><div class="title">Listing 33. Norm Command</div> <div class="content"><pre class="pygments highlight"><code data-lang="plain"><span></span>:%norm IHELLO &lt;Control-v Escape&gt;lgUlea BEAUTIFUL&lt;ctrl-v Escape&gt;A WORLD</code></pre></div></div> <div class="paragraph"><p>Visually, it looks like this, since the <code>Control-v Escape</code> keypresses get changed
to <code>^[</code>:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-13/crazy-normal-mode-command-dark.png" alt="crazy normal mode command dark"/></div> <div class="title">Figure 67. Why Would You Ever Want To Do This?</div></div> <div class="paragraph"><p>And the end result:</p></div> <div class="listingblock"><div class="title">Listing 34. Result of Applying Norm Command</div> <div class="content"><pre class="pygments highlight"><code data-lang="plain"><span></span>HELLO Foo BEAUTIFUL WORLD
HELLO Bar BEAUTIFUL WORLD
HELLO Fizz BEAUTIFUL buzz WORLD
HELLO One BEAUTIFUL two three WORLD</code></pre></div></div> <div class="paragraph"><p>Of course, it’s unclear why you’d want to perform this exact set of actions,
but it hopefully shows that anything is possible!</p></div> <div class="paragraph"><p>It’s pretty common to get the command wrong the first time you try to apply it.
Simply use <code>u</code> to undo the entire sequence in one go, then type <code>:&lt;Up&gt;</code> to edit
the command line again.</p></div> <div class="paragraph"><p>If the command is kind of complicated, you’ll probably get annoyed while
editing it because you don’t have access to all the Vim navigation commands you
are used to. So now is a great time to introduce Vim’s command line editor.</p></div></div></div> <div class="sect2"><h3 id="_command_line_editor"><a class="link" href="#_command_line_editor">13.6. Command Line Editor</a></h3> <div class="paragraph"><p>To display the command line editor, type <code>Control-F</code> while the little <code>Cmdline</code>
window is focused. Or, if you are currently in Normal mode, type <code>q:</code>. This
latter is not related to the “record to register” command typically associated
with <code>q</code>. It is instead “Open the editable command line window”.</p></div> <div class="paragraph"><p>This window is basically what happens when the normal command line editor
marries a normal Vim window and spawns a magical superpower command line
window.</p></div> <div class="paragraph"><p>The new magic window shows up at the bottom of the current buffer, just above
the status bar, and it contains your entire command line history (including
searches and substitutions):</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-13/command-line-window-dark.png" alt="command line window dark"/></div> <div class="title">Figure 68. Command Line History Window</div></div> <div class="paragraph"><p>Use <code>Control-u</code> to scroll up this baby and you’ll see every command you ever
typed. You can even search it with <code>?</code> (search backward is probably more
useful than search forward since your commands are ordered by recency).</p></div> <div class="paragraph"><p>To run any of those old commands, just navigate your cursor to that line and
press <code>Enter</code>. Boom! History repeats itself.</p></div> <div class="paragraph"><p>Or you can enter a brand new command on the blank line at the bottom of this
magic command window (remember <code>Shift-G</code> will get you to the bottom in a
hurry).</p></div> <div class="paragraph"><p>You will find this window is devilishly hard to escape, though. The escape key
doesn’t work, because it’s reserved for escaping to Normal mode while editing
<em>in</em> the window. The secret is to use <code>Control-C</code> to close it, although other
window close commands such as <code>&lt;Space&gt;wq</code> will also work. You can even run <code>:q</code>
from inside the command line window.</p></div> <div class="paragraph"><p>Most importantly, you can use normal Vim commands to <em>edit</em> any line in this
window. Just navigate to the line, use whatever mad editing skills you have
(including other command-mode commands such as <code>:s</code>) to make the line look the
way you want it to, return to Normal mode, and press <code>Enter</code>. The edited
command will execute.</p></div></div> <div class="sect2"><h3 id="_mixing_the_norm_command_with_recording"><a class="link" href="#_mixing_the_norm_command_with_recording">13.7. Mixing the Norm Command With Recording</a></h3> <div class="paragraph"><p>Recall that the <code>q</code> command can record a sequence of commands to a register for
later playback. And the <code>:norm</code> command can be used to apply a sequence of
commands to a range of lines. The fact that you can <code>p</code> a register that has a
recording in it means there are several ways you can later apply a recording
to a range of lines using <code>:norm</code>:</p></div> <div class="ulist"><ul><li><p><code>:&lt;range&gt;norm @q</code> will simply execute the <code>q</code> register on each line in the
range, since <code>@q</code> is the command to execute register <code>q</code>.</p></li> <li><p><code>:&lt;range&gt;norm &lt;Control-r&gt;q</code> will copy the <em>contents</em> of register <code>q</code> into the
cmdline window so the actions will be applied to each line.</p></li> <li><p><code>q:&lt;range&gt;inorm &lt;Esc&gt;&quot;qp</code> will open the command line editor window, insert
the word <code>norm</code> and copy the contents of register <code>q</code> into the line using
the Normal mode register paste command.</p></li></ul></div></div> <div class="sect2"><h3 id="_the_global_command"><a class="link" href="#_the_global_command">13.8. The Global Command</a></h3> <div class="paragraph"><p>The <code>:norm</code> command operates on a range of lines, and Neovim ranges must be
contiguous lines. It’s not possible to execute a command on e.g. lines 1 to 4
and 8 to 10, but not 5 to 7 (other than running <code>:norm</code> twice on different
ranges).</p></div> <div class="paragraph"><p>Sometimes, you want to run a command on every line that matches a pattern.
This is where the <code>:global</code> command comes in.</p></div> <div class="paragraph"><p>The syntax for <code>:global</code> is essentially <code>:&lt;range&gt;global/pattern/command</code>,
although you can shorten it to <code>:&lt;range&gt;g/pattern/command</code>. The pattern is just
like any Vim search or substitute pattern.</p></div> <div class="paragraph"><p>The <code>command</code>, however, is kind of weird. Technically, it’s an “ex” command,
which means “many but not all of the commands that come after a colon, but
mostly ones you don’t use in daily editing so they are hard to remember”.</p></div> <div class="paragraph"><p>The most common example is “delete all lines that match a pattern”, which you
can do with <code>:%g/pattern/d</code>.</p></div> <div class="paragraph"><p>Another popular one is <code>substitute</code>, which you already know. If you precede
your substitute with <code>:%g/pattern</code>, you can make it only perform the
substitution on lines that match a certain pattern. This pattern can be
<em>different</em> from the one that is used in the substitution itself. Consider
the following arcane sequence of text:</p></div> <div class="listingblock"><div class="title">Listing 35. Combine Substitute with Golbal</div> <div class="content"><pre class="pygments highlight"><code data-lang="plain"><span></span>:%g/^f/s/ba[rt]/glib</code></pre></div></div> <div class="paragraph"><p>What a mess! This is obviously meant to be easy to write, not easy to read. If
we wanted it to be slightly easier to read, we’d probably write
<code>:%global/^f/substitue/ba[rt]/glib</code>.</p></div> <div class="paragraph"><p>This command means “perform a global operation on every line that starts with
<code>f</code>. The operation in this case should be to replace every instance of <code>bar</code> or
<code>bat</code> with the word <code>glib</code>.”</p></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content">This is different from using a pattern in a range, such as
<code>:,/foo/s/needle/haystack/</code>. This command performs the substitution on all
lines between the cursor and the first line to contain <code>foo</code>, whereas
<code>:%global/foo/s/needle/haystack/</code> performs the substitution on every line in
the file that contains the word foo.</td></tr></tbody></table></div> <div class="paragraph"><p>In my opinion, the most interesting use of <code>:global</code> is to run a Normal mode
command on the lines that match a pattern. This effectively means mixing
<code>:global</code> with <code>:normal</code>, as in <code>:%g/pattern/norm &lt;some keystrokes&gt;</code>.</p></div> <div class="paragraph"><p>As just one example, this will insert the word “world” at the end of every line
that starts with “hello”:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-13/global-normal-dark.png" alt="global normal dark"/></div> <div class="title">Figure 69. Mixing Global and Normal</div></div> <div class="paragraph"><p>You can also use global to perform a command on every line that <strong>does not</strong>
match a pattern. Just use <code>g!/</code> instead of <code>g/</code></p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content"><div class="paragraph"><p>The <code>g!</code> is useful in log files that have exceptions wrapping onto random
lines. For example, a rudimentary log file might look like this:</p></div> <div class="listingblock"><div class="title">Listing 36. Imaginary Log File</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-mi">2024</span><span class="tok-o">-</span><span class="tok-mi">03</span><span class="tok-o">-</span><span class="tok-mi">26</span><span class="tok-n">T12</span><span class="tok-p">:</span><span class="tok-mi">00</span><span class="tok-p">:</span><span class="tok-mi">00</span> <span class="tok-n">Something</span> <span class="tok-n">happened</span>
<span class="tok-mi">2024</span><span class="tok-o">-</span><span class="tok-mi">03</span><span class="tok-o">-</span><span class="tok-mi">26</span><span class="tok-n">T12</span><span class="tok-p">:</span><span class="tok-mi">01</span><span class="tok-p">:</span><span class="tok-mi">01</span> <span class="tok-n">Something</span> <span class="tok-n">happened</span>
<span class="tok-mi">2024</span><span class="tok-o">-</span><span class="tok-mi">03</span><span class="tok-o">-</span><span class="tok-mi">26</span><span class="tok-n">T12</span><span class="tok-p">:</span><span class="tok-mi">01</span><span class="tok-p">:</span><span class="tok-mi">02</span> <span class="tok-n">Something</span> <span class="tok-n">super</span> <span class="tok-n">bad</span> <span class="tok-n">happened</span>
  <span class="tok-n">Traceback</span><span class="tok-p">:</span>
    <span class="tok-n">A</span> <span class="tok-n">bunch</span> <span class="tok-n">of</span> <span class="tok-n">lines</span> <span class="tok-n">I</span> <span class="tok-n">don</span><span class="tok-s1">&#39;t care about</span>
<span class="tok-s1">2024-03-26T12:02:00 Something else happened</span>
<span class="tok-s1">2024-03-26T12:03:58 Cool thing happened</span></code></pre></div></div> <div class="paragraph"><p>and prior to further processing, I might want to remove every line
that doesn’t start with a date:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-13/global-non-match-dark.png" alt="global non match dark"/></div> <div class="title">Figure 70. Global Invert Match</div></div> <div class="paragraph"><p>As has become a running theme, that might be a bit eye-watering. Each <code>\\d</code>
means “match a digit”, while the final <code>/d</code> means “perform a delete operation
on the selected lines”. The <code>g!</code> is the important part; that’s the one that
means “the selected lines are ones that <em>don’t</em> match the pattern”.</p></div></td></tr></tbody></table></div> <div class="paragraph"><p>I don’t use <code>:global</code> nearly as often as I use <code>:norm</code>. But when I do, it is a
hyper-efficient way to cause massive changes in a file. It takes some
getting used to, and you’ll probably be looking up the syntax the first few
times you need it, but it’s a really terrific tool to have in your toolbox.</p></div></div> <div class="sect2"><h3 id="_summary_13"><a class="link" href="#_summary_13">13.9. Summary</a></h3> <div class="paragraph"><p>This chapter was all about bulk editing text. We started with substitutions using
the <code>:s[ubstitute]</code> ex command, and then took a tour of the UI for performing find
and replace across multiple files using the Grug-far plugin.</p></div> <div class="paragraph"><p>Then we learned how to perform commands on multiple lines at once using <code>:norm</code>
and <code>:global</code>, and earned a quick but comprehensive introduction to the command
line editing window.</p></div> <div class="paragraph"><p>In the next chapter, we’ll learn several random editing tips that I couldn’t
fit anywhere else.</p></div></div></div>`;return{c(){e=r("div"),e.innerHTML=o,this.h()},l(t){e=l(t,"DIV",{class:!0,"data-svelte-h":!0}),p(e)!=="svelte-fxl9dc"&&(e.innerHTML=o),this.h()},h(){h(e,"class","sect1")},m(t,s){m(t,e,s)},p:a,i:a,o:a,d(t){t&&u(e)}}}class w extends d{constructor(e){super(),c(this,e,null,v,n,{})}}export{w as component,b as universal};
