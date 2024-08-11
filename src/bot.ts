import { Bot, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import "dotenv/config";
import { MyContext } from "./types";
import { argument } from "./conversations";

const token = process.env.TELEGRAM_TOKEN;

if (token === undefined) {
  throw new Error("TELEGRAM_TOKEN must be provided!");
}

const bot = new Bot<MyContext>(token);

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());

bot.use(createConversation(argument));

bot.command("start", async (ctx) => {
  await ctx.reply(
    "Привет! Я -- бот-аргументолог (профессиональный yapper).\n\n" +
      "Я верю в то, что в любом исходе ты будешь не прав.\n\n" +
      "Напиши /arg, чтобы начать самоуничтожение."
  );
});

bot.command(["arg", "argument"], async (ctx) => {
  await ctx.conversation.enter("argument");
});

bot.start();
