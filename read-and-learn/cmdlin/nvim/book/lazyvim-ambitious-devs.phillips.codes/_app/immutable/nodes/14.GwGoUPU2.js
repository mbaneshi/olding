import{s as p,n as t}from"../chunks/scheduler.seBsrkbn.js";import{S as i,i as c,e as l,c as r,l as d,m as u,g as k,d as h}from"../chunks/index.Dwxb9V0m.js";function g(){return{title:"Chapter 18: Testing",description:"LazyVim extras make it easier to set up testing tools",keywords:"vim, lazyvim, neovim, tutorial, course, book, testing, neotest, unit test"}}const b=Object.freeze(Object.defineProperty({__proto__:null,load:g},Symbol.toStringTag,{value:"Module"}));function m(e){let s,n=`<h2 id="_testing"><a class="link" href="#_testing">Chapter 18. Testing</a></h2> <div class="sectionbody"><div class="paragraph"><p>LazyVim can be configured with the Neotest plugin, a generic runner for
selecting and running tests in a variety of languages and test frameworks. As
with the debug adapter, Neotest is not enabled by default. However, if the
plugin is enabled, most language extras ship with a pre-configured setup to make
testing work automatically.</p></div> <div class="paragraph"><p>Except when it doesn’t, of course. Much like debuggers, I find the in-editor
features provided by testing extensions (regardless of the editors) to be too
finicky to be worth the effort of configuring them. I usually just have a test
runner in watch mode running in a separate terminal, and that works well for
me. I didn’t previously use Neotest, but after writing this chapter I
changed my mind!</p></div> <div class="sect2"><h3 id="_try_neotest"><a class="link" href="#_try_neotest">18.1. Try Neotest</a></h3> <div class="paragraph"><p>If you haven’t already (as part of enabling recommended plugins) pop open the
Lazy Extras interface and enable the <code>test.core</code> extra. This will set up
Neotest and a couple dependencies for you.</p></div> <div class="paragraph"><p>Also make sure that the extras for whatever language you are working on are
enabled, and double check if they include a test-related plugin. For this
example, we’ll be using <code>neotest-python</code>, which ships with the <code>lang.python</code>
extra.</p></div> <div class="paragraph"><p>Once the extra is enabled, you’ll see a new “test” top-level command in your
space-mode menu, accessible with <code>&lt;Space&gt;t</code>:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-18/menu-dark.png" alt="menu dark"/></div> <div class="title">Figure 97. Test Menu</div></div> <div class="paragraph"><p>As you would expect, the easy-to-type <code>&lt;Space&gt;tt</code> is the most important command
in the menu; it runs the current file and parses the test results. You can also
use <code>&lt;Space&gt;tr</code> (<code>r</code> for “Run”) when your cursor is inside a test to run that
single test.</p></div> <div class="paragraph"><p>After running tests successfully, Neotest puts a couple check icons in your
interface so that you can see that they were successful:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-18/success-dark.png" alt="success dark"/></div> <div class="title">Figure 98. Tests Run Successfully</div></div> <div class="paragraph"><p>This screenshot of two tests was taken after I ran all tests in the file with
<code>&lt;Space&gt;tt</code>. There’s one checkmark in the gutter and another to the right of
the test in virtual text.</p></div></div> <div class="sect2"><h3 id="_error_reporting"><a class="link" href="#_error_reporting">18.2. Error Reporting</a></h3> <div class="paragraph"><p>Things get a bit more interesting when we introduce a test failure. First,
a scrollable window pops up with the test output; this is the same output I would
see if I had run the test command (<code>pytest</code> in this case) from the terminal:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-18/error-output-dark.png" alt="error output dark"/></div> <div class="title">Figure 99. Test Error Output</div></div> <div class="paragraph"><p>When this window pops up after running tests, it isn’t focused by default, and
you can close it simply by moving the cursor (similar to a diagnostic window).
If you would prefer to focus the window (for example, so you can scroll it with
<code>&lt;Control-d&gt;</code> and <code>&lt;Control-u&gt;</code>), you can use <code>&lt;Space&gt;to</code> where <code>o</code> means
“output”. You can use this keybinding to show the most recent test output at
any time. Or you can use <code>&lt;Space&gt;tO</code> (capitalized <code>O</code>) to open the output in a
pane under the editor instead of a floating window.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">The Neotest Output pane will behave better if you also have the edgy
Extra enabled.</td></tr></tbody></table></div> <div class="paragraph"><p>Once the floating window is focused, you need to use the <code>q</code> shortcut to exit it.</p></div> <div class="paragraph"><p>When a test in Neotest fails, you obviously don’t see a checkmark beside the test.
Instead, you see a little red X. In addition, there will be an x in a circle in
the specific line that has a failure and some (hopefully) informative virtual text
to the right of the offending line:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-18/error-dark.png" alt="error dark"/></div> <div class="title">Figure 100. Test Error Virtual text</div></div> <div class="paragraph"><p>Most helpfully of all, a Trouble window will open with a list of all failing tests.
In this screenshot, I’ve added <code>assert False</code> to two different tests in the file:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-18/trouble-dark.png" alt="trouble dark"/></div> <div class="title">Figure 101. Failing Tests In Trouble</div></div> <div class="paragraph"><p>This is <strong>super</strong> convenient because I can now navigate between failing tests
(possibly in multiple files) using <code>]q</code> and <code>[q</code>, or by focusing the Trouble
window and using basic cursor movements.</p></div></div> <div class="sect2"><h3 id="_test_summary"><a class="link" href="#_test_summary">18.3. Test Summary</a></h3> <div class="paragraph"><p>The <code>&lt;Space&gt;tT</code> with a capitalized T does a “but bigger” style action,
running all tests in your project instead of just the ones in the current file.
Of course, you won’t see the test markers for any files that aren’t open. So
you’ll probably want to use <code>&lt;Space&gt;ts</code> to toggle the summary window, which
shows up in the Neo-tree sidebar:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-18/summary-dark.png" alt="summary dark"/></div> <div class="title">Figure 102. Test Summary</div></div> <div class="paragraph"><p>The summary view has some useful keyboard shortcuts (<code>J</code> and <code>K</code> are most useful) that
you can see by typing <code>?</code> while it is focused:</p></div> <div class="imageblock"><div class="content"><img src="/images/book/chapter-18/summary-mappings-dark.png" alt="summary mappings dark"/></div> <div class="title">Figure 103. Test Summary Keyboard Mappings</div></div> <div class="paragraph"><p>The <code>m</code> for “mark” command deserves a callout. It allows you to mark a test
as “of interest”, so that when you use the <code>R</code> or <code>Run marked</code> command it will
only run those tests. Use <code>M</code> (capitalized) to clear all marks or <code>m</code> while a
line is marked to toggle a single mark off.</p></div></div> <div class="sect2"><h3 id="_watch_mode_and_debugging"><a class="link" href="#_watch_mode_and_debugging">18.4. Watch Mode and Debugging</a></h3> <div class="paragraph"><p>You can toggle “watch” mode for the current file using <code>&lt;Space&gt;tw</code>. This will
automatically run the test command every time your source code changes. The
summary and test file icons will all update in real time.</p></div> <div class="paragraph"><p>If you have enabled the debug adapter as described in Chapter 18, you can even
have the test automatically add a breakpoint on failure by running it with
<code>&lt;Space&gt;td</code>. This can be useful for quickly inspecting locals or adding watch
statements instead of adding a bunch of print statements before an assertion.</p></div></div> <div class="sect2"><h3 id="_installing_a_test_runner"><a class="link" href="#_installing_a_test_runner">18.5. Installing a Test Runner</a></h3> <div class="paragraph"><p>If you’re lucky, your language has a LazyVim extra that is preconfigured to
work with Neotest. For example, the <code>lang.go</code>, and <code>lang.python</code> extras both
include configuration to set up Neotest with those frameworks.</p></div> <div class="paragraph"><p>Not all languages have a clear default test runner, however. For example,
if you are coding in Typescript, you might prefer vitest or jest or the
deno test runner. All three of these have Neotest support, but none of them
are enabled by default with the Typescript extra.</p></div> <div class="paragraph"><p>For such languages, you’ll need to do a bit of manual configuration. Let’s
try to set one up for vitest as an example.</p></div> <div class="paragraph"><p>The plugin we need is
<a href="https://github.com/marilari88/neotest-vitest">neotest-vitest</a>. We need to
combine the instructions from the README in that repo with LazyVim’s
example on the <a href="https://www.lazyvim.org/extras/test/core">Neotest</a> page.</p></div> <div class="paragraph"><p>I created a new <code>vitest.lua</code> file in my plugins directory and added the following
configuration to it:</p></div> <div class="listingblock"><div class="title">Listing 61. Neotest-vitest Configuration</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-p">{</span> <span class="tok-s2">&quot;marilari88/neotest-vitest&quot;</span> <span class="tok-p">},</span>
  <span class="tok-p">{</span>
    <span class="tok-s2">&quot;nvim-neotest/neotest&quot;</span><span class="tok-p">,</span>
    <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-n">adapters</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-s2">&quot;neotest-vitest&quot;</span> <span class="tok-p">}</span> <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>Then I restarted Neovim and opened a file that had a vitest test in it.
<code>&lt;Space&gt;tt</code> did the right thing, and the plugin is configured.</p></div> <div class="paragraph"><p>In the repo I was testing, <code>vitest</code> was installed with npm, so no extra
installation was needed. In most cases I would expect the tooling that
Neotest plugins call into to be installed already when they access your
project. If not, you may be able to install it from the Mason menu,
accessible from <code>&lt;Space&gt;cm</code>.</p></div></div> <div class="sect2"><h3 id="_writing_your_own_test_adapter"><a class="link" href="#_writing_your_own_test_adapter">18.6. Writing Your Own Test Adapter</a></h3> <div class="paragraph"><p>This is a bit out of the scope of this book, but I decided to include it because
a) I needed to do it anyway, b) this chapter is suprisingly short, and c) it’s
a good example for writing a simple plugin.</p></div> <div class="paragraph"><p>Writing your own Neotest adapter requires implementing just five methods to
match the <code>neotest.Adapter</code> interface. However, the devil is in the details.</p></div> <div class="paragraph"><p>For this example, I’ll be writing a test adaptter for the <a href="https://bun.sh">Bun</a>
test runner. I chose Bun partially because a Neotest adapter for it doesn’t
exist and I use Bun in my own projects. But it’s also a good choice for
demonstration because there are already three Typescript/Javascript Neotest
adapters we draw on for examples and inspiration:</p></div> <div class="ulist"><ul><li><p><a href="https://github.com/haydenmeade/neotest-jest">neotest-jest</a></p></li> <li><p><a href="https://github.com/marilari88/neotest-vitest">neotest-vitest</a></p></li> <li><p><a href="https://github.com/MarkEmmons/neotest-deno">neotest-deno</a></p></li></ul></div> <div class="paragraph"><p>We won’t be implementing all the possible features (notably, the debugger will
be missing), but we’ll get the basics of running Bun tests and parsing output.</p></div> <div class="paragraph"><p>If you are unfamiliar with Bun, it is a Javascript/Typescript runtime and
compiler, more or less an alternative to nodejs. The built-in command <code>bun
test</code> runs a jest-like test suite. It is this command we will be binding to.</p></div> <div class="sect3"><h4 id="_initializing_a_local_plugin"><a class="link" href="#_initializing_a_local_plugin">18.6.1. Initializing a Local Plugin</a></h4> <div class="paragraph"><p>By default, LazyVim downloads plugins from a provider such as GitHub. However,
you can pass it any git url or point it at a local directory. We’ll be doing
the latter.</p></div> <div class="paragraph"><p>First, let’s initialize a basic plugin structure in a new directory. You’ll need
to make three nested directories:</p></div> <div class="listingblock"><div class="title">Listing 62. Neotest Bun Mkdir</div> <div class="content"><pre class="pygments highlight"><code data-lang="console"><span></span><span class="tok-gp">$ </span>mkdir<span class="tok-w"> </span>-p<span class="tok-w"> </span>neotest-bun/lua/neotest-bun</code></pre></div></div> <div class="paragraph"><p>The first <code>neotest-bun</code> can actually be any name. The <code>lua</code> is required for
LazyVim to pick up any files inside it, and the last <code>neotest-bun</code> is a lua
module that we will import in our configuration.</p></div> <div class="paragraph"><p>Inside this directory, create a file named <code>init.lua</code>. The contents of the file
can just be some simple Lua code for now:</p></div> <div class="listingblock"><div class="title">Listing 63. Simple Lua Script</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-nb">print</span><span class="tok-p">(</span><span class="tok-s2">&quot;Hello, Lua!&quot;</span><span class="tok-p">)</span></code></pre></div></div> <div class="paragraph"><p>The next step is to hook this local plugin up to our LazyVim configuration.
Create a new file in your LazyVim plugin directory (I called mine
<code>neotest-bun.lua</code>). We’ll use the same format we used for <code>vitest</code> above,
except we’ll point to our local plugin with the <code>dir</code> key:</p></div> <div class="listingblock"><div class="title">Listing 64. Local Plugin Configuration</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">return</span> <span class="tok-p">{</span>
  <span class="tok-p">{</span> <span class="tok-n">dir</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;~/Desktop/Code/neotest-bun/&quot;</span> <span class="tok-p">},</span>
  <span class="tok-p">{</span>
    <span class="tok-s2">&quot;nvim-neotest/neotest&quot;</span><span class="tok-p">,</span>
    <span class="tok-n">opts</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-n">adapters</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-s2">&quot;neotest-bun&quot;</span> <span class="tok-p">}</span> <span class="tok-p">},</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>To see if it’s working so far, open any file in Neovim and run <code>&lt;Space&gt;tt</code> to
attempt to kick off the test runner. It will fail because we haven’t properly
implemented the adapter interface, but it should also pop up a notification
that says, “Hello, Lua!”.</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">The notification will disappear quickly, which is very inconvenient if it
contains a traceback you want to introspect. You can always use <code>&lt;Space&gt;sna</code>
to show all the recent messages in a pane. The <code>:messages</code> command also
works.</td></tr></tbody></table></div></div> <div class="sect3"><h4 id="_implementing_the_neotest_adapter"><a class="link" href="#_implementing_the_neotest_adapter">18.6.2. Implementing the Neotest Adapter</a></h4> <div class="paragraph"><p>Let’s flesh out the adapter interface. Open the <code>neotest-bun/init.lua</code> file and
replace the <code>print</code> statement with the following content:</p></div> <div class="listingblock"><div class="title">Listing 65. Neotest Adapter Interface</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kd">local</span> <span class="tok-n">BunNeotestAdapter</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-n">name</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;neotest-bun&quot;</span> <span class="tok-p">}</span>

<span class="tok-kr">function</span> <span class="tok-nc">BunNeotestAdapter</span><span class="tok-p">.</span><span class="tok-nf">root</span><span class="tok-p">(</span><span class="tok-n">dir</span><span class="tok-p">)</span> <span class="tok-kr">end</span>

<span class="tok-kr">function</span> <span class="tok-nc">BunNeotestAdapter</span><span class="tok-p">.</span><span class="tok-nf">filter_dir</span><span class="tok-p">(</span><span class="tok-n">name</span><span class="tok-p">,</span> <span class="tok-n">rel_path</span><span class="tok-p">,</span> <span class="tok-n">root</span><span class="tok-p">)</span> <span class="tok-kr">end</span>

<span class="tok-kr">function</span> <span class="tok-nc">BunNeotestAdapter</span><span class="tok-p">.</span><span class="tok-nf">is_test_file</span><span class="tok-p">(</span><span class="tok-n">file_path</span><span class="tok-p">)</span> <span class="tok-kr">end</span>

<span class="tok-kr">function</span> <span class="tok-nc">BunNeotestAdapter</span><span class="tok-p">.</span><span class="tok-nf">discover_positions</span><span class="tok-p">(</span><span class="tok-n">file_path</span><span class="tok-p">)</span> <span class="tok-kr">end</span>

<span class="tok-kr">function</span> <span class="tok-nc">BunNeotestAdapter</span><span class="tok-p">.</span><span class="tok-nf">build_spec</span><span class="tok-p">(</span><span class="tok-n">args</span><span class="tok-p">)</span> <span class="tok-kr">end</span>

<span class="tok-kr">function</span> <span class="tok-nc">BunNeotestAdapter</span><span class="tok-p">.</span><span class="tok-nf">results</span><span class="tok-p">(</span><span class="tok-n">spec</span><span class="tok-p">,</span> <span class="tok-n">result</span><span class="tok-p">,</span> <span class="tok-n">tree</span><span class="tok-p">)</span> <span class="tok-kr">end</span>

<span class="tok-kr">return</span> <span class="tok-n">BunNeotestAdapter</span></code></pre></div></div> <div class="paragraph"><p>This is the interface we need to implement. If you’re wondering where I got
this, it is defined in
<a href="https://github.com/nvim-neotest/neotest/blob/master/lua/neotest/adapters/interface.lua">the Neotest source code</a>
and linked from the Neotest README. I also have the GitHub repositories for the
<code>neotest-jest</code> and <code>neotest-deno</code> packages open for reference.</p></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content">You’ll need to exit Neovim and restart it to pick up any changes you make to
the init.lua file. Remember that you can use the <code>&lt;Space&gt;qq</code> command to exit
Neovim and then the <code>s</code> command from the dashboard to restore your setup
with a minimal amount of fuss.</td></tr></tbody></table></div> <div class="paragraph"><p>If you try to run tests on a Bun test file now, it will (probably) fail with a
“No Tests Found” message. If it doesn’t, there may be another test runner
installed that thinks this is a legit test file.</p></div> <div class="paragraph"><p>Our adapter is currently correctly reporting that it is a Neotest adapter, but
then it is failing to register the current folder or file as a test file. We
can fix that by implementing the first three methods in the file.</p></div> <div class="paragraph"><p>The <code>root</code> directory is supposed to find the project root given a current
directory. When using Bun, we can use the presence or absence of a <code>bun.lockb</code>
file as an indicator of the current project root. This file is generated when
you run <code>bun install</code> and is used for keeping track of dependencies.</p></div> <div class="paragraph"><p>So let’s implement the <code>BunNeoTestAdapter.root</code> method like this:</p></div> <div class="listingblock"><div class="title">Listing 66. Root Directory Implementation</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kd">local</span> <span class="tok-n">lib</span> <span class="tok-o">=</span> <span class="tok-nb">require</span><span class="tok-p">(</span><span class="tok-s2">&quot;neotest.lib&quot;</span><span class="tok-p">)</span>

<span class="tok-kd">local</span> <span class="tok-n">BunNeotestAdapter</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-n">name</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;neotest-bun&quot;</span> <span class="tok-p">}</span>

<span class="tok-kr">function</span> <span class="tok-nc">BunNeotestAdapter</span><span class="tok-p">.</span><span class="tok-nf">root</span><span class="tok-p">(</span><span class="tok-n">dir</span><span class="tok-p">)</span>
  <span class="tok-kr">return</span> <span class="tok-n">lib</span><span class="tok-p">.</span><span class="tok-n">files</span><span class="tok-p">.</span><span class="tok-n">match_root_pattern</span><span class="tok-p">(</span><span class="tok-s2">&quot;bun.lockb&quot;</span><span class="tok-p">)(</span><span class="tok-n">dir</span><span class="tok-p">)</span>
<span class="tok-kr">end</span></code></pre></div></div> <div class="paragraph"><p>The key here is the <code>neotest.lib</code> function <code>match_root_pattern</code>. We import
that library and assign it to a local, then our <code>root</code> function just
needs to create a callback and call it.</p></div> <div class="paragraph"><p>While we’re at it, we can also implement the <code>filter_dir</code> function. This method
is designed to filter out directories that shouldn’t be scanned. In a Bun
project, this includes the <code>node_modules</code> folder. We definitely don’t want to
waste time scanning for tests in that folder!</p></div> <div class="listingblock"><div class="title">Listing 67. Filter Directory Implementation</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">function</span> <span class="tok-nc">BunNeotestAdapter</span><span class="tok-p">.</span><span class="tok-nf">filter_dir</span><span class="tok-p">(</span><span class="tok-n">name</span><span class="tok-p">,</span> <span class="tok-n">rel_path</span><span class="tok-p">,</span> <span class="tok-n">root</span><span class="tok-p">)</span>
  <span class="tok-kr">return</span> <span class="tok-n">name</span> <span class="tok-o">~=</span> <span class="tok-s2">&quot;node_modules&quot;</span>
<span class="tok-kr">end</span></code></pre></div></div> <div class="paragraph"><p>Now if you restart Neovim and try to run tests with <code>&lt;Space&gt;tT</code> (that is a
capital <code>T</code> the second time) it will not show the “No Tests found” message.
It won’t <em>do</em> anything, but at least it won’t error. However, <code>&lt;Space&gt;tt</code> will
error, because it doesn’t know that we are currently in a test file. We
can address that from the <code>is_test_file</code> method.</p></div> <div class="paragraph"><p>In Bun, like most Javascript runtimes, tests are typically in a
<code>something.test.js</code> or <code>somethingElse.test.ts</code> file. So we can use the following
Lua function to check if we are in a test file:</p></div> <div class="listingblock"><div class="title">Listing 68. Is Test File Implementation</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">function</span> <span class="tok-nc">BunNeotestAdapter</span><span class="tok-p">.</span><span class="tok-nf">is_test_file</span><span class="tok-p">(</span><span class="tok-n">file_path</span><span class="tok-p">)</span>
  <span class="tok-kr">return</span> <span class="tok-nb">string.match</span><span class="tok-p">(</span><span class="tok-n">file_path</span><span class="tok-p">,</span> <span class="tok-s2">&quot;.*.test.[tj]s$&quot;</span><span class="tok-p">)</span> <span class="tok-o">~=</span> <span class="tok-kc">nil</span>
<span class="tok-kr">end</span></code></pre></div></div> <div class="paragraph"><p>If I open my <code>cohere.test.ts</code> file and run <code>&lt;Space&gt;tt</code>, I still get <code>No Tests
found</code>. It is identifying the file as a Bun test file, but it doesn’t know how
to look inside the file to find any tests.</p></div></div> <div class="sect3"><h4 id="_discovering_test_positions"><a class="link" href="#_discovering_test_positions">18.6.3. Discovering Test Positions</a></h4> <div class="paragraph"><p>Solving this requires implementing the <code>discover_positions</code> function, and that
is…​ complicated. Typically, you would write Treesitter queries that identify
namespaces and tests in the file. I suppose you could also write your own
parser or use <code>string.match</code>, but Treesitter’s parser is probably better than
anything we can write.</p></div> <div class="paragraph"><p>I don’t know anything about writing Treesitter queries, and I don’t
particularly want to. So I’m just going to rely on the fact that Bun uses the
same describe/test syntax that Jest uses, and I’ll copy the queries wholesale
from the
<a href="https://github.com/nvim-neotest/neotest-jest/blob/main/lua/neotest-jest/init.lua#L162">neotest-jest</a>
plugin!</p></div> <div class="paragraph"><p>It’s a pretty long bit of code that will likely be hard to read in book format,
but I’ll include it here for completeness:</p></div> <div class="listingblock"><div class="title">Listing 69. Borrowed Discover Positions Queries</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">function</span> <span class="tok-nc">BunNeotestAdapter</span><span class="tok-p">.</span><span class="tok-nf">discover_positions</span><span class="tok-p">(</span><span class="tok-n">file_path</span><span class="tok-p">)</span>
  <span class="tok-kd">local</span> <span class="tok-n">query</span> <span class="tok-o">=</span> <span class="tok-s">[[</span>
<span class="tok-s">    ; -- Namespaces --</span>
<span class="tok-s">    ; Matches: \`describe(&#39;context&#39;, () =&gt; {})\`</span>
<span class="tok-s">    ((call_expression</span>
<span class="tok-s">      function: (identifier) @func_name (</span>
<span class="tok-s">        #eq? @func_name &quot;describe&quot;</span>
<span class="tok-s">      )</span>
<span class="tok-s">      arguments: (arguments (</span>
<span class="tok-s">        string (string_fragment) @namespace.name</span>
<span class="tok-s">      ) (arrow_function))</span>
<span class="tok-s">    )) @namespace.definition</span>
<span class="tok-s">    ; Matches: \`describe(&#39;context&#39;, function() {})\`</span>
<span class="tok-s">    ((call_expression</span>
<span class="tok-s">      function: (identifier) @func_name (</span>
<span class="tok-s">        #eq? @func_name &quot;describe&quot;</span>
<span class="tok-s">      )</span>
<span class="tok-s">      arguments: (arguments (</span>
<span class="tok-s">        string (string_fragment) @namespace.name</span>
<span class="tok-s">      ) (function_expression))</span>
<span class="tok-s">    )) @namespace.definition</span>
<span class="tok-s">    ; Matches: \`describe.only(&#39;context&#39;, () =&gt; {})\`</span>
<span class="tok-s">    ((call_expression</span>
<span class="tok-s">      function: (member_expression</span>
<span class="tok-s">        object: (identifier) @func_name (</span>
<span class="tok-s">          #any-of? @func_name &quot;describe&quot;</span>
<span class="tok-s">        )</span>
<span class="tok-s">      )</span>
<span class="tok-s">      arguments: (</span>
<span class="tok-s">        arguments (string (string_fragment) @namespace.name</span>
<span class="tok-s">      ) (arrow_function))</span>
<span class="tok-s">    )) @namespace.definition</span>
<span class="tok-s">    ; Matches: \`describe.only(&#39;context&#39;, function() {})\`</span>
<span class="tok-s">    ((call_expression</span>
<span class="tok-s">      function: (member_expression</span>
<span class="tok-s">        object: (identifier) @func_name (</span>
<span class="tok-s">          #any-of? @func_name &quot;describe&quot;</span>
<span class="tok-s">        )</span>
<span class="tok-s">      )</span>
<span class="tok-s">      arguments: (arguments (</span>
<span class="tok-s">        string (string_fragment) @namespace.name</span>
<span class="tok-s">      ) (function_expression))</span>
<span class="tok-s">    )) @namespace.definition</span>
<span class="tok-s">    ; Matches: \`describe.each([&#39;data&#39;])(&#39;context&#39;, () =&gt; {})\`</span>
<span class="tok-s">    ((call_expression</span>
<span class="tok-s">      function: (call_expression</span>
<span class="tok-s">        function: (member_expression</span>
<span class="tok-s">          object: (identifier) @func_name (</span>
<span class="tok-s">            #any-of? @func_name &quot;describe&quot;</span>
<span class="tok-s">          )</span>
<span class="tok-s">        )</span>
<span class="tok-s">      )</span>
<span class="tok-s">      arguments: (arguments (</span>
<span class="tok-s">        string (string_fragment) @namespace.name</span>
<span class="tok-s">      ) (arrow_function))</span>
<span class="tok-s">    )) @namespace.definition</span>
<span class="tok-s">    ; Matches: \`describe.each([&#39;data&#39;])(&#39;context&#39;, function() {})\`</span>
<span class="tok-s">    ((call_expression</span>
<span class="tok-s">      function: (call_expression</span>
<span class="tok-s">        function: (member_expression</span>
<span class="tok-s">          object: (identifier) @func_name (</span>
<span class="tok-s">            #any-of? @func_name &quot;describe&quot;</span>
<span class="tok-s">          )</span>
<span class="tok-s">        )</span>
<span class="tok-s">      )</span>
<span class="tok-s">      arguments: (arguments (</span>
<span class="tok-s">        string (string_fragment) @namespace.name</span>
<span class="tok-s">      ) (function_expression))</span>
<span class="tok-s">    )) @namespace.definition</span>

<span class="tok-s">    ; -- Tests --</span>
<span class="tok-s">    ; Matches: \`test(&#39;test&#39;) / it(&#39;test&#39;)\`</span>
<span class="tok-s">    ((call_expression</span>
<span class="tok-s">      function: (identifier) @func_name (</span>
<span class="tok-s">        #any-of? @func_name &quot;it&quot; &quot;test&quot;</span>
<span class="tok-s">      )</span>
<span class="tok-s">      arguments: (arguments (</span>
<span class="tok-s">        string (string_fragment) @test.name</span>
<span class="tok-s">      ) [(arrow_function) (function_expression)])</span>
<span class="tok-s">    )) @test.definition</span>
<span class="tok-s">    ; Matches: \`test.only(&#39;test&#39;) / it.only(&#39;test&#39;)\`</span>
<span class="tok-s">    ((call_expression</span>
<span class="tok-s">      function: (member_expression</span>
<span class="tok-s">        object: (identifier) @func_name (</span>
<span class="tok-s">          #any-of? @func_name &quot;test&quot; &quot;it&quot;</span>
<span class="tok-s">        )</span>
<span class="tok-s">      )</span>
<span class="tok-s">      arguments: (arguments (</span>
<span class="tok-s">        string (string_fragment) @test.name</span>
<span class="tok-s">      ) [(arrow_function) (function_expression)])</span>
<span class="tok-s">    )) @test.definition</span>
<span class="tok-s">    ; Matches: \`test.each([&#39;data&#39;])(&#39;test&#39;)</span>
<span class="tok-s">    ((call_expression</span>
<span class="tok-s">      function: (call_expression</span>
<span class="tok-s">        function: (member_expression</span>
<span class="tok-s">          object: (identifier) @func_name (</span>
<span class="tok-s">            #any-of? @func_name &quot;it&quot; &quot;test&quot;</span>
<span class="tok-s">          )</span>
<span class="tok-s">          property: (property_identifier) @each_property (</span>
<span class="tok-s">            #eq? @each_property &quot;each&quot;</span>
<span class="tok-s">          )</span>
<span class="tok-s">        )</span>
<span class="tok-s">      )</span>
<span class="tok-s">      arguments: (arguments (</span>
<span class="tok-s">        string (string_fragment) @test.name</span>
<span class="tok-s">      ) [(arrow_function) (function_expression)])</span>
<span class="tok-s">    )) @test.definition</span>
<span class="tok-s">  ]]</span>

  <span class="tok-kd">local</span> <span class="tok-n">positions</span> <span class="tok-o">=</span> <span class="tok-n">lib</span><span class="tok-p">.</span><span class="tok-n">treesitter</span><span class="tok-p">.</span><span class="tok-n">parse_positions</span><span class="tok-p">(</span>
    <span class="tok-n">file_path</span><span class="tok-p">,</span> <span class="tok-n">query</span><span class="tok-p">,</span> <span class="tok-p">{</span>
    <span class="tok-n">nested_tests</span> <span class="tok-o">=</span> <span class="tok-kc">false</span><span class="tok-p">,</span>
  <span class="tok-p">})</span>

  <span class="tok-kr">return</span> <span class="tok-n">positions</span>
<span class="tok-kr">end</span></code></pre></div></div> <div class="paragraph"><p>Now you can restart Neovim and open a bun test file to get a new error! New
errors are progress, right?</p></div> <div class="paragraph"><p>You’ll now notice that Neotest is identifying the positions of <code>describe</code> and
<code>test</code> calls in the gutter. Instead of the red cross or green check we would
expect from a successful test run, it will be an eye with a cross through it. I
suspect this means the test was skipped or not runnable. The good news is it is
finding the tests. The bad news is it is not <em>running</em> the tests.</p></div></div> <div class="sect3"><h4 id="_building_the_spec"><a class="link" href="#_building_the_spec">18.6.4. Building the Spec</a></h4> <div class="paragraph"><p>We can run the tests by implementing the <code>build_spec</code> function. This function
accepts various parameters to determine how the user kicked off the tests.
If they used <code>&lt;Space&gt;tr</code> it’s in “single test” mode, but if they used <code>&lt;Space&gt;tt</code>
it is in “file” mode, and <code>&lt;Space&gt;tT</code> would run it in “all tests” mode.</p></div> <div class="paragraph"><p>The return value of <code>build_spec</code> is essentially a command to be run and some
context to read the results back.</p></div> <div class="paragraph"><p>The code is actually not that long, so here it is in its entirety, followed by
discussion:</p></div> <div class="listingblock"><div class="title">Listing 70. Build Spec Implementation</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">function</span> <span class="tok-nc">BunNeotestAdapter</span><span class="tok-p">.</span><span class="tok-nf">build_spec</span><span class="tok-p">(</span><span class="tok-n">args</span><span class="tok-p">)</span>
  <span class="tok-kd">local</span> <span class="tok-n">results_path</span> <span class="tok-o">=</span> <span class="tok-n">async</span><span class="tok-p">.</span><span class="tok-n">fn</span><span class="tok-p">.</span><span class="tok-n">tempname</span><span class="tok-p">()</span>
  <span class="tok-kd">local</span> <span class="tok-n">position</span> <span class="tok-o">=</span> <span class="tok-n">args</span><span class="tok-p">.</span><span class="tok-n">tree</span><span class="tok-p">:</span><span class="tok-n">data</span><span class="tok-p">()</span>
  <span class="tok-kd">local</span> <span class="tok-n">cwd</span> <span class="tok-o">=</span> <span class="tok-nb">assert</span><span class="tok-p">(</span>
    <span class="tok-n">BunNeotestAdapter</span><span class="tok-p">.</span><span class="tok-n">root</span><span class="tok-p">(</span>
      <span class="tok-n">position</span><span class="tok-p">.</span><span class="tok-n">path</span>
    <span class="tok-p">),</span>
    <span class="tok-s2">&quot;could not locate root directory of &quot;</span> <span class="tok-o">..</span> <span class="tok-n">position</span><span class="tok-p">.</span><span class="tok-n">path</span><span class="tok-p">)</span>
  <span class="tok-kd">local</span> <span class="tok-n">command</span> <span class="tok-o">=</span> <span class="tok-kc">nil</span>

  <span class="tok-kr">if</span> <span class="tok-n">position</span><span class="tok-p">.</span><span class="tok-n">type</span> <span class="tok-o">==</span> <span class="tok-s2">&quot;test&quot;</span> <span class="tok-ow">or</span> <span class="tok-n">position</span><span class="tok-p">.</span><span class="tok-n">type</span> <span class="tok-o">==</span> <span class="tok-s2">&quot;namespace&quot;</span> <span class="tok-kr">then</span>
    <span class="tok-n">command</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;bun test &quot;</span> <span class="tok-o">..</span>
      <span class="tok-n">position</span><span class="tok-p">.</span><span class="tok-n">path</span> <span class="tok-o">..</span>
      <span class="tok-s2">&quot; --test-name-pattern &quot;</span> <span class="tok-o">..</span>
      <span class="tok-n">position</span><span class="tok-p">.</span><span class="tok-n">name</span>
  <span class="tok-kr">elseif</span> <span class="tok-n">position</span><span class="tok-p">.</span><span class="tok-n">type</span> <span class="tok-o">==</span> <span class="tok-s2">&quot;file&quot;</span> <span class="tok-kr">then</span>
    <span class="tok-n">command</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;bun test &quot;</span> <span class="tok-o">..</span> <span class="tok-n">position</span><span class="tok-p">.</span><span class="tok-n">name</span>
  <span class="tok-kr">elseif</span> <span class="tok-n">position</span><span class="tok-p">.</span><span class="tok-n">type</span> <span class="tok-o">==</span> <span class="tok-s2">&quot;dir&quot;</span> <span class="tok-kr">then</span>
    <span class="tok-n">command</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;bun test&quot;</span>
  <span class="tok-kr">end</span>

  <span class="tok-kr">return</span> <span class="tok-p">{</span>
    <span class="tok-n">command</span> <span class="tok-o">=</span> <span class="tok-n">command</span> <span class="tok-o">..</span> <span class="tok-s2">&quot; 2&gt;&quot;</span> <span class="tok-o">..</span> <span class="tok-n">results_path</span><span class="tok-p">,</span>
    <span class="tok-n">context</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
      <span class="tok-n">results_path</span> <span class="tok-o">=</span> <span class="tok-n">results_path</span><span class="tok-p">,</span>
    <span class="tok-p">},</span>
    <span class="tok-n">cwd</span> <span class="tok-o">=</span> <span class="tok-n">cwd</span><span class="tok-p">,</span>
  <span class="tok-p">}</span>
<span class="tok-kr">end</span></code></pre></div></div> <div class="paragraph"><p>We start by creating a temporary <code>results_path</code> using the <code>neotest.async</code> library.
(You’ll need to import this with <code>local async = require(&quot;neotest.async&quot;)</code> at
the top of the file). We load the <code>position</code>, which is a structure constructed
from the return value of the <code>discover_positions</code> method we just wrote.</p></div> <div class="paragraph"><p>The <code>if..elseif</code> block is essentially checking how the user kicked off the
test, and running the appropriate Bun command. If they provided a test name,
then we pass the <code>--test-name-pattern</code> argument to the <code>bun test</code> command. If
they kicked it off as a file, we run <code>bun test filename</code>. And if they
wanted to run all tests, we simply run all tests with <code>bun test</code>.</p></div> <div class="admonitionblock note"><table><tbody><tr><td class="icon"><iconify-icon class="icon-note" icon="fa6-solid:circle-info"></iconify-icon></td> <td class="content">The Bun test runner is so fast, that I would expect to mostly just use
the last form with <code>&lt;Space&gt;tT</code> and the summary view open in the left sidebar.</td></tr></tbody></table></div> <div class="paragraph"><p>The returned object includes some necessary context that will be used when we
parse results. The <code>bun test</code> command is rather unusual in that it outputs the
results to standard error, so we pass a <code>2&gt;</code> redirect to store the results in
the temporary file we defined.</p></div> <div class="paragraph"><p>Now we just need to extract the results from that file.</p></div></div> <div class="sect3"><h4 id="_parsing_results"><a class="link" href="#_parsing_results">18.6.5. Parsing Results</a></h4> <div class="paragraph"><p>This ended up being simpler than I expected, because <code>bun test</code> aggregates
names in a way that maps to Neotest’s expected form quite easily. But it
took me half a day of fussing around to get code that actually worked!</p></div> <div class="paragraph"><p>The <code>results</code> method mostly just has to read through the <code>results_path</code> file
that was created by our <code>build_spec</code> function and convert it to a simple Lua
table. The keys of the result table are the names of the tests in question, and
the values are just a second table with <code>{status = &quot;passed&quot;}</code> or <code>{status =
&quot;failed&quot;}</code>. At least, that’s all we’re going to put in it. Neotest does accept
some other details here that it can render in the UI, but I’ll leave that as
“an exercise for the reader.”</p></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">When reading other instructional books, “an exercise for the reader” is
just authors being lazy, or (occasionally) publishers trying to cut word count.
Now you know.</td></tr></tbody></table></div> <div class="paragraph"><p>The tricky part is the “keys are the names of the tests”. I couldn’t find any
documentation on this, and it took some trial and error to discover that nested
“namespaces” (<code>describe</code> calls, in this case) in Neotest are separated by
<code>::</code>. The name also needs the absolute path to the test file. If we return that
in the right format, Neotest will happily convert our results to the
appropriate icons!</p></div> <div class="paragraph"><p>Here’s the code:</p></div> <div class="listingblock"><div class="title">Listing 71. Neotest Results Implementation</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-kr">function</span> <span class="tok-nc">BunNeotestAdapter</span><span class="tok-p">.</span><span class="tok-nf">results</span><span class="tok-p">(</span><span class="tok-n">spec</span><span class="tok-p">,</span> <span class="tok-n">result</span><span class="tok-p">,</span> <span class="tok-n">tree</span><span class="tok-p">)</span>
  <span class="tok-kd">local</span> <span class="tok-n">results</span> <span class="tok-o">=</span> <span class="tok-p">{}</span>
  <span class="tok-kd">local</span> <span class="tok-n">file</span> <span class="tok-o">=</span> <span class="tok-nb">assert</span><span class="tok-p">(</span><span class="tok-nb">io.open</span><span class="tok-p">(</span><span class="tok-n">spec</span><span class="tok-p">.</span><span class="tok-n">context</span><span class="tok-p">.</span><span class="tok-n">results_path</span><span class="tok-p">))</span>
  <span class="tok-kd">local</span> <span class="tok-n">line</span> <span class="tok-o">=</span> <span class="tok-n">file</span><span class="tok-p">:</span><span class="tok-n">read</span><span class="tok-p">(</span><span class="tok-s2">&quot;l&quot;</span><span class="tok-p">)</span>
  <span class="tok-kd">local</span> <span class="tok-n">test_suite</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;&quot;</span>

  <span class="tok-kr">while</span> <span class="tok-n">line</span> <span class="tok-kr">do</span>
    <span class="tok-kd">local</span> <span class="tok-n">pass_match</span> <span class="tok-o">=</span> <span class="tok-nb">string.match</span><span class="tok-p">(</span><span class="tok-n">line</span><span class="tok-p">,</span> <span class="tok-s2">&quot;^%(pass%) (.*) %[.*%]$&quot;</span><span class="tok-p">)</span>
    <span class="tok-kr">if</span> <span class="tok-n">pass_match</span> <span class="tok-o">~=</span> <span class="tok-kc">nil</span> <span class="tok-kr">then</span>
      <span class="tok-kd">local</span> <span class="tok-n">test_name</span> <span class="tok-o">=</span> <span class="tok-n">pass_match</span><span class="tok-p">.</span><span class="tok-n">gsub</span><span class="tok-p">(</span><span class="tok-n">pass_match</span><span class="tok-p">,</span> <span class="tok-s2">&quot; &gt; &quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;::&quot;</span><span class="tok-p">)</span>
      <span class="tok-n">results</span><span class="tok-p">[</span><span class="tok-n">test_suite</span> <span class="tok-o">..</span> <span class="tok-n">test_name</span><span class="tok-p">]</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-n">status</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;passed&quot;</span> <span class="tok-p">}</span>
    <span class="tok-kr">end</span>

    <span class="tok-kd">local</span> <span class="tok-n">fail_match</span> <span class="tok-o">=</span> <span class="tok-nb">string.match</span><span class="tok-p">(</span><span class="tok-n">line</span><span class="tok-p">,</span> <span class="tok-s2">&quot;^%(fail%) (.*) %[.*%]$&quot;</span><span class="tok-p">)</span>
    <span class="tok-kr">if</span> <span class="tok-n">fail_match</span> <span class="tok-o">~=</span> <span class="tok-kc">nil</span> <span class="tok-kr">then</span>
      <span class="tok-kd">local</span> <span class="tok-n">test_name</span> <span class="tok-o">=</span> <span class="tok-n">fail_match</span><span class="tok-p">.</span><span class="tok-n">gsub</span><span class="tok-p">(</span><span class="tok-n">fail_match</span><span class="tok-p">,</span> <span class="tok-s2">&quot; &gt; &quot;</span><span class="tok-p">,</span> <span class="tok-s2">&quot;::&quot;</span><span class="tok-p">)</span>
      <span class="tok-n">results</span><span class="tok-p">[</span><span class="tok-n">test_suite</span> <span class="tok-o">..</span> <span class="tok-n">test_name</span><span class="tok-p">]</span> <span class="tok-o">=</span> <span class="tok-p">{</span> <span class="tok-n">status</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;failed&quot;</span> <span class="tok-p">}</span>
    <span class="tok-kr">end</span>

    <span class="tok-kd">local</span> <span class="tok-n">test_file</span> <span class="tok-o">=</span> <span class="tok-nb">string.match</span><span class="tok-p">(</span><span class="tok-n">line</span><span class="tok-p">,</span> <span class="tok-s2">&quot;^(.+.test.[tj]s):$&quot;</span><span class="tok-p">)</span>
    <span class="tok-kr">if</span> <span class="tok-n">test_file</span> <span class="tok-o">~=</span> <span class="tok-kc">nil</span> <span class="tok-kr">then</span>
      <span class="tok-n">test_suite</span> <span class="tok-o">=</span> <span class="tok-n">spec</span><span class="tok-p">.</span><span class="tok-n">cwd</span> <span class="tok-o">..</span> <span class="tok-s2">&quot;/&quot;</span> <span class="tok-o">..</span> <span class="tok-n">test_file</span> <span class="tok-o">..</span> <span class="tok-s2">&quot;::&quot;</span>
    <span class="tok-kr">end</span>

    <span class="tok-n">line</span> <span class="tok-o">=</span> <span class="tok-n">file</span><span class="tok-p">:</span><span class="tok-n">read</span><span class="tok-p">(</span><span class="tok-s2">&quot;l&quot;</span><span class="tok-p">)</span>
  <span class="tok-kr">end</span>

  <span class="tok-kr">if</span> <span class="tok-n">file</span> <span class="tok-kr">then</span>
    <span class="tok-n">file</span><span class="tok-p">:</span><span class="tok-n">close</span><span class="tok-p">()</span>
  <span class="tok-kr">end</span>

  <span class="tok-kr">return</span> <span class="tok-n">results</span>
<span class="tok-kr">end</span></code></pre></div></div> <div class="paragraph"><p>For context, this function is designed to translate output like this:</p></div> <div class="listingblock"><div class="title">Listing 72. Bun Test Output</div> <div class="content"><pre class="pygments highlight"><code data-lang="plain"><span></span>src/clients/stability/stability.test.ts:
(pass) Stability &gt; generates a reference image [0.40ms]

src/clients/passage/passage.test.ts:
(pass) Passage &gt; GetUserTier &gt; Undefined [1.24ms]
(pass) Passage &gt; GetUserTier &gt; with tier free
(fail) Passage &gt; GetUserTier &gt; with tier hobby</code></pre></div></div> <div class="paragraph"><p>into something like this:</p></div> <div class="listingblock"><div class="title">Listing 73. Translated Bun Test Output</div> <div class="content"><pre class="pygments highlight"><code data-lang="lua"><span></span><span class="tok-p">{</span>
  <span class="tok-s2">&quot;/.../stability.test.ts::Stability::generates reference image&quot;</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-n">status</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;passed&quot;</span>
  <span class="tok-p">},</span>
  <span class="tok-s2">&quot;/.../passage.test.ts::Passage::GetUserTier::Undefined&quot;</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-n">status</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;passed&quot;</span>
  <span class="tok-p">},</span>
  <span class="tok-s2">&quot;/.../passage.test.ts::Passage::GetUserTier::with tier free&quot;</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-n">status</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;passed&quot;</span>
  <span class="tok-p">},</span>
  <span class="tok-s2">&quot;/.../passage.test.ts::Passage::GetUserTier::with tier hobby&quot;</span> <span class="tok-o">=</span> <span class="tok-p">{</span>
    <span class="tok-n">status</span> <span class="tok-o">=</span> <span class="tok-s2">&quot;failed&quot;</span>
  <span class="tok-p">},</span>
<span class="tok-p">}</span></code></pre></div></div> <div class="paragraph"><p>The method first grabs the filename from the context (the context was returned
from the <code>build_spec</code> method). It opens the file and reads the lines from that
file one by one. It then uses a matcher to determine if the line starts with
<code>(passed)</code> or <code>(failed)</code> which is how Bun reports a test result. The rest of
the test line will be the properly namespaced test name (minus a timing in
square brackets), except the namespaces are separated by <code>&gt;</code> instead of <code>::</code>.
So we use <code>gsub</code> to replace the <code>&gt;</code> with <code>::</code>. This is combined with the absolute
path of the name of the file to get the right test name.</p></div> <div class="paragraph"><p>If a given line is not a test name, then it might be the name of the test file,
which Bun kindly specifies as a relative path followed by a colon. So we do a
match on that format and store the test name as an absolute path (that’s what
the <code>spec.cwd</code> is for) to be prepended to subsequent test results.</p></div> <div class="paragraph"><p>And that’s the basics of implementing our own test runner! It’s missing some
features, notably debugging tests and capturing output, but it’s a good start.</p></div></div></div> <div class="sect2"><h3 id="_summary_18"><a class="link" href="#_summary_18">18.7. Summary</a></h3> <div class="paragraph"><p>This chapter covered the Neotest plugin, including various ways to invoke it
and how to set it up the easy way, hard way, and extra hard way.</p></div> <div class="paragraph"><p>We also learned a little bit about how to write a Neovim plugin. At its core,
it’s just a collection of Lua files that LazyVim can import. In this case, the
Lua file is a Neotest adapter, and we configured it to load our plugin into
Neotest.</p></div></div></div>`;return{c(){s=l("div"),s.innerHTML=n,this.h()},l(a){s=r(a,"DIV",{class:!0,"data-svelte-h":!0}),d(s)!=="svelte-1xzy585"&&(s.innerHTML=n),this.h()},h(){u(s,"class","sect1")},m(a,o){k(a,s,o)},p:t,i:t,o:t,d(a){a&&h(s)}}}class y extends i{constructor(s){super(),c(this,s,null,m,p,{})}}export{y as component,b as universal};
