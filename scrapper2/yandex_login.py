from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import httplib2
from bs4 import BeautifulSoup, SoupStrainer
import os
import glob
import requests
import re
import time
links = []
http = httplib2.Http()
BASE_LINK = 'https://up.htmlacademy.ru'
def get_content(link):
    driver.get(BASE_LINK + link['href'])
    soup = BeautifulSoup(driver.page_source, features="html.parser")
    for div in soup.find_all("header"):
        div.decompose()
    for div in soup.find_all("div", {'id': 'side-menu__wrap'}):
        div.decompose()
    for div in soup.find_all("footer"):
        div.decompose()
    for p in soup.find_all("a", {'class': 'curator-chat'}):
        p.decompose()
    with open('C:/Users/ivy-m/PycharmProjects/scrapper/scrapper2/results/' + link['href'][20:] + '.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))

EXE_PATH = 'chromedriver.exe'
driver = webdriver.Chrome(executable_path=EXE_PATH)
driver.get('https://htmlacademy.ru/login')
u = driver.find_element_by_name('email')
u.send_keys('denis.darwin12@gmail.com')
p = driver.find_element_by_name('password')
p.send_keys('Denis1979')
p.send_keys(Keys.RETURN)
time.sleep(2)
driver.get('https://up.htmlacademy.ru/javascript/25/book')
print(driver.page_source)
with open("ha_success.html", "w", encoding="utf-8") as f:
    f.write(driver.page_source)
soup = BeautifulSoup(driver.page_source, features="html.parser")
content = soup.find('ul', {'class':'post-content__chapters'})
links = content.find_all('a')
for link in links:
    get_content(link)
    print(link['href'])
    time.sleep(2)


