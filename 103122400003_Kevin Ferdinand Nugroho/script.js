const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

// Salinan data di sisi klien, supaya perubahan terlihat di halaman
// (JSONPlaceholder tidak benar-benar menyimpan perubahan).
let posts = [];

// ---------- Elemen DOM ----------
const $ = (id) => document.getElementById(id);
const inputId = $("post-id");
const inputTitle = $("post-title");
const inputBody = $("post-body");
const inputUser = $("post-user");
const listEl = $("post-list");
const countEl = $("count");
const responseEl = $("response");
const requestLineEl = $("request-line");
const badgeEl = $("status-badge");

// ---------- Fungsi bantu ----------

// Satu fungsi untuk semua request, supaya tampilan respons konsisten.
async function request(method, url, payload) {
  const options = { method };
  if (payload) {
    options.headers = { "Content-Type": "application/json; charset=UTF-8" };
    options.body = JSON.stringify(payload);
  }

  requestLineEl.textContent = `${method} ${url}`;
  setBadge("memuat...", "");

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    showResponse(res.status, res.ok, data);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return data;
  } catch (err) {
    if (err instanceof TypeError) {
      // Gagal jaringan (offline, diblokir, dll.)
      showResponse(0, false, { error: "Tidak dapat terhubung ke API. Periksa koneksi internet." });
    }
    throw err;
  }
}

function setBadge(text, kind) {
  badgeEl.textContent = text;
  badgeEl.className = "badge" + (kind ? " " + kind : "");
}

function showResponse(status, ok, data) {
  setBadge(status ? `${status} ${ok ? "OK" : "Error"}` : "gagal", ok ? "ok" : "fail");
  responseEl.textContent = JSON.stringify(data, null, 2);
}

function readForm() {
  return {
    title: inputTitle.value.trim(),
    body: inputBody.value.trim(),
    userId: Number(inputUser.value) || 1,
  };
}

function getId() {
const id = Number(inputId.value);
if (!id || id < 1) {
    alert("Isi ID post terlebih dahulu (angka 1–100).");
    inputId.focus();
    return null;
  }
  return id;
}

function fillForm(post) {
  inputId.value = post.id;
  inputTitle.value = post.title;
  inputBody.value = post.body;
  inputUser.value = post.userId;
  inputTitle.focus();
}

// ---------- Tampilan daftar (DOM) ----------
function renderPosts() {
  listEl.replaceChildren();
  countEl.textContent = `${posts.length} post`;

  if (posts.length === 0) {
    const p = document.createElement("p");
    p.className = "empty";
    p.textContent = "Tidak ada post untuk ditampilkan.";
    listEl.appendChild(p);
    return;
  }

  // mapping data API -> elemen HTML
  const cards = posts.map((post) => {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = post.id;

    const meta = document.createElement("span");
    meta.className = "meta";
    meta.textContent = `#${post.id} · user ${post.userId}`;

    const title = document.createElement("h3");
    title.textContent = post.title;

    const body = document.createElement("p");
    body.textContent = post.body;

    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "link";
    edit.textContent = "Isi ke form";
    edit.addEventListener("click", () => fillForm(post));

    const del = document.createElement("button");
    del.type = "button";
    del.className = "link danger";
    del.textContent = "Hapus";
    del.addEventListener("click", () => deletePost(post.id));

    const row = document.createElement("div");
    row.className = "card-actions";
    row.append(edit, del);

    card.append(meta, title, body, row);
    return card;
  });

  listEl.append(...cards);
}

// ---------- 4 metode HTTP ----------

// GET – ambil semua post (dibatasi 10 supaya ringkas)
async function getPosts() {
  try {
    posts = await request("GET", `${BASE_URL}?_limit=10`);
    renderPosts();
  } catch (err) {
    console.error("GET gagal:", err);
  }
}

// GET – ambil satu post berdasarkan ID
async function getPostById() {
    const id = getId();
if (id === null) return;
try {
    const post = await request("GET", `${BASE_URL}/${id}`);
    posts = [post];
    renderPosts();
    fillForm(post);
} catch (err) {
    console.error("GET by ID gagal:", err);
    }
}

// POST – tambah post baru
async function createPost() {
  const payload = readForm();
  if (!payload.title || !payload.body) {
    alert("Judul dan isi wajib diisi untuk POST.");
    return;
  }
  try {
    const created = await request("POST", BASE_URL, payload);
    // API selalu membalas id 101; tampilkan di paling atas daftar
    posts = [created, ...posts];
    renderPosts();
  } catch (err) {
    console.error("POST gagal:", err);
  }
}

// PUT – ganti seluruh data post
async function updatePost() {
  const id = getId();
  if (id === null) return;
  const payload = { id, ...readForm() };
  if (!payload.title || !payload.body) {
    alert("Judul dan isi wajib diisi untuk PUT.");
    return;
  }
  try {
    const updated = await request("PUT", `${BASE_URL}/${id}`, payload);
    posts = posts.map((p) => (p.id === id ? updated : p));
    renderPosts();
  } catch (err) {
    console.error("PUT gagal:", err);
  }
}

// DELETE – hapus post
async function deletePost(idFromCard) {
  const id = typeof idFromCard === "number" ? idFromCard : getId();
  if (id === null) return;
  try {
    const res = await request("DELETE", `${BASE_URL}/${id}`);
    posts = posts.filter((p) => p.id !== id);
    renderPosts();
    console.log(`Post ${id} dihapus`, res);
  } catch (err) {
    console.error("DELETE gagal:", err);
  }
}

// ---------- Event listener ----------
$("btn-get").addEventListener("click", getPosts);
$("btn-get-one").addEventListener("click", getPostById);
$("btn-post").addEventListener("click", createPost);
$("btn-put").addEventListener("click", updatePost);
$("btn-delete").addEventListener("click", () => deletePost());

// Muat data otomatis saat halaman dibuka
getPosts();