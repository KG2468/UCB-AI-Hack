"use strict";
exports.__esModule = true;
var sdk_1 = require("@anthropic-ai/sdk");
var anthropic = new sdk_1["default"]({
    apiKey: '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'
});
var user_input = "Hello how are you";
var system_input = "You need to send back exactly what the user sends to you";
var msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1024,
    messages: [
        { role: "assistant", content: user_input },
        { role: "user", content: user_input }
    ]
});
console.log(msg);