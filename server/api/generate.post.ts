import Anthropic from "@anthropic-ai/sdk";

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    type: "truth" | "dare";
    context?: { role: "user" | "assistant"; content: string }[];
  }>(event);

  const config = useRuntimeConfig();
  const anthropic = new Anthropic({
    apiKey: config.anthropicApiKey,
  });

  const context = body.context ?? [];
  const response = await anthropic.messages.create({
    max_tokens: 512,
    model: "claude-3-haiku-20240307",
    system:
      "You are a random generator for the game Spin the bottle. Respond only with a truth or dare question and nothing else.",
    temperature: 1,
    messages: [...context, { role: "user", content: body.type }],
  });

  return response;
});
