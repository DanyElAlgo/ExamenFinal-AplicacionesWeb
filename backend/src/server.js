import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.join(__dirname, '../.env')});

import express from "express";
import morgan from "morgan";
import cors from "cors";

import router from './router.js';
import { createNewUser, signin } from './handlers/user.js';
import { handleUserInput } from "./middlewares/handleUserInput.js";
import loginValidators from "./validators/loginValidator.js";
import signUpValidators from "./validators/signUpValidator.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../../frontend')));

app.get(['/', '/menu', '/about', '/book', '/contact', '/blog', '/signup', '/login', '/cart'], (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

app.use("/api", router);

app.post("/signup", signUpValidators, handleUserInput, createNewUser);
app.post("/signin", loginValidators, handleUserInput, signin);

export default app;