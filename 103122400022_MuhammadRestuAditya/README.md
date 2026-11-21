<div align="center">

# TUGAS PRAKTIKUM PEMROGRAMAN WEB
## TUGAS 3: FETCH API & ASYNCHRONOUS JAVASCRIPT
### Operasi CRUD (GET, POST, PUT, DELETE) JSONPlaceholder

<br>

<img src="logo.png" width="140" alt="Logo Telkom University Purwokerto">

<br>
<br>

**Disusun Oleh :**

**Muhammad Restu Aditya / 103122400022**  
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

Aplikasi ini merupakan program berbasis web yang dirancang untuk menguji serta menerapkan pemanggilan Fetch API secara asinkron menggunakan sintaks `async/await` pada JavaScript. Program ini terhubung langsung ke layanan REST API publik JSONPlaceholder melalui endpoint `/posts`. Melalui antarmuka yang disediakan, mahasiswa mempraktikkan empat metode HTTP dasar yaitu GET untuk mengambil data dari server, POST untuk menambahkan data baru, PUT untuk memperbarui data berdasarkan ID, serta DELETE untuk menghapus data dari server. Seluruh proses pengiriman dan penerimaan data berjalan di latar belakang tanpa memerlukan reload halaman, serta hasil respons server dapat langsung diperiksa baik secara visual pada elemen HTML maupun melalui data mentah format JSON.

---

## 2. Penjelasan 4 Metode HTTP dari Kode

Semua proses interaksi HTTP pada berkas `script.js` dibangun menggunakan fungsi asinkron (`async/await`) yang dipadukan dengan blok penanganan error `try...catch` guna menjamin keandalan saat terjadi gangguan jaringan atau kesalahan respons server.

### 1. Metode GET (Mengambil Data)

![Tampilan Output GET](assets/get.png)

Fungsi `getPosts()` bertugas meminta dan mengambil data postingan dari endpoint API dengan parameter pembatas tiga data pertama (`?_limit=3`). Dengan memanfaatkan kata kunci `await`, program menunggu respon server selesai diunduh lalu menguraikannya menjadi objek JSON menggunakan metode `response.json()`. Data tersebut kemudian diolah secara dinamis ke dalam elemen HTML kartu dan ditempatkan langsung pada wadah `output-get`. Selain itu, fungsi `showResponse()` dipanggil untuk mencatat rincian metode, URL, kode status `200 OK`, serta struktur data ke panel respons.

### 2. Metode POST (Menambahkan Data)

![Tampilan Output POST](assets/post.png)

Fungsi `createPost()` menangani pengiriman data postingan baru berdasarkan isian formulir yang mencakup judul, isi, dan identitas pengguna. Permintaan dikirim ke server menggunakan metode POST dengan menyertakan header `Content-Type: application/json; charset=UTF-8` serta muatan bodi data yang telah diubah menjadi string JSON. Begitu server JSONPlaceholder mengembalikan kode status sukses `201 Created` beserta objek data yang dilengkapi ID baru, fungsi langsung memetakan hasil tersebut ke dalam elemen kartu berwarna hijau pada kontainer `output-post` dan memperbarui panel respons API.

### 3. Metode PUT (Memperbarui Data)

![Tampilan Output PUT](assets/put.png)

Fungsi `updatePost()` digunakan untuk memperbarui konten postingan yang telah ada berdasarkan ID spesifik yang dimasukkan pada kolom form. Permintaan dikirimkan menggunakan metode PUT ke alamat URL `/posts/{id}` dengan membawa payload berupa data judul dan isi yang telah disesuaikan. Setelah server mengonfirmasi pembaruan dengan respons status `200 OK`, data hasil pembaruan langsung di-render ke dalam kartu informasi pada kontainer `output-put` sebagai bukti bahwa proses modifikasi data di sisi API telah berhasil dijalankan.

### 4. Metode DELETE (Menghapus Data)

![Tampilan Output DELETE](assets/delete.png)

Fungsi `deletePost()` bekerja untuk mengeksekusi penghapusan data postingan dari server melalui pengiriman permintaan bermetode DELETE menuju endpoint `/posts/{id}`. Saat server membalas dengan status sukses `200 OK`, fungsi langsung menampilkan pesan konfirmasi penghapusan ke dalam elemen penampung `output-del` yang menegaskan bahwa postingan dengan ID target telah berhasil dihapus dari sistem.

### 5. Pemeriksaan Respons API (Status HTTP & JSON Mentah)

![Tampilan Respons API](assets/response.png)

Fungsi `showResponse(method, url, status, data)` bertindak sebagai utilitas pemantauan yang mencatat setiap aktivitas komunikasi HTTP ke dalam elemen `<pre id="response-box">`. Informasi yang ditampilkan meliputi metode HTTP yang digunakan, endpoint URL tujuan, status kode HTTP yang dikembalikan oleh server, serta payload respons JSON mentah yang diformat rapi sehingga mahasiswa dan penguji dapat memeriksa keabsahan transaksi data secara transparan.

---

## 3. Mapping Data ke HTML DOM

Fungsi pemetaan DOM bertugas mengubah objek data respons yang didapat dari Fetch API menjadi representasi visual pada antarmuka web. Program memanfaatkan metode `map()` untuk mengiterasi setiap item pada array data, menyusun struktur elemen HTML yang rapi lengkap dengan badge ID serta isi teks, kemudian menyuntikkannya ke atribut `innerHTML` pada masing-masing kontainer penampung. Melalui mekanisme manipulasi DOM ini, data yang dikembalikan oleh server dapat langsung disajikan kepada pengguna secara interaktif dan terstruktur tanpa memuat ulang dokumen halaman web.
