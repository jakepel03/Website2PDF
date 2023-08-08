const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const cachePath = './server/pdfs';

const server = express();
server.use(express.static("public"));
server.use(express.json());



async function createPDF(url, PDFNumber) {
    console.log(PDFNumber);
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0" });
        await page.emulateMediaType('screen');


        const pdf = await page.pdf({
            path: `server/pdfs/file${PDFNumber}.pdf`,
            printBackground: true,
            format: 'A4',
            margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        });
        await browser.close();

    } catch (error) {
        console.log("Error creating the PDF: " + error);
    }
}

function clearCache() {
    fs.readdir(cachePath, (error, files) => {
        if (!error) {
            for (const file of files) {
                fs.unlink(path.join(cachePath, file), (error) => {
                    if (error) {
                        throw error;
                    }
                })
            }
        }
    })
}

server.post("/convertToPDF", async (request, response) => {
    const url = request.body.url;
    const PDFNumber = request.body.PDFcounter;
    try {
        await createPDF(url, PDFNumber);
        response.send("PDF creation successful!");
    } catch (error) {
        response.status(500).json({ error: "Error creating the PDF." });
    }
});

server.get('/download', function (request, response) {
    const PDFNum = request.query.currIndex;
    const path = `server/pdfs/file${PDFNum}.pdf`;

    console.log(path);
    response.download(path, `file${PDFNum}.pdf`, function (error) {
        if (error) {
            console.log("Error downloading file");
        }
    })
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    clearCache(); // deleting previous files in pdf folder
    console.log("Server is running on port " + port);
});
