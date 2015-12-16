<?php
  require "menu.inc";
  displayHeader("Download");
?>

<tr><td>
<h2>Tarballs</h2>

Several tarballs of the snowball sources are available.

<ul>
<li>
<a href="dist/libstemmer_c.tgz">The C version of the libstemmer library.</a><br/>
This contains all you need to include the snowball stemming algorithms into a
C project of your own.  If you download this, you don't need to use the snowball
compiler, or worry about the internals of the stemmers in any way.
</li>
<li>
<a href="dist/libstemmer_java.tgz">The Java version of the libstemmer library.</a><br/>
This contains all you need to include the snowball stemming algorithms into a
Java project of your own.  If you download this, you don't need to use the snowball
compiler, or worry about the internals of the stemmers in any way.
</li>
<li>
<a href="dist/snowball_code.tgz">Snowball, algorithms, and libstemmer library.</a><br/>
This contains all the source code for snowball (but not the generated source files).
This is useful mainly if you are wanting to work on the algorithms (tweaking them,
or producing new algorithms).
</li>
<li>
<a href="dist/snowball_web_and_code.tgz">Snowball, algorithms, and libstemmer library, and documentation</a><br/>
This contains all the source code for snowball (but not the generated source files), and
also the full documentation of the stemming algorithms.
</li>
<li>
<a href="dist/snowball_all.tgz">Everything related to snowball</a><br/>
This contains all the source code for snowball (but not the generated source files), and
also the full documentation of the stemming algorithms.  It also contains all
the test data files, and is therefore rather large (several megabytes).
</li>
</ul>

<p>
Also, tarballs containing just the files related to each individual stemming
algorithm described on this site are available from the page for each algorithm.
</p>
<p>
We do not make binary (ie, compiled) distributions of snowball available -
there are simply too many different platforms and architectures to support.  If
you are willing to make such binaries available for others, and can provide at
least some measure of support for ensuring that they work, feel free to contact
us and we will add a link to your work from this site.
</p>

</td></tr>
<tr><td>
<p>
<h2>Python</h2>

<p>
We provide and support python wrappers for Snowball.  The latest version can
be downloaded from <a
href="http://snowball.tartarus.org/wrappers/guide.html">our wrappers page</a>.
</p>

<p>
Some wrappers for other languages are also available on the wrappers page, but
are not supported by us. (Though if you ask on the mailing list for help, someone else might be able to assist you.)
</p>

</td></tr>
<tr><td>
<p>
<h2>Subversion</h2>

<p>
Developers may wish to access the latest source using the command:
<br>
<p>
<tt>
svn co svn://snowball.tartarus.org/snowball/trunk snowball
</tt>
</td></tr>
<tr><td>
<p>
<h2>Web interface to subversion</h2>

<p>
The subversion code repository can also be <a href="http://svn.tartarus.org/?root=snowball">browsed online</a>.
</p>

</td></tr>
<?php displayFooter(); ?>
