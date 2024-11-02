import{s as n,n as t}from"../chunks/scheduler.seBsrkbn.js";import{S as r,i as c,e as p,c as l,l as d,m as h,g as u,d as m}from"../chunks/index.Dwxb9V0m.js";function g(){return{title:"Chapter 16: Configuring Artificial Intelligence ",description:"LazyVim ships with a variety of tools for interacting with git repositories.",keywords:"vim, lazyvim, neovim, tutorial, course, book, tips, source control, version control, git"}}const w=Object.freeze(Object.defineProperty({__proto__:null,load:g},Symbol.toStringTag,{value:"Module"}));function v(i){let e,o=`<h2 id="_configuring_artificial_intelligence"><a class="link" href="#_configuring_artificial_intelligence">Chapter 16. Configuring Artificial Intelligence</a></h2> <div class="sectionbody"><div class="paragraph"><p>This book was initially written in 2024, and I predict this year will be the
one in which the world goes from making up crazy predictions about AI to it
being part of our daily lives. It will be fun to revisit this statement if I
get to publish a second edition. I know we’re all sick to death of hearing
about the future of AI, so this chapter is entirely about the present of AI.</p></div> <div class="paragraph"><p>Unfortunately, the present of AI is a bit of a mess. We don’t yet know which of
the various AI tools will become dominant. So this content will quickly become
out of date. Hopefully the techniques and lessons it describes will be
applicable to whatever the next generation of AI coding platforms will be.</p></div> <div class="paragraph"><p>LazyVim has excellent support for several AI coding tools. You’ll probably need
to try each of them and figure out which works best for you, and “best” is
probably going to change many times over the coming months (it reminds me of
the browser wars at the turn of the century).</p></div> <div class="paragraph"><p>At the time of writing, if you are willing to pay for it, GitHub Copilot is
probably the best, and if you just want to get started with a free tool,
Codeium easily has the most capable AI in their free tier.</p></div> <div class="sect2"><h3 id="_basic_anatomy"><a class="link" href="#_basic_anatomy">16.1. Basic Anatomy</a></h3> <div class="paragraph"><p>Most AI-coding tools integrate with <code>nvim-cmp</code>, the plugin LazyVim uses for
completions and snippets, and this is the simplest way to get started with
them.</p></div> <div class="paragraph"><p>Some plugins also have a “chat” feature that allows you to communicate with
the AI in a more interactive way. In my experience, these features don’t work
very well right now, with one exception that we will cover.</p></div></div> <div class="sect2"><h3 id="_codeium"><a class="link" href="#_codeium">16.2. Codeium</a></h3> <div class="paragraph"><p>If you’ve never used AI for coding before, you may be skeptical as to whether
it’s worth paying for. In fact, I use it extensively, and I’m still skeptical!
Codeium is a great place to start because the free “Individual” tier is “smart
enough to be useful.”</p></div> <div class="paragraph"><p>It’s also faster and more responsive, and when it comes to waiting for
completion menus to pop up, inaccurate but fast is often more useful than
accurate but slow.</p></div> <div class="paragraph"><p>To get started, you will need an account on <a href="https://codeium.com/">codeium.com</a>.</p></div> <div class="paragraph"><p>Enabling Codeium in LazyVim is dead simple: just open the <code>:LazyExtras</code>
command and find <code>coding.codeium</code>. Hit <code>x</code> to install it as usual and restart
Neovim.</p></div> <div class="paragraph"><p>You should be presented with a window to authenticate Codeium automatically.
If not, type the command <code>:Codeium Auth</code>. You will see a simple menu:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-16/codeium-auth-dark.png" alt="codeium auth dark"/></div> <div class="title">Figure 86. Codeium Auth</div></div> <div class="paragraph"><p>Select the option most appropriate for you to open a URL in a web browser.
The default will work for most people, but if you are running Neovim over
SSH or in a docker container you might need to get more creative.</p></div> <div class="paragraph"><p>Once logged in, you’ll see a page with a token in it and instructions to copy
it to your clipboard. Do so, then paste it in the <code>Token</code> box waiting in
Neovim. If you’ve lost this box, you can find it again by typing <code>:Codeium
Auth</code> and selecting “I already have a key”.</p></div> <div class="paragraph"><p>You may want to restart your editor again. Now, while you are coding, you’ll
get Codeium entries in your completion menu:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-16/codeium-cmp-dark.png" alt="codeium cmp dark"/></div> <div class="title">Figure 87. Codeium Cmp</div></div> <div class="paragraph"><p>As you can see by the preview to the right, the completions may be multi-line.
Sometimes, they are accurate and useful. Other times, not so much. (I once
tried to get ChatGPT to tell me what percentage of the time it is accurate and
it flat out refused to give me a number).</p></div> <div class="paragraph"><p>As with everything AI, don’t rely on the answers, but it can save you a few
keystrokes every once in a while, and that’s all any Vim user really wants in
life.</p></div> <div class="sect3"><h4 id="_codeium_chat"><a class="link" href="#_codeium_chat">16.2.1. Codeium Chat</a></h4> <div class="paragraph"><p>Codeium has a chat feature that you can access through their web UI. I was
excited to hear that an “in-editor” chat experience was recently added to
Codeium.nvim but all it does is open a web browser to the chat window. The
Codeium chat is (at time of writing) not terribly sophisticated and I find it
nearly as frustrating to use as Eliza, so my recommendation is: don’t bother.</p></div></div></div> <div class="sect2"><h3 id="_github_copilot"><a class="link" href="#_github_copilot">16.3. GitHub Copilot</a></h3> <div class="paragraph"><p>GitHub Copilot is considered the current (2024) gold standard for AI-driven
coding. From an enterprise perspective, its primary advantage is that if you
already use GitHub, your security team has already vetted it. From a developer
perspective, I find it a bit slow, but more accurate than other AI tools I’ve
tried.</p></div> <div class="paragraph"><p>I think Copilot justifies its cost, although it sure doesn’t make me 55% faster
like the GitHub marketing page says it does. As an unemployed author, I
recently cancelled my subscription and don’t miss it, so…​ your mileage may
vary.</p></div> <div class="paragraph"><p>First, sign up for an account on
<a href="https://www.github.com/features/copilot">GitHub</a>. It’s free for 30 days so you
can decide if it’s worth it before submitting an expense to your employer.</p></div> <div class="paragraph"><p>There are several different LazyVim plugins that support Copilot. The easiest
is to use the <code>:LazyExtras</code> command and enable <code>coding.copilot</code>. This enables
the <code>zbirenbaum/copilot.lua</code> plugin, which creates nvim-cmp completions similar
to those that the codeium plugin provides.</p></div> <div class="paragraph"><p>Similar to Codeium, type the command <code>:Copilot auth</code> to enable your account and
follow the prompts. You’ll be given a code to type into a browser window on
GitHub.</p></div> <div class="paragraph"><p>After that, you should see Copilot completions in your nvim-cmp popups just
like you did with Codeium. You can use both at the same time, but be aware that
it’s hard on the environment <strong>and</strong> your network connection!</p></div> <div class="sect3"><h4 id="_copilot_chat"><a class="link" href="#_copilot_chat">16.3.1. Copilot Chat</a></h4> <div class="paragraph"><p>The copilot.lua plugin provides completions and little else. However, there
is a second LazyVim extra you can enable that I really enjoy:
<code>coding.copilot-chat</code>.</p></div> <div class="paragraph"><p>Restart Neovim, and if everything is set up correctly, you should be able to
use the keybinding <code>&lt;Space&gt;aa</code> to open a chat session (where <code>a</code> opens the “ai”
menu). This will be a normal Neovim buffer that you can append text to in
Insert mode. There are several keyboard shortcuts available to aid your
chatting, summarized right in the chat window:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-16/copilot-chat-help-dark.png" alt="copilot chat help dark"/></div> <div class="title">Figure 88. Copilot Chat Help Menu</div></div> <div class="paragraph"><p>In normal usage, you will be editing a file and then realize you want to send
some subset of the file to Copilot to have it rewrite it. Select the code in
Visual mode and hit <code>&lt;Space&gt;aa</code>. This will store the selected code and show
the copilot chat window.</p></div> <div class="paragraph"><p>Input a question about the code you had selected and hit either <code>Control-s</code> (<code>s</code>
for “<strong>s</strong>end”) (in Insert or Normal mode), or <code>&lt;Enter&gt;</code> while in Normal mode to
submit it. The plugin will add the code to your query automatically. Then wait
(patiently) for a response. The response will contain the typical AI drivel
describing what it did, and, most likely, some code.</p></div> <div class="paragraph"><p>If the code does what you want, simply hit <code>Control-y</code> (<code>y</code> for “yes”) to accept
it, replacing whatever you had selected with the AI text. If not, enter Insert
mode and post a follow-up question to guide the AI to what you were actually
looking for.</p></div> <div class="paragraph"><p>If the chat is getting out of control, as often happens with generative AI, hit
<code>Control-l</code> to reset it. This is a safer course of action than typing a bunch of
curses to the AI. Nowadays, it just becomes embarrassingly over-conciliatory,
but you can be sure they have long memories, and you don’t want to be the
person who cussed out the AI when it becomes your boss!</p></div> <div class="paragraph"><p>The Extra configures a few other handy keybindings for interacting with
copilot-chat, all of them in the <code>&lt;Space&gt;a</code> submode. The “prompt” menu with
<code>&lt;Space&gt;ap</code> is particularly helpful if you want to instruct Copilot to do
something specific like write a test or commit message. You can also use
<code>&lt;Space&gt;ad</code> while a diagnostic is displayed to get more information about that
diagnostic.</p></div></div></div> <div class="sect2"><h3 id="_tabnine"><a class="link" href="#_tabnine">16.4. TabNine</a></h3> <div class="paragraph"><p>The advantage of TabNine is that it can run locally on your device, a very
important feature for certain enterprise situations or anywhere that
intellectual property matters (I wouldn’t be surprised if AI destroys the
concept of intellectual property once and for all. The advantages of a
hive-mind may well outweigh the long-term advantages of corporate ownership).</p></div> <div class="paragraph"><p>You can configure Tabnine in Neovim similarly to Codeium and
Copilot. LazyVim ships with support to integrate TabNine with nvim-cmp to get
completion sources. You can enable it with the <code>:LazyExtras</code> command and <code>x</code> on
the <code>coding.tabnine</code> line.</p></div> <div class="paragraph"><p>Restart Neovim. You’ll probably have to wait a while for the plugin to download
and install TabNine, but it <strong>should</strong> all be taken care of for you. Once the plugin
is installed, run <code>:CmpTabnineHub</code> to authenticate yourself, then restart Neovim
one more time.</p></div> <div class="paragraph"><p>Now you should see TabNine completions in your list. I find they are virtually
useless on the basic plan.</p></div> <div class="paragraph"><p>TabNine also has a newish official Neovim plugin named tabnine-nvim. It even
has a chat mode, but this mode requires running a separate binary to show the
chat window alongside your editor. This is obviously problematic if you want to
use Neovim inside ssh or docker sessions, and installing it requires setting up
the entire Rust and GTK toolchain, so it is beyond the scope of this book.</p></div></div> <div class="sect2"><h3 id="_sourcegraph_cody"><a class="link" href="#_sourcegraph_cody">16.5. Sourcegraph Cody</a></h3> <div class="paragraph"><p>Cody theoretically has an advantage over some of the other AI tools because it
has access to Sourcegraph’s insights into the structure of your codebase. They
recently updated to Claude V3 for their chats, so conversations with it are
fairly natural.</p></div> <div class="paragraph"><p>Unlike the other mentioned tools, there is currently no LazyVim Extra for
Sourcegraph or Cody. Instead, you’ll need to install the sg.nvim
plugin manually:</p></div> <div class="listingblock"><div class="title">Listing 53. Source Graph Cmp Configuration</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-p">{</span>
    <span class="tok-s2">&quot;nvim-cmp&quot;</span><span class="tok-p">,</span>
    <span class="tok-n">dependencies</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-s2">&quot;sourcegraph/sg.nvim&quot;</span> <span class="tok-p">},</span>
    <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-kr">function</span><span class="tok-p">(</span><span class="tok-n">_</span><span class="tok-p">,</span> <span class="tok-n">opts</span><span class="tok-p">)</span>
      <span class="tok-nb">table.insert</span><span class="tok-p">(</span><span class="tok-n">opts</span><span class="tok-p">.</span><span class="tok-n">sources</span><span class="tok-p">,</span> <span class="tok-mi">1</span><span class="tok-p">,</span> <span class="tok-p">{</span> <span class="tok-n">name</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;cody&quot;</span> <span class="tok-p">})</span>
    <span class="tok-kr">end</span><span class="tok-p">,</span>
  <span class="tok-p">},</span>
  <span class="tok-p">{</span>
    <span class="tok-s2">&quot;sourcegraph/sg.nvim&quot;</span><span class="tok-p">,</span>
    <span class="tok-n">dependencies</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-s2">&quot;nvim-lua/plenary.nvim&quot;</span><span class="tok-p">,</span>
      <span class="tok-s2">&quot;nvim-telescope/telescope.nvim&quot;</span>
    <span class="tok-p">},</span>
    <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>You can leave the Telescope dependency off if you prefer Fzf.lua, but SourceGraph
is not aware of other pickers so some features will not work.</p></div> <div class="paragraph"><p>Sign up for an account over at <a href="https://sourcegraph.com/" class="bare">https://sourcegraph.com/</a> and
then run the <code>:SourcegraphLogin</code> command. Note that the <code>g</code> is <strong>not</strong>
capitalized; I thought my plugin wasn’t installed correctly and spent half an
hour debugging that typo.</p></div> <div class="paragraph"><p>This plugin is more than just an AI completion tool; it also gives you access
to commands to browse your code using Sourcegraph. For example, the
<code>SourcegraphSearch</code> command will pop up the Telescope picker if it is
installed. You may prefer it over the ripgrep-based search feature we discussed
in Chapter 12. The product is actually capable of much more than that, and can
even dive into code in dependencies hosted on GitHub. You can learn more about
available features by reading through <code>:help sg.nvim</code>.</p></div> <div class="paragraph"><p>If things aren’t working correctly, use <code>:checkhealth sg</code> to help understand
what went wrong.</p></div> <div class="paragraph"><p>With the above configuration, nvim-cmp completions should work similarly
to the other tools. To interact with the Cody chat assistant, use the command
<code>:CodyAsk</code> with a prompt. For example, select some code and type
<code>:CodyAsk what does this do?</code></p></div> <div class="paragraph"><p>A window pops up in front of your code that looks like a chat interface,
with some keybinding tips on the right side:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-16/cody-ask-dark.png" alt="cody ask dark"/></div> <div class="title">Figure 89. Cody Ask Chat</div></div> <div class="paragraph"><p>Other chat commands you may want to read about in the help files include
<code>:CodyChat!</code>, <code>:CodyTask</code>, <code>:CodyToggle</code>, <code>:CodyExplain</code>, and <code>:CodyRestart</code>.</p></div></div> <div class="sect2"><h3 id="_what_about_chatgpt"><a class="link" href="#_what_about_chatgpt">16.6. What About ChatGPT?</a></h3> <div class="paragraph"><p>ChatGPT is a good coding assistant, and there are several plugins that
integrate nicely with the editor. They all require an OpenAI API key, which
tends to be a lot more expensive than opening ChatGPT in the browser and asking
it questions on the paid plan, then copying text over in the most awful way
possible.</p></div> <div class="paragraph"><p>For the most part, I think GitHub Copilot is as smart as ChatGPT (about coding,
anyway), and the CopilotChat plugin is a nice interface, so I recommend that
instead.</p></div> <div class="paragraph"><p>If you want to explore integrating ChatGPT, Claude, Gemini, or several other AI
engines into Neovim, check out the
<a href="https://github.com/frankroeder/parrot.nvim">parrot.nvim</a> plugin. Configuration is
similar to the other tools above.</p></div></div> <div class="sect2"><h3 id="_summary_16"><a class="link" href="#_summary_16">16.7. Summary</a></h3> <div class="paragraph"><p>This chapter was all about AI. AI is a weirdly simple topic, considering the
complexity it abstracts away. Under the hood, LLMs are really cool, but the
interface to interacting with them is typically just a simple POST request to
some API somewhere (an API that is so useful we collectively don’t think hard
enough about how much we trust it).</p></div> <div class="paragraph"><p>Various Neovim plugins have created interfaces to these APIs. LazyVim makes it
easy to integrate many of them with nvim-cmp, and other services are covered
with third-party plugins.</p></div> <div class="paragraph"><p>Choosing between the various options is the hard part. None of them work quite
as well as I would like, yet all of them work too well for me to dismiss the
idea entirely.</p></div> <div class="paragraph"><p>Next up, we’ll discuss running debuggers from inside LazyVim.</p></div></div></div>`;return{c(){e=p("div"),e.innerHTML=o,this.h()},l(a){e=l(a,"DIV",{class:!0,"data-svelte-h":!0}),d(e)!=="svelte-j9gatl"&&(e.innerHTML=o),this.h()},h(){h(e,"class","sect1")},m(a,s){u(a,e,s)},p:t,i:t,o:t,d(a){a&&m(e)}}}class b extends r{constructor(e){super(),c(this,e,null,v,n,{})}}export{b as component,w as universal};
