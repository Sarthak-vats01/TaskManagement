import express from "express";
import cors from "cors";
import Database from "./db/db.js";
import userRoutes from "./routes/userRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import listRoutes from "./routes/listRoutes.js";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: [
    "https://taskmanagement-1-yi4t.onrender.com",
    "https://task-management-hkbm9ndrs-sarthak-vats01s-projects.vercel.app",
    "http://localhost:3000",
  ],
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

const port = 5000;

Database();

app.use("/user", userRoutes);
app.use("/board", boardRoutes);
app.use("/list", listRoutes);

app.listen(port, () => {
  console.log(`Listening to port - ${port}`);
});
