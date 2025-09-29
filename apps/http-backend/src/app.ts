import express from "express";

const app: express.Application = express();

app.get("/", (req, res) => {
    res.send("Hello from HTTP server")
})

export default app;
