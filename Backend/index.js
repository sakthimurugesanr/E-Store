import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRouts.js";
import categoryRoutes from './routes/categoryRoute.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoutes from "./routes/orderRoutes.js";

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

const app = express();




// Middleware
app.use(express.json()); // Built-in Express parser, no need for body-parser
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/products',productRoutes);
app.use('/api/upload',uploadRoutes);
app.use('/api/orders',orderRoutes);

app.get('/api/config/paypal',(req,res)=>{
    res.send({clientId:process.env.PAYPAL_CLIENT_ID})
})

const __dirname = path.resolve();

app.use('/uploads',express.static(path.join(__dirname + '/uploads')));

// Global handler for unhandled promise rejections
process.on('unhandledRejection', (error, promise) => {
    console.error(`Unhandled Rejection at: ${promise}, reason: ${error.message || error}`);
    // Optional: Perform cleanup actions here
    process.exit(1); // Exit the process
});  

// Global handler for uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error(`Uncaught Exception: ${err.message || err}`);
    // Optional: Perform cleanup actions here
    process.exit(1); // Exit the process after handling the error
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
