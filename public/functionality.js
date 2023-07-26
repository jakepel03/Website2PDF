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
document.addEventListener('DOMContentLoaded', function () {
    addUrlButton.addEventListener("click", addUrlBox);
    /* addUrlBox without () because it is a callback, otherwise
    addUrlBox will be executed immediately when the event listener is being set up,
    rather than when the button is clicked.
     */


})