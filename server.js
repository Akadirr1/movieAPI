const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const https = require('https');
const fs = require('fs');


const app = express();
const TMDB_API = "71bd251de003b28f5ec266b4eca971d6"


app.use(cors());

app.get("/popular", async (req, res) => {
	try {
		const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API}&language=tr-US&`);
		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.error("Popular API Hatası:", error);
		res.status(500).json({ error: "Popular filmleri alınırken bir hata oluştu" });
	}
});

app.get("/search", async (req, res) => {
	try {
		const searchquery = req.query.query;
		if (!searchquery) {
			return res.status(400).json({ error: "Arama terimi eksik" });
		}
		const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API}&query=${searchquery}`);
		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.error("Search API Hatası:", error);
		res.status(500).json({ error: "Arama sonuçları alınırken bir hata oluştu" });
	}
});

app.get("/search/:year", async (req, res) => {
	const year = req.params.year;
	try {
		const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API}&primary_release_year=${year}`);
		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.error("API Hatası:", error);
		res.status(500).json({ error: "Yıla göre film arama hatası" });
	}
});

// Film detaylarını almak için endpoint
app.get("/movie/:id", async (req, res) => {
	const movieId = req.params.id;
	try {
		const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API}&language=tr-TR`);
		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.error("Film Detay API Hatası:", error);
		res.status(500).json({ error: "Film detayları alınırken bir hata oluştu" });
	}
});

const options = {
	key: fs.readFileSync('/etc/ssl/self-signed/key.pem'),
	cert: fs.readFileSync('/etc/ssl/self-signed/cert.pem')
};

https.createServer(options, app).listen(5500, '0.0.0.0', () => {
	console.log('HTTPS server running on port 5500');
});