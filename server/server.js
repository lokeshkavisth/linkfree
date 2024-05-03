const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const router = require("./src/routes/routes");
const connectToDatabase = require("./src/config/connectToDatabase");

dotenv.config();
const app = express();

// middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cookieParser());
app.use("/", router);

// Start server
const port = process.env.PORT || 8001;

app.listen(port, async () => {
  console.log(`Server started on port http://localhost:${port}`);
  await connectToDatabase();
});
