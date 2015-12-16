<?php
// Redirect to SVN
list($rev, $file) = explode('?', $_SERVER['QUERY_STRING']);

$redirect = 'http://svn.tartarus.org/';
if ($rev != '' && $file != '') {
    $redirect .= $file . '?r1=' . ($rev-1) . "&r2=" . $rev;
} else if ($rev != '') {
    $redirect .= '?rev=' . $rev;
} else {
    $redirect .= '?';
}
$redirect .= '&root=Snowball';
header('Location: ' . $redirect);
?>
