from PIL import Image
import io
from openai import OpenAI
import os
import PyPDF2
from PyPDF2 import PdfReader
import base64
import requests

pdf_path = "onshape_handbook.pdf"
api_key = "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"

def word_saver(pdf):
    reader = PdfReader(pdf)
    text_before_image = []

    for page in range(len(reader.pages)):
        text = reader.pages[page].extract_text()
        resources = reader.pages[page].get("/Resources", {})
        xObject = reader.pages[page].get("/xObject", {})

        if not any(xObject[obj].get("/Subtype") == "/Image" for obj in xObject):
            text_before_image.append(text)
        
        with open ("text.txt", "a") as f:
            f.write(text)
    
    # return "\n".join(text_before_image)

def read_text_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()


def summarize_text(img_url, pdf_path):
    password = "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"
    MODEL="gpt-4o"
    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY", password))

    word_saver(pdf_path)

    file_text = read_text_file("text.txt")

    # Function to encode the image
    def encode_image(image_path):
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')

    # Getting the base64 string
    base64_image = encode_image(img_url)

    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {password}"
}

    api_key = password
    # completion = client.chat.completions.create(
    #     model=MODEL,
    #     messages = [
    #         {"role": "user", 
    #          "content": [
    #             {"type": "text", "text": f"Given this image and this text from a PDF, find the relevant text corresponding to the image. Here's the text from the PDF:\n\n{file_text[:]}"},
    #             {
    #                 "type": "image_url",
    #                 "image_url": {
    #                       "url": f"data:image/png;base64,{base64_image}"
    #                   },
    #             },
    #         ],
    #         }
    #     ],
    # )
    payload = {
        "model": f"{MODEL}",
        "messages": [
            {
            "role": "user",
            "content": [
                {
                "type": "text",
                "text": "What’s in this image?"
                },
                {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{base64_image}"
                }
                }
            ]
            }
        ],
        "max_tokens": 300
    }

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
    print(response.json())
    return completion.choices[0].message.content

    # payload = {
    #     "model": "gpt-4o",
    #     "messages": [
    #         {
    #         "role": "user",
    #         "content": [
    #             {"type": "text", "text": f"Given this image and this text from a PDF, find the relevant text corresponding to the image. Here's the text from the PDF:\n\n{file_text[:]}"},
    #             {
    #                 "type": "image_url",
    #                 "image_url": {
    #                     "url": f"data:image/png;base64,{base64_image}"
    #                 }
    #             }
    #         ]
    #         }
    #     ],
    # }

    # response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
    # return response

print(summarize_text("/Users/rithwiknukala/UCB-AI-Hack/pdfimages/3Im1.png", "onshape_handbook.pdf"))