document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

    console.log('script.js loaded successfully!');

    // Fungsi Helper untuk Update DOM
    const updateDOM = (content) => {
        if (output) {
            output.innerHTML = content;
        } else {
            console.error('Element #output tidak ditemukan di DOM!');
        }
    };

    // 1. GET Method
    const btnGet = document.getElementById('btn-get');
    if (btnGet) {
        btnGet.addEventListener('click', async () => {
            console.log('Button GET diklik');
            try {
                updateDOM('<p><em>Loading...</em></p>');
                const response = await fetch(`${BASE_URL}?_limit=3`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();

                let htmlContent = '<h3>Hasil GET:</h3>';
                data.forEach(post => {
                    htmlContent += `
                        <div class="post-item">
                            <h4>${post.title}</h4>
                            <p>${post.body}</p>
                        </div>
                    `;
                });
                updateDOM(htmlContent);
            } catch (error) {
                console.error('GET Error:', error);
                updateDOM(`<p style="color:red;">Error: ${error.message}</p>`);
            }
        });
    }

    // 2. POST Method
    const btnPost = document.getElementById('btn-post');
    if (btnPost) {
        btnPost.addEventListener('click', async () => {
            console.log('Button POST diklik');
            try {
                updateDOM('<p><em>Loading...</em></p>');
                const response = await fetch(BASE_URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        title: 'Tugas Praktikum Web',
                        body: 'Mencoba POST Method',
                        userId: 1,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                updateDOM(`<h3>Hasil POST (Data Ditambahkan):</h3><pre>${JSON.stringify(data, null, 2)}</pre>`);
            } catch (error) {
                console.error('POST Error:', error);
                updateDOM(`<p style="color:red;">Error: ${error.message}</p>`);
            }
        });
    }

    // 3. PUT Method
    const btnPut = document.getElementById('btn-put');
    if (btnPut) {
        btnPut.addEventListener('click', async () => {
            console.log('Button PUT diklik');
            try {
                updateDOM('<p><em>Loading...</em></p>');
                const response = await fetch(`${BASE_URL}/1`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        id: 1,
                        title: 'Judul Diperbarui',
                        body: 'Konten ini sudah diupdate menggunakan PUT.',
                        userId: 1,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                updateDOM(`<h3>Hasil PUT (Data Diperbarui):</h3><pre>${JSON.stringify(data, null, 2)}</pre>`);
            } catch (error) {
                console.error('PUT Error:', error);
                updateDOM(`<p style="color:red;">Error: ${error.message}</p>`);
            }
        });
    }

    // 4. DELETE Method
    const btnDelete = document.getElementById('btn-delete');
    if (btnDelete) {
        btnDelete.addEventListener('click', async () => {
            console.log('Button DELETE diklik');
            try {
                updateDOM('<p><em>Loading...</em></p>');
                const response = await fetch(`${BASE_URL}/1`, {
                    method: 'DELETE',
                });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                updateDOM(`<h3>Hasil DELETE:</h3><p>Status: ${response.status} (Data dengan ID 1 berhasil dihapus)</p><pre>${JSON.stringify(data, null, 2)}</pre>`);
            } catch (error) {
                console.error('DELETE Error:', error);
                updateDOM(`<p style="color:red;">Error: ${error.message}</p>`);
            }
        });
    }
});