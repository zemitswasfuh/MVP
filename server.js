import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const server = express();

const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

server.use(express.static("public"));
server.use(express.json());

server.get("/api/todo", (_, res) => {
    db.query("SELECT * FROM todo ORDER BY priorirty ASC").then((data) => {
        res.json(data.rows);
    });
});

server.post("/api/todo", (req, res) => {
    console.log("request.body" + req.body)
    const { task, priorirty } = req.body;
    const newTask = { task, priorirty };
    // console.log(newTask);
    if (!task || !priorirty) {
        res.sendStatus(404);
        return;
    }
    db.query("INSERT INTO todo (task, priorirty) VALUES ($1, $2) RETURNING *", [task, 
        priorirty]).then((result) => {
        // res.type('json');
        res.status(201).send(result.rows);
    });
});

server.delete("/api/todo/:id", (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        res.sendStatus(404);
        return;
    }
    db.query("DELETE FROM todo WHERE id = $1 RETURNING *", [id]).then((result) => {
        if (result.rows.length === 0) {
            res.sendStatus(404);
        } else {
            res.send(result.rows[0]);
        }
    });
});

server.listen(4000, () => {
    console.log(`listening to port ${4000}`)
}); 