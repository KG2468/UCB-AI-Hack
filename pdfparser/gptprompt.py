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

# def extract_images_and_text(pdf_path):
#     doc = fitz.open(pdf_path)
#     images = []
#     text = ""

#     for page_num in range(len(doc)):
#         page = doc.load_page(page_num)
#         text += page.get_text("text")

#         img_list = page.get_images(full=True)
#         for img_index, img in enumerate(img_list):
#             xref = img[0]
#             base_image = doc.extract_image(xref)
#             image_bytes = base_image["image"]
#             image_ext = base_image["ext"]
#             image = Image.open(io.BytesIO(image_bytes))
#             images.append((page_num, img_index, image, img))

#     return images, text


# def find_image_text_around(pdf_path, image, margin=50):
#     doc = fitz.open(pdf_path)
#     page_num, img_index, img, img_info = image
#     page = doc.load_page(page_num)
#     rect = fitz.Rect(img_info[1], img_info[2], img_info[3], img_info[4])

#     surrounding_text = page.get_textbox(rect +
#                                         (-margin, -margin, margin, margin))
#     return surrounding_text

def word_saver(pdf):
    reader = PdfReader(pdf)
    text_before_image = []

    # page_number = 
    # page = reader.pages[page_number]
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
    base64_image = encode_image(pdf_path)

    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {password}"
}
    
    # self.sinput = f"Summarize the following text into 4 key points:\n\n{text}",
    # api_key = password
    # completion = client.chat.completions.create(
    #     model=MODEL,
    #     messages = [
    #         {"role": "user", "content": [
    #             {"type": "text", "text": f"Given this image and this text from a PDF, find the relevant text corresponding to the image. Here's the text from the PDF:\n\n{file_text[:]}"},
    #             {
    #                 "type": "image_url",
    #                 "image_url": {"url": img_url},
    #             },
    #         ],
    #         }
    #     ],
    # )
    
    # return completion.choices[0].message.content

    payload = {
        "model": "gpt-4o",
        "messages": [
            {
            "role": "user",
            "content": [
                {"type": "text", "text": f"Given this image and this text from a PDF, find the relevant text corresponding to the image. Here's the text from the PDF:\n\n{file_text[:]}"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/png;base64,{base64_image}"
                    }
                }
            ]
            }
        ],
    }

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
    return response

print(summarize_text("UCB-AI-Hack/pdfimages/17Im0.png", "onshape_handbook.pdf").json())