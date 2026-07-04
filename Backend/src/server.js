import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes.js";
import restaurantRoutes from "./routes/restaurant.routes.js";
import prisma from "./config/prisma.js";
import menuRoutes from "./routes/menu.routes.js";
import qrCodeRoutes from "./routes/qrcode.routes.js";
import verificationRoutes from "./routes/verification.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import locationRoutes from "./routes/location.routes.js";
import routes from "./routes/index.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
// app.use(cors({
//   origin: process.env.CORS_ORIGIN || '*',
//   credentials: true
// }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://menu-go-digital-menu.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/auth", authRoutes);
// app.use("/api/restaurants", restaurantRoutes);
// app.use("/api/menu", menuRoutes);
// app.use("/api/qrcodes", qrCodeRoutes);
// app.use("/api/verification", verificationRoutes);
// app.use("/api/feedbacks", feedbackRoutes);
// app.use("/api/analytics", analyticsRoutes);
// app.use("/api/settings", settingsRoutes);
// app.use("/api/locations", locationRoutes);

app.use("/api", routes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

app.get("/", (req, res) => {
  res.json({ 
    message: "MenuGo Digital Menu API",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      restaurants: "/api/restaurants"
    }
  });
});


app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: "Route not found" 
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Database disconnected');
  process.exit(0);
});

startServer();