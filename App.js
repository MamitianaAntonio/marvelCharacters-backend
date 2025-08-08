const express = require("express");
const app = express();
const port = 3000;
const marvelData = require("./characters.json");

app.use(express.json());

// get all characters
app.get("/characters", (req, res) => {
  try {
    res.json(marvelData);
  } catch (error) {
    res.status(500).json({ error: "Error proceding request" });
  }
});

// get a character by id
app.get("/characters/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const character = marvelData.characters.find((item) => item.id === id);

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    res.json(character);
  } catch (error) {
    res.status(500).json({ message: "Error proceding request" });
  }
});

// add a character
app.post("characters", (req, res) => {
  const { name, realName, universe } = req.body;

  if (!name || !realName || !universe) {
    return res.status(400).json({ message: "All fiels is required" });
  }

  const newCharacter = { name, realName, universe };
  marvelData.push(newCharacter);

  res.status(201).json({
    message: "character added successfully",
    character: newCharacter,
  });
});

// modify a character
app.put("/characters/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, realName, universe } = req.body;

    const character = marvelData.characters.find((item) => item.id === id);

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    if (name) character.name = name;
    if (realName) character.realName = realName;
    if (universe) character.universe = universe;

    res.status(200).json({
      message: "Character updated successfully",
      character,
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing request" });
  }
});

app.listen(port, () => {
  console.log("The server is started at the port", port);
});
