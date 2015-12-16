<?php
  require "menu.inc";
  displayHeader("Credits");
?>
<TR><TD>
<p>
Snowball, and most of the current stemming algorithms were written by
Dr Martin Porter, who also prepared the material for the Website.
The Snowball to Java codegenerator, and supporting Java libraries, were
contributed by Richard Boulton.
Dr Andrew Macfarlane, of City University, London, gave much
initial encouragement and proofreading
assistance.
</p>

<p>
The website was established by Richard Boulton, who is still in charge of its
administration.
</p>

<p>
Linguistic assistance for Russian, German and Dutch has been provided by

<a href="http://www.patrickmiles.co.uk/">Patrick Miles</a>
(of the
Patrick Miles Translation Agency, Cambridge, UK). Pat is a distinguished
translator, whose English versions of Chekhov have appeared on the London
stage.
</p>

<p>
Various emailers have helped improve the stemmers with their many suggestions
and comments. We must especially mention Andrei Aksyonoff and
Oleg Bartunov (Russian), Steve Tolkin and Wendy Reetz (English), and Fred Brault (French).
Blake Madden found a number of elusive errors in the stemmer descriptions.
</p>

<p>
Anna Tordai has provided the Hungarian stemming algorithm.
</p>

<p>
Evren (Kapusuz) Cilden has provided the Turkish stemming algorithm.
</p>

<p>
Olly Betts has made a significant performance improvement to the C
codegenerator.
</p>

<p>
The Snowball site is provided to us free by James Aylett, who
owns and runs the machine that hosts the
<a href="http://www.tartarus.org/">tartarus</a> website.
</p>

<p>
We received two Romanian stemming algorithms in 2006, from Erwin
Glockner, Doina Gliga and Marina Stegarescu, working at Heidelberg,
and from Irina Tirdea in Bucharest. After some experimentation,
the Snowball Romanian stemmer has been rewritten from scratch, but the
basic list of verb endings with their separation into two groups with
different removal criteria is taken from Irina Tirdea's stemmer.
</p>

</TD></TR>
<?php displayFooter(); ?>
