import { Router } from "express";
import sql from "../database.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const getFoods = await sql`SELECT * FROM foods`
        if (getFoods.length === 0) {
            return res.status(404).send("Foods weren't found")
        }

        res.status(200).send(getFoods)
    } catch (e) {
        console.log(e);
    }
})


router.put("/:foodID", async (req, res) => {
    try {
        const { name, category, calories, protein, carbs, fat } = req.body;

        const result = await sql`
        UPDATE foods
        SET
        name = ${name},
        category = ${category},
        calories = ${calories},
        protein = ${protein},
        carbs = ${carbs},
        fat = ${fat}
        WHERE id = ${req.params.foodID}
        RETURNING *;
        `;
        if (result.length === 0) {
            return res.status(404).json({
                message: "Food not found"
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

router.post("/addFood", async (req, res) => {
    try {
        const {
            name,
            category,
            calories,
            protein,
            carbs,
            fat
        } = req.body;

        const result = await sql`
      INSERT INTO foods
      (
        name,
        category,
        calories,
        protein,
        carbs,
        fat
      )
      VALUES
      (
        ${name},
        ${category},
        ${calories},
        ${protein},
        ${carbs},
        ${fat}
      )
      RETURNING *;
    `;
        res.status(201).json(result[0]);
    } catch (e) {
        console.log(e);
        res.status(500).send("Server error");
    }
});

router.delete("/:foodID", async (req, res) => {
    try {
        const result = await sql`
        DELETE FROM foods
        WHERE id = ${req.params.foodID}
        RETURNING *;
        `

        if (result.length === 0) {
            return res.status(404).send("Food not found");
        }
        res.status(200).send("Food deleted successfully");
    } catch (e) {
        console.log(e);
        res.status(500).send("Server error");
    }
})


export default router