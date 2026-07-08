import express from "express";
import { neon } from '@neondatabase/serverless';

import foodRoutes from "./routes/foods.js";
import mealRoutes from "./routes/meals.js";
import workoutRoutes from "./routes/workouts.js";
import progressRoutes from "./routes/progress.js";
import authRoutes from "./routes/auth.js";

const DATABASE_URL = 'postgresql://neondb_owner:npg_S4dNvaFlC9Pf@ep-mute-fog-atll64p0-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

const app = express();
const sql = neon(DATABASE_URL);

const PORT = 3000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(function (_, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// Routes

app.use("/api/auth", authRoutes);

app.use("/api/foods", foodRoutes);

app.use("/api/meals", mealRoutes);

app.use("/api/workouts", workoutRoutes);

app.use("/api/progress", progressRoutes);


// Test Route

app.get("/", (req, res) => {
    res.send("Progressa API is running");
});


// Start Server

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});