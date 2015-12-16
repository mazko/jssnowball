<?php
  require "menu.inc";
  displayHeader("Projects");
?>
<TR><TD>
<p>

This page lists projects which make use of snowball, or are related in some way.

<hr>

<h2><a href="http://wiki.tcl.tk/8699">Tclsnowball</a></h2>
A simple Tcl binding to some of the stemmers of the snowball project.
</p>

<h2><a href="https://sourceforge.net/projects/porterstemmers/">C++ stemmers</a></h2>
A reimplementation of the snowball stemming algorithms in C++.
</p>


<h2><a href="http://www.xapian.org/">Xapian</a></h2>
A probabilistic search engine which supports stemming using Snowball.
</p>

<h2><a href="http://www.zopyx.com/projects/TextIndexNG3/">TextIndexNG</a></h2>
A fulltext indexing solution for Zope with support for stemming using Snowball.
</p>

<h2><a href="http://code.google.com/p/urim/">urim</a></h2>
(added Sep 2010) Developed by Oleg Mazko, <B>Urim</B> is a standalone,
offline tag-cloud builder engine, fully written in JavaScript and so
capable of integration into all Internet browsers. Available as
a Firefox add-on. With a JavaScript port of the Snowball stemmers (danish,
dutch, english, finnish, french, german, hungarian, italian,
norwegian, portuguese, russian, spanish, swedish, romanian, turkish)
also avaliable as a separate library ready for developers.
</p>

<h2><a href="http://bitbucket.org/tebeka/snowball">libstemmer in Go</a></h2>
(added Feb 2013) Miki Tebeka has ported libstemmer_c to the Go programming
language.

</p>

<h2><a href="http://speechact.de/edu">XML tagger incorporating snowball</a></h2>
(added Feb 2013) Sebastian Bopp has incorporated the snowball stemmers into his
XML-tagger, freely available at speechact.de/edu.

</p>

<hr>
<a href="mailto:snowball-discuss@lists.tartarus.org">Contact us</a> if
you have a project that you would like to be listed here.

<TD><TR>
<?php displayFooter(); ?>
