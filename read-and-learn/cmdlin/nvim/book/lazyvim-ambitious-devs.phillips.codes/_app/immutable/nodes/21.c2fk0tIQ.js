import{s as d,n as t}from"../chunks/scheduler.seBsrkbn.js";import{S as s,i as r,e as c,c as l,l as h,m,g as p,d as u}from"../chunks/index.Dwxb9V0m.js";function g(){return{title:"Chapter 6: Basic Editing",description:"Some common and some not-so-common techniques for modifying text in LazyVim, the Neovim distribution.",keywords:"vim, lazyvim, neovim, tutorial, editing, navigating, vim mental modal"}}const b=Object.freeze(Object.defineProperty({__proto__:null,load:g},Symbol.toStringTag,{value:"Module"}));function v(i){let e,a=`<h2 id="_basic_editing"><a class="link" href="#_basic_editing">Chapter 6. Basic Editing</a></h2> <div class="sectionbody"><div class="paragraph"><p>Armed with the navigation keybindings you’ve already learned and the ability to
enter and leave Insert mode at will, your Vim editing experience is getting
pretty close to on par with what you might be used to in non-modal editors.</p></div> <div class="paragraph"><p>However, moving around and inserting text is a very small part of the life of a
software developer. More often, you need to <em>edit</em> text. Deleting code,
changing code, refactoring code, moving code around. It’s the majority of what
we do.</p></div> <div class="paragraph"><p>Yes, you can do all of these things by navigating to where you want to, and
entering Insert mode. The delete and backspace keys do the same thing in Insert
mode that they do in other editors. But there are far more efficient tools
available.</p></div> <div class="paragraph"><p>The best part is that you already know most of what you need to take advantage
of very powerful editing commands!</p></div> <div class="sect2"><h3 id="_the_vim_command_mental_model"><a class="link" href="#_the_vim_command_mental_model">6.1. The Vim Command Mental Model</a></h3> <div class="paragraph"><p>The navigation commands such as <code>s</code> and <code>f</code> and <code>hjkl</code> and <code>web</code> that you already
know are collectively known as <em>motion</em> commands. They move the cursor from
its current location to a new location.</p></div> <div class="paragraph"><p>Most motion commands can be prefixed with a count, so the navigation model is
always <code>&lt;count&gt;&lt;motion&gt;</code>. A count usually repeats the
motion a certain number of times, although some commands such as <code>Shift-G</code> for
“Go to line” will use the count as an absolute value instead. If the count is
blank, the “default” count is typically <code>1</code>. Even a Seek command which uses
labels is allowed to be prefixed with a count…​ although the count will be
ignored!</p></div> <div class="paragraph"><p>The <code>&lt;count&gt;&lt;motion&gt;</code> commands are great for navigation, which is all we’ve
used them for so far, but they can also be combined with a <em>verb</em> to do something
to the text between the cursor and the location the motion would move you to.</p></div> <div class="paragraph"><p>Verbs come first, so the structure is always <code>&lt;verb&gt;&lt;count&gt;&lt;motion&gt;</code>.
Navigation is the “default” verb, so if you leave the verb blank (i.e. skip
it), your cursor moves to the location indicated by the motion. We’ll discuss
various important verbs in this chapter.</p></div> <div class="paragraph"><p>But the model keeps growing! It turns out, verbs can <em>also</em> be counted. The
syntax becomes <code>&lt;count&gt;&lt;verb&gt;&lt;count&gt;&lt;motion&gt;</code>. I have never in my life used all
four of those in one command, however. Typically you would either do
<code>&lt;count&gt;&lt;verb&gt;&lt;motion&gt;</code> <strong>or</strong> <code>&lt;verb&gt;&lt;count&gt;&lt;motion&gt;</code>.</p></div> <div class="paragraph"><p>This model is nice because it allows you to divide and conquer your learning
strategy, and reuse knowledge as you study. First you learned motion
commands. Then you learned counts. Now you will learn verbs. If you learn new
motion commands or new verbs in the future, you can mix them with all the verbs
and motions you already know and they should behave in a predictable way.</p></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content">Various plugins try to mimic this strategy, and, well, most are
successful. My main complaint with Neo-tree is that it doesn’t operate with the
<code>&lt;verb&gt;&lt;motion&gt;</code> mental model, while mini.files does. Similarly, some folks
argue that Seek mode violates the Vim mental model because counts don’t make
sense with it. My opinion is that Seek mode simply transcends counts, but it
still combines cleanly with verbs so it is a valid Vim model.</td></tr></tbody></table></div> <div class="sect3"><h4 id="_a_note_on_insert_mode"><a class="link" href="#_a_note_on_insert_mode">6.1.1. A Note on Insert Mode</a></h4> <div class="paragraph"><p>Like all models, this one is not perfect. For example, you can use counts with
the <code>i</code>, <code>I</code>, <code>a</code>, and <code>A</code> commands, but it’s clear that “enter Insert mode” is
neither a motion nor a verb.</p></div> <div class="paragraph"><p>For example, if you type <code>5ifoo&lt;Escape&gt;</code>, Neovim will insert <code>foofoofoofoofoo</code>
for you. That may not seem very useful, but if you ever want an 80 character
<code>*</code> ruler to underline a heading, <code>80i*&lt;Escape&gt;</code> is pretty nifty!</p></div> <div class="paragraph"><p>But the <code>&lt;count&gt;i</code> “not-motion” commands <em>cannot</em> be combined with verbs like
the navigation commands you’ve learned. So it’s important to know the limits
of the model.</p></div> <div class="paragraph"><p>So now that you understand how the motions you already know can combine with
verbs to perform actions other than navigation, you just need to learn some
verbs.</p></div></div></div> <div class="sect2"><h3 id="_deleting_text"><a class="link" href="#_deleting_text">6.2. Deleting Text</a></h3> <div class="paragraph"><p>I’ve previewed this a couple times already, and even if I hadn’t, you can
probably guess that the verb for deleting text is <code>d</code>.</p></div> <div class="paragraph"><p>So where <code>&lt;motion&gt;</code> will take you to a specific location in the code, <code>d&lt;motion&gt;</code>
will delete all the text between the cursor and that location. Here are some
examples:</p></div> <div class="ulist"><ul><li><p><code>dh</code> to delete the character to the left of the cursor.</p></li> <li><p><code>d3w</code> to delete three words.</p></li> <li><p><code>3dw</code> to delete one word, three separate times.</p></li> <li><p><code>d^</code> to delete from the cursor to the beginning of the line.</p></li> <li><p><code>d2fe</code> to delete all text between the cursor location and the second <code>e</code>
after the cursor, including that second <code>e</code>.</p></li> <li><p><code>d2Ta</code> to delete all text between the cursor and the second <code>a</code> <em>behind</em> the
cursor, <em>not</em> including that second <code>a</code>.</p></li> <li><p><code>dsfoos</code> to delete text between the current cursor position and the label <code>s</code>
that pops up when you use Seek mode to seek to <code>foo</code>. Note that Seek mode
<strong>always</strong> jumps to the beginning of the word you searched for. This means
that if the <code>foo</code> you jump to is <em>after</em> the current cursor location, the
<code>oo</code> will not be deleted, but the <code>f</code> will. But if the <code>foo</code> you jump to is
<em>before</em> the current cursor location, all three letters of <code>foo</code> will be
deleted.</p></li></ul></div> <div class="paragraph"><p>If any of those are surprising, ignore the <code>d</code> and refer back to chapter 3 to
refresh your memory of the motions.</p></div> <div class="paragraph"><p>So <code>d</code> will work with all the motion commands you know, as well as all the
motion commands you don’t know yet, <strong>and</strong> all the motion commands that are
defined by plugins you haven’t yet installed.</p></div> <div class="paragraph"><p>When the delete command is completed, Neovim will still be in Normal mode, and
you can immediately perform any other <code>&lt;verb&gt;&lt;motion&gt;</code> combination.</p></div></div> <div class="sect2"><h3 id="_changing_text"><a class="link" href="#_changing_text">6.3. Changing Text</a></h3> <div class="paragraph"><p>Sometimes you just want to delete text, but another common task is editing
text. Replace a word with another word, change spelling, delete the rest of the
paragraph and replace it with something new, etc.</p></div> <div class="paragraph"><p>This <em>could</em> easily be handled by combining the delete verb with Insert mode (e.g.
<code>dwi</code> will delete a word and enter Insert mode.) However, you can save a
keystroke by using the <code>c</code> verb, which means “<strong>c</strong>hange”. If you replace the
<code>d</code> in each of the examples I outlined above with a <code>c</code>, you will effectively
get “delete the text and immediately enter Insert mode.”</p></div></div> <div class="sect2"><h3 id="_operating_to_end_of_the_current_line"><a class="link" href="#_operating_to_end_of_the_current_line">6.4. Operating to End of the Current Line</a></h3> <div class="paragraph"><p>It is very common to want to delete or change from the cursor position to the
end of the current line, leaving the beginning of the line intact. These
actions happen more often than you would expect in source code editing, so
there is a shortcut for them.</p></div> <div class="paragraph"><p>Yes you <em>could</em> <code>d$</code> and <code>c$</code> to delete or change to the end of the line, since
<code>$</code> is the “jump to end of line” motion. That is the “correct” format for
the mental model. However, because this is such a common operation, you can
“cheat” with one fewer keystrokes and just use the capitalized <code>D</code> or <code>C</code>
instead.</p></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content">There is no inverse shortcut verb for “delete to the beginning of the
line”, so you’ll have to use <code>d^</code> or <code>d0</code> instead, where <code>^</code> is the motion to
jump to the first non-blank character and <code>0</code> is the motion to jump to the
first column regardless of whether it is blank.</td></tr></tbody></table></div></div> <div class="sect2"><h3 id="_operating_on_entire_lines"><a class="link" href="#_operating_on_entire_lines">6.5. Operating on Entire Lines</a></h3> <div class="paragraph"><p>Another common action is to change or delete an <em>entire</em> line of text. So
much so, in fact, that there are special motions for “the whole line”. These
motions are accessed by duplicating the verb. This is another place where the
mental model kind of breaks down; the interpretation of the motion <em>depends</em> on
the verb.</p></div> <div class="paragraph"><p>In practice, this just means that <code>dd</code> deletes an entire line and <code>cc</code> deletes
it and enters Insert mode. These are nice and easy to type, so it makes for a
nice shorthand.</p></div> <div class="paragraph"><p>You can combine these bespoke motions with counts. <code>d3d</code> will delete three
lines, and <code>3dd</code> will delete one line three times (which is faster to type
because you don’t have to move your finger off of <code>d</code> to hit it twice). Yes,
that has the same outcome either way, but the model is such that you can use
either of them. Note that there are situations where the two formats may have
subtly different behaviours, although in practice I have never encountered
surprises.</p></div></div> <div class="sect2"><h3 id="_some_shortcuts_for_modifying_individual_characters"><a class="link" href="#_some_shortcuts_for_modifying_individual_characters">6.6. Some Shortcuts for Modifying Individual Characters</a></h3> <div class="paragraph"><p>Another common operation is to perform a delete or change operation on a single
character or specific number of characters. You could do this using <code>dl</code> to
delete the character under the cursor or <code>4dl</code> to delete that character and the
three characters that come after it. However, because you do this so often,
there is a shorthand verb that doesn’t have a motion (or rather, the motion is
implied): <code>x</code>. For example, you can use <code>x</code> to delete an extraneous <code>u</code> in
words like “behaviour” if you prefer American spelling. The single letter
will be deleted, and you’ll be back in Normal mode ready to proceed.</p></div> <div class="paragraph"><p>The <code>x</code> command can be used with a count, so if you want to delete five
characters starting with the one under the cursor, just use <code>5x</code>.</p></div> <div class="paragraph"><p>If you need to go the other direction and delete characters <em>before</em> the
cursor, use a capital <code>X</code>. This, too, can have a count, and it will basically
delete that many characters to the left. I rarely use this, since the shift
brings us up to two keystrokes anyway, and <code>hx</code> or <code>d4h</code> is no harder.</p></div> <div class="paragraph"><p>If, instead of deleting, you need to replace a character with a different
character, use the <code>r</code> command. This command will briefly enter Insert mode
while you type one character, then immediately return to Normal mode. Much
fewer keystrokes for a common operation (spelling errors are common, right?
It’s not just me?) than something like <code>cle&lt;Escape&gt;</code>. Using <code>r</code> with a count is
possible, but the behaviour is kind of unhelpful: it will replace the character
under the cursor and the <code>&lt;count&gt;</code> number of characters after that character
with the same letter. The only place I can imagine this being helpful is when
you copy-paste a password prompt from somewhere and need to replace all the
characters in the password with <code>*</code>.</p></div> <div class="paragraph"><p>Another common operation is deleting the newline at the end of the current
line. Use the <code>J</code> (“<strong>J</strong>oin Lines”) command from anywhere in the
line. I use this one a lot. If you need to merge multiple consecutive lines
together, <code>J</code> takes a count. It generally does the right thing around
whitespace (replacing indentation with a single space), but if you need to do a
join without modifying whitespace, use the two-character verb <code>gJ</code>.</p></div></div> <div class="sect2"><h3 id="_manipulating_case"><a class="link" href="#_manipulating_case">6.7. Manipulating Case</a></h3> <div class="paragraph"><p>If you need to convert a character or sequence of characters to uppercase, use
the verb <code>gU</code> (that’s a shifted <code>U</code> for the second character) followed by any
standard navigation motion. I find this particular verb frustrating because <code>g</code> is
normally assigned to the <code>Go To</code> motions. In this case, (as with <code>gJ</code> above) it
is a verb instead.</p></div> <div class="paragraph"><p>I guess you can think of it as “Go To and Convert to Uppercase” where <code>U</code> is
short for <code>Uppercase</code>.</p></div> <div class="paragraph"><p>The inverse function to convert all text between the current cursor position
and the motion destination is to use a lowercase <code>gu</code> before the motion. Kind
of weird to remember, but it does match the common Vim idiom of <code>gu</code> means
an action and <code>gU</code> means the same action BUT BIGGER.</p></div> <div class="paragraph"><p>The duplicate commands <code>gUgU</code> and <code>gugu</code> do the same thing as other duplicate
verbs, applying the upper/lower case operation to the entire line. It’s a
rather annoying sequence of keypresses, though, so it is probably better to use
Visual mode (which we will cover in Chapter 8) to select a line with <code>V</code> and
then apply the Visual mode verbs <code>U</code> or <code>u</code>.</p></div> <div class="paragraph"><p>I don’t find these commands very useful. I more frequently use the <code>~</code> command,
which inverts the case of the character under the cursor.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">If you find yourself doing a lot of case switching work, have a look at
the <a href="https://github.com/gregorias/coerce.nvim">coerce.nvim</a> plugin. It doesn’t
have a LazyVim extra so you’ll need to configure it yourself, but it can be
worth the effort.</td></tr></tbody></table></div></div> <div class="sect2"><h3 id="_repeating_commands"><a class="link" href="#_repeating_commands">6.8. Repeating Commands</a></h3> <div class="paragraph"><p>LazyVim doesn’t have a multiple cursor mode. There <em>are</em> plugins to support
multiple cursors, but in my experience they don’t work very well. The Neovim
developers have multiple cursors on their roadmap, so I am hoping they will
come up with a paradigm that integrates nicely with the Vim mental model.</p></div> <div class="paragraph"><p>In the meantime, Neovim provides several different tools available for
performing an action in multiple places in your code. We’ll cover basic
repetitions here, and other useful techniques in later chapters.</p></div> <div class="paragraph"><p>Once you have performed any verb, you can navigate to another place in the
document and repeat that verb with a single keypress: <code>.</code> (That’s a period,
although you will usually hear it referred to as “dot repeat” in this context).</p></div> <div class="paragraph"><p>This highlights why <code>d</code> and <code>c</code> need to be separate verbs, as opposed to using
something like <code>d&lt;motion&gt;i</code>. When you use <code>c</code>, the delete motion <strong>and</strong> the
text you inserted is remembered, so you can repeat the entire change with a <code>.</code>
command. For example, if you want to replace all instances of a variable named
<code>i</code> with a much better name of <code>index</code>, you could jump to the first instance of
<code>i</code> and type <code>clindex&lt;Escape&gt;</code> to “change one character to index”. Then you
can use navigation commands to go to the next use of <code>i</code>. Now just type <code>.</code> to
repeat the change and continue to the next instance.</p></div> <div class="paragraph"><p>Like motions and verbs, the <code>.</code> command can be given a count. However, counts
with <code>.</code> are a little bit nuanced. Rather than blindly repeating the command
<code>&lt;count&gt;</code> number of times, it will instead <em>replace</em> the count of the command
being repeated.</p></div> <div class="paragraph"><p>This means that if you use the verb <code>3dd</code> to delete three lines, and the next
operation you perform is <code>2.</code> (“2 dot”), the second operation will delete <em>two</em>
lines, rather than six.</p></div></div> <div class="sect2"><h3 id="_recording_commands"><a class="link" href="#_recording_commands">6.9. Recording Commands</a></h3> <div class="paragraph"><p>Vim’s command recording and playback system is extremely powerful. You can
trivially record an arbitrary sequence of navigation, editing, and insertion
commands, then repeat that sequence on demand at any location you want.</p></div> <div class="paragraph"><p>To start a recording, press <code>qq</code>. Sorry, but I have no mnemonic to remember
<code>q</code>. I have a feeling it was just the last available key on the keyboard!</p></div> <div class="paragraph"><p>After that, type whatever sequence of navigation, editing, and insertion
commands you want to record. Delete words, insert text, change text, search for
words (don’t use Seek mode, as the replay mechanism will have no idea what
label to jump to). Virtually anything you can do in Vim (even <code>:</code> commands) can
be recorded and replayed later.</p></div> <div class="paragraph"><p>When you are finished recording, just press <code>q</code> again. The recording will be
stored ready for replay whenever you desire.</p></div> <div class="sect3"><h4 id="_appending_to_a_recording"><a class="link" href="#_appending_to_a_recording">6.9.1. Appending to a Recording</a></h4> <div class="paragraph"><p>If you partially complete your recording and then realize you need some more
information or need to make an edit before completing the recording, you can
stop the recording using <code>q</code> as usual and do the thing you need to do.</p></div> <div class="paragraph"><p>When you are ready to continue recording, use <code>qQ</code> to record in <em>append</em> mode
instead. The main tip here is that you need to make sure your cursor is in a
location such that the merged recording will make sense. This usually means the
same place it was when you stopped recording, although it may depend on what
changes you made in the meantime.</p></div></div> <div class="sect3"><h4 id="_playing_back_a_recording"><a class="link" href="#_playing_back_a_recording">6.9.2. Playing Back a Recording</a></h4> <div class="paragraph"><p>The easiest and fastest way to play back your most recently saved recording is
with a capital <code>Q</code>.</p></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content">It is possible to store and replace multiple recordings at once using
<em>registers</em> (a stupid name for a storage location that harkens back to
humanity’s dark days of assembly programming). We will go into more detail
about registers in chapter 8.</td></tr></tbody></table></div></div></div> <div class="sect2"><h3 id="_undo_and_redo"><a class="link" href="#_undo_and_redo">6.10. Undo and Redo</a></h3> <div class="paragraph"><p>Obviously, these are the most important operations in the whole book! Use the
<code>u</code> key to undo your most recent change. Note that “most recent change” can be
a pretty big whack of text, especially if you haven’t exited Insert mode for a
while. For example, I wrote this entire paragraph in one Insert session. If I
press <code>u</code> the entire paragraph will be lost.</p></div> <div class="paragraph"><p>That’s ok, though, because I can redo using <code>Control-r</code>. Like most developers,
I use both of these extensively. (Did you know that in the old days of
typewriters, secretaries had to get 100% accuracy scores on their typing tests?
There was no backspace or delete key, you see).</p></div> <div class="paragraph"><p>Neovim actually does an amazing job of keeping track of your entire history,
rather than just the most recent suite of changes. So if you make a bunch of
changes to get to state B, then undo to state A, and then make a bunch more
changes to get to state C, it is still possible to get back to state B (ie:
back out of the C changes to state A and go back up the B changes to state B).</p></div> <div class="paragraph"><p>It’s kind of the same concept as git branches, except your history is
<em>automatically</em> tracked for every keystroke you make. Working with branches of
undo history using raw Neovim commands can feel pretty clumsy, though (read
through <code>:help undo-branches</code> if you’re brave). Instead I recommend configuring
and installing the <a href="https://github.com/jiaoshijie/undotree">undotree</a> plugin.</p></div> <div class="paragraph"><p>About 99.9% of the time, <code>u</code> and <code>Control-r</code> will be all you need, but that remaining
0.1% can make <code>undotree</code> a godsend when you need it.</p></div></div> <div class="sect2"><h3 id="_summary_6"><a class="link" href="#_summary_6">6.11. Summary</a></h3> <div class="paragraph"><p>In this chapter, we expanded our understanding of the Vim mental model, and
then introduced several verbs that can be combined with the navigation motions
we were already familiar with.</p></div> <div class="paragraph"><p>We discussed an assortment of other editing commands before covering how to repeat
motions using <code>.</code> and command recordings. Finally, we covered undo and redo.</p></div> <div class="paragraph"><p>In the next chapter, we’ll learn about text objects and some additional nuances
of the Vim mental model with operator-pending mode. Combined, these allow us to
very quickly perform actions on a huge variety of code constructs.</p></div></div></div>`;return{c(){e=c("div"),e.innerHTML=a,this.h()},l(o){e=l(o,"DIV",{class:!0,"data-svelte-h":!0}),h(e)!=="svelte-u96rwm"&&(e.innerHTML=a),this.h()},h(){m(e,"class","sect1")},m(o,n){p(o,e,n)},p:t,i:t,o:t,d(o){o&&u(e)}}}class w extends s{constructor(e){super(),r(this,e,null,v,d,{})}}export{w as component,b as universal};
