const Product = require("../models/product-model.js");

const getAllProducts_manager = async (filter, options) => {
  try {
    const products = await Product.paginate(filter, options);
    console.log('products: ', products)
    return products;
  } catch (error) {
    throw new Error("Error al obtener los productos con paginación");
  }
};

const getOneProduct_manager = async (id) => {
  try {
    return await Product.findById(id);
  } catch (error) {
    throw new Error("Error al obtener el producto");
  }
};

const createProduct_manager = async (data) => {
  try {
    const product = new Product(data);
    return await product.save();
  } catch (error) {
    throw new Error("Error al crear el producto");
  }
};

const updateOneProduct_manager = async (id) => {
  try {
    return await Product.updateOneProduct(id);
  } catch (error) {
    throw new Error("Error al actualizar el producto");
  }
};

const deleteOneProduct_manager = async (id) => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error al eliminar el producto");
  }
};

const getAllProductsRealTime_manager = async () => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(3);
    return products;
  } catch (error) {
    throw new Error("Error al obtener los productos con paginación");
  }
};

module.exports = {
  getAllProducts_manager,
  getOneProduct_manager,
  createProduct_manager,
  updateOneProduct_manager,
  deleteOneProduct_manager,
  getAllProductsRealTime_manager
};