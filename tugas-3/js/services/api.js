// Data Service - Handles data fetching from JSON
const DataService = {
  // Fetch data dari file JSON
  async fetchData() {
    try {
      // Menggunakan relative path 'data/...' yang aman jika dijalankan via Live Server
      const response = await fetch("data/dataBahanAjar.json");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("✅ Data berhasil dimuat dari JSON:", data);
      return data;
    } catch (error) {
      console.error("❌ Error loading data, menggunakan data default:", error.message);
      // Return data default jika fetch gagal atau error
      return this.getDefaultData();
    }
  },

  // Default data sebagai cadangan (fallback) jika JSON gagal dimuat
  getDefaultData() {
    return {
      upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
      kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
      pengirimanList: [
        { kode: "REG", nama: "Reguler (3-5 hari)" },
        { kode: "EXP", nama: "Ekspres (1-2 hari)" },
      ],
      paket: [
        {
          kode: "PAKET-UT-001",
          nama: "PAKET IPS Dasar",
          isi: ["EKMA4116", "EKMA4115"],
          harga: 120000,
        },
        {
          kode: "PAKET-UT-002",
          nama: "PAKET IPA Dasar",
          isi: ["BIOL4201", "FISIP4001"],
          harga: 140000,
        },
      ],
      stok: [
        {
          kode: "EKMA4116",
          judul: "Pengantar Manajemen",
          kategori: "MK Wajib",
          upbjj: "Jakarta",
          lokasiRak: "R1-A3",
          harga: 65000,
          qty: 28,
          safety: 20,
          catatanHTML: "<em>Edisi 2024, cetak ulang</em>",
        },
      ],
      tracking: {},
    };
  },
};

// Fungsi inisialisasi aplikasi untuk menguji fungsionalitas kode
async function initApp() {
  console.log("Memulai pengambilan data...");
  const dataBahanAjar = await DataService.fetchData();
  
  // Contoh menampilkan data yang berhasil didapatkan ke console log
  console.log("Data Siap Digunakan:", dataBahanAjar);
  
  // Contoh manipulasi DOM sederhana untuk membuktikan data masuk
  const outputDiv = document.getElementById("app-output");
  if (outputDiv) {
    outputDiv.innerHTML = `<p>Berhasil memuat <strong>${dataBahanAjar.upbjjList.length} UPBJJ</strong> dan <strong>${dataBahanAjar.stok.length} data stok bahan ajar</strong>.</p>`;
  }
}

// Jalankan fungsi setelah seluruh dokumen HTML selesai dimuat
document.addEventListener("DOMContentLoaded", initApp);