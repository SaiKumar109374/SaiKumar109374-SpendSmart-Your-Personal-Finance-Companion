const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
readdirSync("./routes").forEach((route) => {
  if (route.endsWith(".js")) {
    const routePath = `./routes/${route}`;
    app.use("/api/v1", require(routePath));
  }
});

app.use("/api/auth", require("./routes/authRoutes"));

// Error handling middleware
app.use(errorHandler);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
  });
};

server();
