import pdfkit
import os

path = "C:/Users/ivy-m/PycharmProjects/scrapper/"


def multiple_html_to_pdf(path):
    """ converts multiple html files to a single pdf
    args: path to directory containing html files
    """
    empty_html = '<html><head></head><body></body></html>'
    for file in os.listdir(path):
        if file.endswith(".html"):
            print(file)
            # append html files
            with open(path + file, 'r', encoding='utf-8') as f:
                html = f.read()
                empty_html = empty_html.replace(
                    '</body></html>', html + '</body></html>')

    with open('C:/Users/ivy-m/PycharmProjects/scrapper/result/merged.html', 'w', encoding='utf-8') as f:
        f.write(empty_html)


multiple_html_to_pdf(path)
config = pdfkit.configuration(
    wkhtmltopdf='C:\Program Files\wkhtmltopdf\\bin\wkhtmltopdf.exe')
pdfkit.from_file('C:/Users/ivy-m/PycharmProjects/scrapper/result/merged.html', 'Report.pdf', configuration=config)



