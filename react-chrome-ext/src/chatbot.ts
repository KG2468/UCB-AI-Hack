import Anthropic from '@anthropic-ai/sdk';
//import axios from "axios";
//import jimp from "jimp";
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

// async function convertImageTo64(file: string): Promise<string> {
//     // const response = await axios.get(file, { responseType: 'arraybuffer' });
//     <canvas src={screenshot.url} alt="Captured screenshot" style={{ maxWidth: '100%', marginTop: '10px' }} />
    // return new Promise((resolve, reject) => {
    //     // const xhr = new XMLHttpRequest();
    //     // xhr.open('GET', file);
    //     // xhr.responseType = 'blob';
    //     // xhr.onload = () => {
    //     //     const reader = new FileReader();
    //     //     reader.onloadend = () => {
    //     //         const base64data = reader.result?.slice(16);
    //     //         console.log('hi');
    //     //         resolve(base64data!.toString());
    //     //     };
    //     //     reader.onerror = reject;
    //     //     reader.readAsDataURL(xhr.response);
    //     // };
    //     // xhr.onerror = reject;
    //     // xhr.send();
    //     const xmlHttpRequest = new XMLHttpRequest();
    //     xmlHttpRequest.open("GET", file, true); 
    //     // Replace with your URL
    //     xmlHttpRequest.responseType = "blob";

    //     xmlHttpRequest.onload = function (event) {
    //         const blob = xmlHttpRequest.response;
    //         const reader = new FileReader();
    //         reader.onloadend = function() {
    //             const base64data = reader.result;
    //             console.log(base64data);
    //             return base64data;
    //         }
    //         reader.readAsDataURL(blob);
    //     };

    //     xmlHttpRequest.send();
    // });

    async function getBase64ImageFromUrl(imageUrl: string) {
        console.log(imageUrl);
        var res = await fetch(imageUrl);
        var blob = await res.blob();
      
        return new Promise((resolve, reject) => {
          var reader  = new FileReader();
          reader.onload = function () {
            //me.modelvalue = reader.result;
            console.log(reader.result);
          };
      
          reader.onerror = () => {
            return reject(self);
          };
          reader.readAsDataURL(blob);
        })
      }
      

    // const buffer = Buffer.from(response.data, 'binary');
    // return buffer.toString('base64');
    // const image = await jimp.read(buffer.toString('base64'));
    // const h = image.getHeight();
    // const w = image.getWidth();
    // const tokens = h*w/750;
    // const scaleFactor = 1500/tokens;
    // image.scale(scaleFactor);
    // const base64String = await image.getBase64Async(jimp.MIME_PNG);
    // return base64String;
// }

// async function sendMessage(query: string, file: string): Promise<String> {
//     const anthropic = new Anthropic({
//       apiKey: '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', // defaults to process.env["ANTHROPIC_API_KEY"]
//     });
  
//     const user_input = query;
//     const system_input = "Describe the image";

//     //Converts image to string of base 64
    


    // (async () => {
    //     try {
    //         const base64String = await convertImageTo64(file);
    //         console.log(base64String);
    //     } catch (error) {
    //         console.error("Error converting image to base64:", error);
    //     }
    // })();

    // const image1_media_type = "image/jpeg";
    // //const base64String = await fetchFileFromUrl(file);
    // const base64String = await convertImageTo64(file);
    // console.log(base64String);

//     // //Converts file path into a File object
//     // async function fetchFileFromUrl(url: string): Promise<File> {
//     //     const response = await fetch(url);
//     //     const blob = await response.blob();
//     //     return new File([blob], 'image.jpg', { type: 'image/jpeg' });
//     // }

//     (async () => {
//         try {
//             const base64String = await convertImageTo64(file);
//             console.log(base64String);
//         } catch (error) {
//             console.error("Error converting image to base64:", error);
//         }
//     })();

//     const image1_media_type = "image/jpeg";
//     //const base64String = await fetchFileFromUrl(file);
//     const base64String = await convertImageTo64(file);
//     console.log(base64String);

//     const msg = await anthropic.messages.create({
//       model: "claude-3-5-sonnet-20240620",
//       max_tokens: 1024,
//       messages: [
//         { role: "user", 
//             content: [
//                 {
//                     "type": "image",
//                     "source": {
//                         "type": "base64",
//                         "media_type": image1_media_type,
//                         "data": base64String,
//                     },
//                 },
//                 {
//                     "type": "text",
//                     "text": "You are a CAD expert. Do this."
//                 }
//         ]}
//       ],
//     });
//     //{"type":"test", "text": "hi im clause"}
//     //const msgString: string = msg.map(msg => msg.content).join("\n");
//     console.log(JSON.stringify(msg.content[0]).substring(22, ));
//     return "0";
// }

