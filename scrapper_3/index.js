const puppeteer = require("puppeteer");

const LINK_LOGIN = "https://htmlacademy.ru/login";
const LINKS_ACADEMY = "https://up.htmlacademy.ru";
const LINKS_BOOK = "/adaptive/25/book";
const contentClass = ".blog-section__content";
// const contentClass = "#languages";
const nextClass = ".post-content__wrapper";
const errorClass = ".card--orphus";

const REG_FOR_TITLE_LINK = /^(\d. )/;

const template = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
`

async function start() {
  const browser = await puppeteer.launch({
    // headless: false,
    args: ["--window-size=1040,1080"],
    // slowMo: 20,
  });

  const page = await browser.newPage();

  await login(page);

  // console.log(template)

  const arrayLinks = await getContentsLink(
    `${LINKS_ACADEMY}${LINKS_BOOK}`,
    page
  );

  for (let i = 63; i < arrayLinks.length; i++) {
    await page.goto(arrayLinks[i]);
    await page.waitForSelector(contentClass);
    const content = await page.$(contentClass);

    await removeElem(nextClass, page);
    await removeElem(errorClass, page);
    await removeElem(".post-info__head", page);
    await removeAll(`${contentClass} button`, page);

    const arrayScreenshots = await getScreenshots(content);
    await content.$$eval(
      "img",
      (nodes, arr) => {
        return nodes.forEach((e, i) => {
          e.src = `data:image/png;base64, ${arr[i]}`;
        });
      },
      arrayScreenshots
    );

    const endHref = arrayLinks[i].split("/").at(-1);

    const innerHtml = await page.$eval(
      contentClass,
      (elem, end) => {
        return `<section class="blog-section__conten" id="chapter-${end}">${elem.innerHTML}</section>`;
      },
      endHref
    );

    console.log(innerHtml);
  }

  console.log("</body></html>");
  await page.close();
  await browser.close();
}

async function getScreenshots(selector) {
  const arrImg = await selector.$$("img");
  const arrBase64 = [];

  for (const node of arrImg) {
    const box = await node.boundingBox();
    if (box === null) {
      arrBase64.push("not-screen");
      continue;
    }
    const { height, width } = box;
    let bs64 = "not-sreen";
    if (height && width) {
      bs64 = await node.screenshot({ encoding: "base64" });
    }
    arrBase64.push(bs64);
  }

  return arrBase64;
}

async function login(page) {
  await page.goto(LINK_LOGIN);
  await page.waitForSelector("#login-email");
  await page.$eval(
    "#login-email",
    (el) => (el.value = "denis.darwin12@gmail.com")
  );
  await page.$eval("#login-password", (el) => (el.value = "Denis1979"));
  await page.click(".button--full-width");
  await new Promise((res) => {
    setTimeout(() => {
      res();
    }, 3000);
  });
}

async function getContentsLink(linkBook, page) {
  await page.goto(linkBook);
  await page.waitForSelector(contentClass);

  const content = await page.$(contentClass);

  const arrLink = await content.$$eval(`a`, (nodes) => {
    const arr = [];
    nodes.forEach((el) => {
      const endHref = el.href.split("/").at(-1);
      if (endHref.includes(".")) {
        arr.push(el.href);
        el.href = `#chapter-${endHref}`;
      } else {
        el.href = `#chapter-${endHref}.1`;
      }
    });
    return arr;
  });

  // await removeElem(errorClass, page);

  // const innerHtml = await page.$eval(contentClass, (elem) => {
  //   return `<section class="blog-section__content">${elem.innerHTML}</section>`;
  // });

  // console.log(innerHtml);

  return arrLink;
}

async function removeElem(selector, page) {
  await page.evaluate((s) => {
    const elem = document.querySelector(s);
    if (elem) {
      elem.parentNode.removeChild(elem);
    }
  }, selector);
}

async function removeAll(selector, page) {
  await page.evaluate((s) => {
    const arrayElem = document.querySelectorAll(s);
    for (elem of arrayElem) {
      elem.parentNode.removeChild(elem);
    }
  }, selector);
}

start();
