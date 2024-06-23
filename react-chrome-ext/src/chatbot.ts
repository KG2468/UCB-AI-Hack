import { ChatAnthropic } from "@langchain/anthropic";
import type { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
//import { AgentExecutor, createXmlAgent } from "langchain/agents";
//import { createRetrieverTool } from "langchain/tools/retriever";
import Anthropic from '@anthropic-ai/sdk';
//import { send } from "process";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

// const llm = new ChatAnthropic({ modelName: "claude-3.5-sonnet", temperature:0});
// const prompt = await pull<ChatPromptTemplate>("hwchase17/xml-agent-convo");

async function sendMessage(query: string): Promise<String> {
    const anthropic = new Anthropic({
      apiKey: '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', // defaults to process.env["ANTHROPIC_API_KEY"]
    });
  
    const user_input = query;
    const system_input = "You need to send back exactly what the user sends to you";
  
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      messages: [
        { role: "user", content: system_input + " " + user_input}
      ],
    });
    //{"type":"test", "text": "hi im clause"}
    //const msgString: string = msg.map(msg => msg.content).join("\n");
    return JSON.stringify(msg.content[0]).substring(23, );
}







// const agent = createXmlAgent({llm, tools, prompt});
// const agentExecutor =  new AgentExecutor({llm, tools, prompt})

// const result = await agentExecutor.invoke({
//     input: question,
//     chat_history: ""
// })

// const CLAUDE_KEY = "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";

// function sum({a, b}: {a: number, b: number}): number {
//     return a + b;
// }

// const sumJSON = {
//     type: "object",
//     properties: {
//         a: {
//             type: "number",
//             description: "the first number"
//         },
//         b: {
//             type: "number",
//             description: "the second number"
//         },
//     },
//     required: ["a", "b"],
// };

// const sumFuncTool = new FunctionTool(sum, {
//     name: "sum",
//     description: "Use this function to add to numbers",
//     parameters: sumJSON,
// });

// const agent = new OpenAIAgent({
//     tools: [sumFuncTool],
//     verbose: true,
// });

// const response = await agent.chat({
//     message: "How much is 3+5?"
// });
// console.log(String(response))
