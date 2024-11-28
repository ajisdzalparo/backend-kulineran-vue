const jsonServer = require("json-server");
const express = require("express");
const app = express();
const router = jsonServer.router("db.json"); // Menggunakan db.json sebagai database
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(jsonServer.bodyParser);

// Method pencarian kustom untuk products berdasarkan substring di 'name'
app.get("/search/products", (req, res) => {
    const query = req.query.q || ""; // Ambil query 'q' dari parameter URL
    const db = router.db; // Mengakses database JSON Server
    const products = db
        .get("products") // Mengambil data dari koleksi 'products'
        .filter((product) => product.name.toLowerCase().includes(query.toLowerCase())) // Filter berdasarkan substring
        .value(); // Mengambil hasil sebagai array

    if (products.length > 0) {
        res.json(products); // Jika ditemukan hasil, kembalikan sebagai JSON
    } else {
        res.status(404).json({ message: "No products found" }); // Jika tidak ditemukan
    }
});

app.use(router); // Gunakan route bawaan JSON Server

// Jalankan server di port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});