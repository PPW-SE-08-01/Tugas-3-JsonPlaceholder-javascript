# Tugas Praktikum Pemrograman Web - JSONPlaceholder React

- **Nama**: Nadia Tambunan
- **NIM**: 103122400005
- **Mata Kuliah**: Pemrograman Web (PPW)

---

## Deskripsi Singkat

Aplikasi React sederhana yang dibuat untuk menampilkan daftar pengguna dari API [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) menggunakan library **Axios**. 

Aplikasi ini menggunakan:
1. **Axios** untuk melakukan request HTTP GET ke endpoint data pengguna.
2. **`useEffect`** untuk memicu pengambilan data saat komponen pertama kali dimuat.
3. **`useState`** untuk menyimpan data pengguna, input pencarian, dan status loading/error.
4. **Tabel shadcn/ui** untuk menampilkan data pengguna secara rapi dan responsif.
5. **Pencarian Client-Side** untuk memfilter data pengguna secara langsung berdasarkan input teks (nama, username, email, kota, atau nama perusahaan).

---

## Struktur File

```text
103122400005_Nadia Tambunan/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── lib/
    │   └── utils.js
    └── components/
        └── ui/
            ├── input.jsx
            └── table.jsx
```

---

## Cara Menjalankan Aplikasi

1. Masuk ke folder tugas:
   ```bash
   cd "103122400005_Nadia Tambunan"
   ```

2. Install dependensi:
   ```bash
   npm install
   ```

3. Jalankan server lokal:
   ```bash
   npm run dev
   ```

4. Buka alamat `http://localhost:5173` di browser.

---

## Penjelasan Kode

### 1. Mengambil Data dengan Axios dan useEffect
Data pengguna diambil dari API menggunakan `axios.get()` di dalam hook `useEffect`. Data hasil response kemudian disimpan ke dalam state `users`:

```jsx
useEffect(() => {
  axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      setUsers(response.data)
      setLoading(false)
    })
    .catch((err) => {
      console.error('Error fetching data:', err)
      setError('Gagal memuat data pengguna.')
      setLoading(false)
    })
}, [])
```

### 2. State Management dengan useState
State digunakan untuk mengontrol data dan antarmuka:
- `users`: Menyimpan array data pengguna dari JSONPlaceholder.
- `searchTerm`: Menyimpan teks yang diketik pengguna pada kolom pencarian.
- `loading`: Menandakan status apakah data masih dalam proses pengambilan.
- `error`: Menyimpan pesan error jika request gagal.

### 3. Fitur Pencarian Client-Side
Pencarian dilakukan di sisi browser menggunakan fungsi bawaan JavaScript `.filter()`:

```jsx
const filteredUsers = users.filter((user) => {
  const keyword = searchTerm.toLowerCase()
  return (
    user.name.toLowerCase().includes(keyword) ||
    user.username.toLowerCase().includes(keyword) ||
    user.email.toLowerCase().includes(keyword) ||
    user.address.city.toLowerCase().includes(keyword) ||
    user.company.name.toLowerCase().includes(keyword)
  )
})
```

Data hasil filter (`filteredUsers`) yang kemudian di-*mapping* ke dalam baris tabel.
