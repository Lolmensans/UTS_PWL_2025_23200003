"use client";
import styles from './PreorderPage.module.css';
import { useState } from 'react';

export default function PreorderPage() {

  const [formVisible, setFormVisible] = useState(false);
  const [order_date, setOrderDate] = useState('');
  const [order_by, setOrderBy] = useState('');
  const [selected_package, setSelectedPackage] = useState('');
  const [qty, setQty] = useState('');
  const [status, setStatus] = useState('');
  const [msg, setMsg] = useState('');
  const [orders, setOrders] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!order_date || !order_by || !selected_package || !qty || !status) {
      setMsg("Semua kolom wajib diisi.");
      return;
    }

    const newOrder = { order_date, order_by, selected_package, qty, status };

    if (editIndex !== null) {
      const updatedOrders = orders.map((order, idx) => idx === editIndex ? newOrder : order);
      setOrders(updatedOrders);
      setEditIndex(null);
      setMsg("Data berhasil diperbarui.");
    } else {
      setOrders([...orders, newOrder]);
      setMsg("Data berhasil ditambahkan.");
    }

    setOrderDate('');
    setOrderBy('');
    setSelectedPackage('');
    setQty('');
    setStatus('');
  };

  const handleEdit = (index) => {
    const orderToEdit = orders[index];
    setOrderDate(orderToEdit.order_date);
    setOrderBy(orderToEdit.order_by);
    setSelectedPackage(orderToEdit.selected_package);
    setQty(orderToEdit.qty);
    setStatus(orderToEdit.status);
    setEditIndex(index);
    setFormVisible(true);
  };

  const handleDelete = (index) => {
    const updatedOrders = orders.filter((_, idx) => idx !== index);
    setOrders(updatedOrders);
    setMsg("Data berhasil dihapus.");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ayam Penyet Koh Alex</h1>
      
      <button
        className={styles.buttonToggle}
        onClick={() => {
          setFormVisible(!formVisible);
          setEditIndex(null);
          setMsg('');
          setOrderDate('');
          setOrderBy('');
          setSelectedPackage('');
          setQty('');
          setStatus('');
        }}>
        {formVisible ? 'Tutup Form' : 'Tambah Data'}
      </button>

      {formVisible && (
        <div className={styles.formWrapper}>
          <h3>{editIndex !== null ? 'Edit Data' : 'Input Data Baru'}</h3>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <span>Tanggal Pesanan</span>
              <input
                type="date"
                value={order_date}
                onChange={(e) => setOrderDate(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <span>Nama Pemesan</span>
              <input
                type="text"
                value={order_by}
                onChange={(e) => setOrderBy(e.target.value)}
                placeholder="Masukkan Nama Pemesan"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <span>Paket</span>
              <select
                value={selected_package}
                onChange={(e) => setSelectedPackage(e.target.value)}
                required
              >
                <option value="">Pilih Paket</option>
                <option value="Paket 1">Paket 1</option>
                <option value="Paket 2">Paket 2</option>
                <option value="Paket 3">Paket 3</option>
                <option value="Paket 4">Paket 4</option>
                <option value="Paket 5">Paket 5</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <span>Jumlah</span>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                placeholder="Input Jumlah"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <span>Status</span>
              <label>
                <input
                  type="radio"
                  value="Lunas"
                  checked={status === "Lunas"}
                  onChange={(e) => setStatus(e.target.value)}
                /> Lunas
              </label>
              <label>
                <input
                  type="radio"
                  value="Belum Lunas"
                  checked={status === "Belum Lunas"}
                  onChange={(e) => setStatus(e.target.value)}
                /> Belum Lunas
              </label>
            </div>

            <button type="submit">
              {editIndex !== null ? 'Perbarui' : 'Simpan'}
            </button>
            <p>{msg}</p>
          </form>
        </div>
      )}

      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal Pesanan</th>
              <th>Nama Pemesan</th>
              <th>Paket</th>
              <th>Jumlah</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.order_date}</td>
                <td>{order.order_by}</td>
                <td>{order.selected_package}</td>
                <td>{order.qty}</td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Hapus</button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="7">Belum ada data.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
