<?php
# Calculate the relative path from file $from to file $to
function relativePath($from, $to)
{
  # FIXME: not yet implemented: just a simple hack that works if
  # all files are in same directory.
  return basename($to);
}

# Output the text of a menu entry, with a link unless the menu entry is
# to the current page.  $text is the text to be displayed, $file is the
# absolute path from the top of the website to the file to be linked to.
function menuEntry($text, $file)
{
  global $PHP_SELF;
  $href = relativePath($PHP_SELF, $file);
  if ($PHP_SELF != $file && file_exists($href)) {
    echo "<a href=$href>$text</a>";
  } else {
    echo $text;
  }
  echo "<br>\n";
}

# Display the whole menu.  Expects to be in a <table> context.
function displayMenu()
{
  echo "<td valign=top bgcolor=cyan width=128>";
  menuEntry("Introduction", "/index.php");
  menuEntry("Demo", "/demo.php");
  menuEntry("Download", "/download.php");
  menuEntry("Mailing lists", "/lists.php");
  menuEntry("License", "/license.php");
  menuEntry("Credits", "/credits.php");
  menuEntry("Projects", "/projects.php");
?>
<br>

<a href="http://svn.tartarus.org/?root=snowball">Browse SVN</a><br>
<br>

<!--
<form NAME=P METHOD=GET ACTION="omega.cgi" TARGET="_top">
<center>
<input NAME=P VALUE="" SIZE=12>
<input TYPE=SUBMIT VALUE="Search" BORDER=0>
<input TYPE=hidden NAME=DB VALUE="snowball-website">
<input TYPE=hidden NAME=FMT VALUE="snquery">
</form>
<br>
-->

</td>
<?php
}

# Display the header of a page, including the menu.
# Title is the title of the page: it will be prefixed with "Snowball - ".
# There should be no output before this is called.
function displayHeader($title)
{
  $fulltitle = "Snowball";
  if ($title != "") {
    $fulltitle = "$fulltitle - $title";
  }
?>
<html>
<head>
<title><?php echo $fulltitle ?></title>
</head>
<body bgcolor=white>
<table><tr><td valign=center>
<center><img src="snub-dodecahedron.gif"></center>
</td><td>
<h1 align=center><?php echo $fulltitle ?></h1>
</td></tr>
<tr><?php displayMenu(); ?><td valign=top>
<table width=95% align=center cols=1>
<?php
}

# Display the footer of the page.
# There should be no output after this is called.
function displayFooter()
{
?>
</table>
</td></tr></table>
<address>
Last modified on <?php
  global $SCRIPT_FILENAME;
  echo date('r', filemtime($SCRIPT_FILENAME));
?>.<br>
<a href="mailto:snowball-discuss@lists.tartarus.org">Write to our mailing list</a> if you have comments or questions about the project.  Note that this mailing list will reject postings from non-subscribers (due to the immense amount of spam received otherwise).  The list is fairly low-traffic, but if you don't wish to receive messages (but wish to be able to post), you can disable sending of messages in the mailing list options after subscribing.
</address>
</body>
</html>
<?php
}

?>
