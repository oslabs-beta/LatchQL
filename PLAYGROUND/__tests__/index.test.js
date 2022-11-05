// import puppeteer from 'puppeteer';
const puppeteer = require("puppeteer");

// import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
// import { editor } from "monaco-editor/esm/vs/editor/editor.api";

const APP = 'http://localhost:8080/';

describe("Front-end Integration", () => {
    let browser, page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        })
        page = await browser.newPage()
    })

    afterAll(() => {
        browser.close()
    })

    describe("Initial Render", () => {
        it("loads successfully", async () => {
            await page.goto(APP)
            await page.waitForSelector("#header");
            const header = await page.$eval("#header", (el) => el.innerHTML);
            expect(header).toBe("Playground")
        })
        it("displays an input field for queries", async ()=> {
            await page.goto(APP)
            await page.waitForSelector(".query-field");
            const inputValue = await page.$eval('.query-field', (el) => el ? true : false);
            expect(inputValue).toBeTruthy();
        })
    })
})

