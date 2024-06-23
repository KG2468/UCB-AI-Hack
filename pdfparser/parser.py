import PyPDF2
# import pdfminer.six
from PyPDF2 import PdfReader
# from pdfminer.high_level import extract_pages
# from pdfminer.layout import LTTextBoxHorizontal, LTImage

class Parser:
    def image_saver(self, pdf):
        reader = PdfReader(pdf)

        page = reader.pages[3]
        count = 0

        for image_file_object in page.images:
            img = image_file_object.as_pil_image()  # Convert image object to PIL Image
            img = img.convert("RGB")  # Convert image to RGB mode

            with open(str(count) + image_file_object.name + ".png", "wb") as fp:
                print("i am here!!!!")
                img.save(fp, format="PNG")
                count += 1
    
    def word_saver(self, pdf):
        reader = PdfReader(pdf)
        text_before_image = []

        page_number = 4
        page = reader.pages[page_number]
        text = page.extract_text()
        resources = page.get("/Resources", {})
        xObject = page.get("/xObject", {})

        if not any(xObject[obj].get("/Subtype") == "/Image" for obj in xObject):
            text_before_image.append(text)
        
        with open ("text" + str(page_number) + ".txt", "a") as f:
            f.write(text)
        
        return "\n".join(text_before_image)
    
parsing = Parser()
#parsing.image_saver("./onshape_handbook.pdf")
text = parsing.word_saver("./onshape_handbook.pdf")
# print(text)
