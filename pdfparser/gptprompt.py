import fitz  # PyMuPDF
from PIL import Image
import pytesseract
import io
import openai

pdf_path = "onshape_handbook.pdf"
api_key = "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"

def extract_images_and_text(pdf_path):
    doc = fitz.open(pdf_path)
    images = []
    text = ""

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text += page.get_text("text")

        img_list = page.get_images(full=True)
        for img_index, img in enumerate(img_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            image = Image.open(io.BytesIO(image_bytes))
            images.append((page_num, img_index, image, img))

    return images, text


def find_image_text_around(pdf_path, image, margin=50):
    doc = fitz.open(pdf_path)
    page_num, img_index, img, img_info = image
    page = doc.load_page(page_num)
    rect = fitz.Rect(img_info[1], img_info[2], img_info[3], img_info[4])

    surrounding_text = page.get_textbox(rect +
                                        (-margin, -margin, margin, margin))
    return surrounding_text


def summarize_text(api_key, text):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        prompt=f"Summarize the following text into 4 key points:\n\n{text}",
        max_tokens=100,
        n=1,
        stop=None,
        temperature=0.5)
    return response.choices[0].text.strip()


images, full_text = extract_images_and_text(pdf_path)

for image in images:
    surrounding_text = find_image_text_around(pdf_path, image)
    key_points = summarize_text(api_key, surrounding_text)
    print(f"Image {image[1]} on page {image[0]}:")
    print(key_points)
    print("\n" + "-" * 40 + "\n")
