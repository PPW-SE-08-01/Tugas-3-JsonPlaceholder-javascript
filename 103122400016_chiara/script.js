/**
 * Tugas 3 - Fetch API & Asynchronous JavaScript (JSONPlaceholder)
 * Menerapkan GET, POST, PUT, DELETE memakai async/await.
 */

const BASE_URL = "https://jsonplaceholder.typicode.com";
const POSTS_URL = `${BASE_URL}/posts`;

/* ---------- Helper DOM ---------- */
const $ = (id) => document.getElementById(id);

const ACCENT = {
  GET: "var(--get)",
  POST: "var(--post)",
  PUT: "var(--put)",
  DELETE: "var(--delete)",
};

function clear(el) {
  el.replaceChildren();
}

function notice(type, text) {
  const p = document.createElement("p");
  p.className = `notice ${type}`;
  p.textContent = text;
  return p;
}

/* Membuat kartu satu post. textContent dipakai agar aman dari injeksi HTML. */
function createPostCard(post, method) {
  const card = document.createElement("article");
  card.className = "card";
  card.style.setProperty("--accent", ACCENT[method]);

  const title = document.createElement("h3");
  title.textContent = post.title ?? "(tanpa judul)";

  const body = document.createElement("p");
  body.textContent = post.body ?? "";

  const tags = document.createElement("div");
  tags.className = "tags";
  [`ID: ${post.id ?? "-"}`, `User: ${post.userId ?? "-"}`].forEach((t) => {
    const s = document.createElement("span");
    s.textContent = t;
    tags.appendChild(s);
  });

  card.append(title, body, tags);
  return card;
}

/* Mapping array data API -> elemen HTML, lalu tampilkan ke container. */
function renderPosts(container, posts, method) {
  clear(container);
  if (!posts.length) {
    const p = document.createElement("p");
    p.className = "empty";
    p.textContent = "Data tidak ditemukan.";
    container.appendChild(p);
    return;
  }
  container.append(...posts.map((post) => createPostCard(post, method)));
}

/* ---------- Panel respons API ---------- */
function showResponse({ method, url, status, ok, ms, data }) {
  $("meta-method").textContent = method;
  $("meta-url").textContent = url;
  $("meta-time").textContent = `${ms} ms`;
  const st = $("meta-status");
  st.textContent = status;
  st.className = ok ? "status-ok" : "status-bad";
  $("raw-json").textContent =
    data === null || data === undefined ? "(respons kosong)" : JSON.stringify(data, null, 2);
}

function showFailure({ method, url, message }) {
  $("meta-method").textContent = method;
  $("meta-url").textContent = url;
  $("meta-time").textContent = "-";
  const st = $("meta-status");
  st.textContent = "Gagal";
  st.className = "status-bad";
  $("raw-json").textContent = message;
}

/* ---------- Fungsi inti: pembungkus fetch ---------- */
async function request(method, url, payload) {
  const options = { method, headers: { "Content-Type": "application/json; charset=UTF-8" } };
  if (payload !== undefined) options.body = JSON.stringify(payload);

  const start = performance.now();
  try {
    const response = await fetch(url, options);
    const ms = Math.round(performance.now() - start);

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    showResponse({ method, url, status: `${response.status} ${response.statusText}`.trim(), ok: response.ok, ms, data });

    if (!response.ok) {
      throw new Error(`Server membalas dengan status ${response.status}`);
    }
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      // fetch() melempar TypeError saat jaringan bermasalah
      showFailure({ method, url, message: "Tidak dapat terhubung ke server. Periksa koneksi internet." });
      throw new Error("Tidak dapat terhubung ke server. Periksa koneksi internet.");
    }
    if (!($("meta-method").textContent === method && $("meta-url").textContent === url)) {
      showFailure({ method, url, message: error.message });
    }
    throw error;
  }
}

/* Menjalankan aksi sambil menonaktifkan tombol submit dan menampilkan status. */
async function runAction(form, container, action) {
  const button = form.querySelector("button[type='submit']");
  button.disabled = true;
  clear(container);
  container.appendChild(notice("loading", "Memuat..."));
  try {
    await action();
  } catch (error) {
    clear(container);
    container.appendChild(notice("error", `Gagal: ${error.message}`));
  } finally {
    button.disabled = false;
  }
}

/* ---------- 1. GET ---------- */
async function getPosts(limit) {
  return request("GET", `${POSTS_URL}?_limit=${limit}`);
}

async function getPostById(id) {
  return request("GET", `${POSTS_URL}/${id}`);
}

$("form-get").addEventListener("submit", (e) => {
  e.preventDefault();
  const container = $("result-get");
  runAction(e.currentTarget, container, async () => {
    const id = $("get-id").value.trim();
    const posts = id ? [await getPostById(id)] : await getPosts($("get-limit").value);
    renderPosts(container, posts, "GET");
  });
});

/* ---------- 2. POST ---------- */
async function createPost(newPost) {
  return request("POST", POSTS_URL, newPost);
}

$("form-post").addEventListener("submit", (e) => {
  e.preventDefault();
  const container = $("result-post");
  runAction(e.currentTarget, container, async () => {
    const created = await createPost({
      title: $("post-title").value.trim(),
      body: $("post-body").value.trim(),
      userId: Number($("post-userId").value),
    });
    clear(container);
    container.append(
      notice("ok", `Berhasil ditambahkan dengan ID ${created.id}. (Data simulasi, tidak disimpan permanen.)`),
      createPostCard(created, "POST")
    );
    e.target.reset();
  });
});

/* ---------- 3. PUT ---------- */
async function updatePost(id, updatedPost) {
  return request("PUT", `${POSTS_URL}/${id}`, updatedPost);
}

$("form-put").addEventListener("submit", (e) => {
  e.preventDefault();
  const container = $("result-put");
  runAction(e.currentTarget, container, async () => {
    const id = Number($("put-id").value);
    const updated = await updatePost(id, {
      id,
      title: $("put-title").value.trim(),
      body: $("put-body").value.trim(),
      userId: Number($("put-userId").value),
    });
    clear(container);
    container.append(notice("ok", `Post ID ${id} berhasil diperbarui.`), createPostCard(updated, "PUT"));
  });
});

/* ---------- 4. DELETE ---------- */
async function deletePost(id) {
  return request("DELETE", `${POSTS_URL}/${id}`);
}

$("form-delete").addEventListener("submit", (e) => {
  e.preventDefault();
  const container = $("result-delete");
  runAction(e.currentTarget, container, async () => {
    const id = Number($("delete-id").value);
    await deletePost(id);
    clear(container);
    container.appendChild(notice("ok", `Post ID ${id} berhasil dihapus (simulasi, respons berupa objek kosong).`));
  });
});

/* ---------- Tab ---------- */
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      const active = t === tab;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
      $(t.dataset.target).hidden = !active;
    });
  });
});

/* Muat data awal saat halaman dibuka */
window.addEventListener("DOMContentLoaded", () => $("form-get").requestSubmit());
