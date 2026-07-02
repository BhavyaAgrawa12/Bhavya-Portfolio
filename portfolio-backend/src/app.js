import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import routes from "./routes/index.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({
  extended: true,
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio CMS API Running 🚀",
  });
});


app.use("/api/v1", routes);

app.use(errorMiddleware);

export default app;