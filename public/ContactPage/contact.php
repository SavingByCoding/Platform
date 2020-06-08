<?php

   if(isset($_POST['submit'])){
    $name=$_POST['fname'.'lname'];
    $subject=$_POST['subject'];
    $mailFrom=$_POST['email'];
    $message=$_POST['message'];

    $mailTo="savingbycoding@gmail.com";
    $headers= "Contact Form Reply: ".$mailFrom;
    $txt="You have received an e-mail from ".name.".\n\n".message;

    mail($mailTo, $subject, $txt, $headers);
    header("Location: index.php?mailsend");
   }

?>