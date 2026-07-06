import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

// Disable ETags — prevents 304 responses that break React Query refetches
app.set("etag", false);

app.use(helmet());

app.use(cors({
  // CLIENT_URL can be comma-separated list of allowed origins
  origin: (origin, callback) => {
    const allowed = (process.env.CLIENT_URL || "")
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean);

    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  credentials: true,
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// No-cache headers on all API routes
app.use("/api", (_req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.get("/", (_req, res) => {
  res.json({ success: true, message: "Portfolio CMS API Running 🚀" });
});

app.use("/api/v1", routes);
app.use(errorMiddleware);

export default app;
