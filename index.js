var express = require("express");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");
var app = express();

const upload = multer({ dest: "./public/data/uploads/" });

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const fileDetailsToShow = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };
  res.json(fileDetailsToShow);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
