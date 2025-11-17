const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001; // Menggunakan port yang berbeda dari frontend

// Middleware
app.use(cors());
app.use(express.json());

// Route sederhana untuk pengetesan
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Nanti kita akan menambahkan route /api/posts di sini

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
