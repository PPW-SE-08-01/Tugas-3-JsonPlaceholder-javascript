// Konfigurasi Endpoint API
const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

// Helper: Escape HTML untuk mencegah XSS
function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Helper: Memperbarui Panel Respons API (JSON Mentah)
function tampilkanResponsMentah(method, url, statusCode, statusText, payload) {
    const metaMethod = document.getElementById('meta-method');
    const metaUrl = document.getElementById('meta-url');
    const statusBadge = document.getElementById('response-status-badge');
    const rawBox = document.getElementById('raw-response');

    metaMethod.textContent = `Method: ${method}`;
    metaUrl.textContent = `URL: ${url}`;

    const isSuccess = statusCode >= 200 && statusCode < 300;
    statusBadge.textContent = `${statusCode} ${statusText || (isSuccess ? 'OK' : 'Error')}`;
    statusBadge.className = `status-badge ${isSuccess ? 'ok' : 'err'}`;

    const formattedPayload = {
        method: method,
        url: url,
        statusCode: statusCode,
        statusText: statusText || (isSuccess ? 'OK' : 'Error'),
        response: payload
    };

    rawBox.textContent = JSON.stringify(formattedPayload, null, 2);
}

// Helper: Format Tampilan Kartu Post
function formatKartuPost(post, tipe = '') {
    return `
        <div class="post-item ${tipe}">
            <div class="post-item-meta">ID Post: ${post.id || '-'} | User ID: ${post.userId || '-'}</div>
            <div class="post-item-title">${escapeHtml(post.title || 'Tanpa Judul')}</div>
            <div class="post-item-body">${escapeHtml(post.body || 'Tanpa Isi Konten')}</div>
        </div>
    `;
}

// 1. GET - Mengambil Data Post Berdasarkan ID
async function ambilPost() {
    const idInput = document.getElementById('input-get-id').value.trim();
    const outputContainer = document.getElementById('output-get');

    if (!idInput) {
        outputContainer.innerHTML = '<div class="status-message error">Harap masukkan ID post yang valid.</div>';
        return;
    }

    const targetUrl = `${BASE_URL}/${idInput}`;
    outputContainer.innerHTML = '<div class="status-message loading">Memuat data dari server...</div>';

    try {
        const response = await fetch(targetUrl);
        if (!response.ok) {
            throw new Error(`Gagal mengambil data. Status HTTP: ${response.status} (${response.statusText})`);
        }

        const data = await response.json();
        outputContainer.innerHTML = formatKartuPost(data);
        tampilkanResponsMentah('GET', targetUrl, response.status, response.statusText, data);
    } catch (error) {
        outputContainer.innerHTML = `<div class="status-message error">Kesalahan: ${escapeHtml(error.message)}</div>`;
        tampilkanResponsMentah('GET', targetUrl, 0, 'Network Error', error.message);
    }
}

// Fitur Tambahan GET: Mengambil beberapa post sekaligus
async function ambilBanyakPost(limit = 3) {
    const outputContainer = document.getElementById('output-get');
    const targetUrl = `${BASE_URL}?_limit=${limit}`;
    outputContainer.innerHTML = '<div class="status-message loading">Memuat daftar post...</div>';

    try {
        const response = await fetch(targetUrl);
        if (!response.ok) {
            throw new Error(`Status HTTP: ${response.status}`);
        }

        const dataList = await response.json();
        const html = dataList.map(post => formatKartuPost(post)).join('');
        outputContainer.innerHTML = html;
        tampilkanResponsMentah('GET', targetUrl, response.status, response.statusText, dataList);
    } catch (error) {
        outputContainer.innerHTML = `<div class="status-message error">Kesalahan: ${escapeHtml(error.message)}</div>`;
        tampilkanResponsMentah('GET', targetUrl, 0, 'Network Error', error.message);
    }
}

