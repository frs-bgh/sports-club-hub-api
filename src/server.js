const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

const membersRoutes = require("./routes/members.routes");
const newsRoutes = require("./routes/news.routes");
const { errorMiddleware } = require("./middelware/error");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// docs html at root
app.use(express.static(path.join(__dirname, "..", "public")));

// api routes
app.use("/api/members", membersRoutes);
app.use("/api/news", newsRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use(errorMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`api running on http://localhost:${port}`));