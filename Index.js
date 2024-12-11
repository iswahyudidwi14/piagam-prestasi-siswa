// pages/index.js
import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Home() {
  const [formData, setFormData] = useState({
    namaInstansi: "",
    namaDinas: "",
    namaSekolah: "",
    alamatSekolah: "",
    logo: null,
    tempatTanggal: "",
    namaKepsek: "",
    nipKepsek: "",
    namaSiswa: "",
    kelas: "",
    prestasi: "",
    namaGuru: "",
    nipGuru: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const generatePDF = async () => {
    const certificate = document.getElementById("certificate");
    const canvas = await html2canvas(certificate);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "landscape" });
    pdf.addImage(imgData, "PNG", 10, 10, 280, 190);
    pdf.save("piagam.pdf");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Formulir Data Piagam</h1>
      <form style={{ marginBottom: "20px" }}>
        <input type="text" name="namaInstansi" placeholder="Nama Instansi" onChange={handleChange} /><br />
        <input type="text" name="namaDinas" placeholder="Nama Dinas" onChange={handleChange} /><br />
        <input type="text" name="namaSekolah" placeholder="Nama Sekolah" onChange={handleChange} /><br />
        <input type="text" name="alamatSekolah" placeholder="Alamat Sekolah" onChange={handleChange} /><br />
        <input type="file" name="logo" onChange={handleChange} /><br />
        <input type="text" name="tempatTanggal" placeholder="Tempat, Tanggal" onChange={handleChange} /><br />
        <input type="text" name="namaKepsek" placeholder="Nama Kepala Sekolah" onChange={handleChange} /><br />
        <input type="text" name="nipKepsek" placeholder="NIP Kepala Sekolah" onChange={handleChange} /><br />
        <input type="text" name="namaSiswa" placeholder="Nama Siswa" onChange={handleChange} /><br />
        <input type="text" name="kelas" placeholder="Kelas" onChange={handleChange} /><br />
        <input type="text" name="prestasi" placeholder="Prestasi" onChange={handleChange} /><br />
        <input type="text" name="namaGuru" placeholder="Nama Guru" onChange={handleChange} /><br />
        <input type="text" name="nipGuru" placeholder="NIP Guru" onChange={handleChange} /><br />
      </form>

      <button onClick={generatePDF} style={{ marginBottom: "20px" }}>Cetak Piagam</button>

      <div id="certificate" style={{ padding: "20px", border: "1px solid #000", width: "800px", margin: "0 auto", backgroundColor: "#fff" }}>
        <div style={{ textAlign: "center" }}>
          {formData.logo && <img src={URL.createObjectURL(formData.logo)} alt="Logo" style={{ width: "100px" }} />}<br />
          <h1>{formData.namaInstansi}</h1>
          <h2>{formData.namaDinas}</h2>
          <h3>{formData.namaSekolah}</h3>
          <p>{formData.alamatSekolah}</p>
        </div>

        <hr />

        <div style={{ textAlign: "center" }}>
          <h2>PIAGAM PENGHARGAAN</h2>
          <p>Dengan ini diberikan kepada:</p>
          <h1>{formData.namaSiswa}</h1>
          <p>Atas prestasinya sebagai:</p>
          <h2>{formData.prestasi}</h2>
          <p>Di kelas: {formData.kelas}</p>
        </div>

        <div style={{ textAlign: "right", marginTop: "50px" }}>
          <p>{formData.tempatTanggal}</p>
          <p>{formData.namaKepsek}</p>
          <p>NIP: {formData.nipKepsek}</p>
        </div>

        <div style={{ textAlign: "left", marginTop: "20px" }}>
          <p>{formData.namaGuru}</p>
          <p>NIP: {formData.nipGuru}</p>
        </div>
      </div>
    </div>
  );
}
