import { Router } from "express";
import sql from "../database.js";

const router = Router();


router.get(`/:id/nutrients`, async (req, res) => {

    try {
        const username = req.params.username

        const nutrients = await sql`SELECT 
        ROUND(SUM(f.calories * (m.amount / 100)))::int AS total_calories,
        ROUND(SUM(f.protein * (m.amount / 100)))::int AS total_protein,
        ROUND(SUM(f.carbs * (m.amount / 100)))::int AS total_carbs,
        ROUND(SUM(f.fat * (m.amount / 100)))::int AS total_fat
        FROM meals m
        JOIN foods f 
        ON m.food_id = f.id
        WHERE m.user_id = ${req.params.id}
        AND m.created_at >= CURRENT_DATE
        AND m.created_at < CURRENT_DATE + INTERVAL '1 day';`

        if (nutrients.length === 0) {
            return res.status(404).send("nutrients with this user weren't found")
        }

        res.status(200).send(nutrients[0])

    } catch (e) {
        console.log(e);
    }
})


router.get(`/:id/nutrients`, async (req, res) => {

    try {
        const username = req.params.username

        const nutrients = await sql`SELECT 
        ROUND(SUM(f.calories * (m.amount / 100)))::int AS total_calories,
        ROUND(SUM(f.protein * (m.amount / 100)))::int AS total_protein,
        ROUND(SUM(f.carbs * (m.amount / 100)))::int AS total_carbs,
        ROUND(SUM(f.fat * (m.amount / 100)))::int AS total_fat
        FROM meals m
        JOIN foods f 
        ON m.food_id = f.id
        WHERE m.user_id = ${req.params.id}
        AND m.created_at >= CURRENT_DATE
        AND m.created_at < CURRENT_DATE + INTERVAL '1 day';`

        if (nutrients.length === 0) {
            return res.status(404).send("nutrients with this user weren't found")
        }

        res.status(200).send(nutrients[0])

    } catch (e) {
        console.log(e);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const meals = await sql`SELECT 
            meals.id,
            meals.amount,
            meals.created_at,
            foods.name,
            foods.category,
            foods.image_url,
            foods.calories,
            foods.protein,
            foods.carbs,
            foods.fat
            FROM meals
            JOIN foods
            ON meals.food_id = foods.id
            WHERE meals.user_id = '412bdb8f-31a3-4425-ab69-6447b6e71efc'
            ORDER BY meals.created_at DESC;`

        if (meals.length === 0) {
            return res.status(404).send("meals for this user weren't found")
        }

        res.status(200).send(meals)
    } catch (e) {
        console.log(e);
    }
})

router.delete('/:userID/:mealID', async (req, res) => {
    try {
        const result = await sql`
        DELETE FROM meals
        WHERE id = ${req.params.mealID}
        AND user_id = ${req.params.userID}
        RETURNING *;
    `;

        if (result.length === 0) {
            return res.status(404).json({
                message: "Meal not found"
            });
        }
        res.status(200).json({
            message: "Meal deleted successfully"
        });
    } catch (e) {
        console.log(e);

        res.status(500).json({
            message: "Server error"
        });
    }
});


router.put("/:userID/:mealID", async (req, res) => {
    try {
        const { amount } = req.body;
        const result = await sql`
      UPDATE meals
      SET amount = ${amount}
      WHERE id = ${req.params.mealID}
      AND user_id = ${req.params.userID}
      RETURNING *;
    `;
        if (result.length === 0) {
            return res.status(404).json({
                message: "Meal not found"
            });
        }
        res.status(200).json(result[0]);
    } catch (e) {
        console.log(e);

        res.status(500).json({
            message: "Server error"
        });
    }
});


router.post("/:userID", async (req, res) => {
    try {
        const { food_id, amount } = req.body;

        const result = await sql`
            INSERT INTO meals
            (user_id, food_id, amount)
            VALUES
            (${req.params.userID}, ${food_id}, ${amount})
            RETURNING id;
        `;

        const meal = await sql`
            SELECT 
                meals.id,
                meals.amount,
                meals.created_at,
                foods.name,
                foods.category,
                foods.image_url,
                foods.calories,
                foods.protein,
                foods.carbs,
                foods.fat
            FROM meals
            JOIN foods
            ON meals.food_id = foods.id
            WHERE meals.id = ${result[0].id};
        `;

        res.status(201).json(meal[0]);

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "server error" });
    }
});


router.put("/:userID/:mealID", async (req, res) => {
    try {

        const { amount } = req.body;


        const result = await sql`
      UPDATE meals
      SET amount = ${amount}
      WHERE id = ${req.params.mealID}
      AND user_id = ${req.params.userID}
      RETURNING *;
    `;


        if (result.length === 0) {
            return res.status(404).json({
                message: "Meal not found"
            });
        }


        res.status(200).json(result[0]);


    } catch (e) {
        console.log(e);

        res.status(500).json({
            message: "Server error"
        });
    }
});


router.post("/:userID", async (req, res) => {
    try {
        const { food_id, amount } = req.body;


        const result = await sql`INSERT INTO meals
            (user_id, food_id, amount)

            VALUES
            (${req.params.userID},
            ${food_id},
            ${amount})

            RETURNING *;`;

        res.send(result[0])
    } catch (e) {
        console.log(e);
    }
})


export default router