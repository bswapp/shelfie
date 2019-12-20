require("dotenv").config();
const express = require("express"),
  controller = require("./controller"),
  massive = require("massive"),
  { SERVER_PORT, CONNECTION_STRING } = process.env,
  app = express();

app.use(express.json());

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("database connected");
  })
  .catch(err => console.log(err));

// * ENDPOINTS * //
app.get("/api/inventory", controller.getProducts);
app.get("/api/product/:id", controller.getProduct);
app.post("/api/product", controller.addProduct);
app.delete("/api/product/:id", controller.deleteProduct);
app.put("/api/product/:id", controller.editProduct);

app.listen(SERVER_PORT, () =>
  console.log(`welcome to the ${SERVER_PORT} party`)
);
