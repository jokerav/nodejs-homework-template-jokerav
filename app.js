const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();
global.basedir = __dirname;
const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contactsRoute");

const PUBLIC_DIR = path.normalize(`./public/avatars`);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/users", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/avatars", express.static(PUBLIC_DIR));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
