from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import json

path_to_operadriver = r"C:\\Users\ivy-m\\PycharmProjects\\operadriver_win32\\operadriver.exe"
opera_path = r"C:\\Program Files (x86)\\Opera\\launcher.exe"
appState = {
    "recentDestinations": [
        {
            "id": "Save as PDF",
            "origin": "local"
        }
    ],
    "selectedDestinationId": "Save as PDF",
    "version": 2
}

downloadPath = "./pdf/"
profile = {'printing.print_preview_sticky_settings.appState': json.dumps(appState),
           'savefile.default_directory': downloadPath}


chrome_options = webdriver.ChromeOptions()
chrome_options.add_experimental_option('prefs', profile)
chrome_options.add_argument('--kiosk-printing')
chrome_options.binary_location = opera_path


driver = webdriver.opera.webdriver.OperaDriver(executable_path=path_to_operadriver,
                                               opera_options=chrome_options)


driver.implicitly_wait(30)


url = r"C:\Users\ivy-m\PycharmProjects\scrapper\scrapper2\results\01.01.0.html"
driver.get(url)
driver.execute_script('window.print();')
