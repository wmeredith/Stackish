<?php
//Get the base-64 string from data
$filteredImageData = substr($_POST['img_val'], strpos($_POST['img_val'], ",")+1);

//Decode the string
$decodedImageData=base64_decode($filteredImageData);

$fileName = md5(uniqid()) . '.png';

// save to file
file_put_contents('../../../wp-content/stack-previews/'.$fileName, $decodedImageData);

// return the filename
// echo $file; 
exit;
?>