const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = process.env.DATA_DIR || "/data";
const HITS_FILE = path.join(DATA_DIR, "hits.txt");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(HITS_FILE)) fs.writeFileSync(HITS_FILE, "0", "utf8");
}

function readHits() {
  ensureDataDir();
  const v = fs.readFileSync(HITS_FILE, "utf8").trim();
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function writeHits(n) {
  ensureDataDir();
  fs.writeFileSync(HITS_FILE, String(n), "utf8");
}

app.get("/", (req, res) => {
  res.send("DevOps demo is running. Try /hit");
});

app.get("/hit", (req, res) => {
  const hits = readHits() + 1;
  writeHits(hits);
  res.json({ hits });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
