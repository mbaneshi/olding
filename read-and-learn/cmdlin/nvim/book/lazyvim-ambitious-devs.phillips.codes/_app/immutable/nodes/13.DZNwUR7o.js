import{s as i,n as t}from"../chunks/scheduler.seBsrkbn.js";import{S as p,i as l,e as c,c as d,l as r,m as h,g,d as u}from"../chunks/index.Dwxb9V0m.js";function k(){return{title:"Chapter 17: Debugging",description:"LazyVim extras make it easier to set up debugging tools",keywords:"vim, lazyvim, neovim, tutorial, course, book, debugging, dap, debug adapter"}}const b=Object.freeze(Object.defineProperty({__proto__:null,load:k},Symbol.toStringTag,{value:"Module"}));function v(o){let s,e=`<h2 id="_debugging"><a class="link" href="#_debugging">Chapter 17. Debugging</a></h2> <div class="sectionbody"><div class="paragraph"><p>LazyVim supports debugging various programming languages right in the editor.
To be honest, I’ve spent my entire career debugging largely with logging
statements. I’ve always found that the trouble of setting up and integrating a
debugger is not worth the time it takes. They work well in toy projects, but
once you’re trying to get the debugger to co-operate with e.g. Docker (or get
anything to co-operate with Docker for that matter), or async third party
libraries, it always feels like it just wasn’t worth the effort.</p></div> <div class="paragraph"><p>So what I’m saying is: I’ve never used LazyVim’s debugging system, so writing
this chapter is a crash course for me as well. I always learn best by teaching
(and teach best by learning)!</p></div> <div class="sect2"><h3 id="_debug_adapter_protocol"><a class="link" href="#_debug_adapter_protocol">17.1. Debug Adapter Protocol</a></h3> <div class="paragraph"><p>In addition to language server providers, VS Code also brought us the Debug
Adapter Protocol, usually shortened to DAP. Like LSPs, DAP is an abstraction to
allow editors to integrate with a variety of debuggers without having to
reimplement the gritty language details of each one.</p></div> <div class="paragraph"><p>Neovim doesn’t have built-in support for DAP like it does for LSPs, but LazyVim
can be configured to enable a collection of essential plugins to use it. To do
so, simply install the <code>dap.core</code> LazyExtra.</p></div> <div class="paragraph"><p>If you have also enabled the lazy extras for your preferred programming language,
it is probably already configured to work with DAP. To double check, see if the
<code>lang.&lt;your-preferred-language&gt;</code> extra has a <code>nvim-dap</code> configuration section
in it. If it does, you <em>hopefully</em> don’t need to configure anything.</p></div></div> <div class="sect2"><h3 id="_basic_example_python"><a class="link" href="#_basic_example_python">17.2. Basic Example: Python</a></h3> <div class="paragraph"><p>If you have installed the <code>dap.core</code> and <code>lang.python</code> Lazy Extras, and you have
Python installed on your system, you are ready to start debugging.</p></div> <div class="paragraph"><p>I wrote a simple Python script to demonstrate this:</p></div> <div class="listingblock"><div class="title">Listing 54. A Python Script</div> <div class="content"><pre class="pygments highlight"><code data-lang="python"><span></span><span class="tok-k">def</span> <span class="tok-nf">main</span><span class="tok-p">():</span>
    <span class="tok-n">world_descriptions</span> <span class="tok-o">=</span> <span class="tok-p">[</span><span class="tok-s2">&quot;Hello&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;Cruel&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;Beautiful&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;Tired&quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;My&quot;</span><span class="tok-p">]</span>

    <span class="tok-k">for</span> <span class="tok-n">description</span> <span class="tok-ow">in</span> <span class="tok-n">world_descriptions</span><span class="tok-p">:</span>
        <span class="tok-nb">print</span><span class="tok-p">(</span><span class="tok-n">description</span> <span class="tok-o">+</span> <span class="tok-s2">&quot; world&quot;</span><span class="tok-p">)</span>
        <span class="tok-k">if</span> <span class="tok-n">description</span> <span class="tok-o">==</span> <span class="tok-s2">&quot;Tired&quot;</span><span class="tok-p">:</span>
            <span class="tok-nb">print</span><span class="tok-p">(</span><span class="tok-s2">&quot;&quot;</span><span class="tok-p">)</span>


<span class="tok-k">if</span> <span class="tok-vm">__name__</span> <span class="tok-o">==</span> <span class="tok-s2">&quot;__main__&quot;</span><span class="tok-p">:</span>
    <span class="tok-n">main</span><span class="tok-p">()</span></code></pre></div></div> <div class="paragraph"><p>(The <code>ifmain</code> snippet we noticed in chapter 14 came in handy!)</p></div> <div class="paragraph"><p>If you open this file in Neovim and press <code>&lt;Space&gt;d</code>, you’ll see a brand
new menu of debugging commands:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-17/menu-dark.png" alt="menu dark"/></div> <div class="title">Figure 90. Debugging Menu</div></div> <div class="paragraph"><p>Many of these only make sense if the debugger is already running.</p></div> <div class="paragraph"><p>Let’s move the cursor to the <code>print(description + &quot;world&quot;)</code> line and hit
<code>&lt;Space&gt;db</code> to set a breakpoint. Then we can use the <code>&lt;Space&gt;da</code> command to
open the run menu, which has these options (for the Python Extra) to start
debugging:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-17/run-args-dark.png" alt="run args dark"/></div> <div class="title">Figure 91. Run Args Menu</div></div> <div class="paragraph"><p>I don’t know why there are so many because options 1, 2, and 5 all seem to do
the same thing. Even when you hit enter with option 1 selected it prompts for
arguments. This example doesn’t need arguments, so I just hit enter a second
time. The program will run up to the breakpoint and open FIVE new windows
surrounding the current window (another vote for investing in big monitors):</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-17/debug-ui-dark.png" alt="debug ui dark"/></div> <div class="title">Figure 92. Debug UI</div></div> <div class="paragraph"><p>Let’s start by discussing the two windows under the editor:</p></div> <div class="ulist"><ul><li><p>The one on the left contains a toolbar with common debugging actions (most of
which can also be accessed from the <code>&lt;Space&gt;d</code> mini-mode). Depending on
language and environment, this window sometimes includes the program output, or
messages about actions you’ve taken since the debug session started. In my
Python setup, it remains blank.</p></li> <li><p>The small window on the right is where the console output so far is displayed, at
least for Python. Since this is the first run through the loop, there is
nothing in the console section, yet.</p></li></ul></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content">I’ve scaled the window down to fit in this book, but I would normally
have this maximized on my largest monitor if I was in an active debugging
session.</td></tr></tbody></table></div> <div class="paragraph"><p>Let’s check out the left sidebar, split into several windows:</p></div> <div class="dlist"><dl><dt class="hdlist1">Locals and Globals</dt><dd><p>Provide a list of known variables in the program and their
current values. These update as you step through the program. Anything with a
little triangle beside it can be expanded by moving the cursor to that line
(<code>s</code> mode is delightful here because you can use it to jump directly to the
window from the source code) and hitting <code>Enter</code>.</p> </dd><dt class="hdlist1">something.py</dt><dd><p>Shows a list of all the breakpoints currently set. In this case,
there is only one, but we can see it is at line 5 and get a preview of that line
of code. This information is also highlighted in the code window itself with an
arrow pointing at the currently breakpointed line or a big dot if it is not the
current breakpoint. This icon stays visible even after I hide the DAP UI with
<code>&lt;Space&gt;du</code>.</p> </dd><dt class="hdlist1">MainThread</dt><dd><p>Shows me the current call stack, which is admittedly pretty simple
in this particular program. As with locals and globals you may be able to
expand certain lines if there is a small triangle beside it. This program
doesn’t have any nested function calls so there’s nothing to see.</p> </dd><dt class="hdlist1">No Expression</dt><dd><p>I don’t currently have any watch expressions. This window is
super-powered because you can enter Insert mode in it. For example, I can add a
watch on the <code>description</code> variable by typing <code>i</code> followed by <code>description</code> and
then <code>enter</code>:</p></dd></dl></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-17/watch-dark.png" alt="watch dark"/></div> <div class="title">Figure 93. Watch Expression Input</div></div> <div class="paragraph"><p>I can now run <code>&lt;Space&gt;dc</code> a couple times to “continue” the debugging session,
which means it will run to the next breakpoint. Since our single breakpoint is
in a loop, it will break in the same place, but with new values:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-17/continues-dark.png" alt="continues dark"/></div> <div class="title">Figure 94. Break on Beautiful</div></div> <div class="paragraph"><p>Notice the word <code>Beautiful</code> in a few different places:</p></div> <div class="ulist"><ul><li><p>The <code>description</code> variable in the locals section</p></li> <li><p>The <code>description</code> watch we just added in the watches section</p></li> <li><p>In the editor window, we see <code>= Beautiful</code> beside the description in the
loop. Yes, the editor is able to show us the value of variables while we debug,
and this feedback is visible even after we hide the DAP UI!</p></li></ul></div> <div class="paragraph"><p>Also notice that we’ve been through the loop twice now, so the console output
section in the lower right now has two lines of output.</p></div> <div class="paragraph"><p>You can even edit the value of a variable LIVE in the <code>locals</code> window by
navigating your cursor to the line and hitting <code>e</code> to be prompted for a new
value. After changing it to “Foo”, confirming with <code>Enter</code>, and continuing
with <code>&lt;Space&gt;dc</code>,we see that this line gave different output from what
was in the original list:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-17/edited-output-dark.png" alt="edited output dark"/></div> <div class="title">Figure 95. Live Edited Variable Output</div></div> <div class="paragraph"><p>If you want to step through the lines of a function, use <code>&lt;Space&gt;dO</code> for “step
<strong>O</strong>ver”. This will act as if you have a breakpoint on every line in the
function. If you want to jump “out” to the function that called the current
function, use <code>&lt;Space&gt;do</code> (lowercase <code>o</code> this time). <code>&lt;Space&gt;di</code> will jump
“into” the function call under the cursor so you can step through lines inside
the called function.</p></div> <div class="paragraph"><p>For <em>conditional</em> breakpoints, use the <code>&lt;Space&gt;dB</code> (uppercase <code>B</code>) instead of <code>&lt;Space&gt;db</code>.
You’ll be prompted to provide a condition as I’ve done here:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-17/conditional-breakpoint-dark.png" alt="conditional breakpoint dark"/></div> <div class="title">Figure 96. Conditional Breakpoint Input</div></div> <div class="paragraph"><p>Now if I run <code>&lt;Space&gt;dl</code> (run “last” debugging command, so I don’t have to
select a debugging environment and enter arguments like I did with
<code>&lt;Space&gt;da</code>), it will go through two iterations of the loop, outputting <code>Hello
World</code> before breaking only when <code>description == &quot;Cruel&quot;</code>.</p></div> <div class="paragraph"><p>So that’s a whirlwind tour of the LazyVim debugger. It worked flawlessly in
this example, but as I stated at the beginning, toy examples are normally easy
with debuggers.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">Most likely, a real world Python project needs to be run in a virtual
environment. If you activate the virtualenv before launching Neovim, the
debugger (and LSP tools) should just work with the venv. LazyVim’s Python extra
does support selecting virtualenvs, but I find that activating it before I open
the editor is the least surprising way to manage it.</td></tr></tbody></table></div></div> <div class="sect2"><h3 id="_remote_debugging_an_example_with_go"><a class="link" href="#_remote_debugging_an_example_with_go">17.3. Remote Debugging (An Example With Go)</a></h3> <div class="paragraph"><p>You can also run a debug service in a remote location (typically a ssh server
or Docker container) and connect to it from your local Neovim. Personally, I
would rather install Neovim in the remote location and just run it from there,
but that’s a separate rant.</p></div> <div class="paragraph"><p>The instructions to actually set up and run the debug adapter in the remote
location are entirely too language dependent. For this example, I’m going to use
Go. I have enabled the <code>lang.go</code> LazyExtra, and tested it on a local file using
steps similar to those described for Python.</p></div> <div class="paragraph"><p>Now it’s time to test it in a container. I’m going to use Podman, but you can
do this with Docker or ssh as well.</p></div> <div class="paragraph"><p>First, I ported the Python script above to Go:</p></div> <div class="listingblock"><div class="title">Listing 55. A Go Script</div> <div class="content"><pre class="pygments highlight"><code data-lang="go"><span></span><span class="tok-kn">package</span><span class="tok-w"> </span><span class="tok-nx">main</span>

<span class="tok-kn">import</span><span class="tok-w"> </span><span class="tok-s">&quot;fmt&quot;</span>

<span class="tok-kd">func</span><span class="tok-w"> </span><span class="tok-nx">main</span><span class="tok-p">()</span><span class="tok-w"> </span><span class="tok-p">{</span>
<span class="tok-w">  </span><span class="tok-k">for</span><span class="tok-w"> </span><span class="tok-nx">_</span><span class="tok-p">,</span><span class="tok-w"> </span><span class="tok-nx">description</span><span class="tok-w"> </span><span class="tok-o">:=</span><span class="tok-w"> </span><span class="tok-k">range</span><span class="tok-w"> </span><span class="tok-p">[]</span><span class="tok-kt">string</span><span class="tok-p">{</span>
<span class="tok-w">    </span><span class="tok-s">&quot;Hello&quot;</span><span class="tok-p">,</span>
<span class="tok-w">    </span><span class="tok-s">&quot;Cruel&quot;</span><span class="tok-p">,</span>
<span class="tok-w">    </span><span class="tok-s">&quot;Beautiful&quot;</span><span class="tok-p">,</span>
<span class="tok-w">    </span><span class="tok-s">&quot;Tired&quot;</span><span class="tok-p">,</span>
<span class="tok-w">    </span><span class="tok-s">&quot;My&quot;</span>
<span class="tok-w">  </span><span class="tok-p">}</span><span class="tok-w"> </span><span class="tok-p">{</span>
<span class="tok-w">    </span><span class="tok-nx">fmt</span><span class="tok-p">.</span><span class="tok-nx">Printf</span><span class="tok-p">(</span><span class="tok-s">&quot;%s world\\n&quot;</span><span class="tok-p">,</span><span class="tok-w"> </span><span class="tok-nx">description</span><span class="tok-p">)</span>
<span class="tok-w">    </span><span class="tok-k">if</span><span class="tok-w"> </span><span class="tok-nx">description</span><span class="tok-w"> </span><span class="tok-o">==</span><span class="tok-w"> </span><span class="tok-s">&quot;Tired&quot;</span><span class="tok-w"> </span><span class="tok-p">{</span>
<span class="tok-w">      </span><span class="tok-nx">fmt</span><span class="tok-p">.</span><span class="tok-nx">Println</span><span class="tok-p">()</span>
<span class="tok-w">    </span><span class="tok-p">}</span>
<span class="tok-w">  </span><span class="tok-p">}</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>Then I created the following simple <code>ContainerFile</code>:</p></div> <div class="listingblock"><div class="title">Listing 56. Golang ContainerFile</div> <div class="content"><pre class="pygments highlight"><code data-lang="dockerfile"><span></span><span class="tok-k">FROM</span><span class="tok-w"> </span><span class="tok-s">golang:1.22-alpine</span>
<span class="tok-k">WORKDIR</span><span class="tok-w"> </span><span class="tok-s">/app</span>
<span class="tok-k">COPY</span><span class="tok-w"> </span>main.go<span class="tok-w"> </span>./
<span class="tok-k">RUN</span><span class="tok-w"> </span>go<span class="tok-w"> </span>build<span class="tok-w"> </span>-o<span class="tok-w"> </span>/hello<span class="tok-w"> </span>main.go
<span class="tok-k">CMD</span><span class="tok-w"> </span><span class="tok-p">[</span><span class="tok-s2">&quot;/hello&quot;</span><span class="tok-p">]</span></code></pre></div></div> <div class="paragraph"><p><code>podman build -t somego .</code> and <code>podman run --rm somego</code> indicate that the two
files are working.</p></div> <div class="paragraph"><p>Typically, your organization has a <code>Dockerfile</code> or <code>Containerfile</code> that it
doesn’t want you to mess with to install useful things like a debugger (or
Neovim).</p></div> <div class="paragraph"><p>So I always passive aggressively create a separate gitignored
<code>Containerfile.local</code> that extends the company <code>Containerfile</code>.</p></div> <div class="paragraph"><p>The debugger for Go is called <code>delve</code>. You can install it temporarily by
running the container as a shell:</p></div> <div class="listingblock"><div class="title">Listing 57. Installing Delve in Container</div> <div class="content"><pre class="pygments highlight"><code data-lang="console"><span></span><span class="tok-gp">$ </span>podman<span class="tok-w"> </span>run<span class="tok-w"> </span>--rm<span class="tok-w"> </span>-it<span class="tok-w"> </span>somego<span class="tok-w"> </span>/bin/sh
<span class="tok-go">&gt; go install github.com/go-delve/cmd/dlv@latest</span></code></pre></div></div> <div class="paragraph"><p>Now the container should have a <code>dlv</code> command in it, but only until that
container exits. To make it more permanent, my sneaky <code>Containerfile.local</code>
looks like this:</p></div> <div class="listingblock"><div class="title">Listing 58. Sneaky Container Extension</div> <div class="content"><pre class="pygments highlight"><code data-lang="dockerfile"><span></span><span class="tok-k">FROM</span><span class="tok-w"> </span><span class="tok-s">localhost/somego</span>
<span class="tok-k">RUN</span><span class="tok-w"> </span>apk<span class="tok-w"> </span>add<span class="tok-w"> </span>git
<span class="tok-k">RUN</span><span class="tok-w"> </span>go<span class="tok-w"> </span>install<span class="tok-w"> </span>github.com/go-delve/delve/cmd/dlv@latest

<span class="tok-k">EXPOSE</span><span class="tok-w"> </span><span class="tok-s">40000</span>

<span class="tok-k">CMD</span><span class="tok-w"> </span><span class="tok-o">[</span><span class="tok-s2">&quot;dlv&quot;</span>,<span class="tok-w"> </span><span class="tok-s2">&quot;debug&quot;</span>,<span class="tok-w"> </span><span class="tok-se">\\</span>
<span class="tok-w">     </span><span class="tok-s2">&quot;-l&quot;</span>,<span class="tok-w"> </span><span class="tok-s2">&quot;0.0.0.0:40000&quot;</span>,<span class="tok-w"> </span><span class="tok-se">\\</span>
<span class="tok-w">     </span><span class="tok-s2">&quot;--headless&quot;</span>,<span class="tok-w"> </span><span class="tok-se">\\</span>
<span class="tok-w">     </span><span class="tok-s2">&quot;--accept-multiclient&quot;</span>,<span class="tok-w"> </span><span class="tok-se">\\</span>
<span class="tok-w">     </span><span class="tok-s2">&quot;./main.go&quot;</span><span class="tok-o">]</span></code></pre></div></div> <div class="paragraph"><p>You can run the <code>dlv</code> command on any port; just make sure you <code>EXPOSE</code> the same one.</p></div> <div class="paragraph"><p>Build this container with:</p></div> <div class="listingblock"><div class="content"><pre class="pygments highlight"><code data-lang="console"><span></span><span class="tok-go">\`$ podman build -f Containerfile.local -t my-some-go\`</span></code></pre></div></div> <div class="paragraph"><p>then run it with:</p></div> <div class="listingblock"><div class="content"><pre class="pygments highlight"><code data-lang="console"><span></span><span class="tok-go">\`$ podman run --rm -it -p 40000:40000 --name my-some-go my-some-go\`</span></code></pre></div></div> <div class="paragraph"><p>One of the many reasons I dislike containers is how verbose the commands have
to be. Now it is <em>finally</em> ready to connect a debugger.</p></div> <div class="paragraph"><p>The next step is to configure <code>nvim-dap-go</code> to connect to this port. It’s
really rather verbose and a bit fragile. I made a new <code>extend-dap-go.lua</code> file
in my plugins directory that looks like this:</p></div> <div class="listingblock"><div class="title">Listing 59. Nvim-Dap Remote Go Configuration</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-s2">&quot;leoluz/nvim-dap-go&quot;</span><span class="tok-p">,</span>

  <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-n">dap_configurations</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-p">{</span>
        <span class="tok-nb">type</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;go&quot;</span><span class="tok-p">,</span>
        <span class="tok-n">name</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;Attach container&quot;</span><span class="tok-p">,</span>
        <span class="tok-n">mode</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;remote&quot;</span><span class="tok-p">,</span>
        <span class="tok-n">request</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;attach&quot;</span><span class="tok-p">,</span>
        <span class="tok-n">substitutePath</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
          <span class="tok-p">{</span>
            <span class="tok-n">from</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;\${workspaceFolder}&quot;</span><span class="tok-p">,</span>
            <span class="tok-n">to</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;/app&quot;</span><span class="tok-p">,</span>
          <span class="tok-p">},</span>
        <span class="tok-p">},</span>
      <span class="tok-p">},</span>
    <span class="tok-p">},</span>
    <span class="tok-n">delve</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-n">port</span> <span class="tok-o">=</span> <span class="tok-mi">40000</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>The port needs to go in a separate <code>delve</code> section, and has the unfortunate
side-effect of always binding to that port, even if you are running a local
debugging session. The <code>substitutePath</code> section is configured to map
breakpoints from your local directory to the <code>/app</code> folder inside the
container. Change it if your <code>Containerfile</code> uses a different <code>WORKDIR</code>.</p></div> <div class="paragraph"><p>Restart Neovim to pick up the new configuration and open the <code>main.go</code> file (on
the local filesystem). Set a breakpoint in the usual way with <code>&lt;Space&gt;db</code>. Then
hit <code>&lt;Space&gt;dc</code> to pop up a menu of possible debug configurations. You’ll see
<code>Attach Container</code> in the menu. Select it, invoke whichever debugging gods are
listening to you today, and wait for the breakpoint to hit.</p></div> <div class="paragraph"><p>Keep an eye on the podman container output, as that is where the <code>fmt.Print</code>
statements will go. Console output won’t show up in the editor.</p></div> <div class="paragraph"><p>The dev experience with this isn’t great (although it’s pretty typical if you
are used to working with containers). You have to stop and restart the
container if you let it run to completion (or if you make changes to the code).
So overall, I recommend doing your <code>go</code> coding and debugging outside the
container. Go is designed to build statically self-contained binaries, after
all. But if you have your reasons to use a container, now you know how to do
it!</p></div></div> <div class="sect2"><h3 id="_example_connect_to_chrome"><a class="link" href="#_example_connect_to_chrome">17.4. Example: Connect to Chrome</a></h3> <div class="paragraph"><p>The Chrome debugger in the Browser dev tools window is excellent, so you are
forgiven if you’d rather just use it than the nvim-dap-ui. (Hey, I won’t judge;
I still use <code>console.log</code> for most of my Chrome debugging).</p></div> <div class="paragraph"><p>But it turns out to be surprisingly easy to connect from Neovim. First, start
the Chrome browser from the terminal, passing it the
<code>--remote-debugging-port=9222</code> flag. The exact path to Chrome is OS- and
package-manager dependent; on Linux it might be in your path as <code>google-chrome</code>
and on MacOS if you installed the <code>.dmg</code>, you’ll probably need to access
something like:</p></div> <div class="listingblock"><div class="title">Listing 60. Path to Chrome</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-o">/</span><span class="tok-n">Applications</span><span class="tok-o">/</span><span class="tok-n">Google</span><span class="tok-err">\\</span> <span class="tok-n">Chrome</span><span class="tok-p">.</span><span class="tok-n">app</span><span class="tok-o">/</span><span class="tok-n">Contents</span><span class="tok-o">/</span><span class="tok-n">MacOS</span><span class="tok-o">/</span><span class="tok-n">Google</span><span class="tok-err">\\</span> <span class="tok-n">Chrome</span> <span class="tok-c1">--remote-debugging-port=9222</span></code></pre></div></div> <div class="paragraph"><p>Second, open Mason from inside Neovim with <code>&lt;Space&gt;cm</code>. Search for
<code>chrome-debug-adapter</code>. Install it with <code>i</code> and restart Neovim.</p></div> <div class="paragraph"><p><em>There is no extra configuration required</em>. This kind of blew my mind, since I
don’t see that LazyVim does anything extra to hook it up. Just open a <code>jsx</code>,
<code>tsx</code>, <code>js</code>, or <code>ts</code> file. Then hit <code>&lt;Space&gt;db</code> to add a breakpoint and
<code>&lt;Space&gt;dc</code> to connect to Chrome and have it break on that breakpoint. I didn’t
even have to select a configuration!</p></div> <div class="paragraph"><p>I tested this in a brand new Vite-react app, putting the breakpoint inside a
callback when a button is clicked. Click the button and the debugger pauses
with all the locals set. I can even step deeply into React source code using
<code>&lt;Space&gt;di</code> and LazyVim automatically opens the file from <code>node_modules</code>.</p></div> <div class="paragraph"><p>Again, I don’t really see the utility of this over just using the Chrome
devtools debugger. Normally, when I’m debugging frontend code, I’m more
interested in how my interactions with the <em>browser</em> affect the state of the
debug tools, so switching to my editor to continue to the next breakpoint isn’t
actually convenient. But there are lots of types of coders out there, and now
you know that it works.</p></div></div> <div class="sect2"><h3 id="_summary_17"><a class="link" href="#_summary_17">17.5. Summary</a></h3> <div class="paragraph"><p>This chapter was all about debugging code directly from your editor. This is a
tricky topic for an author to cover well because debuggers are surprisingly
simple when they work, but they don’t often work out of the box. LazyVim does
as good a job as I’ve seen (no worse than VS Code) at out-of-the-box
configuration, but you’ll still probably be mucking around with configurations
before it works with your system. There’s no getting around that.</p></div> <div class="paragraph"><p>If you can get it working well, you’ll probably find you’re a more efficient
developer than if you just use <code>print</code> statements. But it can take a long time
to regain the initial set-up time, and the skill isn’t transferable; as soon as
you start a new project, you’ll probably have to go through a different
configuration incantation all over again!</p></div> <div class="paragraph"><p>In the next chapter, we’ll discuss Neotest, a tool for running tests from
inside your editor.</p></div></div></div>`;return{c(){s=c("div"),s.innerHTML=e,this.h()},l(a){s=d(a,"DIV",{class:!0,"data-svelte-h":!0}),r(s)!=="svelte-4t8jr7"&&(s.innerHTML=e),this.h()},h(){h(s,"class","sect1")},m(a,n){g(a,s,n)},p:t,i:t,o:t,d(a){a&&u(s)}}}class y extends p{constructor(s){super(),l(this,s,null,v,i,{})}}export{y as component,b as universal};
