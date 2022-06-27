import express from "express";
import morgan from "morgan";
import verifyToken from "./helpers/validate-token";
// Imports for Routes
import authRoutes from "./routes/auth.routes";
import paystatsRoutes from "./routes/paystats.routes";
import postalCodesRoutes from "./routes/postal_codes.routes";

const app = express();

// Settings
app.set("port", process.env.APP_PORT);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/paystats", verifyToken, paystatsRoutes);
app.use("/api/postal_codes", verifyToken, postalCodesRoutes);

export default app;