const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("bookmarks.db");

db.run(`
    CREATE TABLE IF NOT EXISTS bookmarks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT NOT NULL
    )
    `);
module.exports = db;