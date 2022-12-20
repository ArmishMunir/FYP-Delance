require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const signupModel = require('./models/signup')
const cors = require("cors");
const app = express();
const userRoutes = require("./Routes/signup");
const authRoutes = require("./Routes/auth");
const projectRoutes = require("./Routes/projectAPI");
const bidRoutes = require("./Routes/bidApi");
const chatRoutes = require("./Routes/chat");
const multer = require("multer");

app.use(express.json());
app.use(cors());

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../files");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({storage: fileStorageEngine});

const DB =
  "mongodb://armishbro:its1600244@cluster0-shard-00-00.oe6wa.mongodb.net:27017,cluster0-shard-00-01.oe6wa.mongodb.net:27017,cluster0-shard-00-02.oe6wa.mongodb.net:27017/?ssl=true&replicaSet=atlas-9vadre-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((result) => {
    console.log("Connected to database. 😸");
  })
  .catch((err) => console.log(err));

// routes
app.use("/api/signup", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/bid", bidRoutes);
app.use("/api/chat", chatRoutes);

app.post("/uploadFile", upload.array('images', 3),(req,res) => {
    res.send('file uploaded successfully!');
})

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port} ..👂`);
});
