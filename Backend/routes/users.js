import { Router } from "express";
import sql from "../database.js";

const router = Router();



router.get("/:id/weights", async (req, res) => {
    try {

        const weights = await sql`Select * FROM weight_logs
        WHERE user_id = ${req.params.id}
        ORDER BY created_at ASC;`

        if (weights.length === 0) {
            return res.status(404).send("weights weren't found for given ID")
        }

        res.status(200).send(weights)
    } catch (e) {
        console.log(e);
    }
})

router.put("/:userID/password", async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await sql`
            SELECT *
            FROM users
            WHERE id = ${req.params.userID}
        `;
        if (user.length === 0) {
            return res.status(404).send("User not found");
        }
        if (user[0].password !== currentPassword) {
            return res.status(400).send("Current password is incorrect");
        }
        const updatedUser = await sql`
            UPDATE users
            SET password = ${newPassword}
            WHERE id = ${req.params.userID}
            RETURNING *;
        `;
        res.status(200).send(updatedUser[0]);
    } catch(e) {
        console.log(e);
        res.status(500).send("Server error");
    }
});

router.put("/:userID", async (req,res)=>{
    try{
        const {
            name,
            username,
            email
        } = req.body;
        const updatedUser = await sql`
            UPDATE users
            SET
            name = ${name},
            username = ${username},
            email = ${email}
            WHERE id = ${req.params.userID}
            RETURNING *;
        `;
        if(updatedUser.length === 0){
            return res.status(404).send("User not found");
        }
        res.status(200).send(updatedUser[0]);
    }catch(e){
        console.log(e);

        res.status(500).send("Server error");
    }
})

router.get(`/:username`, async (req, res) => {

    try {
        const username = req.params.username

        const user = await sql`SELECT * FROM users
        WHERE username = ${username}`

        if (user.length === 0) {
            return res.status(404).send('User wasnt found')
        }

        res.status(200).send(user[0])

    } catch (e) {
        console.log(e);
    }
})

export default router