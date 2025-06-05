import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI

export const connectDB = async () => {
     try {
        await mongoose.connect(MONGO_URI as string);

        console.log('MongoDB connected !')

     } catch (error: any) {
        console.log('Could not connect to Mongodb : ', error)
     }
}