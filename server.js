const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

const corsOptions = {
	origin: 'https://www.koufrontend.com'
};

app.use(cors(corsOptions));
app.use(express.json());

const TMDB_API = "71bd251de003b28f5ec266b4eca971d6"

app.get('/', (req, res) => {
	console.log("sunucu çalışmış la");
	res.send('API Sunucusu Çalışıyor! 🚀');
});

app.get("/popular", async (req, res) => {
	const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API}&language=tr-US&`);
	const data = await response.json();
	res.json(data);
});
app.get("/search", async (req, res) => {
	const searchquery = req.query.query;
	const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API}&query=${searchquery}`);
	const data = await response.json();
	res.json(data);
})
app.get("/movie/:id", async (req, res) => {
	const movieId = req.params.id;

	try {
		const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API}`);
		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.error("API Hatası:", error);
		res.status(500).json({ error: "Film detayları alınırken bir hata oluştu" });
	}
});
app.get("/search/:year", async (req, res) => {
	const year = req.params.year;
	try {
		const responsse = await fetch(`https://api.themoviedb.org/3/movie/ ?api_key=${TMDB_API}`)
	}
	catch (err) {
		console.error("API Hatası:", error);
		res.status(500).json({ error: "Film detayları alınırken bir hata oluştu" });
	}
})
const PORT = 3000;

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Sunucu http://localhost:${PORT} adresinde başlatıldı.`);
});