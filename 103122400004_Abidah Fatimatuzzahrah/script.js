
const API_URL = "https://jsonplaceholder.typicode.com/posts";

const postForm = document.getElementById("postForm");
const postId = document.getElementById("postId");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");

const postContainer = document.getElementById("postContainer");
const statusText = document.getElementById("status");

const submitButton = document.getElementById("submitButton");
const loadButton = document.getElementById("loadButton");
const cancelButton = document.getElementById("cancelButton");
const formTitle = document.getElementById("formTitle");

// Menyimpan data postingan di sisi aplikasi
let posts = [];

// ======================================
// GET: Mengambil data dari API
// ======================================

async function getPosts() {
    try {
        statusText.textContent = "Memuat data...";
        postContainer.innerHTML = "";

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Gagal mengambil data");
        }

        const data = await response.json();

        posts = data.slice(0, 10);

        displayPosts(posts);

        statusText.textContent = "Berhasil memuat 10 postingan.";

    } catch (error) {
        statusText.textContent = "Error: " + error.message;
    }
}

// ======================================
// Menampilkan data ke HTML menggunakan DOM
// ======================================

function displayPosts(data) {
    postContainer.innerHTML = "";

    data.forEach(post => {
        const card = document.createElement("div");
        card.classList.add("post-card");

        const heading = document.createElement("h3");
        heading.textContent = post.title;

        const paragraph = document.createElement("p");
        paragraph.textContent = post.body;

        const user = document.createElement("small");
        user.textContent = "User ID: " + post.userId;

        const actions = document.createElement("div");
        actions.classList.add("actions");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");
        editButton.addEventListener("click", () => editPost(post));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => deletePost(post.id));

        actions.append(editButton, deleteButton);
        card.append(heading, paragraph, user, actions);

        postContainer.appendChild(card);
    });
}

// ======================================
// POST: Menambahkan data baru
// ======================================

async function createPost(title, body) {
    try {
        statusText.textContent = "Menambahkan postingan...";

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 1
            })
        });

        if (!response.ok) {
            throw new Error("Gagal menambahkan postingan");
        }

        const newPost = await response.json();

        // Menambahkan hasil respons ke tampilan lokal
        posts.unshift(newPost);
        displayPosts(posts);

        statusText.textContent =
            "Post berhasil ditambahkan! ID: " + newPost.id;

        postForm.reset();

    } catch (error) {
        statusText.textContent = "Error: " + error.message;
    }
}

// ======================================
// PUT: Memperbarui data
// ======================================

function editPost(post) {
    postId.value = post.id;
    titleInput.value = post.title;
    bodyInput.value = post.body;

    formTitle.textContent = "Edit Postingan";
    submitButton.textContent = "Simpan Perubahan";
    cancelButton.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

async function updatePost(id, title, body) {
    try {
        statusText.textContent = "Memperbarui postingan...";

        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: Number(id),
                title: title,
                body: body,
                userId: 1
            })
        });

        if (!response.ok) {
            throw new Error("Gagal memperbarui postingan");
        }

        const updatedPost = await response.json();

        // Memperbarui tampilan lokal
        posts = posts.map(post =>
            post.id === Number(id) ? updatedPost : post
        );

        displayPosts(posts);

        statusText.textContent = "Post berhasil diperbarui!";

        resetForm();

    } catch (error) {
        statusText.textContent = "Error: " + error.message;
    }
}

// ======================================
// DELETE: Menghapus data
// ======================================

async function deletePost(id) {
    const confirmation = confirm(
        "Apakah kamu yakin ingin menghapus postingan ini?"
    );

    if (!confirmation) return;

    try {
        statusText.textContent = "Menghapus postingan...";

        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Gagal menghapus postingan");
        }

        await response.json();

        // Menghapus data dari tampilan lokal
        posts = posts.filter(post => post.id !== id);

        displayPosts(posts);

        statusText.textContent = "Post berhasil dihapus!";

    } catch (error) {
        statusText.textContent = "Error: " + error.message;
    }
}

// ======================================
// Form Submit
// ======================================

postForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (!title || !body) {
        statusText.textContent = "Judul dan isi wajib diisi.";
        return;
    }

    if (postId.value) {
        updatePost(postId.value, title, body);
    } else {
        createPost(title, body);
    }
});

// ======================================
// Reset Form
// ======================================

function resetForm() {
    postForm.reset();
    postId.value = "";

    formTitle.textContent = "Tambah Postingan";
    submitButton.textContent = "Tambah Postingan";
    cancelButton.classList.add("hidden");
}

// Tombol batal edit
cancelButton.addEventListener("click", resetForm);

// Tombol muat ulang
loadButton.addEventListener("click", getPosts);

// Menjalankan GET saat halaman dibuka
getPosts();
