const express = require("express");
const app = express();
const port = 3000;
const characters = require("./characters.json");

// get all characters
app.get("/characters", (req, res) => {
  try {
    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: "Error proceding request" });
  }
});

app.listen(port, () => {
  console.log("The server is started at the port", port);
});
