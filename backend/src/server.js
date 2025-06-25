import { config } from 'dotenv';
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.join(__dirname, '../.env')});
const app = express();

const port = 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../../frontend')));

app.get(['/', '/menu', '/about', '/book', '/contact', '/blog', '/signup', '/login', '/cart'], (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
