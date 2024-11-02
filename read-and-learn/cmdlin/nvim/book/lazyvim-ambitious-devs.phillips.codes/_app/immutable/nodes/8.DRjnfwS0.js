import{s as r,n as t}from"../chunks/scheduler.seBsrkbn.js";import{S as c,i as n,e as d,c as l,l as h,m as p,g as u,d as m}from"../chunks/index.Dwxb9V0m.js";function g(){return{title:"Chapter 12: Searching...",description:"Searching in LazyVim is both more powerful and more complicated than in most editors, but it's worth learning the intricacies.",keywords:"vim, lazyvim, neovim, tutorial, course, book, searching, find and replace, live grep args"}}const w=Object.freeze(Object.defineProperty({__proto__:null,load:g},Symbol.toStringTag,{value:"Module"}));function y(i){let e,a=`<h2 id="_searching"><a class="link" href="#_searching">Chapter 12. Searching…​</a></h2> <div class="sectionbody"><div class="paragraph"><p>It’s kind of amazing that we’ve gotten this far without covering searching.
Find and replace in Vim has always been far more powerful and nuanced than in
most editors, which just give you a little dialog with three fields and, if
you’re lucky, a check box to specify regular expressions.</p></div> <div class="paragraph"><p>LazyVim extends Neovim’s powerful search feature to make it easier to use and
prettier. You know about the Seek (<code>s</code>) and Treesitter (<code>S</code>) modes for
navigating to and selecting objects you can see, as well as their remote
operator-pending objects counterparts: <code>r</code> and <code>R</code>. These work great when the
text you are looking for is currently visible. However, when you need to search
a file and have it automatically scroll to search results, they are
insufficient.</p></div> <div class="sect2"><h3 id="_search_in_current_file"><a class="link" href="#_search_in_current_file">12.1. Search in Current File</a></h3> <div class="paragraph"><p>To search for a pattern in Vim use the <code>/</code> command in Normal mode. The mnemonic
is that the <code>/</code> key is also the question mark key, and searching for something
is a kind of question.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">Many tools that are not considered “modal” have adopted Vi’s <code>/</code> as
a command to invoke search. For example, the exceptional Linear task tracking
tool uses <code>/</code> to begin a search, as does the ubiquitous GitHub.</td></tr></tbody></table></div> <div class="paragraph"><p>The first time you type a <code>/</code> in Normal mode, you might lose your
cursor! It doesn’t pop up a new window. Instead, <code>/</code> takes over the current
file’s status bar with a magnifying glass icon:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-12/search-dat-dark.png" alt="search dat dark"/></div> <div class="title">Figure 55. Search “dat”</div></div> <div class="paragraph"><p>In this image, I’ve typed <code>/dat</code>. The <code>/</code> initiates Search mode, and then
I searched for <code>dat</code>. My cursor is in the search box.</p></div> <div class="paragraph"><p>As you can see, LazyVim has helpfully highlighted all the (visible) matches for
“dat”.  The &quot;primary&quot; result will always be the first matching
result <em>after</em> the point where your cursor was when you hit <code>/</code>.</p></div> <div class="paragraph"><p>Your cursor will jump to the primary result if you press <code>Enter</code> to confirm
your search. Press <code>Escape</code> to cancel it, as usual.</p></div> <div class="paragraph"><p>At this point, you are back in Normal mode and can edit the buffer normally.
Before doing so, however, notice that all the highlighted results are still
highlighted. You can easily jump to the next result using the <code>n</code> (for <strong>n</strong>ext)
key. This command accepts a count, so you can use <code>3n</code> to jump to the third
result after the current cursor position.</p></div> <div class="paragraph"><p>The search will wrap to the top of the document if there are no more matching
results at the bottom. If you know how far you need to jump, you can use a
count with the <code>/</code> command as well, as in <code>3/something</code> to jump forward to the
third <code>something</code>. Figuring out how far you need to jump requires some mental
agility, though, so it’s usually faster to use Seek mode.</p></div> <div class="paragraph"><p>If you <code>n</code> too far, you can use <code>Shift-N</code> to move the cursor to the previous
result instead. And if you <em>know</em> you need to search backwards to a previous
result, you can initiate the search with <code>?</code> (i.e. <code>Shift-/</code>) instead of just
<code>/</code>.</p></div> <div class="admonitionblock caution"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-solid:fire-flame-curved"></iconify-icon></td> <td class="content">If you have used Vim before, I should warn you that this behaviour of
<code>n</code> and <code>N</code> is different from the default Neovim behaviour. They used to
“repeat the last <code>/</code> or <code>?</code> command,” so <code>n</code> would continue <em>up</em> the document
if you started with <code>?</code>. The LazyVim model is easier to remember; <code>n</code> always
  means “next down” and <code>N</code> always means “previous up”.</td></tr></tbody></table></div></div> <div class="sect2"><h3 id="_ignore_case"><a class="link" href="#_ignore_case">12.2. Ignore Case</a></h3> <div class="paragraph"><p>If you enter your search term as all lowercase letters, LazyVim will ignore
case by default, but if you include a capital letter in your search term, it
will enable case sensitivity. So searching for <code>in</code> will match <code>in</code> and <code>In</code>,
but searching for <code>In</code> will only match <code>In</code>.</p></div> <div class="paragraph"><p>If you expressly want to search for <strong>only</strong> lowercase matches, you can modify the
search term by inserting the two characters <code>\\C</code> (that <code>C</code> is capitalized)
somewhere in it.</p></div> <div class="paragraph"><p>Conveniently, it doesn’t have to be at the beginning of the search term; if
there is a <code>\\C</code> anywhere in the search string, it will make the whole search
case sensitive. So, imagine you were looking for the lowercase word “initiate”.
If you start typing <code>in</code> and realize it’s matching a bunch of unnecessary <code>In</code>
because ignore case is enabled, you can append <code>\\C</code> (so you end up with <code>in\\C</code>)
to switch to ignore case mode before typing <code>iti</code> (so the total search string
is <code>in\\Citi</code>).</p></div> <div class="paragraph"><p>If you want to disable ignore case temporarily, type the colon command <code>:set
noignorecase</code>. This will only last until you exit Neovim, or explicitly enable
it again with <code>:set ignorecase</code>.</p></div> <div class="paragraph"><p>If you want to make the change permanent, open your <code>options.lua</code> file and add
<code>vim.opt.ignorecase = false</code> somewhere in it. Note that now if you want to make
any specific search case <strong>in</strong>sensitive, you need to use lowercase <code>\\c</code> instead
of <code>\\C</code> in the search phrase.</p></div> <div class="paragraph"><p>The <code>\\C</code> trick seems kind of weird at first, but when you think about the
alternative used in most code editors, where you have to move your hand to your
mouse, target a tiny checkbox with a label like <code>wW</code>, and click it, then
refocus the search box and continue typing, you’ll probably decide that <code>\\C</code> is
faster.</p></div></div> <div class="sect2"><h3 id="_regular_expressions"><a class="link" href="#_regular_expressions">12.3. Regular Expressions</a></h3> <div class="paragraph"><p>Vim searches use regular expressions by default. But they are kind of strange
regular expressions.</p></div> <div class="paragraph"><p>Ok, I admit that <em>all</em> regular expressions are kind of strange. Vim’s are only
strange in comparison to the PCRE-style regular expressions that are common in
most modern programming languages. Luckily, if you are searching text, you
probably don’t need the full complexity the Perl-compatible expressions offer.</p></div> <div class="paragraph"><p>I don’t have space in this book to instruct in regular expression syntax, so
I’ll just mention some of the main go-tos and leave you to look up the rest:</p></div> <div class="ulist"><ul><li><p><code>.</code> matches <em>any</em> single character. If you need to search for a literal period,
escape it with <code>\\.</code>.</p></li> <li><p><code>\\S</code> matches any <em>non-whitespace</em> character.</p></li> <li><p>The <code>*</code> character matches the preceding expression zero or more times.
Notably, <code>.*</code> will match any string of characters of arbitrary length.</p></li> <li><p>The <code>\\+</code> string will match the preceding expression one or more times. (This
is notably different from most regular expression parsers I’ve seen, where you
don’t need the <code>\\</code> before the <code>+</code> to match one or more). It can be combined
with e.g. <code>\\S</code> to match any word without spaces: <code>\\S\\+</code>.</p></li> <li><p><code>\\=</code> can be used to match the preceding pattern zero or one times. Useful for
things like <code>https\\=:</code> where the “s” is optional. This pattern is usually <code>?</code>
in most regular expression engines, and in fact <code>\\?</code> also works for this.
However, it would confuse Vim when the command to invoke search backwards is
<code>?</code>, so <code>\\=</code> wins.</p></li> <li><p><code>\\\\</code> matches a literal backslash and <code>\\/</code> matches a literal forward slash.</p></li></ul></div> <div class="paragraph"><p>In general, if you know PCRE-style regular expressions, you’ll find you
need a lot more backslashes in Vim. That said, the vast majority of code editor
searches are covered by the above.</p></div> <div class="paragraph"><p>If you want to “disable” regular expression matching for a specific search,
place <code>\\V</code> at the beginning of the line (or in the middle of the line if you
only need to disable it for the remaining part of the search). The “V” stands
for “very nomagic”, and if you want to be extremely confused, type <code>:help
magic</code>. It is so confusing, in fact, that you will prefer to learn to just use
regular expressions (yes, I am aware how very confusing that is. Vim’s
interpretation of magic is worse).</p></div> <div class="paragraph"><p>If you desperately need a regular expression to do something you can
<span class="line-through">ask ChatGPT</span> skim through <code>:help regular expressions</code> to find
the syntax you need. You will come away either enlightened or frustrated.</p></div></div> <div class="sect2"><h3 id="_search_in_project"><a class="link" href="#_search_in_project">12.4. Search In Project</a></h3> <div class="paragraph"><p>If you need to search for a word across your entire codebase, instead of just
in one file, use the command <code>&lt;Space&gt;/</code> instead of just <code>/</code>. It will pop up
the ever-so-familiar picker, this time in <code>live_grep</code> mode.</p></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content">Make sure you have ripgrep installed and available on your path as <code>rg</code>,
as that is what the pickers use under the hood.</td></tr></tbody></table></div> <div class="paragraph"><p>Type the string you are looking for. The results will show up in the left side
and the file will display in a preview on the right so you can be sure you found
the right one:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-12/live-grep-dark.png" alt="live grep dark"/></div> <div class="title">Figure 56. Live Grep Picker</div></div> <div class="paragraph"><p>Remember that you can add labels to Telescope results by pressing <code>&lt;Esc&gt;s</code> to
enter Seek mode, or to Fzf.lua results using <code>Control-x</code>. I find this more
useful in the <code>live_grep</code> window because unlike most pickers, a space
in <code>live_grep</code> is sent as a literal space to <code>ripgrep</code>, instead of allowing me
to narrow the search results by searching for something earlier in the line.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">Since this is a picker, you can press <code>ctrl-t</code> while it is open to put all
the search results into the Trouble window so you can navigate them while
editing (using <code>]q</code> and <code>[q</code>).</td></tr></tbody></table></div> <div class="paragraph"><p>Annoyingly, this search mode is completely different from Vim’s built-in
search. It just passes your pattern to <code>ripgrep</code> and behaves the way <code>ripgrep</code>
does. And <code>ripgrep</code> doesn’t know about things like Vim’s strange regular
expression engine. It <em>does</em> support regular expressions, but they use
maddeningly different syntax from Vim. Which is to say, the same syntax as
pretty much everything that isn’t Vim. It’s Vim that’s maddening here, not
<code>ripgrep</code>. Just so we’re all clear.</p></div> <div class="paragraph"><p>Ripgrep itself accepts a multitude of command-line options, but by default, the
<code>live_grep</code> feature doesn’t support passing arguments to ripgrep to tweak your
query. The Telescope project does provide a <code>telescope-live-grep-args</code>
extension that you can enable if you want to be a <code>live_grep</code> power user.
Configuring this extension is covered in Chapter 19, as it is a rare, but
excellent example of LazyVim’s abstractions getting in the way.</p></div></div> <div class="sect2"><h3 id="_summary_12"><a class="link" href="#_summary_12">12.5. Summary</a></h3> <div class="paragraph"><p>This chapter was all about search: the <code>/</code> shortcut to enter Search mode, and
the <code>&lt;Space&gt;/</code> shortcut to enter find in project mode. The latter is not as
powerful as it could be, so we also set up the <code>telescope-live-grep-args</code>
plugin to give us a little more control over the project-wide search.</p></div> <div class="paragraph"><p>Searching is, of course, only half the story. In the next chapter,
we’ll cover replacing text, both as part of a search operation and
at a more project-wide level.</p></div></div></div>`;return{c(){e=d("div"),e.innerHTML=a,this.h()},l(o){e=l(o,"DIV",{class:!0,"data-svelte-h":!0}),h(e)!=="svelte-892wyk"&&(e.innerHTML=a),this.h()},h(){p(e,"class","sect1")},m(o,s){u(o,e,s)},p:t,i:t,o:t,d(o){o&&m(e)}}}class b extends c{constructor(e){super(),n(this,e,null,y,r,{})}}export{b as component,w as universal};
