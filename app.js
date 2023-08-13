const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const exp = require("constants");
const app = express();
const Photo = require("./models/Photo");
const methodOverride = require("method-override");
const photoController = require("./controllers/photoControllers");
const pageControllers = require("./controllers/pageControllers");

//Connect DB
mongoose.connect("mongodb+srv://<yourUsername>:<yourPassword>@cluster0.cb7q4q3.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then( () => {
  console.log("DB Connected")
}).catch((err) => {
  console.log(err)
});

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//ROUTES
app.get("/", photoController.getAllPhotos);
app.get("/photos/:id", photoController.getPhoto);
app.post("/photos", photoController.createPhoto);
app.put("/photos/:id", photoController.updatePhoto);
app.delete("/photos/:id", photoController.deletePhoto);

app.get("/about", pageControllers.getAboutPage);
app.get("/add", pageControllers.getAddPage);
app.get('/photos/edit/:id', pageControllers.getEditPage);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`${port} has been started`);
});
