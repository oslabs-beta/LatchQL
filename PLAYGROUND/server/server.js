const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 5555;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.use(express.static(path.resolve(__dirname, "../client")));

//Error handling
app.use((req, res) => res.status(404).send("You are in the wrong place :O"));
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unkown middleware error",
    status: 500,
    message: { err: "An error occured" },
  };
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
