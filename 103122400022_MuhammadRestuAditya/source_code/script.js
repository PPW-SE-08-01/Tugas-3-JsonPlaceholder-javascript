const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const responseBox = document.getElementById('response-box');

function showResponse(method, url, status, data) {
    responseBox.textContent = JSON.stringify({
        method: method,
        url: url,
        status: status,
        data: data
    }, null, 2);
}

async function getPosts(id = '') {
    const output = document.getElementById('output-get');
    const url = id ? `${API_URL}/${id}` : `${API_URL}?_limit=3`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const list = Array.isArray(data) ? data : [data];

        output.innerHTML = list.map(item => `
            <div class="result-item">
                <div class="result-header">ID: ${item.id} | User ID: ${item.userId}</div>
                <h4>${item.title}</h4>
                <p>${item.body}</p>
            </div>
        `).join('');

        showResponse('GET', url, response.status, list);
    } catch (error) {
        output.innerHTML = `<div class="error-msg">Error: ${error.message}</div>`;
        showResponse('GET', url, 0, error.message);
    }
}

async function createPost() {
    const output = document.getElementById('output-post');
    const title = document.getElementById('post-title').value.trim();
    const body = document.getElementById('post-body').value.trim();
    const userId = parseInt(document.getElementById('post-userid').value) || 1;

    if (!title || !body) {
        alert('Judul dan isi tidak boleh kosong!');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                userId: userId
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const data = await response.json();

        output.innerHTML = `
            <div class="result-item success">
                <div class="result-header">Status: ${response.status} Created | Data Berhasil Dikirim</div>
                <h4>${data.title}</h4>
                <p>${data.body}</p>
                <div class="result-header" style="margin-top: 6px;">ID Baru dari Server: ${data.id} | User ID: ${data.userId}</div>
            </div>
        `;

        showResponse('POST', API_URL, response.status, data);
    } catch (error) {
        output.innerHTML = `<div class="error-msg">Error: ${error.message}</div>`;
        showResponse('POST', API_URL, 0, error.message);
    }
}

async function updatePost() {
    const output = document.getElementById('output-put');
    const id = document.getElementById('put-id').value;
    const title = document.getElementById('put-title').value.trim();
    const body = document.getElementById('put-body').value.trim();
    const userId = parseInt(document.getElementById('put-userid').value) || 1;

    if (!id || !title || !body) {
        alert('ID, judul baru, dan isi baru wajib diisi!');
        return;
    }

    const url = `${API_URL}/${id}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({
                id: parseInt(id),
                title: title,
                body: body,
                userId: userId
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const data = await response.json();

        output.innerHTML = `
            <div class="result-item warning">
                <div class="result-header">Status: ${response.status} OK | Data Berhasil Diperbarui</div>
                <h4>${data.title}</h4>
                <p>${data.body}</p>
                <div class="result-header" style="margin-top: 6px;">ID Target: ${data.id} | User ID: ${data.userId}</div>
            </div>
        `;

        showResponse('PUT', url, response.status, data);
    } catch (error) {
        output.innerHTML = `<div class="error-msg">Error: ${error.message}</div>`;
        showResponse('PUT', url, 0, error.message);
    }
}

async function deletePost() {
    const output = document.getElementById('output-del');
    const id = document.getElementById('del-id').value;

    if (!id) {
        alert('Masukkan ID yang ingin dihapus!');
        return;
    }

    const url = `${API_URL}/${id}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });

        const data = await response.json();

        output.innerHTML = `
            <div class="result-item danger">
                <div class="result-header">Status: ${response.status} OK | Data Berhasil Dihapus</div>
                <p>Postingan dengan <b>ID: ${id}</b> telah berhasil dikirimkan permintaan hapus.</p>
            </div>
        `;

        showResponse('DELETE', url, response.status, data);
    } catch (error) {
        output.innerHTML = `<div class="error-msg">Error: ${error.message}</div>`;
        showResponse('DELETE', url, 0, error.message);
    }
}

getPosts();
