import express from "express";
import cors from "cors";
import Database from "./db/db.js";
import userRoutes from "./routes/userRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import listRoutes from "./routes/listRoutes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin:
      "https://task-management-hkbm9ndrs-sarthak-vats01s-projects.vercel.app", // Replace this with your Vercel app's domain
  })
);

const port = 5000;

Database();

app.use("/user", userRoutes);
app.use("/board", boardRoutes);
app.use("/list", listRoutes);

app.listen(port, () => {
  console.log(`Listening to port - ${port}`);
});
