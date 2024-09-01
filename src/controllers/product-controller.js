const mongoose = require("mongoose");
const {
  getAllProducts_manager,
  getOneProduct_manager,
  createProduct_manager,
  deleteOneProduct_manager,
  updateOneProduct_manager,
} = require("../managers/product-manager.js");

const getAllProducts_controller = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? {price: sort == 'asc' ? 1 : -1} : {}, // ordena por precio acendente
      lean: true, // para devolver objetos planos.
    };

    const filter = query ? {category: query } : {};

    const products = await getAllProducts_manager(filter, options);
    const productsData = await JSON.parse(JSON.stringify(products));
    
    return res.status(200).render("products", {
      pageTitle: "Lista de Productos",
      status: 'success',
      productsData: products.docs,// payload
      currentPage: products.page,
      totalPages: products.totalPages,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      prevLink: products.hasPrevPage ? `/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}` : null,
      nextLink: products.hasNextPage ? `/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}` : null,
    });

  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getOneProduct_controller = async (req, res) => {
  try {
    const productFound = await getOneProduct_manager(req.params.pid);
    if (productFound) {
      const plainProduct = JSON.parse(JSON.stringify(productFound));
      res.status(200)
      .render("idProduct",{pageTitle:"producto Seleccionado",plainProduct});
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener un producto" }, error.message);
  }
};

const createProduct_controller = async (req, res) => {
  try {
    const prodBody = req.body;

    // verifico los tipos de cada uno de los elementos:
    if (
      typeof prodBody.title !== "string" ||
      prodBody.title == null ||
      prodBody.title === "" ||
      prodBody.title == undefined
    ) {
      return res.status(400).json({ error: "Title no válida o inexistente" });
    }

    if (
      typeof prodBody.description !== "string" ||
      prodBody.description == null ||
      prodBody.description === "" ||
      prodBody.description == undefined
    ) {
      return res
        .status(400)
        .json({ error: "Descrición no válida o inexistente" });
    }

    if (
      typeof prodBody.code !== "string" ||
      prodBody.code == null ||
      prodBody.code === "" ||
      prodBody.code == undefined
    ) {
      return res.status(400).json({ error: "Code no válida o inexistente" });
    }

    if (
      typeof prodBody.price !== "number" ||
      prodBody.price == null ||
      prodBody.price === "" ||
      prodBody.price == undefined
    ) {
      return res.status(400).json({ error: "Price no válida o inexistente" });
    }

    if (
      typeof prodBody.stock !== "number" ||
      prodBody.stock == null ||
      prodBody.stock === "" ||
      prodBody.stock == undefined
    ) {
      return res.status(400).json({ error: "Stock no válida o inexistente" });
    }

    if (
      typeof prodBody.category !== "string" ||
      prodBody.category == null ||
      prodBody.category === "" ||
      prodBody.category == undefined
    ) {
      return res
        .status(400)
        .json({ error: "Category no válida o inexistente" });
    }

    const savedProduct = await createProduct_manager(prodBody);
    return res.status(201).json(savedProduct);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear el producto" });
  }
};

const updateOneProduct_controller = async (req, res) => {
  try {
    const prodBody = req.body;
    const product = await updateOneProduct_manager(req.params.pid, prodBody);
    if (product) {
      return res
        .status(200)
        .json({ message: "producto actualizado exitosamente" });
    } else {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener un productos" });
  }
};

const deleteOneProduct_controller = async (req, res) => {
  try {
    const product = await deleteOneProduct_manager(req.params.pid);
    if (product) {
      res.status(200).json({ message: "Producto Eliminado" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener un productos" });
  }
};

module.exports = {
  getAllProducts_controller,
  getOneProduct_controller,
  createProduct_controller,
  updateOneProduct_controller,
  deleteOneProduct_controller
};
