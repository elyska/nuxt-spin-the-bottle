import Anthropic from "@anthropic-ai/sdk";

export default defineEventHandler(async (event) => {
  const { context, players, prompt } = await readBody<{
    context: { role: "user" | "assistant"; content: string }[];
    players: string[];
    prompt?: string;
  }>(event);

  const config = useRuntimeConfig();
  const anthropic = new Anthropic({
    apiKey: config.anthropicApiKey,
  });

  const system = `You are a random generator for the game Spin the bottle. The players are ${players.join(
    ", "
  )} and are together in one room. ${prompt ? 'Make the questions personalised. ' + prompt : ''}
  You will receive messages in the form: <name> <truth/dare>. Respond only with a truth or dare question and nothing else.`;
  const response = await anthropic.messages.create({
    max_tokens: 512,
    model: "claude-3-haiku-20240307",
    system,
    temperature: 1,
    messages: context,
  });

  return response;
});
