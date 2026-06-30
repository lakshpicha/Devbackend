const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter=require("./routes/authRoutes");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.use(cookieParser());

app.use("/auth",authRouter);

app.get("/",(req,res)=>{

res.send("API Running");

})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{

console.log(`Server Running on ${PORT}`);

})