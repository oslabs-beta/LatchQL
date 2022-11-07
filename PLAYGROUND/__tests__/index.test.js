const puppeteer = require("puppeteer");

const APP = 'http://localhost:8081/';

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
            const element = await page.$eval('.query-field', (el) => el ? true : false);
            expect(element).toBeTruthy();
        })
        it("displays an input field for variables", async ()=> {
            await page.goto(APP)
            await page.waitForSelector(".variables-input");
            const element = await page.$eval('.variables-input', (el) => el ? true : false);
            expect(element).toBeTruthy();
        })
        it("run query buttons load successfully", async () => {
            await page.goto(APP)
            await page.waitForSelector("#run-btn");
            const header = await page.$eval("#run-btn", (el) => el.innerHTML);
            expect(header).toBe("Run Query")
        })
        it("run preview buttons load successfully", async () => {
            await page.goto(APP)
            await page.waitForSelector("#previews-btn");
            const header = await page.$eval("#previews-btn", (el) => el.innerHTML);
            expect(header).toBe("Preview")
        })
    })
})

