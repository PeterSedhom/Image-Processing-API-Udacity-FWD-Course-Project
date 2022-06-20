import express from "express";
import imageRouter from "./routers/image";

const app = express();

app.use(express.json());
app.use(imageRouter);

export default app;
