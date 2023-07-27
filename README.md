# Website for PDF Extraction

## Introduction
This project aims to provide a user-friendly platform for extracting PDFs from websites. Users can enter website URLs, and the server will convert them into PDFs, which can then be saved on the server. Users have the option to download the PDFs separately or merged.

## Features
- Convert Websites to PDF: Users can enter URLs of websites they wish to convert into PDFs.
- Server-Side Conversion: The server will process the URLs and convert them to PDFs using Puppeteer.
- Save PDFs on Server: The generated PDFs will be saved on the server, making them accessible for download.
- Download PDFs: Users can download individual PDFs from the server.
- Merge PDFs: Users have the option to merge multiple PDFs into a single PDF for easier downloading.

## Getting Started
To get started with the PDF Extraction website, follow these steps:
1. Clone GitHub repository and open project in your preffered IDE
2. Write 'npm install' in terminal
3. Download NodeJS on your computer
4. Run local server using 'node server/server.js'
5. Open browser and access 'http://localhost:3000/'
6. You are ready to use the website

## Usage
1. Add Website URLs:
   - Text field for first URL is already visible
   - In case you want to add additional URLs, click on the "Add New URL" button to add a new input field
   - Enter the desired website URL's in the input box.

2. Convert Websites to PDFs:
   - After adding the URLs, click on the "Extract PDFs" button to start the conversion process.
   - The server will convert each website URL to a separate PDF file.

3. Save PDFs on Server:
   - The converted PDFs will be saved on the server for easy access.

4. Download PDFs:
   - Once the conversion is complete, a list of PDFs will be displayed on the website.
   - Each PDF will have a "Download" link that allows users to download individual PDFs to their local device.

5. Merge PDFs (Optional):
   - If desired, users can select multiple PDFs from the list and click on the "Merge PDFs and download" button.
   - The server will combine the selected PDFs into a single merged PDF for easy downloading.
  
6. Deleting PDFs (Optional):
   -If desired, user can delete PDFs from server manually (server will also delete old PDF files automatically)

## Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- PDF Conversion: Puppeteer

## Goals
- Enable downloading PDF files from server
- Enable auto and (manual) deleting pdf files from server
- Improve layout, fix visual problems

NOTE: Implementation of functionalities is still in progress, so there might be some issues using the website at the moment.



