import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("./static"));

app.get("/el-al", (req, res) => res.sendFile(path.join(__dirname, "static", "el-al", "index.html")));
pp.get("/el-al-referral", (req, res) => res.sendFile(path.join(__dirname, "static", "el-al-referral", "index.html")));
// app.get("/el-al-tranzila/*", (req, res) => res.sendFile(path.join(__dirname, "static", "el-al-tranzila", "index.html")));
app.get("/blue", (req, res) => res.sendFile(path.join(__dirname, "static", "blue", "index.html")));
app.get("/beauty-care", (req, res) => res.sendFile(path.join(__dirname, "static", "beauty-care", "form.html")));

app.get("/el-al-tranzila/*", (req, res) => {
    const filePath = path.join(__dirname, "static", "el-al-tranzila", "index.html");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred");
        }
        const replacedData = data.replace("%%NODE_ENV%%", process.env.NODE_ENV);
        res.send(replacedData);
    });
});

app.get("/kls", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "kls", "index.htm"));
});

app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(res.statusCode || 500);
    res.json({
        message: error.message,
        //   stack: process.env.NODE_ENV !== 'production' ? error.stack : '',
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
