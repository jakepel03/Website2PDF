const addUrlButton = document.querySelector('.add-new-url-button');
const extractButton = document.querySelector('.extract-button');
const mergeButton = document.querySelector('.merge-button');
const urlList = document.querySelector('.url-list');

function addUrlBox() {
    urlList.innerHTML += "<div class=\"url-element\">\n" +
        "                        <input type=\"text\" class=\"url-textbox\">\n" +
        "                        <a href=\"#\">Download</a>\n" +
        "                    </div>"
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
                PDFcounter++;
            } else {
                alert('Error when converting HTML to PDF.');
            }
        } catch (error) {
            alert('Error connecting to server:' + error);
        }
    }
}
document.addEventListener('DOMContentLoaded', function () {
    addUrlButton.addEventListener("click", addUrlBox);
    /* addUrlBox without () because it is a callback, otherwise
    addUrlBox will be executed immediately when the event listener is being set up,
    rather than when the button is clicked.
     */

    extractButton.addEventListener("click", convertToPDF)


})