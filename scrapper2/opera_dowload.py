from selenium import webdriver
from webdriver_manager.opera import OperaDriverManager
import os

os.environ['GH_TOKEN'] = "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"
driver = webdriver.Opera(executable_path=OperaDriverManager().install())
driver.get("https://www.google.com")

