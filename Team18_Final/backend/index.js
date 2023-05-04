/*
 * @author Kenneth Schueman & Nick Kokott
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Product = require("./dataSchema.js");

app.use(express.json());
app.use(cors());

app.use(express.static("public"));
app.use("/images", express.static("images"));

mongoose.connect("mongodb://127.0.0.1:27017/reactdata", {
  dbName: "reactdata",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const port = process.env.PORT || 4000;
const host = "localhost";

app.listen(port, () => {
  console.log(`App listening at http://%s:%s`, host, port);
});

app.get("/", async (req, resp) => {
  const query = {};
  const allProducts = await Product.find(query);
  console.log(allProducts);
  resp.send(allProducts);
});

app.post("/insert", async (req, res) => {
  console.log(req.body);
  const p_id = req.body._id;
  const pproductName = req.body.productName;
  const psize = req.body.size;
  const pdeveloper = req.body.developer;
  const pgameType = req.body.gameType;
  const pdescription = req.body.description;
  const pprice = req.body.price;
  const preleaseDate = req.body.releaseDate;
  const purl = req.body.url;
  const prate = req.body.rating.rate;
  const pcount = req.body.rating.count;

  const formData = new Product({
    _id: p_id,
    productName: pproductName,
    size: psize,
    developer: pdeveloper,
    gameType: pgameType,
    description: pdescription,
    price: pprice,
    releaseDate: preleaseDate,
    url: purl,
    rating: "",
    rating: { rate: prate, count: pcount },
  });

  try {
    // await formData.save();
    await Product.create(formData);
    const messageResponse = { message: `Product ${p_id} added correctly` };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while adding a new product:" + err);
  }
});

//Sometimes crashes the nodemon
app.get("/:id", async (req, resp) => {
  const id = req.params.id;
  const query = { _id: id };
  const oneProduct = await Product.findOne(query);
  console.log(oneProduct);
  resp.send(oneProduct);
});

app.delete("/delete", async (req, res) => {
  console.log("Delete :", req.body);
  try {
    const query = { _id: req.body._id };
    await Product.deleteOne(query);
    const messageResponse = {
      message: `Product ${req.body._id} deleted correctly`,
    };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while deleting :" + p_id + " " + err);
  }
});
