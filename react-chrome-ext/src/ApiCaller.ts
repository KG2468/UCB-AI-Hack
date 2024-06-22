import Anthropic from '@anthropic-ai/sdk';

async function sendMessage() {
  const anthropic = new Anthropic({
    apiKey: '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', // defaults to process.env["ANTHROPIC_API_KEY"]
  });

  const user_input = "Hello how are you";
  const system_input = "You need to send back exactly what the user sends to you";

  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1024,
    messages: [
      { role: "assistant", content: user_input},
      { role: "user", content: user_input}
    ],
  });
  console.log(msg);
}

await sendMessage().catch(error => {
  console.error("Error:", error);
});