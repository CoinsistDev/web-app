import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static('./static'));

app.get('/el-al', (req, res) => res.sendFile(path.join(__dirname, 'static', 'el-al', 'index.html')));


const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))