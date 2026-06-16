# Kireev Motors — сайт установочной студии

Современный адаптивный одностраничный сайт автосервиса **Kireev Motors** (Пенза).
Чистый HTML + CSS + JavaScript, без сборки и зависимостей. Готов к публикации на **Vercel** или **Netlify**.

## Что внутри

```
.
├── index.html        # вся разметка страницы
├── styles.css        # стили (серо-чёрно-белая тема, адаптив)
├── script.js         # меню, анимация появления, форма, марки/модели авто
├── favicon.svg       # иконка
├── robots.txt        # SEO
├── sitemap.xml       # SEO
├── vercel.json       # конфиг для Vercel
├── netlify.toml      # конфиг для Netlify
└── assets/           # сюда положите свои фото услуг
```

## Возможности

- Главный экран с фоном авто, заголовком и кнопками «Записаться» / «Позвонить»
- Блоки: О компании, Преимущества, Услуги и цены (карточки), Заявка, Адрес, Связь
- **Онлайн-запись**: имя, телефон (с автоформатом), email, марка и модель авто
  (выпадающие списки + ручной ввод), услуга, комментарий/симптомы
- После отправки — сообщение «Спасибо! Мы свяжемся с вами в ближайшее время.»
  (форма-заглушка, реальная отправка пока не подключена)
- Встроенная Яндекс.Карта с меткой на ул. Аустрина, 176Г
- Плавная анимация появления блоков, hover-эффекты, адаптив для ПК и смартфонов
- SEO-разметка (meta, Open Graph, schema.org AutoRepair)

## Локальный запуск

Просто откройте `index.html` в браузере. Либо через локальный сервер:

```bash
npx serve .
# или
python3 -m http.server 8000
```

## Публикация

### Vercel
1. Загрузите содержимое этой папки в репозиторий GitHub.
2. На vercel.com → **Add New → Project** → импортируйте репозиторий.
3. Framework Preset: **Other**, Root Directory: папка с этими файлами. Deploy.

### Netlify
1. Загрузите файлы в репозиторий GitHub.
2. На netlify.com → **Add new site → Import an existing project** → выберите репозиторий.
3. Publish directory: `.` Deploy.
4. Или просто перетащите папку в окно **Netlify Drop** (app.netlify.com/drop).

## Подключение реальной отправки заявок

В `script.js`, в обработчике `form.addEventListener("submit", ...)` собирается объект `data`.
Замените заглушку (`console.log`) на отправку, например в Telegram-бот менеджеру:

```js
await fetch("https://api.telegram.org/bot<TOKEN>/sendMessage", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: "<CHAT_ID>",
    text: `Новая заявка:\nИмя: ${data.name}\nТел: ${data.phone}\nАвто: ${data.brand} ${data.model}\nУслуга: ${data.service}\n${data.comment}`
  })
});
```

> Токен бота не храните в открытом коде продакшена — используйте serverless-функцию
> (Vercel / Netlify Functions) как прокси.

## Замена фото

Положите свои изображения в `assets/` и замените блоки-заглушки `.service-media`
в `index.html` на `<img src="assets/ваше-фото.jpg" alt="...">`.
Фон главного экрана меняется в `styles.css` → `.hero-bg { background-image: ... }`.
