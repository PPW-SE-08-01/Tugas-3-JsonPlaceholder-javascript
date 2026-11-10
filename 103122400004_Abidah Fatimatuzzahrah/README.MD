# Tugas 3 - JSONPlaceholder JavaScript

## Praktikum Pemrograman Web
### Fetch API & Asynchronous JavaScript

**Nama:** Abidah Fatimatuzzahrah  
**NIM:** 103122400004  
**Mata Kuliah:** Praktikum Pemrograman Web

---

## 1. Deskripsi Praktikum

Praktikum ini bertujuan untuk memahami penggunaan Fetch API
dan JavaScript Asynchronous menggunakan async/await.

Pada praktikum ini dibuat aplikasi sederhana untuk mengelola
data postingan menggunakan API JSONPlaceholder.

## 2. Teknologi yang Digunakan

- HTML
- CSS
- JavaScript
- Fetch API
- Async/Await
- JSONPlaceholder API

## 3. API yang Digunakan

URL API:

https://jsonplaceholder.typicode.com/posts

Endpoint yang digunakan:

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| GET | /posts | Mengambil data |
| POST | /posts | Menambahkan data |
| PUT | /posts/1 | Memperbarui data |
| DELETE | /posts/1 | Menghapus data |

## 4. Implementasi HTTP Method

### A. GET

Digunakan untuk mengambil data postingan dari API.
Data JSON kemudian diubah menjadi objek JavaScript
menggunakan response.json() dan ditampilkan ke HTML
menggunakan DOM.

### B. POST

Digunakan untuk mengirim data postingan baru ke API.
Data dikirim menggunakan method POST dengan format JSON
melalui JSON.stringify().

### C. PUT

Digunakan untuk memperbarui postingan berdasarkan ID.
Data baru dikirim menggunakan method PUT.

### D. DELETE

Digunakan untuk menghapus postingan berdasarkan ID
menggunakan method DELETE.

## 5. Asynchronous JavaScript

Implementasi asynchronous menggunakan:

- async untuk mendeklarasikan fungsi asynchronous.
- await untuk menunggu proses Fetch API.
- try/catch untuk menangani error.

## 6. Hasil Praktikum

Aplikasi memiliki fitur:

1. Menampilkan daftar postingan.
2. Menambahkan postingan baru.
3. Mengedit postingan.
4. Menghapus postingan.

Screenshot hasil praktikum dapat ditambahkan pada bagian ini.

## 7. Kesimpulan

Berdasarkan praktikum yang telah dilakukan, Fetch API
dapat digunakan untuk melakukan komunikasi dengan API
menggunakan metode GET, POST, PUT, dan DELETE.

Penggunaan async/await membuat proses pengambilan dan
pengiriman data lebih mudah dibaca dan dikelola.

JSONPlaceholder menyediakan API simulasi sehingga
perubahan data tidak disimpan secara permanen di server.
