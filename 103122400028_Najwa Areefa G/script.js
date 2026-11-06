const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
const outputContainer = document.getElementById('outputContainer');
const formContainer = document.getElementById('formContainer');

function switchTab(method) {
    const tabs = {
        get: { id: 'tabGet', active: 'bg-[#A7C7E4] text-white shadow-sm' },
        post: { id: 'tabPost', active: 'bg-[#F6C94D] text-[#5D7B3D] shadow-sm' },
        put: { id: 'tabPut', active: 'bg-[#5D7B3D] text-white shadow-sm' },
        delete: { id: 'tabDelete', active: 'bg-[#E4568B] text-white shadow-sm' }
    };

    Object.keys(tabs).forEach(key => {
        const btn = document.getElementById(tabs[key].id);
        if (key === method) {
            btn.className = `py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${tabs[key].active}`;
        } else {
            btn.className = 'py-2 text-xs font-bold rounded-xl transition-all text-[#5D7B3D]/60 hover:bg-[#F29BB9]/30 cursor-pointer';
        }
    });

    if (method === 'get') {
        formContainer.innerHTML = `
            <h2 class="text-xs font-bold text-[#A7C7E4] uppercase tracking-wider mb-3">GET Request</h2>
            <div class="space-y-3">
                <div>
                    <label class="block text-xs font-medium text-[#5D7B3D] mb-1">ID (Opsional - kosongkan untuk menampilkan semua)</label>
                    <input type="number" id="getId" class="w-full text-sm bg-white border border-[#A7C7E4] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#A7C7E4] text-[#5D7B3D]">
                </div>
                <button onclick="handleGet()" class="w-full bg-[#A7C7E4] hover:opacity-90 text-white font-bold py-2.5 rounded-xl text-sm cursor-pointer transition-all">Ambil Data</button>
            </div>
        `;
    } else if (method === 'post') {
        formContainer.innerHTML = `
            <h2 class="text-xs font-bold text-[#F6C94D] uppercase tracking-wider mb-3">POST Request</h2>
            <div class="space-y-3">
                <div>
                    <label class="block text-xs font-medium text-[#5D7B3D] mb-1">Judul</label>
                    <input type="text" id="postTitle" class="w-full text-sm bg-white border border-[#F6C94D] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#F6C94D] text-[#5D7B3D]">
                </div>
                <div>
                    <label class="block text-xs font-medium text-[#5D7B3D] mb-1">Konten</label>
                    <textarea id="postBody" rows="2" class="w-full text-sm bg-white border border-[#F6C94D] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#F6C94D] text-[#5D7B3D]"></textarea>
                </div>
                <button onclick="handlePost()" class="w-full bg-[#F6C94D] hover:opacity-90 text-[#5D7B3D] font-bold py-2.5 rounded-xl text-sm cursor-pointer transition-all">Kirim Data</button>
            </div>
        `;
    } else if (method === 'put') {
        formContainer.innerHTML = `
            <h2 class="text-xs font-bold text-[#5D7B3D] uppercase tracking-wider mb-3">PUT Request</h2>
            <div class="space-y-3">
                <div>
                    <label class="block text-xs font-medium text-[#5D7B3D] mb-1">ID yang Diperbarui</label>
                    <input type="number" id="putId" class="w-full text-sm bg-white border border-[#5D7B3D] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5D7B3D] text-[#5D7B3D]">
                </div>
                <div>
                    <label class="block text-xs font-medium text-[#5D7B3D] mb-1">Judul Baru</label>
                    <input type="text" id="putTitle" class="w-full text-sm bg-white border border-[#5D7B3D] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5D7B3D] text-[#5D7B3D]">
                </div>
                <div>
                    <label class="block text-xs font-medium text-[#5D7B3D] mb-1">Konten Baru</label>
                    <textarea id="putBody" rows="2" class="w-full text-sm bg-white border border-[#5D7B3D] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5D7B3D] text-[#5D7B3D]"></textarea>
                </div>
                <button onclick="handlePut()" class="w-full bg-[#5D7B3D] hover:opacity-90 text-white font-bold py-2.5 rounded-xl text-sm cursor-pointer transition-all">Perbarui Data</button>
            </div>
        `;
    } else if (method === 'delete') {
        formContainer.innerHTML = `
            <h2 class="text-xs font-bold text-[#E4568B] uppercase tracking-wider mb-3">DELETE Request</h2>
            <div class="space-y-3">
                <div>
                    <label class="block text-xs font-medium text-[#5D7B3D] mb-1">ID yang Dihapus</label>
                    <input type="number" id="deleteId" class="w-full text-sm bg-white border border-[#E4568B] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E4568B] text-[#5D7B3D]">
                </div>
                <button onclick="handleDelete()" class="w-full bg-[#E4568B] hover:opacity-90 text-white font-bold py-2.5 rounded-xl text-sm cursor-pointer transition-all">Hapus Data</button>
            </div>
        `;
    }
    
    outputContainer.innerHTML = '<p class="text-[#A7C7E4] italic">Pilih metode di atas untuk mulai menguji...</p>';
}

