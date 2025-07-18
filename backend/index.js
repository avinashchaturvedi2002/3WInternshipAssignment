import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import cors from "cors"
import userRoute from "./routes/userRoutes.js"
import claimRoute from "./routes/claimRoutes.js"


dotenv.config();
const app=express();
connectDB();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://192.168.31.198:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


app.use(express.json())

app.use("/api/users",userRoute)
app.use("/api/claim",claimRoute)

app.listen(process.env.PORT,()=>{
  console.log(`Listening on ${process.env.PORT}`);
})