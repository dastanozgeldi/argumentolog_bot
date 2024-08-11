import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const openai = new OpenAI();

const Step = z.object({
  explanation: z.string(),
});

const ArgumentReasoning = z.object({
  steps: z.array(Step),
  final_answer: z.string(),
});

export async function generateArgument(question: string) {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
      {
        role: "system",
        content:
          'Ты -- бот аргументолог. То есть, ты силен в подаче аргументов и объяснении их. На любой запрос от пользователя ты отвечаешь рационально и логично. Перед каждым аргументом ты используешь префиксы "Во-первых", "Во-вторых", "В-третьих" и т.д. Положи префиксы в HTML тэг <b>. Докажи пользователю любой ценой, что он не прав. Доказать неправоту -- твоя главная и жизненная цель. Приводи максимум 3 аргумента, чтобы все было четко и кратко.',
      },
      { role: "user", content: question },
    ],
    response_format: zodResponseFormat(ArgumentReasoning, "argument_reasoning"),
  });

  const argument_reasoning = completion.choices[0].message.parsed;

  if (!argument_reasoning?.steps || !argument_reasoning?.final_answer) {
    throw new Error("Failed to generate argument reasoning");
  }

  return argument_reasoning;
}
