// URL Dasar API JSONPlaceholder
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Elemen DOM Kontainer Hasil
const output = document.getElementById('output');

// Helper untuk menampilkan status loading
function showLoading() {
    output.innerHTML = '<p class="placeholder">Sedang memproses request ke API...</p>';
}

async function getData() {
    showLoading();
    try {
        // Ambil 3 data saja agar tidak terlalu panjang
        const response = await fetch(`${API_URL}?_limit=3`);
        if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);

        const data = await response.json();

        // Tampilkan data ke DOM menggunakan looping
        output.innerHTML = '<h3>Daftar Post (GET):</h3><br>';
        data.forEach(item => {
            output.innerHTML += `
                <div class="data-card">
                    <h4>ID ${item.id}: ${item.title}</h4>
                    <p>${item.body}</p>
                </div>
            `;
        });
    } catch (error) {
        output.innerHTML = `<p style="color:red;">Error GET: ${error.message}</p>`;
    }
}


async function postData() {
    showLoading();
    try {
        // Data baru yang akan dikirim
        const newPost = {
            title: 'Daviz Ganteng',
            body: 'Mengirim data baru menggunakan Fetch API metode POST.',
            userId: 1
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(newPost)
        });

        if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);

        // Ambil hasil respons JSON dari server
        const result = await response.json();

        // Tampilkan respons JSON resmi dari server di layar
        output.innerHTML = `
            <h3>POST Berhasil (Status HTTP ${response.status})</h3>
            <p style="font-size:13px; margin: 8px 0;">Data JSON yang dikembalikan server:</p>
            <pre>${JSON.stringify(result, null, 2)}</pre>
        `;
    } catch (error) {
        output.innerHTML = `<p style="color:red;">Error POST: ${error.message}</p>`;
    }
}

async function putData() {
    showLoading();
    try {
        // Data pembaruan
        const updatedPost = {
            id: 1,
            title: 'Judul Telah Diperbarui',
            body: 'Isi artikel ini telah diubah menggunakan metode PUT.',
            userId: 1
        };

        const response = await fetch(`${API_URL}/1`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(updatedPost)
        });

        if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);

        const result = await response.json();

        output.innerHTML = `
            <h3> PUT Berhasil (Status HTTP ${response.status})</h3>
            <p style="font-size:13px; margin: 8px 0;">Data JSON setelah di-update:</p>
            <pre>${JSON.stringify(result, null, 2)}</pre>
        `;
    } catch (error) {
        output.innerHTML = `<p style="color:red;">Error PUT: ${error.message}</p>`;
    }
}

// ----------------------------------------------------
// 4. DELETE — Menghapus Data (Misal: ID 1)
// ----------------------------------------------------
async function deleteData() {
    showLoading();
    try {
        const response = await fetch(`${API_URL}/1`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);

        output.innerHTML = `
            <h3> DELETE Berhasil (Status HTTP ${response.status})</h3>
            <p style="margin-top: 8px; font-size: 14px;">
                Data ID 1 berhasil dihapus dari server JSONPlaceholder.
            </p>
        `;
    } catch (error) {
        output.innerHTML = `<p style="color:red;">Error DELETE: ${error.message}</p>`;
    }
}

// Event Listener pada setiap tombol
document.getElementById('btn-get').addEventListener('click', getData);
document.getElementById('btn-post').addEventListener('click', postData);
document.getElementById('btn-put').addEventListener('click', putData);
document.getElementById('btn-delete').addEventListener('click', deleteData);