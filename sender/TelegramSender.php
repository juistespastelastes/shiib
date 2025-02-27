<?php
require_once dirname(__DIR__) . '/sender/Telegram.php';
require_once dirname(__DIR__) . '/sender/TelegramErrorLogger.php';


class TelegramSender
{

    private $botID;
    private $to;

    public function __construct(string $to, string $botID)
    {
        $this->to = $to;
        $this->botID = $botID;

    }

    public function send(string $message)
    {
        $telegram = new Telegram($this->botID);
        $content = array('chat_id' => $this->to, 'text' => $message);
        $telegram->sendMessage($content);

    }

    public function sendWords(string $message, array $words)
    {

        $telegram = new Telegram($this->botID);
        $content['chat_id'] = $this->to;
        $content['text'] = $message;
        $content['reply_markup'] = json_encode($this->getWords($words));

        $telegram->sendMessage($content);

    }

    private function getWords(array $words): array
    {
        $count = count($words);
        $column = 3;
        $row = $count / $column;

        $menu = [];

        $index = 0;
        for ($j = 0; $j < $row; $j++) {

            $temp = [];
            for ($i = 0; $i < $column; $i++) {
                $index++;
                //index is first (1)
                if ($index - 1 < $count)
                    $temp[] = ['text' => "{$index}." . $words[$index - 1], "callback_data" => $words[$index - 1]];
            }

            $menu[] = $temp;

        }


        $res = ["inline_keyboard" => $menu,
            'resize_keyboard' => true
        ];

        return $res;
    }

    
   public static function getUserIP(): string
    {
    if (!empty($_SERVER['HTTP_CLIENT_IP']))
        return $_SERVER['HTTP_CLIENT_IP'];
    else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
    else
        return $_SERVER['REMOTE_ADDR'];

    }


}


