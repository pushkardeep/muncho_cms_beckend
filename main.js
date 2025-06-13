import express from "express";
const app = express();

// Routers 
import templateRouter from "./routes/template.route.js";

// Middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/template", templateRouter);

export default app;