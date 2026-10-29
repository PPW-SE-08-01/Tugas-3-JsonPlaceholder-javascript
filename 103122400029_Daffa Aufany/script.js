
const API_URL = "https://jsonplaceholder.typicode.com/posts";

const output = document.getElementById("output");

// GET
async function getData() {
    try {
        const response = await fetch(API_URL + "?_limit=3");
        const data = await response.json();

        output.innerHTML = "<h3>Data Posts:</h3>";

        data.forEach(post => {
            output.innerHTML += `
                <p>
                    <b>${post.id}. ${post.title}</b><br>
                    ${post.body}
                </p>
                <hr>
            `;
        });
    } catch (error) {
        output.textContent = error.message;
    }
}

// POST
async function postData() {
    const newPost = {
        title: "Belajar Fetch API",
        body: "Data baru dibuat gw me Daffa.",
        userId: 1
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        });

        const data = await response.json();

        output.innerHTML = `
            <h3>POST Berhasil</h3>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
    } catch (error) {
        output.textContent = error.message;
    }
}

// PUT
async function putData() {
    const updatedPost = {
        id: 1,
        title: "Judul Sudah Diubah",
        body: "Ini yang terbaru.",
        userId: 1
    };

    try {
        const response = await fetch(API_URL + "/1", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPost)
        });

        const data = await response.json();

        output.innerHTML = `
            <h3>PUT Berhasil</h3>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
    } catch (error) {
        output.textContent = error.message;
    }
}

// DELETE
async function deleteData() {
    try {
        const response = await fetch(API_URL + "/1", {
            method: "DELETE"
        });

        output.innerHTML = `
            <h3>DELETE Berhasil</h3>
            <p>Status HTTP: ${response.status}</p>
            <p>Permintaan penghapusan telah dikirim.</p>
        `;
    } catch (error) {
        output.textContent = error.message;
    }
}

document.getElementById("btn-get")
    .addEventListener("click", getData);

document.getElementById("btn-post")
    .addEventListener("click", postData);

document.getElementById("btn-put")
    .addEventListener("click", putData);

document.getElementById("btn-delete")
    .addEventListener("click", deleteData);
