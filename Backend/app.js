import "dotenv/config";

import express from "express";

import foodRoutes from "./routes/foods.js";
import mealRoutes from "./routes/meals.js";
import workoutRoutes from "./routes/workouts.js";
import weightsRoutes from "./routes/weights.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";


const app = express();



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {

    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

// Routes

app.use("/auth", authRoutes);

app.use("/users", userRoutes)

app.use("/foods", foodRoutes);

app.use("/meals", mealRoutes);

app.use("/workouts", workoutRoutes);

app.use("/weights", weightsRoutes);


// Test Route

app.get("/", (req, res) => {
    res.send("Progressa API is running");
});

export default app;