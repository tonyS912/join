<?php

########### CONFIG ###############

$recipient = $_POST['email'];
$timestamp = time();
$link = "https://tony-schiller.developerakademie.net/reset-password.html?email=" . $recipient . "&timestamp=" . $timestamp;
$message = "Hello, \r\n
you can reset your password by clicking on the link below: \r\n
$link \r\n
Best greetings 
Customer Service
Join Kanban Board";
$redirect = 'request-sended.html';

########### CONFIG END ###########



########### Intruction ###########   
#
#   This script has been created to send an email to the $recipient
#   
#  1) Upload this file to your FTP Server
#  2) Send a POST rewquest to this file, including
#     [name] The name of the sender (Absender)
#     [message] Message that should be send to you
#
##################################



###############################
#
#        DON'T CHANGE ANYTHING FROM HERE!
#
#        Ab hier nichts mehr ändern!
#
###############################

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $subject = "Password reset Join Kanban Board";
        $headers = "From:  noreply@developerakademie.com";

        mail($recipient, $subject, $message, $headers);
        header("Location: " . $redirect); 

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
