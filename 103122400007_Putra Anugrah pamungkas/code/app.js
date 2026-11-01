// Endpoint API
const URL = 'https://jsonplaceholder.typicode.com/posts';

let posts = [];

const btnGet = document.getElementById('btn-get');
const formPost = document.getElementById('form-post');
const formPut = document.getElementById('form-put');
const formDelete = document.getElementById('form-delete');
const statusText = document.getElementById('status-text');
const postsContainer = document.getElementById('posts-container');
//get
async function getPosts() {
  statusText.textContent = 'Mengambil data (GET)...';
  try {
    const res = await fetch(`${URL}?_limit=6`);
    const data = await res.json();
    posts = data;
    tampilkanData(posts);
    statusText.textContent = `GET Berhasil (${res.status} OK) - ${data.length} data diambil.`;
  } catch (err) {
    statusText.textContent = `GET Gagal: ${err.message}`;
  }
}
//post
async function createPost(e) {
  e.preventDefault();
  const title = document.getElementById('post-title').value;
  const body = document.getElementById('post-body').value;

  statusText.textContent = 'Mengirim data (POST)...';
  try {
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, userId: 1 })
    });
    const data = await res.json();
    posts.unshift(data);
    tampilkanData(posts);
    formPost.reset();
    statusText.textContent = `POST Berhasil (${res.status} Created) - ID: ${data.id}`;
  } catch (err) {
    statusText.textContent = `POST Gagal: ${err.message}`;
  }
}
//put
async function updatePost(e) {
  e.preventDefault();
  const id = document.getElementById('put-id').value;
  const title = document.getElementById('put-title').value;
  const body = document.getElementById('put-body').value;

  statusText.textContent = `Memperbarui post ID ${id} (PUT)...`;
  try {
    const res = await fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title, body, userId: 1 })
    });

    let data;
    if (res.ok) {
      data = await res.json();
    } else {
      data = { id: Number(id), title, body, userId: 1 };
    }

    const index = posts.findIndex(p => p.id == id);
    if (index !== -1) {
      posts[index] = data;
      tampilkanData(posts);
    }
    formPut.reset();
    statusText.textContent = `PUT Berhasil (${res.status} OK) - Post ID ${id} diperbarui.`;
  } catch (err) {
    statusText.textContent = `PUT Gagal: ${err.message}`;
  }
}
//delete
async function deletePost(e) {
  e.preventDefault();
  const id = document.getElementById('delete-id').value;

  statusText.textContent = `Menghapus post ID ${id} (DELETE)...`;
  try {
    const res = await fetch(`${URL}/${id}`, {
      method: 'DELETE'
    });
    posts = posts.filter(p => p.id != id);
    tampilkanData(posts);
    formDelete.reset();
    statusText.textContent = `DELETE Berhasil (${res.status} OK) - Post ID ${id} dihapus.`;
  } catch (err) {
    statusText.textContent = `DELETE Gagal: ${err.message}`;
  }
}
//show
function tampilkanData(data) {
  if (data.length === 0) {
    postsContainer.innerHTML = '<p>Tidak ada data.</p>';
    return;
  }

  postsContainer.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
      <h3>#${item.id} - ${item.title}</h3>
      <p>${item.body}</p>
    `;
    postsContainer.appendChild(card);
  });
}

btnGet.addEventListener('click', getPosts);
formPost.addEventListener('submit', createPost);
formPut.addEventListener('submit', updatePost);
formDelete.addEventListener('submit', deletePost);
