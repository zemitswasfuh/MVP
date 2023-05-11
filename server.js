import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const server = express();

const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});
 
server.use(express.static("public"));

server.get("/api/todo", (_, res) => {
    db.query("SELECT * FROM todo").then((data) => {
        res.json(data.rows);
    });
});

server.listen(4000, () => {
    console.log(`listening to port ${4000}`)
}); 