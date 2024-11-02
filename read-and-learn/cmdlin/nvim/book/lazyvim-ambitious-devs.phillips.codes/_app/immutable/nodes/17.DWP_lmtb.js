import{s as n,n as i}from"../chunks/scheduler.seBsrkbn.js";import{S as r,i as h,e as l,c as d,l as c,m as p,g as u,d as m}from"../chunks/index.Dwxb9V0m.js";function v(){return{title:"Chapter 20: Where to go Next",description:"We've covered a lot in this book, but it's impossible to hit everything. This chapter covers places to find plugins or learn more about LazyVim.",keywords:"vim, lazyvim, neovim, tutorial, course, book"}}const b=Object.freeze(Object.defineProperty({__proto__:null,load:v},Symbol.toStringTag,{value:"Module"}));function y(o){let e,a=`<h2 id="_where_to_go_next"><a class="link" href="#_where_to_go_next">Chapter 20. Where to go Next</a></h2> <div class="sectionbody"><div class="paragraph"><p>We’re wrapping up our LazyVim journey together, but if you’ve made it this far,
I’m sure you’ll continue to forge new paths with this excellent Neovim
distro. This final chapter summarizes some of my favourite places to go for
more help, deeper insights, news, and plugins.</p></div> <div class="sect2"><h3 id="_reread_this_book"><a class="link" href="#_reread_this_book">20.1. Reread This Book</a></h3> <div class="paragraph"><p>You’ve definitely forgotten some interesting tidbits that I’ve covered in this
book. I know this because in rereading it myself during each of several
editorial passes I have learned things. One of the reasons I love writing is
that it forces me to cover topics in far greater detail than I otherwise would
have.</p></div> <div class="paragraph"><p>So I recommend rereading this book, or at least skimming through it. Write out
a cheat sheet of every keybinding that fits in the “That’s really cool but I
don’t think I’ll memorize it” box. I recommend handwriting it; it’ll stick
in your memory longer and you can keep annotating it on your desk as you learn
new things.</p></div> <div class="paragraph"><p>If you are reading a print or E-book copy, it will, sadly, become outdated. For
the latest version, have a look at my official website at
<a href="https://lazyvim-ambitious-devs.phillips.codes" class="bare">https://lazyvim-ambitious-devs.phillips.codes</a>, and subscribe to my mailing list
if you want to hear about updates.</p></div></div> <div class="sect2"><h3 id="_the_neovim_documentation"><a class="link" href="#_the_neovim_documentation">20.2. The Neovim Documentation</a></h3> <div class="paragraph"><p>Vim was created in 1991 when not everyone had access to the Internet. Back then
it was common to ship documentation with software instead of linking to it on
the world-wide web (indeed, the web was created the same year). Given that you
had the stamina to read this entire book, you might just want to type <code>:help
user-manual&lt;Enter&gt;</code> and read from beginning to end. Possibly more than once
throughout your Vim career. (<code>:help&lt;Enter&gt;</code> will give access to even more
documentation).</p></div> <div class="paragraph"><p>The key to navigating the help files is the keybinding <code>Control-[</code>. The
documentation is interlinked like a wiki and if you place your cursor over any
of the bold text and hit <code>Control-[</code>, you’ll jump to that section, much like
clicking a link.</p></div> <div class="paragraph"><p>If you prefer reading documentation in a web browser, the user manual is
rendered to html at <a href="https://neovim.io/doc/user/usr_toc.html" class="bare">https://neovim.io/doc/user/usr_toc.html</a>. It’s
the same content as <code>:help</code>, just more clicky.</p></div> <div class="paragraph"><p>The manual is extremely comprehensive and covers a lot of commands and
keybindings that maybe aren’t as relevant as they once were. I believe I’ve
covered everything that is relevant to a modern developer, but I’m sure you’ll
find additional nuggets of wisdom in there.</p></div></div> <div class="sect2"><h3 id="_the_lazyvim_documentation"><a class="link" href="#_the_lazyvim_documentation">20.3. The LazyVim Documentation</a></h3> <div class="paragraph"><p>LazyVim has its own website at <a href="https://www.lazyvim.org" class="bare">https://www.lazyvim.org</a>. It is a
little sparse on hand-holding (which is why this book exists), but it is a
super valuable resource once you know how to use it. Most importantly, it
comprehensively lists the current configuration for every plugin and extra that
ships with the distro. You <strong>will</strong> be visiting these from time to time when
you want to tweak the configuration to better match your usage. Every plugin
is listed with an <code>Options</code> and a <code>Full Spec</code> tab. The <code>Options</code> represent
whatever LazyVim passes as <code>opts</code> for that plugin spec, while <code>Full Spec</code>
includes the entire configuration.</p></div></div> <div class="sect2"><h3 id="_lazyvim_discussion_groups"><a class="link" href="#_lazyvim_discussion_groups">20.4. LazyVim Discussion Groups</a></h3> <div class="paragraph"><p>The quickest way to get answers to questions (at least, those questions that
can’t be answered by the copilot-chat plugin we discussed in Chapter 16) is to
ask them in the <a href="http:///github.com/LazyVim/LazyVim/discussions">discussion
groups on GitHub</a>. I am somewhat active there, but your question will probably
be answered by someone far more knowledgeable than me.</p></div> <div class="paragraph"><p>If you have found an issue with LazyVim, the first step is to create a minimal
repro with as few plugins as possible. The LazyVim issue tracker contains a
template for a <code>repro.lua</code> that you can use to configure the minimal repro. Add
the relevant plugins and run it with <code>nvim -u repro.lua</code> to test the issue.
Upload this with your issue (or to the Discussion groups) to make it easy for
the maintainers to help you.</p></div></div> <div class="sect2"><h3 id="_finding_interesting_plugins"><a class="link" href="#_finding_interesting_plugins">20.5. Finding Interesting Plugins</a></h3> <div class="paragraph"><p>For the most part, LazyVim contains the best-in-class version of most plugins
you’ll need. However, if there is a feature you think the editor should have
and it isn’t available as an extra, you can almost certainly find it in the
<a href="https://github.com/rockerBOO/awesome-neovim">Awesome Neovim</a> repo on Github.</p></div> <div class="paragraph"><p>Another terrific resource is the <a href="https://neovimcraft.com">neovimcraft</a>
website. Incidentally, the maintainers of neovimcraft are also responsible for
<a href="https://pgs.sh">pgs.sh</a>, the host for this book’s website. I appreciate their
product so I wanted to throw in some free advertising for them.</p></div></div> <div class="sect2"><h3 id="_dotfiles"><a class="link" href="#_dotfiles">20.6. Dotfiles</a></h3> <div class="paragraph"><p>Historically, the easiest way to configure Vim has always been to look at
someone else’s configuration and copy the interesting bits. Nowadays, the
easiest way is to use LazyVim, but you may still want to check out the dotfiles
of some prominent Neovim and LazyVim users:</p></div> <div class="dlist"><dl><dt class="hdlist1"><a href="https://github.com/folke/dot">Folke Lemaitre</a></dt><dd><p>The creator of LazyVim and a
whole host of excellent Neovim plugins (most of which are included with
LazyVim).</p> </dd><dt class="hdlist1"><a href="https://github.com/echasnovski/nvim/">Evgeni Chasnovski</a></dt><dd><p>The creator of the
mini.nvim group of plugins and a Neovim core contributor.</p> </dd><dt class="hdlist1"><a href="https://github.com/dpetka2001/dotfiles">Iordanis Petkakis</a></dt><dd><p>is the person who
is most likely to answer your question if you ask it on the LazyVim GitHub
Discussion group.</p> </dd><dt class="hdlist1"><a href="https://github.com/dusty-phillips/dotfiles/">Myself</a></dt><dd><p>I don’t really
deserve to be mentioned alongside the other names on this list! I push tweaks
to my dotfiles regularly and I’m pretty selective about which
plugins I use, so if it’s in there, it’s probably pretty good.</p></dd></dl></div> <div class="paragraph"><p>These are also people worth following on various social networks.</p></div></div> <div class="sect2"><h3 id="_neovim_guis"><a class="link" href="#_neovim_guis">20.7. Neovim GUIs</a></h3> <div class="paragraph"><p>I still maintain that LazyVim is best run in a first-rate terminal, but there
are some excellent GUIs out there that you can try if you want.</p></div> <div class="paragraph"><p>The primary benefit of Neovim GUIs is that they operate at the pixel level
instead of the character level. This means that things like smooth scrolling,
cursor motion, or animated window resizes can be more nuanced or performant.
Some GUIs also optionally ship with their own bufferline, statusline, or file
tree, but they are generally inferior to the ones that ship with LazyVim.</p></div> <div class="paragraph"><p>There have been a ton of attempts at Neovim GUIs over the years, but most of
them are not or poorly maintained. I’ve actually tried pretty much every GUI
out there, and it is my considered opinion that these are the only ones worth
testing, at least at the time of writing:</p></div> <div class="dlist"><dl><dt class="hdlist1"><a href="https://github.com/qvacua/vimr">Vimr</a></dt><dd><p>is MacOS only, but it provides some nice
integrations with MacOS if that is what you use.</p> </dd><dt class="hdlist1"><a href="https://neovide.dev">Neovide</a></dt><dd><p>is the best one if you want to use all your
existing Neovim plugins, but want the animations and scrolling to be a little
smoother. It’s super performant as well.</p> </dd><dt class="hdlist1"><a href="https://github.com/akiyosi/goneovim">Goneovim</a></dt><dd><p>is a solid contender as well.</p> </dd><dt class="hdlist1"><a href="https://github.com/yatli/fvim">FVim</a></dt><dd><p>used to be my favourite, but it’s
dropped off maintenance recently and has some quirks on MacOS that may bump it
from this list soon.</p></dd></dl></div> <div class="admonitionblock tip"><table><tbody><tr><td class="icon"><iconify-icon class="icon-tip" icon="fa6-regular:lightbulb"></iconify-icon></td> <td class="content">If you use any of these, you may well want to look for plugins that make
the embedded Neovim integrated terminal experience better.</td></tr></tbody></table></div></div> <div class="sect2"><h3 id="_summary_20"><a class="link" href="#_summary_20">20.8. Summary</a></h3> <div class="paragraph"><p>This was a short chapter summarizing various resources you might find valuable
as you independently continue your LazyVim and Neovim journey.</p></div> <div class="paragraph"><p>I want to thank you for sticking with me to the end. I hope you’ve enjoyed the
book! If you’re anything like me, you may be using modal editing concepts for
decades to come. Someday Neovim will be “Old Vim”, but I’m very confident the
principles that guide it will be relevant in future iterations of this editor
as well.</p></div> <div class="paragraph"><p>Code happily, everyone!</p></div></div></div>`;return{c(){e=l("div"),e.innerHTML=a,this.h()},l(t){e=d(t,"DIV",{class:!0,"data-svelte-h":!0}),c(e)!=="svelte-1ht0wce"&&(e.innerHTML=a),this.h()},h(){p(e,"class","sect1")},m(t,s){u(t,e,s)},p:i,i,o:i,d(t){t&&m(e)}}}class w extends r{constructor(e){super(),h(this,e,null,y,n,{})}}export{w as component,b as universal};
