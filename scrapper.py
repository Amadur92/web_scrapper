import httplib2
from bs4 import BeautifulSoup, SoupStrainer
import os
import glob
BASE_LINK = "https://html5beginner.github.io"
http = httplib2.Http()
status, response = http.request('https://html5beginner.github.io/pages/basichtml.html')
sidebar = BeautifulSoup(response, features="html.parser")
links = sidebar.findAll('a')

def get_content(link):
    status, response = http.request(BASE_LINK + link[2:])
    soup = BeautifulSoup(response, features="html.parser")
    for div in soup.find_all("div", {'class': 'left-sidebar'}):
        div.decompose()
    for div in soup.find_all("div", {'id': 'disqus_recommendations'}):
        div.decompose()
    for div in soup.find_all("div", {'id': 'disqus_thread'}):
        div.decompose()
    for div in soup.find_all("div", {'class': 'right-sidebar'}):
        div.decompose()
    for div in soup.find_all("iframe"):
        div.decompose()
    for div in soup.find_all("footer"):
        div.decompose()
    for p in soup.find_all("p", {'class': 'brief'}):
        p.decompose()
    for link in soup.find_all(link):
        link['href'] = '../scrapper' + link['href'][2:]
    with open(link[8:], 'w', encoding='utf-8') as f:
        f.write(str(soup))


css_tags = ['link', "stylesheet" "../scrapper/styles/style.css",
            'link', "stylesheet", "../scrapper/styles/ws.css",
            'link', "stylesheet", "../scrapper/styles/w3colors.css",
            'link', "stylesheet", "../scrapper/styles/handheld.css"]
for link in links:
    get_content(link['href'])

