<div align="center">

# TUGAS PRAKTIKUM PEMROGRAMAN WEB
## TUGAS 3: FETCH API & ASYNCHRONOUS JAVASCRIPT
### Operasi CRUD (GET, POST, PUT, DELETE) JSONPlaceholder

<br>

<img src="logo.png" width="140" alt="Logo Telkom University Purwokerto">

<br>
<br>

**Disusun Oleh :**

**Putra Anugrah Pamungkas / 103122400007**  
**SE-08-01**

<br>

**Asisten Praktikum :**  
Abu Abdirrahman Humaid Al-Atsary  
Hamka Zainul Ardhi

<br>

**Dosen Pengampu :**  
Arif Amrulloh, S.Kom., M.Kom.

<br>
<br>

### PROGRAM STUDI S1 SOFTWARE ENGINEERING
### FAKULTAS INFORMATIKA
### TELKOM UNIVERSITY PURWOKERTO
### 2026

</div>

---

## 1. Penjelasan Program

Aplikasi ini merupakan program web sederhana yang dibuat untuk menguji pemanggilan **Fetch API** secara asinkron menggunakan sintaks `async/await` pada JavaScript.

Program ini terhubung ke REST API publik **JSONPlaceholder** pada endpoint `/posts`. Melalui aplikasi ini, mahasiswa mempraktikkan empat metode HTTP dasar:
1. **GET**: Mengambil data dari server API.
2. **POST**: Menambahkan data baru ke server API.
3. **PUT**: Memperbarui data yang ada berdasarkan ID.
4. **DELETE**: Menghapus data dari server berdasarkan ID.

---

## 2. Penjelasan 4 Metode HTTP dari Kode

Seluruh proses HTTP pada berkas `app.js` menggunakan fungsi asynchronous (`async/await`) serta blok penanganan error `try...catch`:

### 1. Metode GET (Mengambil Data)
- **Fungsi**: `getPosts()`
- **Penjelasan**: Saat tombol ditekan, fungsi memanggil `fetch()` dengan URL endpoint yang dibatasi 6 data pertama (`?_limit=6`). Menggunakan `await`, program menunggu respon server lalu menguraikannya menjadi objek JSON menggunakan `res.json()`. Data tersebut kemudian disimpan ke variabel lokal dan dikirim ke fungsi `tampilkanData()` untuk di-mapping ke elemen kartu HTML.

### 2. Metode POST (Menambahkan Data)
- **Fungsi**: `createPost(e)`
- **Penjelasan**: Fungsi ini menangkap data judul dan isi post dari formulir input. Permintaan dikirim ke API dengan method `POST` serta header `Content-Type: application/json`. Server JSONPlaceholder mengembalikan respon status `201 Created` beserta ID data baru. Objek data tersebut disisipkan ke daftar lokal di urutan teratas lalu tampilan DOM di-render ulang sehingga data baru langsung tampak di layar.

### 3. Metode PUT (Memperbarui Data)
- **Fungsi**: `updatePost(e)`
- **Penjelasan**: Fungsi ini mengambil input ID post yang ingin diubah beserta judul dan isi barunya. Request dikirim menggunakan method `PUT` ke endpoint spesifik `/posts/{id}` dengan membawa payload JSON data baru. Setelah server merespon dengan status `200 OK`, fungsi mencari indeks post dengan ID yang sesuai di array lokal, menggantinya dengan data baru, dan memperbarui tampilan HTML.

### 4. Metode DELETE (Menghapus Data)
- **Fungsi**: `deletePost(e)`
- **Penjelasan**: Fungsi ini menerima input ID post yang ingin dihapus, lalu mengirim permintaan `DELETE` ke URL `/posts/{id}`. Setelah server mengembalikan respon status `200 OK`, data dengan ID tersebut disaring keluar (*filter*) dari array lokal dan fungsi `tampilkanData()` dipanggil kembali sehingga post tersebut terhapus dari tampilan HTML.

---

## 3. Mapping Data ke HTML DOM

Fungsi `tampilkanData(data)` bertugas menerima array data postingan lalu melakukan perulangan menggunakan `forEach`. Pada setiap elemen data, fungsi membuat elemen `div` baru dengan class `post-card`, menyisipkan judul dan konten melalui innerHTML, lalu memasukkannya ke dalam kontainer utama menggunakan perintah `appendChild()`.