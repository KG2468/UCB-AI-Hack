import PyPDF2
# import pdfminer.six
from PyPDF2 import PdfReader
# from pdfminer.high_level import extract_pages
# from pdfminer.layout import LTTextBoxHorizontal, LTImage
import os
from PIL import Image

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
text = parsing.word_saver("./onshape_handbook.pdf")

# print(text)
