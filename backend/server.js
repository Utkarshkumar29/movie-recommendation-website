const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// ================= PROXY ROUTE =================
app.get("/api/recommend/:movie", async (req, res) => {
  try {
    const movie = encodeURIComponent(req.params.movie);

    const flaskResponse = await axios.get(
      `http://127.0.0.1:5001/home/${movie}`
    );
    console.log(flaskResponse)
    res.json(flaskResponse.data); // send Flask result to frontend
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Recommendation service failed" })
  }
});

// ================= EXISTING ROUTES =================
app.post("/", async (req, res) => {
  // your login/register logic
});

app.listen(5000, () => {
  console.log("Connected to the server at 5000");
});