// 2. POST - Menambahkan Data Post Baru
async function tambahPost() {
    const title = document.getElementById('post-title').value.trim();
    const body = document.getElementById('post-body').value.trim();
    const userId = document.getElementById('post-userid').value.trim();
    const outputContainer = document.getElementById('output-post');

    if (!title || !body || !userId) {
        outputContainer.innerHTML = '<div class="status-message error">Semua kolom (Judul, Isi, User ID) wajib diisi.</div>';
        return;
    }

    outputContainer.innerHTML = '<div class="status-message loading">Mengirimkan data baru ke server...</div>';

    const payload = {
        title: title,
        body: body,
        userId: parseInt(userId, 10)
    };

    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        if (!response.ok) {
            throw new Error(`Gagal membuat post. Status HTTP: ${response.status}`);
        }

        const createdData = await response.json();
        outputContainer.innerHTML = `
            <div style="margin-bottom: 6px; font-size: 0.85rem; color: #059669; font-weight: 600;">
                Data Berhasil Dibuat di Server (ID: ${createdData.id}):
            </div>
            ${formatKartuPost(createdData, 'success-item')}
        `;
        tampilkanResponsMentah('POST', BASE_URL, response.status, response.statusText, createdData);
    } catch (error) {
        outputContainer.innerHTML = `<div class="status-message error">Kesalahan: ${escapeHtml(error.message)}</div>`;
        tampilkanResponsMentah('POST', BASE_URL, 0, 'Network Error', error.message);
    }
}

// 3. PUT - Memperbarui Data Post
async function perbaruiPost() {
    const id = document.getElementById('put-id').value.trim();
    const title = document.getElementById('put-title').value.trim();
    const body = document.getElementById('put-body').value.trim();
    const userId = document.getElementById('put-userid').value.trim();
    const outputContainer = document.getElementById('output-put');

    if (!id || !title || !body || !userId) {
        outputContainer.innerHTML = '<div class="status-message error">Harap isi ID, Judul Baru, Isi Baru, dan User ID.</div>';
        return;
    }

    const targetUrl = `${BASE_URL}/${id}`;
    outputContainer.innerHTML = '<div class="status-message loading">Memperbarui data di server...</div>';

    const updatePayload = {
        id: parseInt(id, 10),
        title: title,
        body: body,
        userId: parseInt(userId, 10)
    };

    try {
        const response = await fetch(targetUrl, {
            method: 'PUT',
            body: JSON.stringify(updatePayload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        if (!response.ok) {
            throw new Error(`Gagal memperbarui post. Status HTTP: ${response.status}`);
        }

        const updatedData = await response.json();
        outputContainer.innerHTML = `
            <div style="margin-bottom: 6px; font-size: 0.85rem; color: #d97706; font-weight: 600;">
                Data Post ID ${id} Berhasil Dimutakhirkan:
            </div>
            ${formatKartuPost(updatedData, 'warning-item')}
        `;
        tampilkanResponsMentah('PUT', targetUrl, response.status, response.statusText, updatedData);
    } catch (error) {
        outputContainer.innerHTML = `<div class="status-message error">Kesalahan: ${escapeHtml(error.message)}</div>`;
        tampilkanResponsMentah('PUT', targetUrl, 0, 'Network Error', error.message);
    }
}

// 4. DELETE - Menghapus Data Post
async function hapusPost() {
    const id = document.getElementById('delete-id').value.trim();
    const outputContainer = document.getElementById('output-delete');

    if (!id) {
        outputContainer.innerHTML = '<div class="status-message error">Masukkan ID post yang hendak dihapus.</div>';
        return;
    }

    const targetUrl = `${BASE_URL}/${id}`;
    outputContainer.innerHTML = '<div class="status-message loading">Menghapus data di server...</div>';

    try {
        const response = await fetch(targetUrl, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Gagal menghapus post. Status HTTP: ${response.status}`);
        }

        const deleteResult = await response.json();
        outputContainer.innerHTML = `
            <div class="post-item danger-item">
                <div class="post-item-title" style="color: #dc2626;">Penghapusan Berhasil</div>
                <div class="post-item-body">Post dengan ID <strong>${escapeHtml(id)}</strong> telah sukses dihapus dari server JSONPlaceholder.</div>
            </div>
        `;
        tampilkanResponsMentah('DELETE', targetUrl, response.status, response.statusText, deleteResult);
    } catch (error) {
        outputContainer.innerHTML = `<div class="status-message error">Kesalahan: ${escapeHtml(error.message)}</div>`;
        tampilkanResponsMentah('DELETE', targetUrl, 0, 'Network Error', error.message);
    }
}

// Otomatis memuat data GET post ID 1 saat halaman pertama kali dibuka
document.addEventListener('DOMContentLoaded', () => {
    ambilPost();
});

