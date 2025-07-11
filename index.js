const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const emotionRoute = require('./routes/emotion'); // <-- External router

dotenv.config();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY || "test-key";

// Middleware: API key protection (for /api only, not docs/home)
app.use("/api", (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${API_KEY}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

// ✅ Route mounted here (emotion.js defines /emotion)
app.use("/api", emotionRoute);

// ✅ v1 Emotion Simulation (kept for compatibility)
app.post("/api/v1/emotion", (req, res) => {
  const { text, persona, context, tone } = req.body;
  return res.json({
    emotion: "sadness",
    intensity: 0.85,
    secondary: ["anxiety", "hopelessness"],
  });
});

// ✅ v1 Decision Engine
app.post("/api/v1/decision", (req, res) => {
  const { scenario, persona } = req.body;
  return res.json({
    decision: "turn in to local authorities",
    confidence: 0.92,
  });
});

// ✅ v1 Human-in-the-Loop
app.post("/api/v1/hitl", (req, res) => {
  const { query, urgency, source } = req.body;
  return res.json({
    routed: true,
    eta: "1 minute",
    human_id: "a37e7d9c",
  });
});

// ✅ Swagger Docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Home
app.get("/", (req, res) => {
  res.send("AffectOS Human API is running.");
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
