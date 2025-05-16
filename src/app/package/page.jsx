"use client";
import { useState } from 'react';

export default function PackagePage() {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    kode: '',
    nama: '',
    deskripsi: '',
  });
  const [packages, setPackages] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.kode || !formData.nama || !formData.deskripsi) {
      setMsg("Semua kolom wajib diisi.");
      return;
    }

    if (editIndex === null) {
      const kodeExists = packages.some(p => p.kode === formData.kode);
      if (kodeExists) {
        setMsg("Kode sudah dipakai. Harus unik.");
        return;
      }

      setPackages([...packages, formData]);
      setMsg("Data berhasil ditambahkan.");
    } else {
      const updated = [...packages];
      updated[editIndex] = formData;
      setPackages(updated);
      setEditIndex(null);
      setMsg("Data berhasil diperbarui.");
    }

    setFormData({ kode: '', nama: '', deskripsi: '' });
  };

  const handleEdit = (index) => {
    setFormData(packages[index]);
    setEditIndex(index);
    setFormVisible(true);
  };

  const handleDelete = (index) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      const updated = packages.filter((_, i) => i !== index);
      setPackages(updated);
      setMsg("Data berhasil dihapus.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Manajemen Paket</h1>
      <button onClick={() => {
        setFormVisible(!formVisible);
        setFormData({ kode: '', nama: '', deskripsi: '' });
        setEditIndex(null);
        setMsg('');
      }}>
        {formVisible ? 'Tutup Form' : 'Tambah Paket'}
      </button>

      {formVisible && (
        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
          <div>
            <label>Kode: </label>
            <input
              type="text"
              value={formData.kode}
              onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
              required
              disabled={editIndex !== null}
            />
          </div>
          <div>
            <label>Nama: </label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Deskripsi: </label>
            <textarea
              value={formData.deskripsi}
              onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
              required
            />
          </div>
          <button type="submit" style={{ marginTop: "0.5rem" }}>
            {editIndex !== null ? 'Perbarui' : 'Simpan'}
          </button>
          <p>{msg}</p>
        </form>
      )}

      <table border="1" cellPadding="8" style={{ marginTop: "2rem", width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>No</th>
            <th>Kode</th>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{pkg.kode}</td>
              <td>{pkg.nama}</td>
              <td>{pkg.deskripsi}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>{" "}
                <button onClick={() => handleDelete(index)}>Hapus</button>
              </td>
            </tr>
          ))}
          {packages.length === 0 && (
            <tr>
              <td colSpan="5">Belum ada data.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

