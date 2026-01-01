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
      `https://movie-recommendation-website-flask.onrender.com/home/${movie}`
    );
    console.log(flaskResponse)
    res.json(flaskResponse.data); // send Flask result to frontend
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Recommendation service failed" })
  }
})

app.get("/popular", async (req, res) => {
  try {
    const flaskResponse=await axios.get("https://movie-recommendation-website-flask.onrender.com/popular")
    console.log(flaskResponse)
    res.status(200).send(flaskResponse.data)
  } catch (error) {
    console.log(error.message)
    res.status(500).send({
      message:"Internal Server Error",
      error:error
    })
  }
})

// ================= EXISTING ROUTES =================
app.post("/", async (req, res) => {
  // your login/register logic
});

app.get('/',(req,res)=>{
  res.send("Server running at 5000")
})

app.listen(5000, () => {
  console.log("Connected to the server at 5000");
});
