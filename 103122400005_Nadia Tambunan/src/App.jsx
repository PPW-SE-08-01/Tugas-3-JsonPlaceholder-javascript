import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'

function App() {
  // State untuk menyimpan data pengguna, kata kunci pencarian, dan status loading
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mengambil data pengguna dari JSONPlaceholder menggunakan Axios
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching data:', err)
        setError('Gagal memuat data pengguna.')
        setLoading(false)
      })
  }, [])

  // Fitur pencarian client-side (memfilter data users berdasarkan input)
  const filteredUsers = users.filter((user) => {
    const keyword = searchTerm.toLowerCase()
    return (
      user.name.toLowerCase().includes(keyword) ||
      user.username.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword) ||
      user.address.city.toLowerCase().includes(keyword) ||
      user.company.name.toLowerCase().includes(keyword)
    )
  })

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans">
      {/* Header Sederhana */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Pengguna JSONPlaceholder</h1>
        <p className="text-gray-600 text-sm mt-1">
          Tugas PPW - Nadia Tambunan (103122400005)
        </p>
      </div>

      {/* Input Pencarian Client-Side */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Cari berdasarkan nama, username, email, kota, atau perusahaan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabel Data shadcn/ui */}
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Sedang mengambil data pengguna...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">
            {error}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] text-center">ID</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Kota</TableHead>
                <TableHead>Perusahaan</TableHead>
                <TableHead>Website</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="text-center font-medium text-gray-600">
                      {user.id}
                    </TableCell>
                    <TableCell className="font-semibold text-gray-800">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      @{user.username}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {user.email}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {user.address?.city}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {user.company?.name}
                    </TableCell>
                    <TableCell className="text-blue-600">
                      {user.website}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    Tidak ditemukan pengguna dengan kata kunci "{searchTerm}"
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="mt-3 text-xs text-gray-500 text-right">
        Total data ditampilkan: {filteredUsers.length} pengguna
      </div>
    </div>
  )
}

export default App
