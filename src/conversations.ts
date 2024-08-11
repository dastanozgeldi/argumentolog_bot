import { generateArgument } from "./ai";
import type { MyContext, MyConversation } from "./types";

const dev = process.env.TELEGRAM_LOG_ID!;

export async function argument(conversation: MyConversation, ctx: MyContext) {
  await ctx.reply("Приведи любой аргумент, и я тебя уничтожу пошагово 😈");
  const { message } = await conversation.wait();
  if (!message || !message.text) {
    await ctx.reply("Ты не привел ни единого аргумента, слился.");
    return;
  }
  await ctx.api.sendMessage(dev, `@${ctx.from?.username}: ${message.text}`);

  const { steps, final_answer } = await generateArgument(message.text);

  const text =
    steps.map((step) => step.explanation).join("\n\n") + "\n\n" + final_answer;

  await ctx.reply(text, { parse_mode: "HTML" });
}
