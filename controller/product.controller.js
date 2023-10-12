const productModel = require("../model/product.model");

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body.product;
    const product = new productModel({ name, quantity });
    const newProduct = await product.save();
    res.status(201).json({ data: { product: newProduct } });
  } catch (error) {
    res.status(500).json({ error: "Product creation failed" });
  }
};

const getProductLists = async (req, res) => {
  try {
    const products = await productModel.find({}, "_id name quantity");

    const productList = products.map((product) => ({
      id: product._id,
      name: product.name,
      quantity: product.quantity,
    }));

    res.json({ data: { products: productList } });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the product list" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    // Find and remove the product by its ID
    const deletedProduct = await productModel.findByIdAndRemove(productId);
    if (deletedProduct) {
      res.json({ data: { message: "Product deleted" } });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the product" });
  }
};

const updateProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const { number } = req.query;

    if (!number) {
      return res
        .status(400)
        .json({ error: 'The "number" query parameter is required.' });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const newQuantity = parseInt(product.quantity) + parseInt(number);

    // Update the product's quantity
    product.quantity = newQuantity;
    const updatedProduct = await product.save();

    res.json({
      data: {
        product: {
          id: updatedProduct._id,
          name: updatedProduct.name,
          quantity: updatedProduct.quantity,
        },
        message: "Product quantity updated successfully",
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the product quantity" });
  }
};
module.exports = {
  createProduct,
  getProductLists,
  deleteProduct,
  updateProducts,
};
