import express from "express"
import dotenv from "dotenv"
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.get('/health',(req,res) => {
    res.status(200).json({"msg":"all fine"})
})

app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
})