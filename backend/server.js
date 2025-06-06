const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

app.get("/api/bookmarks", (req, res) => {
  db.all("SELECT * FROM bookmarks", (err, rows) => {
    res.json(rows);
  });
});

app.post("/api/bookmarks", (req, res) => {
  const { title, url } = req.body;
  db.run(
    "INSERT INTO bookmarks (title, url) VALUES (?, ?)",
    [title, url],
    function() {
      res.json({ id: this.lastID, title, url });
    }
  );
});

app.delete("/api/bookmarks/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM bookmarks WHERE id = ?", [id], (err, result) => {
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
