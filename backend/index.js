const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    // credentials: true,
  })
);

app.use("/api", require("./apiRoutes"));

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      return console.log(`Server is listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
