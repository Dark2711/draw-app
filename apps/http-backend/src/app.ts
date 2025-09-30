import express from "express";
import mainRouter from "./routes/main.router";

const app: express.Application = express();

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello from HTTP server")
})

app.use('/api/v1', mainRouter)


export default app;
