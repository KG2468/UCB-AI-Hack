import Anthropic from '@anthropic-ai/sdk';
import axios from "axios";
// import { ChatAnthropic } from "@langchain/anthropic";
// import type { ChatPromptTemplate } from "@langchain/core/prompts";
// import { pull } from "langchain/hub";
//import { AgentExecutor, createXmlAgent } from "langchain/agents";
//import { createRetrieverTool } from "langchain/tools/retriever";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { MemoryVectorStore } from "langchain/vectorstores/memory";

// const llm = new ChatAnthropic({ modelName: "claude-3.5-sonnet", temperature:0});
// const prompt = await pull<ChatPromptTemplate>("hwchase17/xml-agent-convo");

async function sendMessage(query: string, file: string): Promise<String> {
    const anthropic = new Anthropic({
      apiKey: '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', // defaults to process.env["ANTHROPIC_API_KEY"]
    });
  
    const user_input = query;
    const system_input = "Describe the image";

    //Converts image to string of base 64
    async function convertImageTo64(file: string): Promise<string> {
        const response = await axios.get(file, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');
        return buffer.toString('base64');
}

    (async () => {
        try {
            const base64String = await convertImageTo64(file);
            console.log(base64String);
        } catch (error) {
            console.error("Error converting image to base64:", error);
        }
    })();

    const image1_media_type = "image/jpeg";
    //const base64String = await fetchFileFromUrl(file);
    const base64String = await convertImageTo64(file);
    console.log(base64String);

    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      messages: [
        { role: "user", 
            content: [
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": image1_media_type,
                        "data": base64String,
                    },
                },
                {
                    "type": "text",
                    "text": "You are a CAD expert. Do this."
                }
        ]}
      ],
    });
    //{"type":"test", "text": "hi im clause"}
    //const msgString: string = msg.map(msg => msg.content).join("\n");
    console.log(JSON.stringify(msg.content[0]).substring(22, ));
    return "0";
}

console.log(sendMessage("This is my image.", "https://picsum.photos/200"));

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
