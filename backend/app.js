const express = require("express");
const db = require("./db/db");
const cors = require("cors");
const WebSocket = require("ws");

const authRoute = require("./routes/auth.route");

const port = 8800;
const app = express();
app.use(cors());
app.use(express.json());

require("./swagger-setup")(app);

app.get("/", (req, res) => {
  res.json("Backend working!");
});

app.get("/accounts", (req, res) => {
  const q = "SELECT * FROM account";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Middleware function to attach wss instance to the request object
app.use((req, res, next) => {
  req.wss = wss;
  next();
});

app.use("/", authRoute);

app.listen(port, () => {
  console.log("Connected! Listening on localhost port %d.", port);
});

const SOCKET_PORT = 8080;
const server = app.listen(SOCKET_PORT, () => {
  console.log(`WebSocket server is running on port ${SOCKET_PORT}.`);
});
const wss = new WebSocket.Server({ server });
wss.on("connection", (ws) => {
  console.log("Client connected.");
});
