const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const path = require("path");
const exphbs = require("express-handlebars");
const { createServer } = require("http");
const { Server } = require("socket.io");
const routes = require("./routes/index.js");
const methodOverride = require("method-override");
const {
  createProduct_manager,
  deleteOneProduct_manager,
  getAllProductsRealTime_manager
} = require("./managers/product-manager.js");

/*----------------------------------------------------------------------- */
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MONGO connected");
  })
  .catch((error) => {
    console.error(error);
  });

/*---- handlebars ------------------------------------------------------------------- */
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

/*----------------------------------------------------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

/*----------------------------------------------------------------------- */
app.use(methodOverride("_method"));


/*---- socket conexión ----------------------------------------------------------------- */
io.on("connection", async (socket) => {
  console.log("Un cliente se ha conectado");
  
  const updatedProducts = async ()=>{
    const socketProducts = await getAllProductsRealTime_manager();
    socket.emit("allProducts", socketProducts);
  }

  updatedProducts();

  socket.on("nuevoProducto", async (data) => {
     await createProduct_manager(data);
     updatedProducts();
  });

  socket.on("deleteProduct", async (data) => { 
    await deleteOneProduct_manager(data);
    updatedProducts();
  });
});

/*----------------------------------------------------------------------- */
app.use("/", routes);

/*----------------------------------------------------------------------- */
module.exports = { httpServer };