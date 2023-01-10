import os.path
import re
import os
import urllib.request
from bs4 import BeautifulSoup
import pdfkit
import time
import base64

path = 'C:/Users/ivy-m/PycharmProjects/scrapper/scrapper2/results/'
merged_path = 'C:/Users/ivy-m/PycharmProjects/scrapper/scrapper2/results/result/merged_4.html'
def single_to_multiple(link):
    with open(merged_path, 'r', encoding='utf-8') as f:
        empty_html = f.read()
    with open(link, 'r', encoding='utf-8') as f:
        html = f.read()
        empty_html = empty_html.replace(
            '</body></html>', html + '</body></html>')
    with open(merged_path, 'w', encoding='utf-8') as f:
        f.write(empty_html)
#for file in os.listdir(path):
#    if file.endswith(".html"):
#        if file[3] != '1' or file[3:5] == "1.":
#            os.rename(file, file[:3] + '0' + file[3:])
    
def multiple_html_to_pdf(path):
    """ converts multiple html files to a single pdf
    args: path to directory containing html files
    """
    all_links = []
    for file in os.listdir(path):
        if file.endswith(".html"):
            all_links.append(file)
    #all_links = sorted(all_links, key=lambda x: float(x[:3]))
    #all_links = sorted(all_links, key=lambda x: x[:-4])
    print(all_links)
    empty_html = '<html><head></head><body></body></html>'
    for file in all_links[24+29+35:]:
        if file.endswith(".html"):
            print(file)
            # append html files
            with open(path + file, 'r', encoding='utf-8') as f:
                html = f.read()
                empty_html = empty_html.replace(
                    '</body></html>', html + '</body></html>', 1)
    with open(merged_path, 'w', encoding='utf-8') as f:
        f.write(empty_html)
    #for file in all_links:
    #    change_something(file)
    #for file in all_links[:3]:
    #    print(file)
    #    # append html files
    #    single_to_multiple(path + file)
    #    time.sleep(1)
        

def safe_save(url):
    file_path = path + url
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    urllib.request.urlretrieve('https://up.htmlacademy.ru/' + url, file_path)
    print(path + url)

def make_pdf(num, short_path=merged_path):
    print(short_path)
    options = {'javascript-delay': '10000',
               "enable-local-file-access": None,
               "quiet": "",
               'no-stop-slow-scripts': '',
               'encoding': 'UTF-8',
               'disable-smart-shrinking': ''
               }
    config = pdfkit.configuration(
        wkhtmltopdf=r'C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe')
    pdfkit.from_file(path + short_path,
                 f'/pdf/Javascript_p_{num}.pdf', configuration=config, options=options)

    

def change_something(file):
        with open( path + file, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, features="html.parser")

        img = soup.find_all('img')
        for s in img:
            #if "/assets/intensives" in s['src']:
            #s.decompose()
            s['src'] = base64.urlsafe_b64encode(bytes(s['src'], 'utf-8'))
        
        with open(path + file, 'w', encoding='utf-8') as f:
            f.write(str(soup))
i = 1            
for file in os.listdir(path)[:3]:
    if file.endswith(".html"):
        make_pdf(i, file)
        i += 1
        #change_something(file)
#multiple_html_to_pdf(path)
#make_pdf(1)



#for link in all_links:
#    print('procesing: ' + link)
#
