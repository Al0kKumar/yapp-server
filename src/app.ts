import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import AuthRoutes from "./routes/auth.routes"
import { connectDB } from "./config/db";
import ratelimiter from "./middleware/rate_limiter"
import postRoutes from './routes/post.routes';
import likeRoutes from './routes/likes.routes';
import followRoutes from './routes/follow.routes';
import notifRoutes from './routes/notification.routes';
import userRoutes from './routes/user.routes.js';
import searchRoutes from './routes/search.routes.js';


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

app.use('/api',userRoutes);

app.use('/api', postRoutes);

app.use('/api',searchRoutes);

app.use('/api',likeRoutes);

app.use('/api', followRoutes);

app.use('/api', notifRoutes);



app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
})