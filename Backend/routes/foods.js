import { Router } from "express";
import sql from "../database.js";

const router = Router();

router.get("/:userID", async (req, res) => {
    try {
        const getFoods = await sql`SELECT * FROM foods`
        if (getFoods.length === 0) {
            return res.status(404).send("Foods for this user weren't found")
        }

        res.status(200).send(getFoods)
    } catch (e) {
        console.log(e);
    }
})


router.put("/:userID/:foodID", async (req, res) => {
    try {
        const { amount, calories, protein, carbs, fat } = req.body;

        const result = await sql`
      UPDATE foods
      SET 
        amount = ${amount},
        calories = ${calories},
        protein = ${protein},
        carbs = ${carbs},
        fat = ${fat}
      WHERE id = ${req.params.foodID}
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

export default router