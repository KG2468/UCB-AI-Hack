import PyPDF2
# import pdfminer.six

from pypdf import PdfReader
from pdfminer.high_level import extract_pages
from pdfminer.layout import LTTextBoxHorizontal, LTImage

import os
from PIL import Image
import pdfplumber

# def dict_to_image(img_dict):
#     # Extract necessary information
#     width = img_dict['width']
#     height = img_dict['height']
#     stream = img_dict['stream']
#     colorspace = img_dict['colorspace']  # This is simplified; actual conversion may be needed

#     # Determine the mode based on 'colorspace' (this example assumes RGB)
#     mode = 'RGB' if colorspace == 'RGB' else 'L'  # Fallback to grayscale

#     # Convert stream to bytes if it's not already in that format
#     # if isinstance(stream, str):
#     # stream_bytes = stream.decode()
#     # elif isinstance(stream, list):  # Assuming stream might be a list of bytes
#     # stream_bytes = bytes(stream)
#     # else:
#     #     stream_bytes = stream  # Assuming it's already a bytes-like object

#     # Create an image from the stream
#     image = Image.frombytes(mode, (int(width), int(height)), stream_bytes)
#     return image

class Parser:
    

    
    # def image_saver(self, pdf):
    #     reader = PdfReader(pdf)

    #     page = reader.pages[3]
    #     count = 0

    #     for image_file_object in page.images:
    #         img = image_file_object.as_pil_image()  # Convert image object to PIL Image
    #         img = img.convert("RGB")  # Convert image to RGB mode

    #         with open(str(count) + image_file_object.name + ".png", "wb") as fp:
    #             print("i am here!!!!")
    #             img.save(fp, format="PNG")
    #             count += 1
    


    def extract_images(self, pdf_path):
        reader = PdfReader(pdf_path)

        pages = reader.pages
        count = 0
        for page in pages:
            for image_file_object in page.images:
                with open("pdfimages/" + str(count) + image_file_object.name, "wb") as fp:
                    fp.write(image_file_object.data)
            count += 1
        # pdf =  pdfplumber.open(pdf_path)
        # for page in pdf.pages:
        #     images = page.images
        #     for img in images:
        #         print(img.keys())
        #         im = dict_to_image(img)
        #         im.save(f"/Users/kinjal/Code/UCB-AI-Hack/pdfimages/image_{img['object_number']}.png")
        # first_page = pdf.pages[0]
        # print(first_page.chars[0])
    # def extract_images(self, pdf_path):

        # output_dir = "/Users/kinjal/Code/UCB-AI-Hack/pdfimages"
        # if not os.path.exists(output_dir):
        #     os.makedirs(output_dir)

        # count = 1
        # for page_layout in extract_pages(pdf_path):
        #     print(count)
        #     for element in page_layout:
        #         print(element)
        #         if isinstance(element, LTImage):
        #             # Convert LTImage to Pillow Image
        #             pil_img = Image.frombytes("RGB", (element.width, element.height), element.stream.get_data())

        #             # Save the image to the output directory
        #             image_path = os.path.join(output_dir, f"image_{count}.png")
        #             pil_img.save(image_path, format="PNG")

        #             count += 1

    
    def word_saver(self, pdf):
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
    
parsing = Parser()
#parsing.image_saver("./onshape_handbook.pdf")
# text = parsing.word_saver("./onshape_handbook.pdf")
parsing.extract_images("/Users/kinjal/Code/UCB-AI-Hack/pdfparser/onshape_handbook.pdf")

# print(text)
