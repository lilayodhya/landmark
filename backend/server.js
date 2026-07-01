import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import propertyRoutes from "./routes/propertyRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import popupRoutes from "./routes/popupRoutes.js";
import sellRoutes from "./routes/sellRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import scheduledVisitRoutes from "./routes/scheduledVisitRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("🚀 Landmark Backend Running");
});

// API Routes
app.use("/auth", authRoutes);

app.use("/properties", propertyRoutes);
app.use("/blog", blogRoutes);

app.use("/contact-us", contactRoutes);
app.use("/pop-up", popupRoutes);
app.use("/sell", sellRoutes);
app.use("/enquiry", enquiryRoutes);
app.use("/scheduled-visits", scheduledVisitRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});