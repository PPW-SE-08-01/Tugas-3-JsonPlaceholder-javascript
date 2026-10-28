const API = 'https://jsonplaceholder.typicode.com/posts';
const resBox = document.getElementById('response');

function showRes(method, url, status, data) {
    resBox.textContent = JSON.stringify({ method, url, status, data }, null, 2);
}

function out(id, html) {
    document.getElementById(id).innerHTML = html;
}

// GET — Mengambil data
async function getData(id = '') {
    try {
        const url = id ? `${API}/${id}` : `${API}?_limit=3`;
        const response = await fetch(url);
        const data = await response.json();
        const arr = Array.isArray(data) ? data : [data];
        out('output-get', arr.map(x => `<div class="item"><b>ID:</b> ${x.id} | <b>User:</b> ${x.userId}<br><b>${x.title}</b><br>${x.body}</div>`).join(''));
        showRes('GET', url, response.status, arr);
    } catch (error) {
        out('output-get', '<p style="color:red">Error: ' + error.message + '</p>');
        showRes('GET', url, 0, error.message);
    }
}

// POST — Menambahkan data
async function postData() {
    try {
        const d = {
            title: document.getElementById('postTitle').value,
            body: document.getElementById('postBody').value,
            userId: parseInt(document.getElementById('postUserId').value)
        };
        const response = await fetch(API, {
            method: 'POST',
            body: JSON.stringify(d),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        out('output-post', `<div class="item"><b>Ditambahkan:</b><br>ID: ${data.id}<br>${data.title}<br>${data.body}</div>`);
        showRes('POST', API, response.status, data);
    } catch (error) {
        out('output-post', '<p style="color:red">Error: ' + error.message + '</p>');
        showRes('POST', API, 0, error.message);
    }
}

// PUT — Memperbarui data
async function putData() {
    try {
        const id = document.getElementById('putId').value;
        const d = {
            id: parseInt(id),
            title: document.getElementById('putTitle').value,
            body: document.getElementById('putBody').value,
            userId: parseInt(document.getElementById('putUserId').value)
        };
        const response = await fetch(`${API}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(d),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        out('output-put', `<div class="item"><b>Diupdate:</b><br>ID: ${data.id}<br>${data.title}<br>${data.body}</div>`);
        showRes('PUT', `${API}/${id}`, response.status, data);
    } catch (error) {
        out('output-put', '<p style="color:red">Error: ' + error.message + '</p>');
        showRes('PUT', `${API}/${id}`, 0, error.message);
    }
}

// DELETE — Menghapus data
async function deleteData() {
    try {
        const id = document.getElementById('delId').value;
        const response = await fetch(`${API}/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        out('output-del', `<div class="item" style="border-left-color:red"><b>Dihapus:</b><br>ID: ${id}</div>`);
        showRes('DELETE', `${API}/${id}`, response.status, data);
    } catch (error) {
        out('output-del', '<p style="color:red">Error: ' + error.message + '</p>');
        showRes('DELETE', `${API}/${id}`, 0, error.message);
    }
}

// Otomatis load GET saat halaman dibuka
getData();