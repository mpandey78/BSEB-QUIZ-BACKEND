const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const questionRoute = require("./routes/question")
const cors = require("cors");
  

dotenv.config();

mongoose
  .connect(process.env.mongo)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((errors) => {
    console.log(errors);
  });

app.use(cors());
app.use(express.json());
app.get('/',(req,res) =>{
  res.send("good job Pandey")
})
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api",questionRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});