const express = require('express');
const axios = require('axios');
const mammoth = require('mammoth');
const pdfParse = require('pdf-parse');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Fungsi untuk mengunduh file dari URL
async function downloadFile(link, dest) {
    const response = await axios.get(link, { responseType: 'arraybuffer' });
    fs.writeFileSync(dest, response.data);
    return dest;
}

// Endpoint untuk membaca file
app.get('/read', async (req, res) => {
    const { link } = req.query;
    if (!link) {
        return res.status(400).send('Link is required');
    }

    const tempFilePath = path.join(__dirname, 'tempfile');
    try {
        // Unduh file
        await downloadFile(link, tempFilePath);

        // Deteksi tipe file berdasarkan ekstensi
        const extension = path.extname(link).toLowerCase();

        let htmlContent;
        switch (extension) {
            case '.docx': // Untuk file DOCX
                const docxBuffer = fs.readFileSync(tempFilePath);
                const docxResult = await mammoth.convertToHtml({ buffer: docxBuffer });
                htmlContent = docxResult.value || '<p>File .docx kosong atau tidak bisa dibaca.</p>';
                break;

            case '.pdf': // Untuk file PDF
                const pdfBuffer = fs.readFileSync(tempFilePath);
                const pdfResult = await pdfParse(pdfBuffer);
                htmlContent = `<pre>${pdfResult.text}</pre>`;
                break;

            case '.xlsx': // Untuk file XLSX
                const workbook = xlsx.readFile(tempFilePath);
                const sheetName = workbook.SheetNames[0];
                const sheetHtml = xlsx.utils.sheet_to_html(workbook.Sheets[sheetName]);
                htmlContent = sheetHtml;
                break;

            default:
                return res.status(400).send('Unsupported file format');
        }

        // Hapus file sementara
        fs.unlinkSync(tempFilePath);

        // Render HTML di browser dengan styling yang lebih menarik
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>File Viewer</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f7fc;
                        color: #333;
                    }
                    header {
                        background: #0078d7;
                        color: white;
                        padding: 15px 20px;
                        text-align: center;
                    }
                    header h1 {
                        margin: 0;
                        font-size: 24px;
                    }
                    main {
                        padding: 20px;
                    }
                    footer {
                        background: #333;
                        color: white;
                        text-align: center;
                        padding: 10px 0;
                        position: fixed;
                        bottom: 0;
                        width: 100%;
                        font-size: 14px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                        background-color: #fff;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    table th, table td {
                        border: 1px solid #ddd;
                        padding: 10px;
                        text-align: left;
                    }
                    table th {
                        background-color: #f4f4f4;
                        font-weight: bold;
                    }
                    pre {
                        background: #f4f4f4;
                        padding: 15px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        overflow-x: auto;
                    }
                    h1, h2, h3, h4, h5, h6 {
                        color: #444;
                    }
                    p {
                        margin: 10px 0;
                    }
                    .container {
                        max-width: 1200px;
                        margin: 0 auto;
                    }
                </style>
            </head>
            <body>
                <header>
                    <h1>📄 File Viewer</h1>
                </header>
                <main class="container">
                    ${htmlContent}
                </main>
                <footer>
                    &copy; 2024 File Viewer by API Pedia
                </footer>
            </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
        res.status(500).send(`Error reading the file: ${error.message}`);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
