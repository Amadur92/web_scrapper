const puppeteer = require("puppeteer");

const Login = "https://htmlacademy.ru/login";
const LINKS_ACADEMY = "https://up.htmlacademy.ru";
const LINKS_BOOK = "/htmlcss/33/book";
const nextClass = ".post-content__wrapper";
const errorClass = ".card--orphus";
const curratoClass = ".curator-chat";

async function start() {
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: false,
    args: ["--window-size=1040,1080"],
    slowMo: 20,
  });

  const page = await browser.newPage();
  // await page.setViewport({
  //   width: 700z,
  //   height: 1020,
  //   deviceScaleFactor: 1,
  // });

  await page.goto(Login);
  await page.waitForSelector("#login-email");
  await page.$eval(
    "#login-email",
    (el) => (el.value = "denis.darwin12@gmail.com")
  );
  await page.$eval("#login-password", (el) => (el.value = "Denis1979"));

  // await page.screenshot({ path: "test1.png" });

  await page.click(".button--full-width");
  
  // await page.goto(`${LINKS_ACADEMY}${LINKS_BOOK}`);
  await page.goto('https://up.htmlacademy.ru/htmlcss/33/book')

  await page.waitForSelector(".blog-section__content");
  const content = await page.$(".blog-section__content");

  await content.$$eval('a', (nodes) => nodes.forEach((el, i) => {
    el.innerText = el.innerText + ` на странице - ${i + 2}`
  }))

  // await removeElem(nextClass, page)
  await removeElem(errorClass, page)
  await removeElem(curratoClass, page)

  await content?.screenshot({
    path: `test/book.png`,
  });

  // await removeElem(".up-header--htmlcss", page);
  // await removeElem("footer", page);

  // await page.emulateMediaType("screen");
  // await page.pdf({ path: "page.pdf", landscape: true });

  const arrlinks = getArrLinks()

  for (let i = 30; i < 30; i++) {
    await page.goto(arrlinks[i]);
    await page.waitForSelector(".blog-section__content");
    const content = await page.$(".blog-section__content");

    // await removeElem(nextClass, page)
    await removeElem(errorClass, page)
    await removeElem(curratoClass, page)

    await content?.screenshot({
      path: `test/screen-${i + 1}.png`,
    });
    // await content.pdf({})
  }
  await page.close();
  await browser.close();
}

async function removeElem(selector, page) {
  await page.evaluate((s) => {
    const elem = document.querySelector(s);
    if (elem) {
      elem.parentNode.removeChild(elem);
    }
  }, selector);
}

start();


