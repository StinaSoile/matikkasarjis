// TÄMÄ ON TEKOÄLYLLÄ TEHTY KOKO HITON TIEDOSTO, EN TAJUA MITÄÄN.
import express from "express";
import path from "path";

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

// Palvelee staattisia tiedostoja dist-hakemistosta
app.use(express.static(path.resolve('dist')));

// Palvelee index.html kunnes määritetään
app.get('*', (req, res) => {
    res.sendFile(path.resolve('dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
