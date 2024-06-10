// https://github.com/feathers-studio/telegraf-docs/blob/master/examples/session-bot.ts
import { Context, session, Telegraf } from 'telegraf'

interface SessionData {
  messageCount: number
  // ... more session data go here
}

// Define your own context type
interface MyContext extends Context {
  session?: SessionData
  // ... more props go here
}

if (process.env.BOT_TOKEN === undefined) {
  throw new TypeError('BOT_TOKEN must be provided!')
}

// Create your bot and tell it about your context type
const bot = new Telegraf<MyContext>(process.env.BOT_TOKEN)

// Сделать данные сеанса доступными
bot.use(session())

// Register middleware
bot.on('message', async (ctx) => {
  // set a default value
  ctx.session ??= { messageCount: 0 }
  ctx.session.messageCount++
  await ctx.reply(`Seen ${ctx.session.messageCount} messages.`)
})

// Launch bot
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bot.launch()

import { Telegraf, Markup } from 'telegraf'
import { InlineQueryResult } from 'telegraf/types'

const bot = new Telegraf(token)

bot.on('inline_query', async (ctx) => {
  const apiUrl = `http://recipepuppy.com/api/?q=${ctx.inlineQuery.query}`
  const response = await fetch(apiUrl)
  const { results } = await response.json()
  const recipes = (
    results as { title: string; href: string; thumbnail: string }[]
  )
    .filter(({ thumbnail }) => thumbnail)
    .map(
      ({ title, href, thumbnail }): InlineQueryResult => ({
        type: 'article',
        id: thumbnail,
        title: title,
        description: title,
        thumb_url: thumbnail,
        input_message_content: {
          message_text: title
        },
        ...Markup.inlineKeyboard([Markup.button.url('Go to recipe', href)])
      })
    )
  return await ctx.answerInlineQuery(recipes)
})

bot.on('chosen_inline_result', ({ chosenInlineResult }) => {
  console.log('chosen inline result', chosenInlineResult)
})

bot.launch()
