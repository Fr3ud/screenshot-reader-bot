const { Telegraf } = require('telegraf')

const token = '42'

const bot = new Telegraf(token)

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.on('photo', (ctx) => ctx.reply('🖖'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()
