// main.js

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
const responseViewer = document.getElementById("response");

function renderHTML(targetId, html) {
  document.getElementById(targetId).innerHTML = html;
}

function tampilkanResponse(metode, url, status, data) {
  responseViewer.textContent = JSON.stringify(
    { metode, url, status, data },
    null,
    2,
  );
}

async function apiRequest(endpoint, options, targetId, method, successMsg) {
  try {
    const res = await fetch(endpoint, options);
    const data = await res.json();

    const isDelete = method === "DELETE";
    const content = isDelete
      ? `<b>Data Berhasil Dihapus!</b><br>ID: ${endpoint.split("/").pop()}`
      : `<b>${successMsg}</b><br>ID: ${data.id || "-"}<br>Judul: ${data.title}<br>Isi: ${data.body}`;

    renderHTML(
      targetId,
      `<div class="item ${isDelete ? "" : "success"}">${content}</div>`,
    );
    tampilkanResponse(method, endpoint, res.status, data);
  } catch (err) {
    renderHTML(targetId, `<p style="color:red;">Error: ${err.message}</p>`);
    tampilkanResponse(method, endpoint, 0, err.message);
  }
}

// GET
async function getData(idPost = "") {
  const endpoint = idPost ? `${BASE_URL}/${idPost}` : `${BASE_URL}?_limit=3`;
  try {
    const res = await fetch(endpoint);
    const json = await res.json();
    const dataArray = Array.isArray(json) ? json : [json];

    const htmlString = dataArray
      .map(
        (item) => `
      <div class="item">
        <b>ID:</b> ${item.id} | <b>User ID:</b> ${item.userId}<br>
        <b>Judul:</b> ${item.title}<br>
        <p>${item.body}</p>
      </div>
    `,
      )
      .join("");

    renderHTML("output-get", htmlString);
    tampilkanResponse("GET", endpoint, res.status, dataArray);
  } catch (err) {
    renderHTML(
      "output-get",
      `<p style="color:red;">Gagal ambil data: ${err.message}</p>`,
    );
    tampilkanResponse("GET", BASE_URL, 0, err.message);
  }
}

// POST
function postData(e) {
  if (e) e.preventDefault();
  const bodyData = {
    title: document.getElementById("postTitle").value,
    body: document.getElementById("postBody").value,
    userId: parseInt(document.getElementById("postUserId").value),
  };

  apiRequest(
    BASE_URL,
    {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    },
    "output-post",
    "POST",
    "Berhasil Menambahkan Data!",
  );
}

// PUT
function putData(e) {
  if (e) e.preventDefault();
  const id = document.getElementById("putId").value;
  const bodyData = {
    id: parseInt(id),
    title: document.getElementById("putTitle").value,
    body: document.getElementById("putBody").value,
    userId: parseInt(document.getElementById("putUserId").value),
  };

  apiRequest(
    `${BASE_URL}/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(bodyData),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    },
    "output-put",
    "PUT",
    `Berhasil Update Data (ID: ${id})!`,
  );
}

// DELETE
function deleteData(e) {
  if (e) e.preventDefault();
  const id = document.getElementById("delId").value;

  apiRequest(`${BASE_URL}/${id}`, { method: "DELETE" }, "output-del", "DELETE");
}

// Auto Load
window.onload = () => getData();
