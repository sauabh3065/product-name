const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("./modules/db_connection");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product")
const adminRouter = require("./routes/adminRoutes")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/product",productRouter);
app.use("/admin",adminRouter)
app.listen(3001, (err) => {
  if (err) console.log(err);
  else console.log("3001 calling");
});
