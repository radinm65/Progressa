import { Router } from "express";
import sql from "../database.js";

const router = Router();


router.get(`/:id/nutrients`, async (req, res) => {

    try {
        const username = req.params.username

        const nutrients = await sql`SELECT 
        ROUND(SUM(f.calories * (fl.amount / 100)))::int AS total_calories,
        ROUND(SUM(f.protein * (fl.amount / 100)))::int AS total_protein,
        ROUND(SUM(f.carbs * (fl.amount / 100)))::int AS total_carbs,
        ROUND(SUM(f.fat * (fl.amount / 100)))::int AS total_fat
        FROM food_logs fl
        JOIN foods f 
        ON fl.food_id = f.id
        WHERE fl.user_id = ${req.params.id}
        AND fl.created_at >= CURRENT_DATE
        AND fl.created_at < CURRENT_DATE + INTERVAL '1 day';`

        if (nutrients.length === 0) {
            return res.status(404).send("nutrients with this user weren't found")
        }

        res.status(200).send(nutrients[0])

    } catch (e) {
        console.log(e);
    }
})

router.get('/:id/meals', async (req, res) => {
    try {
        const meals = await sql`SELECT 
            food_logs.id,
            food_logs.amount,
            food_logs.created_at,

            foods.name,
            foods.category,
            foods.image_url,
            foods.calories,
            foods.protein,
            foods.carbs,
            foods.fat

            FROM food_logs

            JOIN foods
            ON food_logs.food_id = foods.id

            WHERE food_logs.user_id = ${req.params.id}

            AND DATE(food_logs.created_at) = CURRENT_DATE

            ORDER BY food_logs.created_at DESC;`

        if (meals.length === 0) {
            return res.status(404).send("meals for this user weren't found")
        }

        res.status(200).send(meals)
    } catch (e) {
        console.log(e);
    }
})

export default router