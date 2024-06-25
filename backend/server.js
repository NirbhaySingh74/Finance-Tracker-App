import express from "express";

const app = express();

app.listen(5000, () => {
  console.log("server is runnning on port 5000");
});

app.get("/", (req, res) => {
  res.json({ Name: "Nirbhay singh" });
});
