
const API_URL = "https://jsonplaceholder.typicode.com/posts";

let posts = [];
let editId = null;
let currentPage = 1;
let nextLocalId = 101;

const limit = 8;

// Mengambil elemen HTML berdasarkan ID
const $ = (id) => document.getElementById(id);

// Menampilkan notifikasi
function showNotification(message, type = "success") {
    const notification = $("notification");

    notification.textContent = message;
    notification.className = type;
}

// Menampilkan respons API ke HTML
function showResponse(method, status, data) {
    $("responseStatus").textContent =
        `Method: ${method} | HTTP Status: ${status}`;

    $("responseOutput").textContent =
        JSON.stringify(data, null, 2);
}

// Fungsi request menggunakan Fetch API
async function apiRequest(url, options = {}) {
    const response = await fetch(url, options);

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    showResponse(options.method || "GET", response.status, data);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return data;
}

// =====================================
// 1. GET - MENGAMBIL DATA
// =====================================

async function getPosts() {
    $("apiStatus").textContent = "Loading...";

    try {
        const data = await apiRequest(API_URL);

        // Mapping data JSON ke array JavaScript
        posts = data.map(post => ({
            id: post.id,
            userId: post.userId,
            title: post.title,
            body: post.body
        }));

        nextLocalId = Math.max(
            101,
            ...posts.map(post => post.id + 1)
        );

        currentPage = 1;

        renderPosts();

        $("apiStatus").textContent = "Connected";

        showNotification(
            "GET berhasil! Data berhasil diambil dari API."
        );

    } catch (error) {
        $("apiStatus").textContent = "Error";

        showNotification(
            "Gagal mengambil data: " + error.message,
            "error"
        );
    }
}

// =====================================
// MAPPING DATA KE HTML MENGGUNAKAN DOM
// =====================================

function renderPosts() {
    const postList = $("postList");

    postList.replaceChildren();

    const keyword = $("searchInput").value.toLowerCase();

    // Filter pencarian
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(keyword) ||
        post.body.toLowerCase().includes(keyword)
    );

    const totalPages = Math.max(
        1,
        Math.ceil(filteredPosts.length / limit)
    );

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const start = (currentPage - 1) * limit;
    const end = start + limit;

    const displayedPosts = filteredPosts.slice(start, end);

    // Manipulasi DOM menggunakan forEach
    displayedPosts.forEach(post => {
        const card = document.createElement("div");
        card.className = "post-card";

        const postId = document.createElement("span");
        postId.className = "post-id";
        postId.textContent = `Post ID: ${post.id}`;

        const title = document.createElement("h3");
        title.textContent = post.title;

        const body = document.createElement("p");
        body.textContent = post.body;

        const actions = document.createElement("div");
        actions.className = "post-actions";

        // Tombol EDIT
        const editButton = document.createElement("button");
        editButton.className = "btn-edit";
        editButton.textContent = "Edit (PUT)";
        editButton.onclick = () => editPost(post.id);

        // Tombol DELETE
        const deleteButton = document.createElement("button");
        deleteButton.className = "btn-delete";
        deleteButton.textContent = "Hapus (DELETE)";
        deleteButton.onclick = () => deletePost(post.id);

        actions.append(editButton, deleteButton);

        card.append(postId, title, body, actions);

        postList.appendChild(card);
    });

    if (displayedPosts.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = "Tidak ada postingan ditemukan.";
        postList.appendChild(empty);
    }

    $("totalPosts").textContent = posts.length;

    $("pageInfo").textContent =
        `Halaman ${currentPage} dari ${totalPages}`;

    $("prevBtn").disabled = currentPage === 1;
    $("nextBtn").disabled = currentPage === totalPages;
}

// =====================================
// 2. POST - MENAMBAHKAN DATA
// =====================================

async function createPost(payload) {
    try {
        const data = await apiRequest(API_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },

            body: JSON.stringify(payload)
        });

        // Menambahkan data pada tampilan lokal
        const newPost = {
            ...payload,
            id: nextLocalId++
        };

        posts.unshift(newPost);

        currentPage = 1;
        $("searchInput").value = "";

        renderPosts();
        resetForm();

        showNotification(
            `POST berhasil! Data ditambahkan. HTTP ID: ${data.id}`
        );

    } catch (error) {
        showNotification(
            "POST gagal: " + error.message,
            "error"
        );
    }
}

// =====================================
// 3. PUT - MEMPERBARUI DATA
// =====================================

function editPost(id) {
    const post = posts.find(item => item.id === id);

    if (!post) return;

    editId = id;

    $("userId").value = post.userId;
    $("title").value = post.title;
    $("body").value = post.body;

    $("formTitle").textContent = `Edit Postingan #${id}`;
    $("submitBtn").textContent = "Simpan Perubahan (PUT)";

    $("cancelBtn").hidden = false;

    $("postForm").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

async function updatePost(id, payload) {
    try {
        await apiRequest(`${API_URL}/${id}`, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },

            body: JSON.stringify({
                id: id,
                ...payload
            })
        });

        // Memperbarui data pada array lokal
        posts = posts.map(post =>
            post.id === id
                ? { ...post, ...payload }
                : post
        );

        renderPosts();
        resetForm();

        showNotification(
            `PUT berhasil! Postingan #${id} diperbarui.`
        );

    } catch (error) {
        showNotification(
            "PUT gagal: " + error.message,
            "error"
        );
    }
}

// =====================================
// 4. DELETE - MENGHAPUS DATA
// =====================================

async function deletePost(id) {
    const confirmation = confirm(
        `Yakin ingin menghapus postingan #${id}?`
    );

    if (!confirmation) return;

    try {
        await apiRequest(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        // Menghapus data dari array lokal
        posts = posts.filter(post => post.id !== id);

        if (editId === id) {
            resetForm();
        }

        renderPosts();

        showNotification(
            `DELETE berhasil! Postingan #${id} dihapus.`
        );

    } catch (error) {
        showNotification(
            "DELETE gagal: " + error.message,
            "error"
        );
    }
}

// =====================================
// FORM HANDLER
// =====================================

$("postForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const payload = {
        userId: Number($("userId").value),
        title: $("title").value.trim(),
        body: $("body").value.trim()
    };

    if (
        !Number.isInteger(payload.userId) ||
        payload.userId < 1 ||
        !payload.title ||
        !payload.body
    ) {
        showNotification(
            "Semua kolom wajib diisi dengan benar.",
            "error"
        );
        return;
    }

    $("submitBtn").disabled = true;

    try {
        if (editId !== null) {
            await updatePost(editId, payload);
        } else {
            await createPost(payload);
        }
    } finally {
        $("submitBtn").disabled = false;
    }
});

// Reset form
function resetForm() {
    editId = null;

    $("postForm").reset();

    $("userId").value = 1;
    $("formTitle").textContent = "Tambah Postingan";
    $("submitBtn").textContent = "Tambah Postingan (POST)";

    $("cancelBtn").hidden = true;
}

// =====================================
// EVENT LISTENER
// =====================================

// Refresh GET
$("refreshBtn").addEventListener("click", () => {
    resetForm();
    getPosts();
});

// Batal edit
$("cancelBtn").addEventListener("click", resetForm);

// Search data
$("searchInput").addEventListener("input", () => {
    currentPage = 1;
    renderPosts();
});

// Halaman sebelumnya
$("prevBtn").addEventListener("click", () => {
    currentPage--;
    renderPosts();
});

// Halaman berikutnya
$("nextBtn").addEventListener("click", () => {
    currentPage++;
    renderPosts();
});

// Menjalankan GET saat website dibuka
getPosts();