async function askQuestion(designGoal: string, specificQuestion: string, file: string[]){
    console.log('hey');
    const anthropic = new Anthropic({
        apiKey: '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', // defaults to process.env["ANTHROPIC_API_KEY"]
    });
    let images = [];
    console.log(file);
    // images = file.map(async (file) => {
    //     file.substring(22)});
    // console.log(images);
    for (let i = 0; i < file.length; i++) {
        images[i] = file[i].substring(22);
    //     const base64String = await getBase64ImageFromUrl(file[i]);
    //     // console.log('hey');
    //     images.push(base64String);
        // images.push({
        //     "type": "image",
        //     "source": {
        //         "type": "base64",
        //         "media_type": "image/png",
        //         "data": base64String,
        //     },
        // });
    }
    // images.push(
    //     {
    //         "type": "text",
    //         "text": specificQuestion
    //     },
    // );
    const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 300,
        messages: [
          { role: "user", 
              content: [
                  {
                      "type": "text",
                      "text": "I am a budding CAD designer. I want to make a" + designGoal + ". Can you help me with this?"
                  }
          ]},
          {
            role: "assistant",
            content: [
                {
                    "type": "text",
                    "text": "Certainly! As a CAD expert, I can help you with this. Please provide me with some recent images of your CAD workspace, and some details about what you are stuck on."
                },
            ]
          },
          {
            role: "user",
            content: [
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": "image/png",
                        "data": images[0]+"",
                    },
                },
                // {
                //     "type": "image",
                //     "source": {
                //         "type": "base64",
                //         "media_type": "image/png",
                //         "data": images[1],
                //     },
                // },
                // {
                //     "type": "image",
                //     "source": {
                //         "type": "base64",
                //         "media_type": "image/png",
                //         "data": images[2],
                //     },
                // },
                // {
                //     "type": "image",
                //     "source": {
                //         "type": "base64",
                //         "media_type": "image/png",
                //         "data": images[3],
                //     },
                // },
                // {
                //     "type": "image",
                //     "source": {
                //         "type": "base64",
                //         "media_type": "image/png",
                //         "data": images[5],
                //     },
                // },
                {
                    "type": "text",
                    "text": "Here is a screenshot of my workspace. My specific question was:" + specificQuestion + ". Please give me specific guidance on what CAD tools to use and where to apply them.",
                },
            ],
          }
        ],
    });
    return JSON.stringify(msg.content[0]).substring(22, );
    // return "blah";
}

async function askQuestionTemp(designGoal: string, specificQuestion: string, file: string[]): Promise<string> {
    console.log('hey');
    const anthropic = new Anthropic({
        apiKey: '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', // defaults to process.env["ANTHROPIC_API_KEY"]
    });
    // let images = [];
    // console.log(file);
    // for (let i = 0; i < file.length; i++) {
    //     const base64String = await convertImageTo64(file[i]);
    //     console.log('hey');
    //     images.push(base64String);
    //     // images.push({
    //     //     "type": "image",
    //     //     "source": {
    //     //         "type": "base64",
    //     //         "media_type": "image/png",
    //     //         "data": base64String,
    //     //     },
    //     // });
    // }
    // images.push(
    //     {
    //         "type": "text",
    //         "text": specificQuestion
    //     },
    // );
    const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 200,
        messages: [
          { role: "user", 
              content: [
                  {
                      "type": "text",
                      "text": "I am a budding CAD designer. I want to make a" + designGoal + ". Can you help me with this? Please provide a string without any formatting characters as a response."
                  }
          ]},
          {
            role: "assistant",
            content: [
                {
                    "type": "text",
                    "text": "Certainly! As a CAD expert, I can help you with this. Please provide me with some details about what you are stuck on."
                },
            ]
          },
          {
            role: "user",
            content: [
                // {
                //     "type": "image",
                //     "source": {
                //         "type": "base64",
                //         "media_type": "image/png",
                //         "data": images[0],
                //     },
                // },
                // {
                //     "type": "image",
                //     "source": {
                //         "type": "base64",
                //         "media_type": "image/png",
                //         "data": images[1],
                //     },
                // },
                // {
                //     "type": "image",
                //     "source": {
                //         "type": "base64",
                //         "media_type": "image/png",
                //         "data": images[2],
                //     },
                // },
                // {
                //     "type": "image",
                //     "source": {
                //         "type": "base64",
                //         "media_type": "image/png",
                //         "data": images[3],
                //     },
                // },
                // {
                //     "type": "image",
                //     "source": {
                //         "type": "base64",
                //         "media_type": "image/png",
                //         "data": images[5],
                //     },
                // },
                {
                    "type": "text",
                    "text": "I have no screenshots of my workspace. My specific question was:" + specificQuestion + ". Please give me specific guidance on what CAD tools to use and where to apply them.",
                },
            ],
          }
        ],
    });
    return JSON.stringify(msg.content[0]).substring(22, );
    // return "blah";
}


export {askQuestion, askQuestionTemp};
// console.log(sendMessage("This is my image.", "https://picsum.photos/200"));

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
