import { Router } from "express";
import sql from "../database.js";

const router = Router();

router.post("/:userID", async (req, res) => {
    try {
        const { weight } = req.body;

        const addWeight = await sql`
            INSERT INTO weight_logs
            (
                user_id,
                weight
            )
            VALUES
            (
                ${req.params.userID},
                ${weight}
            )
            RETURNING *;
        `;

        res.status(201).send(addWeight[0]);

    } catch (e) {
        console.log(e);

        res.status(500).send("Server error");
    }
});

export default router