function renderOutput(data, isList = false) {
    outputContainer.innerHTML = '';
    if (isList && Array.isArray(data)) {
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'bg-white p-4 rounded-xl border-l-4 border-[#F29BB9] shadow-sm';
            card.innerHTML = `
                <h4 class="text-[#E4568B] font-bold mb-1">[ID: ${item.id}] ${item.title}</h4>
                <p class="text-[#5D7B3D] text-xs">${item.body}</p>
            `;
            outputContainer.appendChild(card);
        });
    } else {
        const pre = document.createElement('pre');
        pre.className = 'whitespace-pre-wrap text-white bg-[#5D7B3D] p-4 rounded-xl border border-[#A7C7E4]/30 overflow-x-auto';
        pre.textContent = JSON.stringify(data, null, 2);
        outputContainer.appendChild(pre);
    }
}

async function handleGet() {
    const id = document.getElementById('getId').value;
    let url = BASE_URL;
    if (id) url = `${BASE_URL}/${id}`;

    try {
        outputContainer.innerHTML = '<p class="text-[#F6C94D]">Memuat data...</p>';
        const res = await fetch(url);
        if (!res.ok) throw new Error('Gagal mengambil data.');
        const data = await res.json();

        if (id && !Array.isArray(data)) {
            renderOutput(data, false);
        } else {
            renderOutput(data, true);
        }
    } catch (err) {
        outputContainer.innerHTML = `<p class="text-[#E4568B]">Error: ${err.message}</p>`;
    }
}

async function handlePost() {
    const title = document.getElementById('postTitle').value;
    const body = document.getElementById('postBody').value;

    const payload = {
        title: title || 'Postingan Baru',
        body: body || 'Deskripsi konten postingan.',
        userId: 1
    };

    try {
        outputContainer.innerHTML = '<p class="text-[#F6C94D]">Mengirim data...</p>';
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Gagal mengirim data.');
        const data = await res.json();
        renderOutput(data, false);
    } catch (err) {
        outputContainer.innerHTML = `<p class="text-[#E4568B]">Error: ${err.message}</p>`;
    }
}

async function handlePut() {
    const id = document.getElementById('putId').value || 1;
    const title = document.getElementById('putTitle').value;
    const body = document.getElementById('putBody').value;

    const payload = {
        id: Number(id),
        title: title || 'Judul Pembaruan',
        body: body || 'Isi konten pembaruan.',
        userId: 1
    };

    try {
        outputContainer.innerHTML = `<p class="text-[#F6C94D]">Memperbarui data ID ${id}...</p>`;
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Gagal memperbarui data.');
        const data = await res.json();
        renderOutput(data, false);
    } catch (err) {
        outputContainer.innerHTML = `<p class="text-[#E4568B]">Error: ${err.message}</p>`;
    }
}

async function handleDelete() {
    const id = document.getElementById('deleteId').value || 1;

    try {
        outputContainer.innerHTML = `<p class="text-[#F6C94D]">Menghapus data ID ${id}...</p>`;
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Gagal menghapus data.');
        renderOutput({ message: `Data dengan ID ${id} berhasil dihapus.`, status: res.status }, false);
    } catch (err) {
        outputContainer.innerHTML = `<p class="text-[#E4568B]">Error: ${err.message}</p>`;
    }
}

switchTab('get');