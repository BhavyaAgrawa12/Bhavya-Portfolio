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

// Disable Express's built-in ETag generation for all responses.
// ETags cause browsers to cache JSON API responses and return 304,
// which breaks React Query's refetch after mutations.
app.set("etag", false);

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

// Disable ETags on all API routes so browsers never return 304 for JSON responses.
// Without this, PATCH /portfolio updates the DB but GET /portfolio returns 304
// (Not Modified) and the frontend never sees the new profileImageId.
app.use("/api", (req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  res.removeHeader("ETag");
  next();
});

// Static uploads — must set Cross-Origin-Resource-Policy: cross-origin so
// the frontend (localhost:5173) can load images served from localhost:5000.
// Helmet's default of "same-origin" blocks cross-origin <img> loads.
app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
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