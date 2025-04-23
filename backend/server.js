const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the Node.js backend!" });
});

// app.post("/api/data", (req, res) => {
//   const receivedData = req.body;
//   console.log("Received data:", receivedData);
//   res.json({ message: "Data received successfully!", data: receivedData });
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
