<?php
  require "menu.inc";
  displayHeader("Demo");
?>
<TR><TD>

<form method="POST" action="demo.php">
Enter some words to stem, using the English stemming algorithm, and then click on Submit:<br>
<textarea name="words" rows="10" cols="50"><?php
$words = $_POST['words'];
$tmp = preg_replace('|\\\\|', '', $words);
echo "$tmp";
?></textarea>
<br>
<input type="submit" name="Submit" value="Submit">
</form>
</TD></TR>

<?php
if ($words != '')
{
  echo "<TR><TD>";
  echo "<h2>Results</h2><pre>";
  $tmpname = tempnam("/tmp", "snowball_stemdemo");
  $tmpfile = fopen($tmpname, "w");
  $words = strtolower($words);
  $words = preg_replace('|[^-A-Za-z\']|', ' ', $words);
  $words = preg_replace('|[-\']|', '', $words);
  $words = preg_replace('| *$|', '', $words);
  $words = preg_replace('|  *|', "\n", $words);
  $language = "english";
  # Have a limit of 10000 bytes, just in case.
  fwrite($tmpfile, $words, 10000);
  fclose($tmpfile);
  passthru ("/home/snowball-svn/pub/compiled/stemwords -p -i $tmpname");
  unlink($tmpname);
  echo "</pre>";
  echo "</TR></TD>";
}
?>

<?php displayFooter(); ?>
