# 📄 File Viewer

File Viewer adalah aplikasi berbasis Node.js yang memungkinkan pengguna membaca file dari URL yang diberikan. Aplikasi ini mendukung berbagai jenis file seperti **DOCX**, **PDF**, dan **XLSX** serta menampilkan kontennya dalam format HTML yang rapi dan responsif.

## ✨ Fitur

- **Mendukung Format File:**
  - `.docx` (dokumen Microsoft Word)
  - `.pdf` (dokumen PDF)
  - `.xlsx` (lembar kerja Microsoft Excel)
- **Tampilan Responsif:**
  - Desain antarmuka yang modern dan responsif.
- **Konversi ke HTML:**
  - File dikonversi ke format HTML untuk ditampilkan di browser.
- **Unduh dan Tampilkan File dari URL:**
  - Secara otomatis mengunduh file dari URL yang diberikan, membaca kontennya, dan menampilkannya.

---

## 🚀 Cara Menjalankan Proyek

### 1. Prasyarat
Pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org) versi 14 atau lebih baru
- [npm](https://www.npmjs.com/) (termasuk dalam instalasi Node.js)

### 2. Kloning Repository
```bash
git clone https://github.com/Cloud-Dark/Read_Office_PDF
cd file-viewer
```

### 3. Instalasi Dependensi
Jalankan perintah berikut untuk menginstal semua paket yang diperlukan:
```bash
npm install
```

### 4. Jalankan Server
Jalankan aplikasi dengan perintah:
```bash
node index.js
```

Aplikasi akan berjalan di `http://localhost:3000`.

---

## 🛠️ Penggunaan

### Endpoint: `/read`
Gunakan endpoint ini untuk membaca file dari URL.

#### Contoh Request:
```http
GET /read?link=https://example.com/sample.docx
```

#### Parameter:
- **`link`**: URL dari file yang ingin dibaca (format yang didukung: `.docx`, `.pdf`, `.xlsx`).

#### Contoh Respons:
File akan ditampilkan dalam browser dengan tampilan yang menarik, termasuk tabel atau teks sesuai dengan format file.

---

## 🖼️ Tampilan Antarmuka
Tampilan file dalam browser akan dirender dengan desain modern, termasuk:
- **Header:** Menampilkan judul aplikasi.
- **Konten Utama:** Menampilkan isi file dalam format yang rapi.
- **Footer:** Menampilkan hak cipta.

---

## 📦 Teknologi yang Digunakan
- **Express.js**: Framework backend untuk menangani server.
- **Axios**: Untuk mengunduh file dari URL.
- **Mammoth.js**: Untuk membaca dan mengonversi file DOCX ke HTML.
- **pdf-parse**: Untuk membaca konten file PDF.
- **xlsx**: Untuk membaca dan mengonversi file Excel.
- **Node.js**: Lingkungan runtime.

---

## 💡 Kontribusi

Kami selalu menerima kontribusi dari siapa saja! Jika Anda ingin menambahkan fitur atau melaporkan bug:
1. Fork repository ini.
2. Buat branch baru untuk fitur atau perbaikan Anda.
3. Kirim pull request.

---

## ⚖️ Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

## 📧 Kontak

Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi kami:
- **Email:** yourname@example.com
- **Website:** [www.yourwebsite.com](https://www.yourwebsite.com)

---

## 🌟 Dukungan

Jika proyek ini membantu Anda, beri bintang pada repository ini di GitHub!