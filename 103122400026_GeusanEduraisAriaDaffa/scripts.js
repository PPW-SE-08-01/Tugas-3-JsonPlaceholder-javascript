const API_URL = "https://jsonplaceholder.typicode.com/posts";

const btnGetList = document.getElementById("btnGetList");
const btnGetById = document.getElementById("btnGetById");
const btnCreate = document.getElementById("btnCreate");
const btnUpdate = document.getElementById("btnUpdate");
const btnPatch = document.getElementById("btnPatch");
const btnDelete = document.getElementById("btnDelete");

const postsTableBodyList = document.getElementById("postsTableBody");
const resultList = document.getElementById('resultList')

postsTableBodyList.innerHTML = `<tr class="hover:bg-gray-50">
          <td class="border border-gray-300 p-2 text-center" colspan="5">Data Belum Diambil. Klik tombol untuk memuat data</td>
        </tr>`;
resultList.innerHTML = `<pre>Data Belum Diambil. Klik tombol untuk memuat data</pre>`

btnGetList.addEventListener("click", async () => {
    postsTableBodyList.innerHTML = `<tr class="hover:bg-gray-50">
    <td class="border border-gray-300 p-2 text-center" colspan="5">Sedang mengambil data...</td>
    </tr>`;

    resultList.innerHTML = `<pre>Loading...</pre>`

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json();

        if (result.length === 0) {
            postsTableBodyList.innerHTML = `<tr class="hover:bg-gray-50">
                  <td class="border border-gray-300 p-2 text-center" colspan="5">Data Tidak Ditemukan!</td>
                </tr>`;
            resultList.innerHTML = `<pre>Data Tidak Ditemukan!</pre>`
        } else {
            let tableRows = "";
            for (let i = 0; i < result.length; i++) {
                tableRows += `<tr class="hover:bg-gray-50">
                    <td class="border border-gray-300 p-2 text-center">${i}</td>
                    <td class="border border-gray-300 p-2 text-center">${result[i].userId}</td>
                    <td class="border border-gray-300 p-2 text-center font-bold text-blue-600">${result[i].id}</td>
                    <td class="border border-gray-300 p-2 font-medium">${result[i].title}</td>
                    <td class="border border-gray-300 p-2">${result[i].body}</td>
                  </tr>`;
            }

            postsTableBodyList.innerHTML = tableRows;
            resultList.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`
        }
    } catch (error) {
        console.log("Terjadi Error: ", error)
        postsTableBodyList.innerHTML = `<tr class="hover:bg-gray-50">
              <td class="border border-gray-300 p-2 text-center" colspan="5">Terjadi Kesalahan! Silahkan Coba Lagi</td>
            </tr>`
        resultList.innerHTML = `<pre>Terjadi Kesalahan! Silahkan Coba Lagi</pre>`
    }
});


const inputIdGet = document.getElementById("inputIdGet");
const uiGetById = document.getElementById("uiGetById");
const resultGetById = document.getElementById('resultGetById')

uiGetById.innerHTML = `<tr class="hover:bg-gray-50">
          <td class="border border-gray-300 p-2 text-center" colspan="5">Data Belum Diambil. Klik tombol untuk memuat data</td>
        </tr>`;
resultGetById.innerHTML = `<pre>Data Belum Diambil. Klik tombol untuk memuat data</pre>`

btnGetById.addEventListener("click", async () => {
    uiGetById.innerHTML = `<tr class="hover:bg-gray-50">
    <td class="border border-gray-300 p-2 text-center" colspan="4">Sedang mengambil data...</td>
    </tr>`;

    resultGetById.innerHTML = `<pre>Loading...</pre>`

    try {
        const response = await fetch(API_URL + "/" + inputIdGet.value);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json();

        if (result.length === 0) {
            uiGetById.innerHTML = `<tr class="hover:bg-gray-50">
                  <td class="border border-gray-300 p-2 text-center" colspan="5">Data Tidak Ditemukan!</td>
                </tr>`;
            resultGetById.innerHTML = `<pre>Data Tidak Ditemukan!</pre>`
        } else {
            let tableRows = "";
            tableRows += `<tr class="hover:bg-gray-50">
                    <td class="border border-gray-300 p-2 text-center">${result.userId}</td>
                    <td class="border border-gray-300 p-2 text-center font-bold text-blue-600">${result.id}</td>
                    <td class="border border-gray-300 p-2 font-medium">${result.title}</td>
                    <td class="border border-gray-300 p-2">${result.body}</td>
                  </tr>`;

            uiGetById.innerHTML = tableRows;
            resultGetById.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`
        }
    } catch (error) {
        console.log("Terjadi Error: ", error)
        uiGetById.innerHTML = `<tr class="hover:bg-gray-50">
              <td class="border border-gray-300 p-2 text-center" colspan="4">Terjadi Kesalahan! Silahkan Coba Lagi</td>
            </tr>`
        resultGetById.innerHTML = `<pre>Terjadi Kesalahan! Silahkan Coba Lagi</pre>`
    }
});


