const { Telegraf, Markup } = require('telegraf')
const Tesseract = require('tesseract.js');
const BOT_TOKEN = require('./config.js');

const bot = new Telegraf(BOT_TOKEN);

let count = 0;
let link = '';
let lang = 'eng';

const recognize = () => Tesseract.recognize(link, lang, {})
    .then(({ data: { text }}) => text);

const inlineChooseLanguageKeyboard = Markup
    .inlineKeyboard([
        Markup.callbackButton('English', 'eng'),
        Markup.callbackButton('Русский', 'rus'),
        Markup.callbackButton('Українська', 'ukr')]
    )
    .oneTime()
    .resize()
    .extra();

bot.start((ctx) =>
    ctx.reply('Привет! Отправь мне изображение с текстом, который нужно распознать и выбери язык.'));

bot.help((ctx) =>
    ctx.reply('Отправь мне изображение с текстом, который нужно распознать и выбери язык.'));

bot.on(['photo', 'document'], async (ctx) => {
    console.log(`${++count} screenshots have been recognized!`);

    if (ctx.message.document) {
        const message = ctx.message;
        const documentID = message.document.file_id;
        link = await bot.telegram.getFileLink(documentID);
    } else {
        const photos = ctx.message.photo;
        const photo = photos.pop().file_id;
        link = await bot.telegram.getFileLink(photo);
    }

    await ctx.reply('Выберите язык:', inlineChooseLanguageKeyboard);
});

bot.action(['eng', 'rus', 'ukr'], async (ctx) => {
    await ctx.reply('Пожалуйста, подождите...');

    lang = ctx.update.callback_query.data;
    const result = await recognize();
    console.log(link);

    await ctx.reply(result);
    await ctx.reply('🖖');
});

bot.launch();
