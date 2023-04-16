import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

// Create an instance of the express application
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

// Define routes
app.get('/el-al', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'el-al', 'index.html'));
});

app.get('/blue', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'blue', 'index.html'));
});

app.get('/beauty-care', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'blue', 'form.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});