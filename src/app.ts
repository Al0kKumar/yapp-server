import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import AuthRoutes from "./routes/auth.routes"
import { connectDB } from "./config/db";
import ratelimiter from "./middleware/rate_limiter"

const app = express();


dotenv.config();

app.use(express.json());

app.use(cors());

connectDB();

app.use(ratelimiter);

const PORT = process.env.PORT;

app.get('/health',(req,res) => {
    res.status(200).json({"msg":"all fine"})
})

app.use('/api', AuthRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
})