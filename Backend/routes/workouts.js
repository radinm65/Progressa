import { Router } from "express";
import sql from "../database.js";

const router = Router();

router.get("/:userID", async (req, res) => {
    try {
        const workout = await sql`Select * from workout_logs
        Where user_id = ${req.params.userID}`

        if (workout.length === 0) {
            return res.status(404).send("workouts for this user weren't found")
        }

        res.status(200).send(workout)
    } catch (e) {
        console.log(e);
    }
})

router.post("/:userID", async (req, res) => {
    try {

        const {
            name,
            muscle_group,
            duration,
            calories_burned
        } = req.body;

        const result = await sql`

        INSERT INTO workout_logs
        (
            user_id,
            name,
            muscle_group,
            duration,
            calories_burned
        )
        VALUES
        (
            ${req.params.userID},
            ${name},
            ${muscle_group},
            ${duration},
            ${calories_burned}
        )
        RETURNING *;

        `;
        res.status(201).send(result[0]);

    } catch (e) {
        console.log(e);
        res.status(500).send("Server error");
    }
})


export default router