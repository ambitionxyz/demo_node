const { Pool, Client } = require("pg");

const bodyParser = require("body-parser");

const personRouter = require("./routers/persionRouter.js");

const express = require("express");
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  //chap nhan client tu nhieu nguon
  res.setHeader("Access-Control-Allow-Origin", "*");
  //cho phep client cos the su dung nhieu method
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATH, DELETE");
  //cho phep client dat ra yeu cau cua uy quyen authentication
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//conect db
app.use((req, res, next) => {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "123123",
    database: "NewDB",
  });
  client.connect();
  console.log("CONNECTED");
  req.client = client;
  next();
});

app.use("/", personRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
