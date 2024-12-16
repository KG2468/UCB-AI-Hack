import PyPDF2
# import pdfminer.six

from pypdf import PdfReader
from pdfminer.high_level import extract_pages
from pdfminer.layout import LTTextBoxHorizontal, LTImage

import os
from PIL import Image
import pdfplumber

class Parser:    
    def extract_images(self, pdf_path):
        reader = PdfReader(pdf_path)

        pages = reader.pages
        count = 0
        for page in pages:
            for image_file_object in page.images:
                with open("pdfimages/" + str(count) + image_file_object.name, "wb") as fp:
                    fp.write(image_file_object.data)
            count += 1

    
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
