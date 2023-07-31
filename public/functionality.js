const addUrlButton = document.querySelector('.add-new-url-button');
const extractButton = document.querySelector('.extract-button');
const mergeButton = document.querySelector('.merge-button');
const urlList = document.querySelector('.url-list');

function addUrlBox() {
    /* Not ok because it re-parses and recreates the entire content inside urlList, text content in previous textfield gets deleted
    urlList.innerHTML += "<div class=\"url-element\">\n" +
        "                        <input type=\"text\" class=\"url-textbox\">\n" +
        "                        <a href=\"#\">Download</a>\n" +
        "                    </div>"
        */
    const newURLElement = document.createElement('div');
    newURLElement.className = 'url-element';
    newURLElement.innerHTML = '<input type="text" class="url-textbox">\n' +
        '                                <a href="#" hidden class="download-button" data-pdf-index="">Download</a>';
    urlList.append(newURLElement);
}
async function convertToPDF() {
    let PDFcounter = 1;
    const allUrls = document.querySelectorAll('.url-element');

    for (const singleUrl of allUrls) {
        const url = singleUrl.querySelector('.url-textbox').value.trim();

        try {
            const response = await fetch('/convertToPDF', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ url, PDFcounter })
            });

            if (response.ok) {
                console.log("Uploading URL " + PDFcounter +  " to server successful");
                const downloadURL = singleUrl.querySelector('.download-button');
                downloadURL.removeAttribute('hidden');
                downloadURL.dataset.pdfIndex = PDFcounter;
                PDFcounter++;
            } else {
                console.log('Error when converting HTML to PDF.');
            }
        } catch (error) {
            console.log('Error connecting to server:' + error);
        }
    }

    // only after ALL of the url elements have been made, select them (otherwise it will select only first)
    const downloadButtons = document.querySelectorAll('.download-button');
    downloadButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const currIndex = button.dataset.pdfIndex;
            downloadPDF(currIndex);
        });
    });
}


async function downloadPDF(currIndex) {
    try {
        const response = await fetch(`/download?currIndex=${currIndex}`);
        if (!response.ok) {
            throw new Error("File download failed.");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `file${currIndex}.pdf`;
        a.click();

        URL.revokeObjectURL(url);
    } catch (error) {
        console.log("Error downloading file:", error);
    }
}
document.addEventListener('DOMContentLoaded', function () {

    addUrlButton.addEventListener("click", addUrlBox);
    /* addUrlBox without () because it is a callback, otherwise
    addUrlBox will be executed immediately when the event listener is being set up,
    rather than when the button is clicked.
     */
    
    extractButton.addEventListener("click", convertToPDF);
})