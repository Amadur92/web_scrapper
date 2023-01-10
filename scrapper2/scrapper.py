import httplib2
from bs4 import BeautifulSoup, SoupStrainer
import os
import glob
import requests

user_agent_val = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'

url = 'https://htmlacademy.ru/login'
session = requests.Session()
r = session.get(url, headers={
    'User-Agent': user_agent_val
})
session.headers.update({'Referer': url})
session.headers.update({'User-Agent': user_agent_val})
_xsrf = session.cookies.get('_xsrf', domain=".https://htmlacademy.ru")
post_request = session.post(url, {
    'backUrl': 'https://htmlacademy.ru',
    'username': 'denis.darwin12@gmail.com',
    'password': 'Denis1979',
    '_xsrf': _xsrf,
    #'remember': 'yes',
})
link = 'https://htmlacademy.ru/profile/id97687'
soup = BeautifulSoup(post_request.text, features="html.parser")
#links = sidebar.findAll('a')
with open("ha_success.html", "w", encoding="utf-8") as f:
    f.write(post_request.text)
print(soup)
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
#for link in links:
#    get_content(link['href'])
#for filename in glob.glob('html5_serversentevents.html'):
#    with open(os.path.join(os.getcwd(), filename), 'r', encoding='utf-8') as f:
#        print(f.read())
#        soup = BeautifulSoup(f, 'xml')
#        print(soup.find_all('head'))
#        soup.append(soup.new_tag('head'))
