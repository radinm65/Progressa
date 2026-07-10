import { Router } from "express";
import sql from "../database.js";

const router = Router();


router.post("/login", async (req, res) => {

    const { username, password } = req.body;

    try {

        const user = await sql`
        SELECT id, username, email
        FROM users
        WHERE username = ${username}
        AND password = ${password}
        `;


        if (user.length === 0) {
            return res.status(401).send({
                message: "api & database: Invalid username or password"
            });
        }

        res.status(200).send(user[0]);

    } catch (e) {
        console.log(e);
    }


});


router.post("/signup", async (req, res) => {
    try {

        const { name, username, email, password, height, weight, age, goal } = req.body;

        const user = await sql`
        INSERT INTO users (name, username, email, password, height, weight, age, goal)
        VALUES (${name}, ${username}, ${email}, ${password} , ${height}, ${weight} ,${age}, ${goal})
        RETURNING id, name, username, email;
    `;

        res.status(201).json(user[0]);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Server error"
        });
    }
});


export default router;