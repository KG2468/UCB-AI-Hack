import PyPDF2
# import pdfminer.six
from PyPDF2 import PdfReader
# from pdfminer.high_level import extract_pages
# from pdfminer.layout import LTTextBoxHorizontal, LTImage

class Parser:
    def image_saver(self, pdf):
        reader = PdfReader(pdf)

        page = reader.pages[0]
        count = 0

        for image_file_object in page.images:
            with open(str(count) + image_file_object.name, "wb") as fp:
                fp.write(image_file_object.data)
                count += 1
    
    def word_saver(self, pdf):
        with open(pdf, "rb") as file:
            reader = PdfReader(file)
            text = ""
            for page_num in range(len(reader.pages)):
                page = reader.pages[page_num]
                text += page.extract_text()
                if '/XObject' in page['/Resources']:
                    xObject = page['/Resources']['/XObject'].get_Object()
                    for obj in xObject:
                        if xObject[obj]['/Subtype'] == '/Image':
                            return text
        return text
    
parsing = Parser()
text = parsing.word_saver("./onshape_handbook.pdf")
parsing.image_saver("./onshape_handbook.pdf")
print(text)
