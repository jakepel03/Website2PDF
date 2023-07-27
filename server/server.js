const express = require('express');
const puppeteer = require('puppeteer');

const server = express();
server.use(express.static("../public"));
server.use(express.json());

let numOfPDFs = 1;

async function createPDF(url) {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0" });
        await page.emulateMediaType('screen');

        const pdf = await page.pdf({
            path: 'pdfs/file' + numOfPDFs + '.pdf',
            printBackground: true,
            format: 'A4',
            margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' }
        });
        await browser.close();
    } catch (error) {
        console.log("Error creating the PDF: " + error);
    }
}

server.post("/convertToPDF", async (request, response) => {
    const url = request.body.url;
    try {
        await createPDF(url);
        response.send("PDF creation successful!");
    } catch (error) {
        response.status(500).json({ error: "Error creating the PDF." });
    }
});

const port = 3000;
server.listen(port, () => {
    console.log("Server is running on port " + port);
});
