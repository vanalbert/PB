<?php
$to      = 'van@hexage.com';
$subject = 'Fake sendmail test';
$message = 'If we can read this, it means that our fake Sendmail setup works!';
$headers = 'From: van@hexage.com' . "\r\n" .
    'Reply-To: van@hexage.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
 
if(mail($to, $subject, $message, $headers)) {
    echo 'Email sent successfully!';
} else {
    die('Failure: Email was not sent!');
}
