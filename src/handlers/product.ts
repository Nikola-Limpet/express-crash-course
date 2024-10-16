import prisma from "../db";

// get all 
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id
    },
    include: {
      products: true
    }
  });

  res.json({ data: user.products });
};

// get one
export const getOneProduct = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.params.id,
      belongsToId: req.user.id
    }
  });
  res.json({ data: product });
};

// create a product
export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id
      }
    });

    res.json({ data: product });
  } catch (error) {
    next(error);
  }
};

// update a product
export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: req.params.id,
        belongsToId: req.user.id
      },
      data: {
        name: req.body.name
      }
    });
    res.json({ data: updatedProduct });
  } catch (error) {
    next(error);
  }
};

// delete a product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: req.params.id,
        belongsToId: req.user.id // this is to make sure that the user can only delete their own product
      }
    });
    res.status(200);
    res.json({ data: deletedProduct });
  } catch (error) {
    res.status(403);
    res.json({ error: 'error deleting product' });
  }
};