const createUserId = document.getElementById("createUserId");
const createTitle = document.getElementById("createTitle");
const createBody = document.getElementById("createBody");
const uiCreate = document.getElementById("uiCreate");
const resultCreate = document.getElementById('resultCreate')

uiCreate.innerHTML = `<tr class="hover:bg-gray-50">
          <td class="border border-gray-300 p-2 text-center" colspan="5">Data Belum Diambil. Klik tombol untuk memuat data</td>
        </tr>`;
resultCreate.innerHTML = `<pre>Data Belum Diambil. Klik tombol untuk memuat data</pre>`

btnCreate.addEventListener("click", async () => {
    uiCreate.innerHTML = `<tr class="hover:bg-gray-50">
    <td class="border border-gray-300 p-2 text-center" colspan="4">Sedang mengambil data...</td>
    </tr>`;

    resultCreate.innerHTML = `<pre>Loading...</pre>`

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: createTitle.value,
                body: createBody.value,
                userId: createUserId.value,
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json();

        let tableRows = "";
        tableRows += `<tr class="hover:bg-gray-50">
                    <td class="border border-gray-300 p-2 text-center">${result.userId}</td>
                    <td class="border border-gray-300 p-2 text-center font-bold text-blue-600">${result.id}</td>
                    <td class="border border-gray-300 p-2 font-medium">${result.title}</td>
                    <td class="border border-gray-300 p-2">${result.body}</td>
                  </tr>`;

        uiCreate.innerHTML = tableRows;
        resultCreate.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`
    } catch (error) {
        console.log("Terjadi Error: ", error)
        uiCreate.innerHTML = `<tr class="hover:bg-gray-50">
              <td class="border border-gray-300 p-2 text-center" colspan="4">Terjadi Kesalahan! Silahkan Coba Lagi</td>
            </tr>`
        resultCreate.innerHTML = `<pre>Terjadi Kesalahan! Silahkan Coba Lagi</pre>`
    }
});


const updateId = document.getElementById("updateId");
const updateUserId = document.getElementById("updateUserId");
const updateTitle = document.getElementById("updateTitle");
const updateBody = document.getElementById("updateBody");
const uiUpdate = document.getElementById("uiUpdate");
const resultUpdate = document.getElementById('resultUpdate')

uiUpdate.innerHTML = `<tr class="hover:bg-gray-50">
          <td class="border border-gray-300 p-2 text-center" colspan="5">Data Belum Diambil. Klik tombol untuk memuat data</td>
        </tr>`;
resultUpdate.innerHTML = `<pre>Data Belum Diambil. Klik tombol untuk memuat data</pre>`

btnUpdate.addEventListener("click", async () => {
    const idToUpdate = parseInt(updateId.value)

    if (!idToUpdate || idToUpdate < 1 || idToUpdate > 100) {
        uiUpdate.innerHTML = `<tr class="bg-yellow-50">
            <td class="border border-yellow-300 p-2 text-center text-yellow-700" colspan="4">
                Peringatan: Masukkan ID antara 1 hingga 100!
            </td>
        </tr>`
        resultUpdate.innerHTML = `<pre>Error: ID tidak valid untuk API ini</pre>`
        return
    }

    uiUpdate.innerHTML = `<tr class="hover:bg-gray-50">
    <td class="border border-gray-300 p-2 text-center" colspan="4">Sedang mengambil data...</td>
    </tr>`;

    resultUpdate.innerHTML = `<pre>Loading...</pre>`

    try {
        const response = await fetch(API_URL + "/" + updateId.value, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                id: updateId.value,
                title: updateTitle.value,
                body: updateBody.value,
                userId: updateUserId.value,
            })
        });

        if (!response.ok) {
            console.log(response)
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json();

        let tableRows = "";
        tableRows += `<tr class="hover:bg-gray-50">
                    <td class="border border-gray-300 p-2 text-center">${result.userId}</td>
                    <td class="border border-gray-300 p-2 text-center font-bold text-blue-600">${result.id}</td>
                    <td class="border border-gray-300 p-2 font-medium">${result.title}</td>
                    <td class="border border-gray-300 p-2">${result.body}</td>
                  </tr>`;

        uiUpdate.innerHTML = tableRows;
        resultUpdate.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`
    } catch (error) {
        console.log("Terjadi Error: ", error)
        uiUpdate.innerHTML = `<tr class="hover:bg-gray-50">
              <td class="border border-gray-300 p-2 text-center" colspan="4">Terjadi Kesalahan! Silahkan Coba Lagi</td>
            </tr>`
        resultUpdate.innerHTML = `<pre>Terjadi Kesalahan! Silahkan Coba Lagi</pre>`
    }
});


