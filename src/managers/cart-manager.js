const Cart = require("../models/cart-model.js");

const getAllCarts_manager = async () => {
  const carts = await Cart.find().populate("products.product").sort({status : -1});
  if (!carts) {
    return [{}];
  }
  // .explain('executionStats');
  return carts;
};

const getOneCart_manager = async (id) => {
  return await Cart.findById(id).populate("products.product");
};

const addProdToCart_manager = async (pid) => {
  // Buscar un carrito con estado "open"
  try {
    let cart = await Cart.findOne({ status: "open" });
    // Si no existe un carrito "open", crear uno nuevo
    if (!cart) {
      cart = new Cart({ products: [], status: "open" });
    }

    // Verificar si el producto ya está en el carrito
    const productExists = cart.products.some(
      (item) => item.product.toString() === pid
    );

    // Agregar el producto al carrito
    if (!productExists) {
      cart.products.push({ product: pid });
    }

    // Guardar el carrito actualizado
    return await cart.save();
    // return cart;
  } catch (error) {
    throw new Error("Error al buscar o crear un carrito");
  }
};

const closeCart_manager = async (cid) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      cid,
      { status: "completed" },
      { new: true }
    );
    return cart;
  } catch (error) {
    throw new Error('Error al cerrar el carrito: ' + error.message);
  }
};

const createCart_manager = async (data) => {
  const cart = new Cart(data);
  return await cart.save();
};

const delProdToCart_manager = async (cid, pid) => {
  try {
    // Encuentra el carrito por su ID
    const cart = await Cart.findById(cid);

    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    // Filtra los productos para eliminar el que coincida con el ID del producto
    cart.products = cart.products.filter(
      (item) => item.product.toString() !== pid
    );

    // Guarda el carrito actualizado
    const updatedCart = await cart.save();

    return updatedCart;
  } catch (error) {
    throw new Error("Error al eliminar el producto del carrito");
  }
};

const emptyCart_manager = async (cid) => {
  return await Cart.findByIdAndUpdate(
    cid, // el id del documento que se actualiza
    { $set: { products: [] } }, // Vaciar el array de productos
    { new: true } //devuelve el documento actualizado en lugar del original
  );
};

const updateOneCart_manager = async (id) => {
  return await Cart.updateOneCart(id);
};

const deleteOneCart_manager = async (id) => {
  return await Cart.findByIdAndDelete(id);
};

module.exports = {
  getAllCarts_manager,
  getOneCart_manager,
  addProdToCart_manager,
  closeCart_manager,
  createCart_manager,
  delProdToCart_manager,
  emptyCart_manager,
  updateOneCart_manager,
  deleteOneCart_manager
};