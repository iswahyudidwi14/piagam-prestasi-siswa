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
    semester: "",
    tahunAjaran: "",
    prestasi: "",
    namaGuru: "",
    nipGuru: "",
    background: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo" || name === "background") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const generatePDF = async () => {
    const certificate = document.getElementById("certificate");
    const canvas = await html2canvas(certificate);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    pdf.addImage(imgData, "PNG", 10, 10, 277, 190);
    pdf.save("piagam.pdf");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Formulir Data Piagam</h1>
      <form
        style={{
          marginBottom: "20px",
          width: "277mm",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input type="text" name="namaInstansi" placeholder="Nama Instansi" onChange={handleChange} style={{ width: "100%", marginBottom: "10px" }} /><br />
        <input type="text" name="namaDinas" placeholder="Nama Dinas" onChange={handleChange} style={{ width: "100%", marginBottom: "10px" }} /><br />
        <input type="text" name="namaSekolah" placeholder="Nama Sekolah" onChange={handleChange} style={{ width: "100%", marginBottom: "10px" }} /><br />
        <input type="text" name="alamatSekolah" placeholder="Alamat Sekolah" onChange={handleChange} style={{ width: "100%", marginBottom: "10px" }} /><br />
        <input type="file" name="logo" onChange={handleChange} style={{ width: "100%", marginBottom: "10px" }} /><br />
        <input type="text" name="tempatTanggal" placeholder="Tempat, Tanggal" onChange={handleChange} style={{ width: "100%", marginBottom: "10px" }} /><br />
        <select name="semester" onChange={handleChange} style={{ width: "100%", marginBottom: "10px" }}>
          <option value="">Pilih Semester</option>
          <option value="I">I (Ganjil)</option>
          <option value="II">II (Genap)</option>
        </select>
        <input type="text" name="tahunAjaran" placeholder="Tahun Ajaran" onChange={handleChange} style={{ width: "100%", marginBottom: "10px" }} /><br />
        <input type="text" name="namaKepsek" placeholder="Nama Kepala Sekolah" onChange={handleChange} style={{ width: "100%", marginBottom: "10px" }} /><br />
        <input type="text" name="nipKepsek" placeholder="NIP Kepala Sekolah" onChange={handleChange} style={{ width: "100%", marginBottom: "10px" }} /><br />
        <input type="text" name="namaSiswa" placeholder="Nama Siswa" onChange={handleChange} style={{ width: "100%", marginBottom: "10px" }} /><br />
        <input type="text" name="kelas" placeholder="Kelas" onChange={handleChange} style={{ width: "100%", marginBottom: "10px" }} /><br />
        <input type="text" name="prestasi" placeholder="Prestasi" onChange={handleChange} style={{ width: "100%", marginBottom: "10px" }} /><br />
        <input type="text" name="namaGuru" placeholder="Nama Guru" onChange={handleChange} style={{ width: "100%", marginBottom: "10px" }} /><br />
        <input type="text" name="nipGuru" placeholder="NIP Guru" onChange={handleChange} style={{ width: "100%", marginBottom: "10px" }} /><br />
        <input type="file" name="background" placeholder="Background Image" onChange={handleChange} style={{ width: "100%", marginBottom: "10px" }} /><br />
      </form>

      <button onClick={generatePDF} style={{ marginBottom: "20px", padding: "15px 30px", fontSize: "18px", fontWeight: "bold" }}>Cetak Piagam</button>

      <div id="certificate" style={{ 
        padding: "20px", 
        border: "1px solid #000", 
        width: "277mm", 
        height: "190mm", 
        margin: "0 auto", 
        backgroundImage: formData.background ? `url(${URL.createObjectURL(formData.background)})` : formData.background, 
        backgroundSize: "cover", 
        lineHeight: "1.8" 
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {formData.logo && (
            <img src={URL.createObjectURL(formData.logo)} alt="Logo" style={{ width: "100px", marginRight: "20px" }} />
          )}
          <div style={{ textAlign: "center", flex: 1 }}>
            <h1>{formData.namaInstansi}</h1>
            <h2>{formData.namaDinas}</h2>
            <h3>{formData.namaSekolah}</h3>
            <p>{formData.alamatSekolah}</p>
          </div>
        </div>

        <hr />

        <div style={{ textAlign: "center" }}>
          <h2>PIAGAM PENGHARGAAN</h2>
          <p>Dengan ini diberikan kepada:</p>
          <h1>{formData.namaSiswa}</h1>
          <p>Atas prestasinya sebagai:</p>
          <h2>{formData.prestasi}</h2>
          <p>Di kelas: {formData.kelas} Semester: {formData.semester} Tahun Ajaran: {formData.tahunAjaran}</p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "50px" }}>
          <div style={{ textAlign: "left", marginBottom: "50px" }}>
            <p><b>Mengetahui,</b></p>
            <br /><br />
            <p style={{ textDecoration: "underline", fontWeight: "bold" }}>{formData.namaKepsek}</p>
            <p>NIP: {formData.nipKepsek}</p>
          </div>

          <div style={{ textAlign: "right", marginBottom: "50px" }}>
            <p>{formData.tempatTanggal}</p>
            <br /><br />
            <p style={{ textDecoration: "underline", fontWeight: "bold" }}>{formData.namaGuru}</p>
            <p>NIP: {formData.nipGuru}</p>
          </div>
        </div>
      </div>
    </div>
  );
        }
        