const patchId = document.getElementById("patchId");
const patchTitle = document.getElementById("patchTitle");
const uiPatch = document.getElementById("uiPatch");
const resultPatch = document.getElementById('resultPatch')

uiPatch.innerHTML = `<tr class="hover:bg-gray-50">
          <td class="border border-gray-300 p-2 text-center" colspan="2">Data Belum Diambil. Klik tombol untuk memuat data</td>
        </tr>`;
resultPatch.innerHTML = `<pre>Data Belum Diambil. Klik tombol untuk memuat data</pre>`

btnPatch.addEventListener("click", async () => {
    const idToPatch = parseInt(patchId.value)

    if (!idToPatch || idToPatch < 1 || idToPatch > 100) {
        uiPatch.innerHTML = `<tr class="bg-yellow-50">
            <td class="border border-yellow-300 p-2 text-center text-yellow-700" colspan="4">
                Peringatan: Masukkan ID antara 1 hingga 100!
            </td>
        </tr>`
        resultPatch.innerHTML = `<pre>Error: ID tidak valid untuk API ini</pre>`
        return
    }

    uiPatch.innerHTML = `<tr class="hover:bg-gray-50">
    <td class="border border-gray-300 p-2 text-center" colspan="2">Sedang mengambil data...</td>
    </tr>`;

    resultPatch.innerHTML = `<pre>Loading...</pre>`

    try {
        const response = await fetch(API_URL + "/" + patchId.value, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                id: patchId.value,
                title: patchTitle.value,
            })
        });

        if (!response.ok) {
            console.log(response)
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json();

        let tableRows = "";
        tableRows += `<tr class="hover:bg-gray-50">
                    <td class="border border-gray-300 p-2 text-center font-bold text-blue-600">${result.id}</td>
                    <td class="border border-gray-300 p-2 font-medium">${result.title}</td>
                  </tr>`;

        uiPatch.innerHTML = tableRows;
        resultPatch.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`
    } catch (error) {
        console.log("Terjadi Error: ", error)
        uiPatch.innerHTML = `<tr class="hover:bg-gray-50">
              <td class="border border-gray-300 p-2 text-center" colspan="2">Terjadi Kesalahan! Silahkan Coba Lagi</td>
            </tr>`
        resultPatch.innerHTML = `<pre>Terjadi Kesalahan! Silahkan Coba Lagi</pre>`
    }
});


const deleteId = document.getElementById("deleteId");
const uiDelete = document.getElementById("uiDelete");
const resultDelete = document.getElementById('resultDelete')

uiDelete.innerHTML = `Belum ada data yang dihapus. Klik tombol untuk menghapus data`;
resultDelete.innerHTML = `<pre>Belum ada data yang dihapus. Klik tombol untuk memuat data</pre>`

btnDelete.addEventListener("click", async () => {
    const idToDelete = parseInt(deleteId.value)

    if (!idToDelete || idToDelete < 1 || idToDelete > 100) {
        uiDelete.innerHTML = `Error: ID tidak valid untuk API ini`
        resultDelete.innerHTML = `<pre>Error: ID tidak valid untuk API ini</pre>`
        return
    }

    uiDelete.innerHTML = `Sedang menghapus data`;

    resultDelete.innerHTML = `<pre>Loading...</pre>`

    try {
        const response = await fetch(API_URL + "/" + deleteId.value, {
            method: "DELETE",
        });

        if (!response.ok) {
            console.log(response)
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json();

        let tableRows = "";
        tableRows += `Post dengan id ${deleteId.value} berhasil dihapus`;

        uiDelete.innerHTML = tableRows;
        resultDelete.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`
    } catch (error) {
        console.log("Terjadi Error: ", error)
        uiDelete.innerHTML = `Post dengan id ${deleteId.value} gagal dihapus`
        resultDelete.innerHTML = `<pre>Terjadi Kesalahan! Silahkan Coba Lagi</pre>`
    }
});