function getArrLinks() {
  return [
    "https://up.htmlacademy.ru/htmlcss/33/book/1",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.1",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.2",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.3",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.4",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.5",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.6",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.7",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.7.1",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.7.2",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.7.3",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.7.4",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.7.5",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.8",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.9",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.10",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.11",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.12",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.13",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.14",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.15",
    "https://up.htmlacademy.ru/htmlcss/33/book/1.16",
    "https://up.htmlacademy.ru/htmlcss/33/book/2",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.1",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.1.1",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.1.2",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.1.3",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.1.4",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.1.5",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.1.6",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.1.7",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.1.8",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.1.9",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.2",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.2.1",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.2.2",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.2.3",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.2.4",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.2.5",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.2.6",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.2.7",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.2.8",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.3",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.4",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.5",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.6",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.7",
    "https://up.htmlacademy.ru/htmlcss/33/book/2.8",
    "https://up.htmlacademy.ru/htmlcss/33/book/3",
    "https://up.htmlacademy.ru/htmlcss/33/book/3.1",
    "https://up.htmlacademy.ru/htmlcss/33/book/3.2",
    "https://up.htmlacademy.ru/htmlcss/33/book/3.3",
    "https://up.htmlacademy.ru/htmlcss/33/book/3.4",
    "https://up.htmlacademy.ru/htmlcss/33/book/3.5",
    "https://up.htmlacademy.ru/htmlcss/33/book/3.6",
    "https://up.htmlacademy.ru/htmlcss/33/book/3.7",
    "https://up.htmlacademy.ru/htmlcss/33/book/3.8",
    "https://up.htmlacademy.ru/htmlcss/33/book/3.9",
    "https://up.htmlacademy.ru/htmlcss/33/book/3.10",
    "https://up.htmlacademy.ru/htmlcss/33/book/3.11",
    "https://up.htmlacademy.ru/htmlcss/33/book/3.12",
    "https://up.htmlacademy.ru/htmlcss/33/book/3.13",
    "https://up.htmlacademy.ru/htmlcss/33/book/3.14",
    "https://up.htmlacademy.ru/htmlcss/33/book/3.15",
    "https://up.htmlacademy.ru/htmlcss/33/book/3.16",
    "https://up.htmlacademy.ru/htmlcss/33/book/3.17",
    "https://up.htmlacademy.ru/htmlcss/33/book/3.18",
    "https://up.htmlacademy.ru/htmlcss/33/book/4",
    "https://up.htmlacademy.ru/htmlcss/33/book/4.1",
    "https://up.htmlacademy.ru/htmlcss/33/book/4.2",
    "https://up.htmlacademy.ru/htmlcss/33/book/4.3",
    "https://up.htmlacademy.ru/htmlcss/33/book/4.4",
    "https://up.htmlacademy.ru/htmlcss/33/book/4.5",
    "https://up.htmlacademy.ru/htmlcss/33/book/4.6",
    "https://up.htmlacademy.ru/htmlcss/33/book/4.7",
    "https://up.htmlacademy.ru/htmlcss/33/book/4.8",
    "https://up.htmlacademy.ru/htmlcss/33/book/4.9",
    "https://up.htmlacademy.ru/htmlcss/33/book/4.10",
    "https://up.htmlacademy.ru/htmlcss/33/book/4.11",
    "https://up.htmlacademy.ru/htmlcss/33/book/4.12",
    "https://up.htmlacademy.ru/htmlcss/33/book/4.13",
    "https://up.htmlacademy.ru/htmlcss/33/book/4.14",
    "https://up.htmlacademy.ru/htmlcss/33/book/5",
    "https://up.htmlacademy.ru/htmlcss/33/book/5.1",
    "https://up.htmlacademy.ru/htmlcss/33/book/5.2",
    "https://up.htmlacademy.ru/htmlcss/33/book/5.3",
    "https://up.htmlacademy.ru/htmlcss/33/book/5.4",
    "https://up.htmlacademy.ru/htmlcss/33/book/5.5",
    "https://up.htmlacademy.ru/htmlcss/33/book/5.6",
    "https://up.htmlacademy.ru/htmlcss/33/book/5.7",
    "https://up.htmlacademy.ru/htmlcss/33/book/5.8",
    "https://up.htmlacademy.ru/htmlcss/33/book/5.9",
    "https://up.htmlacademy.ru/htmlcss/33/book/5.10",
    "https://up.htmlacademy.ru/htmlcss/33/book/5.10.1",
    "https://up.htmlacademy.ru/htmlcss/33/book/5.10.2",
    "https://up.htmlacademy.ru/htmlcss/33/book/5.10.3",
    "https://up.htmlacademy.ru/htmlcss/33/book/5.10.4",
    "https://up.htmlacademy.ru/htmlcss/33/book/5.10.5",
    "https://up.htmlacademy.ru/htmlcss/33/book/5.11",
    "https://up.htmlacademy.ru/htmlcss/33/book/5.12",
    "https://up.htmlacademy.ru/htmlcss/33/book/5.13",
    "https://up.htmlacademy.ru/htmlcss/33/book/6",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.1",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.2",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.3",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.4",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.5",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.6",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.7",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.8",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.9",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.10",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.11",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.12",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.13",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.14",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.15",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.16",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.17",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.18",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.19",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.20",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.21",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.22",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.23",
    "https://up.htmlacademy.ru/htmlcss/33/book/6.24",
    "https://up.htmlacademy.ru/htmlcss/33/book/7",
    "https://up.htmlacademy.ru/htmlcss/33/book/7.1",
    "https://up.htmlacademy.ru/htmlcss/33/book/7.2",
    "https://up.htmlacademy.ru/htmlcss/33/book/7.2.1",
    "https://up.htmlacademy.ru/htmlcss/33/book/7.2.2",
    "https://up.htmlacademy.ru/htmlcss/33/book/7.2.3",
    "https://up.htmlacademy.ru/htmlcss/33/book/7.2.4",
    "https://up.htmlacademy.ru/htmlcss/33/book/7.2.5",
    "https://up.htmlacademy.ru/htmlcss/33/book/7.3",
    "https://up.htmlacademy.ru/htmlcss/33/book/7.3.1",
    "https://up.htmlacademy.ru/htmlcss/33/book/7.3.2",
    "https://up.htmlacademy.ru/htmlcss/33/book/7.3.3",
    "https://up.htmlacademy.ru/htmlcss/33/book/7.4",
    "https://up.htmlacademy.ru/htmlcss/33/book/8",
    "https://up.htmlacademy.ru/htmlcss/33/book/8.1",
    "https://up.htmlacademy.ru/htmlcss/33/book/8.2",
    "https://up.htmlacademy.ru/htmlcss/33/book/8.2.1",
    "https://up.htmlacademy.ru/htmlcss/33/book/8.2.2",
    "https://up.htmlacademy.ru/htmlcss/33/book/8.2.3",
    "https://up.htmlacademy.ru/htmlcss/33/book/8.2.4",
    "https://up.htmlacademy.ru/htmlcss/33/book/8.2.5",
    "https://up.htmlacademy.ru/htmlcss/33/book/8.2.6",
    "https://up.htmlacademy.ru/htmlcss/33/book/8.2.7",
    "https://up.htmlacademy.ru/htmlcss/33/book/9",
    "https://up.htmlacademy.ru/htmlcss/33/book/9.1",
    "https://up.htmlacademy.ru/htmlcss/33/book/10",
    "https://up.htmlacademy.ru/htmlcss/33/book/10.1",
    "https://up.htmlacademy.ru/htmlcss/33/book/10.2"
  ]  
}