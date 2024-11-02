import{s as i,n as t}from"../chunks/scheduler.seBsrkbn.js";import{S as d,i as r,e as c,c as h,l,m as p,g as u,d as m}from"../chunks/index.Dwxb9V0m.js";function g(){return{title:"Chapter 3: Getting Around ",description:"Introducing basic navigation techniques in LazyVim normal mode.",keywords:"vim, lazyvim, neovim, tutorial, navigation, keybindings"}}const w=Object.freeze(Object.defineProperty({__proto__:null,load:g},Symbol.toStringTag,{value:"Module"}));function v(s){let e,a=`<h2 id="_getting_around"><a class="link" href="#_getting_around">Chapter 3. Getting Around</a></h2> <div class="sectionbody"><div class="paragraph"><p>Software developers spend far more time editing code than we do writing it.
We’re always debugging, adding features, and refactoring.</p></div> <div class="paragraph"><p>Indeed, the most common thing I ever do is add a
print/printf/Println/console.log at some specific line in the codebase.</p></div> <div class="paragraph"><p>If you are coming from the more common word processing or text editing
ecosystems, navigating code is the thing that is most different in Vim’s modal
paradigm. Even if you’re used to Vim, some of the plugins LazyVim ships by
default provide different methods of code navigation than the old Vim standbys.</p></div> <div class="paragraph"><p>In VS Code, often the quickest way to get from one point in the code to another
is to use the mouse. For minor movements, the arrow keys work well, and they
can be combined with <code>Control</code>, <code>Alt</code>, or <code>Cmd/Win</code> to move in larger increments
such as by words, paragraphs, or to the beginning or end of the line. There are
numerous other keyboard shortcuts to make getting around easier, and the
Language Server support allows for easy semantic code navigation such as
“Go to Definition” and “Go to Symbol”.</p></div> <div class="paragraph"><p>Vim also supports mouse navigation, but you’ll likely reach for it less often
once you train up on the navigation keymappings. LazyVim has keybindings for the
same Language Server Protocol features that VS Code has, and they are often
more accessible. The big difference with Vim is the entire keyboard’s worth
of navigation commands that are opened up to you when your editor is in Normal
mode.</p></div> <div class="sect2"><h3 id="_seeking_text"><a class="link" href="#_seeking_text">3.1. Seeking Text</a></h3> <div class="paragraph"><p>LazyVim ships with a plugin called flash.nvim, which was created by the
maintainer of LazyVim and integrates very nicely with it.</p></div> <div class="paragraph"><p>This plugin provides a code navigation mode that has been available in various
vim plugins for many years, and has historically been quite controversial. A
lot of long-time Vim users think it breaks the Vim paradigm. I won’t go into
the details as to why, but I will acknowledge that this was true in older
iterations of the paradigm but is somewhat less true in modern versions such as
flash.nvim.</p></div> <div class="paragraph"><p>If you can see the code you want to navigate to (i.e. because the file is
currently open and the code is scrolled into view), flash.nvim is almost
always the fastest way to move your cursor there. It admittedly takes at least
three keystrokes, but those three keystrokes require no mental math or
incrementally “moving closer” to the target until you get there, which are two
of the less efficient problems that come up with certain other Vim navigation
techniques (as well as in non-modal editing).</p></div> <div class="paragraph"><p>To invoke <code>flash</code>, press the <code>s</code> key in Normal mode. My mnemonic for <code>s</code> for
“<strong>s</strong>eek”, although I’ve also heard it referred to as “sneak” or
“search” mode. Searching in LazyVim is a different behaviour (it
doesn’t care if the text is currently visible or not), and “sneaking” sounds a
little too dishonest, so I use “Seek”.</p></div> <div class="paragraph"><p>The first thing to notice when you press <code>s</code> is that the text fades to a
uniform colour and there’s a little lightning symbol in the status bar
indicating that Flash mode is active:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-3/seek-active-dark.png" alt="seek active dark"/></div> <div class="title">Figure 11. Flash Mode Active</div></div> <div class="paragraph"><p>Since you know where you want the cursor to be, your eyes are probably looking
right at it, and you know exactly what character is at that location. So after
entering Seek mode, simply type the character you want to jump to.</p></div> <div class="paragraph"><p>For example, in the following screenshot, I want to fix the typo in the heading
of this section, changing <code>Test</code> to <code>Text</code>.</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-3/seek-s-dark.png" alt="seek s dark"/></div> <div class="title">Figure 12. Seek <code>s</code> characters</div></div> <div class="paragraph"><p>I have hit <code>ss</code>, and every single <code>s</code> in the screenshot has turned blue,
including capitals. There is an <code>s</code> character beside the flash icon in
the status bar indicating that I have seeked an <code>s</code>.</p></div> <div class="paragraph"><p>In addition, all the <code>s</code> characters nearest to the cursor (which is in the
bottom paragraph) have a green label beside (to the right of) them. If I wanted
to jump to any of those <code>s</code> characters, I would just have to type that label
and boom, I’d be there.</p></div> <div class="paragraph"><p>However, the character I want to hit is too far away to have a unique label,
as there are a lot of <code>s</code> characters in my text. No matter! I just have to
type the character to the right of the target <code>s</code> character, which is a <code>t</code>. Now
my screen looks like this:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-3/seek-st-dark.png" alt="seek st dark"/></div> <div class="title">Figure 13. Seek <code>st</code> characters</div></div> <div class="paragraph"><p>Now, all instances of <code>st</code> in the file are highlighted in blue, and since there
aren’t as many <code>st</code> as <code>s</code>, all of those instances have a label beside them.
The text I want to move to is labelled with a <code>p</code>, so I press <code>p</code> and my cursor
is moved to the <code>s</code> character I wanted to change. Now I can type <code>rx</code> to
replace the <code>s</code> with an <code>x</code> (we’ll discuss <em>editing</em> code in chapter 6, but now
you’ve had a taste of it).</p></div> <div class="paragraph"><p>If you have multiple files open in split windows (which we’ll discuss in
Chapter 9), Seek mode can be used to move your cursor <em>anywhere</em> on the screen,
not just in the currently active split.</p></div> <div class="paragraph"><p>Seek mode does have drawbacks however, at least the way flash.nvim implements
it. There are some characters you can’t move to directly because you run out of
text to search for before a labelled match targets that location. For me this
happens most often when I want to edit the end of a line. If I type <code>sn</code>
because I want to edit a line that has <code>n</code> as the last character, but there are
a bunch of <code>n</code> characters closer to my cursor than the one I want to move to,
flash may not label the <code>n</code> I want to move to, and it won’t accept a carriage
return as a “next character” input.</p></div> <div class="paragraph"><p>For this reason, I don’t seek near ends of lines. Instead, I’ll seek to a word
somewhere in the middle of the same line and then use <code>A</code> which, as you may
recall, will put me in Insert mode at the end of the line. Alternatively, if I
don’t want to enter Insert mode, I will use the <code>$</code> symbol (<code>Shift+4</code>), which
is the Normal mode command for “Move cursor to end of current line”.</p></div></div> <div class="sect2"><h3 id="_scrolling_the_screen"><a class="link" href="#_scrolling_the_screen">3.2. Scrolling the Screen</a></h3> <div class="paragraph"><p>Seek mode only works if the text you want to jump to is visible on the screen.
You can’t label something you can’t see! Often, this means you want to use
search or one of the larger or more specific motions discussed later, but there
are also a few keybindings you can use to scroll the screen so you can see your
target before you jump to it.</p></div> <div class="paragraph"><p>These keybindings are a little unusual by Vim standards because they mostly
involve using the control key. How anti-modal! In my experience, these
keybindings don’t actually get a ton of use. Indeed I’ve forgotten some
of them and had to look them up to write this chapter.</p></div> <div class="paragraph"><p>The scrolling keys I use the most are definitely <code>Control-d</code> and <code>Control-u</code>,
where the mnemonics are <strong>d</strong>own and <strong>u</strong>p. They scroll the window by half a
screen’s worth of text. The cursor stays in the same spot relative to the
<strong>window</strong>, which means that it is moved up or down by half a screen’s worth of
text relative to the <strong>document</strong>.</p></div> <div class="paragraph"><p>If you need to move even further, you can use the <code>Control-f</code> and <code>Control-b</code>
keybindings (<strong>f</strong>orward and <strong>b</strong>ackward), which scroll by a full page of
text. I don’t like these ones because I never quite know where the cursor is
going to end up and I become disoriented. But it can be handy if you need to
scroll something into view quickly to use Seek mode on it. Unlike <code>Control-d</code>
and <code>Control-u</code>, <code>Control-f</code> and <code>Control-b</code> can be prefixed with a count, so
you can type <code>5&lt;Control-f&gt;</code> if you need to scroll ahead by <code>5</code> pages.</p></div> <div class="paragraph"><p>To scroll the window by a single line, use <code>Control-y</code> and <code>Control-e</code>. I have
no idea why these keybindings were chosen. There is no mnemonic. I easily
forget them, and so I never use them. These keybindings accept a count, so if
you can remember them, they are useful for subtle repositioning of the text.
The main advantage of these keybindings is that they don’t move the cursor
unless it would scroll off the screen, so if you are working on a line and need
more visibility but don’t want to move the cursor, you could use <code>Control-y</code>
and <code>Control-e</code> to do it.</p></div> <div class="paragraph"><p>The reason I don’t use these keys (other than lack of a decent mnemonic) is
that I prefer to do relative cursor positioning using <code>z</code> mode.</p></div> <div class="sect3"><h4 id="_z_mode"><a class="link" href="#_z_mode">3.2.1. Z Mode</a></h4> <div class="paragraph"><p>The <code>z</code> menu mode is an eclectic mix of cursor positioning, code folding, and
random commands. You can see a list by pressing the <code>z</code> key while in Normal
mode:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-3/z-menu-dark.png" alt="z menu dark"/></div> <div class="title">Figure 14. The <code>z</code> Menu</div></div> <div class="paragraph"><p>If that looks like a big menu, you don’t know the half of it! There are a ton
of other z-mode keybindings that are obscure enough that the which-key plugin
doesn’t bother to list them in the menu! I’ll cover the three most useful
scrolling related ones here and we’ll discuss others later.</p></div> <div class="paragraph"><p>The relative cursor keybindings I use exclusively are <code>zt</code>, <code>zb</code>, and <code>zz</code>.
These move the line that the cursor is currently on to the <strong>t</strong>op, <strong>b</strong>ottom,
or <strong>m</strong>iddle of the screen, respectively. When moving to the top or bottom it
will leave a few lines of context above or below the cursor.</p></div> <div class="paragraph"><p>There are others that will also move the cursor to the first column of the
window, but instead of memorizing those shortcuts, I recommend combining the
previous commands with <code>0</code> instead, as in <code>zt0</code>, <code>zb0</code>, and <code>zz0</code>. The <code>0</code>
command just means “Go to the start of the line”. You can also use <em>home</em> if
your keyboard has a <em>home</em> key, but <code>0</code> is easier to hit on many keyboards.</p></div> <div class="paragraph"><p>You can find other scrolling keybindings in the Neovim documentation by typing
<code>:help scrolling</code>, but the ones I just mentioned will probably more than cover
your needs as you learn far more nuanced methods of navigating code.</p></div></div></div> <div class="sect2"><h3 id="_the_first_rule_of_vim"><a class="link" href="#_the_first_rule_of_vim">3.3. The First Rule of Vim</a></h3> <div class="paragraph"><p>So there is a holy rule in Vim that I constantly break for valid reasons. Unless
you are the very strange combination of weird that I am, you probably should
not break it quite so often:</p></div> <div class="paragraph"><p><strong>Never use the arrow keys to move the cursor.</strong></p></div> <div class="paragraph"><p>The background behind this rule is that it takes a tenth of a second or so to
move your hand to the arrow keys on most keyboards, and another tenth of a
second to move it back to the home row. I’m not convinced these tenths of a
second add up to an appreciable amount of time, even considering the millions
of characters I have typed in my lifetime. (Yes, millions. I did the math once).</p></div> <div class="paragraph"><p>But I do think the arrow keys on most keyboards can do nasty things to the long
term health of your hands, and honestly, the more you get used to the
alternative Vim keybindings, the more you’ll prefer to use them.</p></div> <div class="paragraph"><p>The Vim keybindings for arrow keys seem rather unintuitive when you first look
at them: <code>h</code>, <code>j</code>, <code>k</code>, and <code>l</code>. These map to the directions, left, down, up,
and right. If it seems weird that <code>l</code> means <code>right</code> instead of <code>left</code>, or
you’re wondering why they skipped <code>i</code> since that appears to be an alphabetic
sequence, look at your keyboard.</p></div> <div class="paragraph"><p>If you are an English-speaker with a standard Qwerty keyboard, the letters <code>h</code>,
<code>j</code>, <code>k</code>, and <code>l</code> are on the home row under your right hand, in that order, and
are therefore the easiest keys to hit on the entire keyboard.</p></div> <div class="paragraph"><p>Open a largish file in Neovim (you can use <code>:e path/to/filename</code>) and
experiment with moving the cursor left, right, up and down using the home row
keys. While you do that, I’ll tell you why I don’t use them because I’m triply
abnormal.</p></div> <div class="paragraph"><p>First, I’m left handed, so the right hand home row is slightly less accessible
feeling. Second, I’ve been a Dvorak user for two decades. The <code>j</code>, <code>k</code>, and <code>l</code>
keys are not on my home row. Third, I use a Kinesis Advantage 360 keyboard,
which, among other bizarre layout features, places the arrow keys within reach
of my fingers so I don’t have to move my hand to hit them.</p></div> <div class="paragraph"><p>By a strange twist of fate, these weirdnesses kind of cancel each other out.
The <code>j</code> and <code>k</code> keys happen to be directly above the left and right arrow keys
under my dominant left hand. So that’s what I use for navigation: <code>Left</code> <code>Right</code>, <code>j</code> <code>k</code>. If you are less weird than me, you should probably use the
right-hand home row keys the way Vim was designed.</p></div> <div class="paragraph"><p>Vim, Neovim, and LazyVim are all <em>really</em> good at reusing motions, so you will
find that <code>h</code>, <code>j</code>, <code>k</code>, and <code>l</code> are used for a lot of different navigation
sequences as you progress through this book. Take enough time to really get
used to them. But recognize that if you ever have to push these keys more
than twice in succession to move the cursor, you’re wasting keystrokes.</p></div></div> <div class="sect2"><h3 id="_counting"><a class="link" href="#_counting">3.4. Counting</a></h3> <div class="paragraph"><p>The vast majority of commands in Vim can be prefixed with a <em>count</em> to repeat
the motion multiple times. The count is typically entered as a sequence of
digits before the command you want to repeat.</p></div> <div class="paragraph"><p>So, for example, to move the cursor up 15 lines, you would enter Normal mode
and hit the keys <code>15k</code>. To move it five characters to the right, use <code>5l</code>.</p></div> <div class="paragraph"><p>This is why LazyVim has such weird line numbering by default. Consider the
following screenshot:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-3/relative-lines-dark.png" alt="relative lines dark"/></div> <div class="title">Figure 15. Relative Line Numbering</div></div> <div class="paragraph"><p>My cursor in this screenshot is on line 126, which is highlighted in the left
gutter. It’s also is also visible in the lower right corner of my window,
though I cropped it out in this screenshot. But directly above line <code>126</code> we
see the line number 1, and directly below it we also see the line number 1.</p></div> <div class="paragraph"><p>Let’s say I want to move my cursor to the <code>Scrolling the screen</code> heading.</p></div> <div class="paragraph"><p>This line has the number <code>5</code> beside it, so I don’t have to count lines or do
any mental arithmetic to figure out the count to use to move my cursor. I just
type <code>5j</code> and my cursor moves to the desired line.</p></div> <div class="paragraph"><p>Now that you know what they are for, I suggest leaving relative numbers on
until you get used to them. If you find them distracting or just don’t use
them, you can change to normal line numbers by editing your LazyVim
configuration. Open the file <code>~/.config/nvim/lua/config/options.lua</code>, which
should have been created for you by LazyVim but currently won’t have anything
in it other than a comment describing what it is for.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">You can use the Space mode command <code>&lt;Space&gt;fc</code> to quickly find files in the
LazyVim configuration directory. This will pop up one of the file pickers
that we’ll discuss in detail in the next chapter. Type <code>options</code> and press <code>&lt;Enter&gt;</code>
to open the file.</td></tr></tbody></table></div> <div class="paragraph"><p>To disable relative file numbers by default, add this line to the file and save
it:</p></div> <div class="listingblock"><div class="title">Listing 7. Disable Relative Line Numbers</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">opt</span><span class="tok-p">.</span><span class="tok-n">relativenumber</span> <span class="tok-o">=</span> <span class="tok-kc">false</span></code></pre></div></div> <div class="paragraph"><p>Then reopen Neovim, and you should see the absolute value of line numbers in
the left column.</p></div> <div class="paragraph"><p>Personally, I find line numbers to not be very useful and I don’t like wasting
valuable screen width on displaying those characters. As has become a running
theme, I recognize that I am somewhat odd! But if you also want to disable
line numbers altogether, you’ll need a second line in <code>options.lua</code>:</p></div> <div class="listingblock"><div class="title">Listing 8. Disable All Line Numbers</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">opt</span><span class="tok-p">.</span><span class="tok-n">number</span> <span class="tok-o">=</span> <span class="tok-kc">false</span>
<span class="tok-n">vim</span><span class="tok-p">.</span><span class="tok-n">opt</span><span class="tok-p">.</span><span class="tok-n">relativenumber</span> <span class="tok-o">=</span> <span class="tok-kc">false</span></code></pre></div></div></div> <div class="sect2"><h3 id="_find_mode"><a class="link" href="#_find_mode">3.5. Find Mode</a></h3> <div class="paragraph"><p>If you need to move your cursor to a position that is relatively close
to its current position, you may want to use LazyVim’s Find mode instead
of the Seek mode we described earlier. The default Find mode in Neovim is
rather limited, but the flash.nvim plugin that enables Seek mode makes
it much nicer to use.</p></div> <div class="paragraph"><p>To enter Find mode, press the <code>f</code> key. Like Seek mode, a portion of your screen
will dim, indicating that you should type another character.  After you do so,
all instances of that character <em>after the cursor</em> will be highlighted. For
example, <code>fs</code> will highlight all instances of the letter <code>s</code> after the current
cursor position.</p></div> <div class="paragraph"><p>This is where the similarities between <code>Find</code> mode and <code>Seek</code> mode end,
however. Instead of showing a label, the cursor immediately jumps forward to
the first matching character after the cursor. You’ll also notice that none of
the text before the cursor has been dimmed, and that none of the matching
characters in the lines before the cursor are highlighted.</p></div> <div class="paragraph"><p>Instead, we need to use counts to jump to later instances of the character. If
I want to jump ahead to the third highlighted <code>s</code>, I type <code>3f</code> and my cursor
will move there. However, if you want to jump to a much later <code>s</code>, you probably
don’t want to individually count how many <code>s</code> keys there are. Luckily, after
you use a count, LazyVim leaves you in Find mode, so you can just guess how
many <code>s</code> characters there are, and then once you are closer, repeat with a new count.
If you only want to jump ahead by one <code>s</code> character, you don’t need to enter a
count, just press <code>f</code> by itself and you’ll move ahead.</p></div> <div class="paragraph"><p>If you miscounted or misguessed and jump too far, don’t worry! You can take
advantage of the fact that (Shifted) <code>F</code> means “find backwards”, and can also be
counted. So if you need to move to the 15th highlighted <code>s</code>, it’s totally fine
to guess <code>18f</code>, realize you’ve gone three too far, and use <code>3F</code> to jump
back to the previous character.</p></div> <div class="paragraph"><p>Moreover, if you know that the character you are looking for is behind or above
your cursor in the document, you can enter Find mode with <code>F</code> instead of <code>f</code> in
the first place. This will immediately start a backwards find operation instead
of a forward one. And if you know right off the bat that you want to jump back
or ahead by three instances of the given character, you can use a count when
you first enter Find mode.</p></div> <div class="paragraph"><p>There is also a subtle variation of Find mode that I call “<strong>T</strong>o” mode,
although the official Vim mnemonic is actual “&#39;<strong>T</strong>il” mode. You enter it
with a <code>t</code> or <code>T</code> depending on what direction you want to go.</p></div> <div class="paragraph"><p>“To” mode behaves identically to Find mode except that it jumps to <em>just before</em>
the target character.</p></div> <div class="paragraph"><p>You might think that To mode is kind of redundant because you could fairly
easily use Find mode followed by a single <code>h</code> to move the cursor left. But “To”
mode is extremely useful when you are combining it with operations to edit the
text, which we will discuss later. As a taste, if you use the command <code>d2ts</code>,
it will delete all text between the cursor and the second <code>s</code> it encounters, but
leave that <code>s</code> alone. This is much easier than the <code>d2fsis&lt;Escape&gt;</code> that would be
required if you used a find command and then had to enter Insert mode to add
the <code>s</code> back.</p></div></div> <div class="sect2"><h3 id="_moving_by_words"><a class="link" href="#_moving_by_words">3.6. Moving by Words</a></h3> <div class="paragraph"><p>When <code>f</code> or <code>t</code> feels too big, and cursors with counts feel too small, you’ll
most likely want to use the word movement commands. In other editors and IDEs
you might be used to getting this functionality by holding <code>Control</code>, <code>Alt</code>, or
<code>Option</code> while using the arrow keys.</p></div> <div class="paragraph"><p>Neovim is easier; you don’t have to move your hands to the arrow key section of
the keyboard and you don’t have to hold down multiple keys at once.</p></div> <div class="paragraph"><p>Instead, you can just enter Normal mode and press the <code>w</code> key to move to the
beginning of the next word. If you instead want to move to the <em>end</em> of the
current word, use the <code>e</code> key. If you are <em>already</em> at the end of the current
word, <code>e</code> will go to the end of the <em>next</em> word.</p></div> <div class="paragraph"><p>This is useful when you want to combine it with counts: If you need to move to
the end of the word that is two words after the current word, press <code>3e</code>. This
is the same as pressing <code>e</code> three times, which would move to the end of the
current word, then the next word, and finally to the end of the word you want
to hit. <code>w</code> can also be prefixed with a count if you need to move to the
beginning of a word that is a certain number of words after the current one.</p></div> <div class="paragraph"><p>Use the <code>b</code> key if you want to move backwards instead. This will move you to
the beginning of the current word, or if you are already at the beginning of
the word, it will move to the beginning of the previous word. As before, use a
count to move to the beginning of even more words.</p></div> <div class="paragraph"><p>Surprisingly, it takes a bit more work to move to the end of the <em>previous</em>
word, as you need to press two keys: <code>g</code> followed by <code>e</code>. The mnemonic for this
is “<strong>g</strong>o to <strong>e</strong>nd of previous word”. In practice, you’ll find that you
hardly ever need this functionality for some reason, and the honest truth is I
usually use <code>be</code> (<code>b</code> to move to beginning of previous word, then <code>e</code> to go to
end of that word) to move to the end of the previous word. If you do use <code>ge</code>,
however, it can be combined with a count as well. You’ll need to type something
like <code>4ge</code>, depending on the count. The command <code>g4e</code> wouldn’t do anything
useful.</p></div> <div class="paragraph"><p>Collectively, you may occasionally hear the <code>w</code>, <code>e</code>, and <code>b</code> commands referred
as the “web” words. It just means &quot;moving by words&quot;. These are probably the
most common movements you will use, more than individual cursor positions,
simply because most editing actions tend to involve changing or deleting a word
or sequence of words.</p></div></div> <div class="sect2"><h3 id="_moving_by_words_only_bigger"><a class="link" href="#_moving_by_words_only_bigger">3.7. Moving by Words, Only BIGGER</a></h3> <div class="paragraph"><p>The “shifted” form of the <code>web</code> words also move by words, but the definition of
“word” is subtly different. Specifically, a capital <code>W</code> will move to just after
the next whitespace character, where a lowercase <code>w</code> will use other forms
of punctuation to delimit a word. Consider a method call on an object
that looks something like this in many languages:</p></div> <div class="listingblock"><div class="title">Listing 9. Example Method Call</div> <div class="content"><pre class="pygments highlight"><code data-lang="typescript"><span></span><span class="tok-nx">myObj</span><span class="tok-p">.</span><span class="tok-nx">methodName</span><span class="tok-p">(</span><span class="tok-s1">&#39;foo&#39;</span><span class="tok-p">,</span><span class="tok-w"> </span><span class="tok-s1">&#39;bar&#39;</span><span class="tok-p">,</span><span class="tok-w"> </span><span class="tok-s1">&#39;baz&#39;</span><span class="tok-p">);</span></code></pre></div></div> <div class="paragraph"><p>If your cursor is currently at the beginning of that line, a <code>w</code> will move
your cursor to the period on the line, a second <code>w</code> will move you to the <code>m</code>,
and subsequent <code>w</code> presses will stop at the paren and quotes as well.</p></div> <div class="paragraph"><p>On the other hand, if your cursor is at the beginning of the line, a <code>W</code>
will move you all the way to the first quote in the <code>&quot;bar&quot;</code> argument, since
that is where the first whitespace character is.</p></div> <div class="paragraph"><p>As a visualization, here are all the stops on that line of code when you use
<code>w</code> compared to when you use <code>W</code>:</p></div> <div class="listingblock"><div class="title">Listing 10. Behaviour of <code>w</code> and <code>W</code></div> <div class="content"><pre class="pygments highlight"><code data-lang="typescript"><span></span><span class="tok-nx">myObj</span><span class="tok-p">.</span><span class="tok-nx">methodName</span><span class="tok-p">(</span><span class="tok-s1">&#39;foo&#39;</span><span class="tok-p">,</span><span class="tok-w"> </span><span class="tok-s1">&#39;bar&#39;</span><span class="tok-p">,</span><span class="tok-w"> </span><span class="tok-s1">&#39;baz&#39;</span><span class="tok-p">)</span>
<span class="tok-o">-----</span><span class="tok-nx">ww</span><span class="tok-o">---------</span><span class="tok-nx">w</span><span class="tok-o">-</span><span class="tok-nx">w</span><span class="tok-o">--</span><span class="tok-nx">w</span><span class="tok-o">--</span><span class="tok-nx">ww</span><span class="tok-o">--</span><span class="tok-nx">w</span><span class="tok-o">--</span><span class="tok-nx">ww</span><span class="tok-o">--</span><span class="tok-nx">w</span><span class="tok-o">----&gt;</span>
<span class="tok-o">------------------------</span><span class="tok-nx">W</span><span class="tok-o">------</span><span class="tok-nx">W</span><span class="tok-o">--------&gt;</span></code></pre></div></div> <div class="paragraph"><p>The <code>B</code>, <code>E</code>, and <code>gE</code> motions behave similarly, moving in the appropriate
direction by whitespace-delimited words instead of punctuation ones.</p></div> <div class="paragraph"><p>One thing that is kind of annoying both in Vim and the way LazyVim is
configured is that there’s no way to navigate between the individual words of
<code>CamelCaseWords</code> or <code>snake_case_words</code>. You can use <code>fC</code> or <code>t_</code> and similar if you
want to, but I will later show you up how to set up the <code>nvim-spider</code> plugin
that makes navigating these common programming constructs simpler.</p></div></div> <div class="sect2"><h3 id="_line_targets"><a class="link" href="#_line_targets">3.8. Line Targets</a></h3> <div class="paragraph"><p>Very frequently, you need to move to the beginning or end of the line you are
currently editing. Often you can use <code>I</code> or <code>A</code> for this if your goal is to
move to that location and enter Insert mode, but if you need to move there and
stay in Normal mode (e.g. for other purposes such as to delete or change a
word) you can use the <code>^</code>, <code>$</code>, and <code>0</code> commands.</p></div> <div class="paragraph"><p>If you are familiar with regular expressions, you might know that <code>^</code> is used
to match the start of text or start of the line and that <code>$</code> is used to match
the end, so the mnemonic of using these two keybindings to match the beginning
and end of the current line will hopefully be less unmemorable than they seem
at first.</p></div> <div class="paragraph"><p>There is a certain lack of symmetry between the two, however. The <code>$</code>
(<code>Shift-4</code>) command simply means “go to the end of the line”, as in the last
character before the ending newline, no matter what that character is. The <code>^</code>
or caret (<code>Shift-6</code>) means “go to the beginning of the text on this line”. The
“of the text” there is important: if your line has whitespace at the beginning
(e.g. indentation), the <code>^</code> caret will <strong>not</strong> go to the very first column, but
will instead go to the first non-whitespace character.</p></div> <div class="paragraph"><p>To move to the very beginning of the line, use the <code>0</code> key. <code>0</code> is the <strong>only</strong>
numeric key that maps to a command because the others all start a count. But it
wouldn’t make sense to start a count with <code>0</code>, so we get to use it for “move to
the zeroth column”.</p></div> <div class="paragraph"><p>There is also a command to go to the end of the line excluding whitespace, but
I have never used it, probably because I usually have formatters configured to
trim trailing whitespace so it doesn’t come up.</p></div> <div class="paragraph"><p>The two character combination <code>g_</code> (g underscore) means “go to the last
non-blank character”. I guess <code>_</code> kind of looks like &quot;not a space&quot;, so it’s
kind of mnemonic? I include it to be comprehensive, but you’ll likely not use
it much. You also have the option of combining other commands you’ve learned so
you don’t have to memorize this one-off. For example, you can use the three
character <code>$ge</code> (combining “end of line” with go backwards to end of word) or
<code>$be</code> to move to the last non-blank on the line. You have options; pick the one
that you find is easiest to remember or type!</p></div></div> <div class="sect2"><h3 id="_jumping_to_specific_lines"><a class="link" href="#_jumping_to_specific_lines">3.9. Jumping to Specific Lines</a></h3> <div class="paragraph"><p>If you compile some code or run a linter, you will invariably be given a line
number where the error occurred (unless the compiler is particularly useless).</p></div> <div class="paragraph"><p>You can jump to a specific line by entering the line number as a count,
followed by (shifted) <code>G</code>. So <code>100G</code> will move your cursor to line 100.
Alternatively, you can use the <code>:100&lt;Enter&gt;</code> ex command.</p></div> <div class="paragraph"><p><code>G</code> can also be issued without a count, in which case the <code>G</code> command will
always take you to the end of the file.</p></div> <div class="paragraph"><p>You can go to the top of the file with <code>1G</code> if you want, but since this is such
a common operation, you can instead use <code>gg</code> (two lower-case <code>g</code>s). The
mnemonic for <code>g</code> in all cases is “Go to”, and there are a lot of things that
can come after a <code>g</code> (<code>:help g</code> will introduce you to the ones I don’t cover,
although be aware that LazyVim has overridden some of them).</p></div> <div class="paragraph"><p>Since the most common place you are likely to want to “go to” is a line number,
the easiest to type <code>G</code> and <code>gg</code> commands are used for line number navigation.</p></div></div> <div class="sect2"><h3 id="_jump_history"><a class="link" href="#_jump_history">3.10. Jump History</a></h3> <div class="paragraph"><p>All this jumping around can make you feel a little lost. Luckily, there are two
super-useful keybindings for going back to places you previously jumped.</p></div> <div class="paragraph"><p><code>Control-o</code> is the non-modal control-based keybinding that I use most often. I
should honestly bind it to something more accessible, I use it so much. It
basically means “Go to the place I jumped from”.</p></div> <div class="paragraph"><p>This is super handy when you’re editing code deep in a file or module and
realize you need to import a library at the top of the file. You can use <code>gg</code>
to jump to the top of the file, <code>s</code> to seek to the line you want to add the
import on, and then enter Insert mode to add the import. Now you want to go
back to the code you were working on so you can actually use the import.
<code>Control-o</code> a couple times will take you there.</p></div> <div class="paragraph"><p>Neovim keeps a history of <em>all</em> your jumps, so you can jump between several
locations (perhaps to look up documentation or the call signature for a
function) and always find a way back.</p></div> <div class="paragraph"><p>If you jump too far, you can use the <code>Control-i</code> keybinding to jump <em>forward</em>
in history. It’s just the opposite of <code>Control-o</code>. I don’t know why <code>i</code>
and <code>o</code> were chosen for these; maybe because they are side-by-side on a
Qwerty keyboard? They are used commonly enough that once you learn them,
you won’t forget.</p></div></div> <div class="sect2"><h3 id="_summary_3"><a class="link" href="#_summary_3">3.11. Summary</a></h3> <div class="paragraph"><p>Navigating code is a huge topic in Vim. You’ve already learned enough commands
that you can navigate a Vim window more efficiently than most non-modal editors
can dream of. But we’ve barely scratched the surface, and we’ll be covering a
bunch of even more useful code navigation commands later.</p></div> <div class="paragraph"><p>We covered the LazyVim <code>Seek</code> mode to jump anywhere in the visible window, and
then the scrolling commands to make sure the thing you want to jump to is
visible. Then we covered moving the cursor with the home row keys and
multiplying them with counts.</p></div> <div class="paragraph"><p>We learned how Find mode differs from Seek mode, even though they are
superficially similar. Then we covered some standard keybindings for moving by
words and to key places on a line before jumping to specific lines. We wrapped
up by covering how to navigate to places you have jumped before.</p></div> <div class="paragraph"><p>In the next chapter, we’ll learn more about opening files and navigating the
filesystem.</p></div></div></div>`;return{c(){e=c("div"),e.innerHTML=a,this.h()},l(o){e=h(o,"DIV",{class:!0,"data-svelte-h":!0}),l(e)!=="svelte-15odntk"&&(e.innerHTML=a),this.h()},h(){p(e,"class","sect1")},m(o,n){u(o,e,n)},p:t,i:t,o:t,d(o){o&&m(e)}}}class b extends d{constructor(e){super(),r(this,e,null,v,i,{})}}export{b as component,w as universal};
