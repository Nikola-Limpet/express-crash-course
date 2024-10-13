import { Router } from 'express';
import { body, check, oneOf } from 'express-validator';
import { handleInputError } from './modules/middleware';
import { createProduct, getProducts, getOneProduct, updateProduct, deleteProduct } from './handlers/product';

const router = Router();

/**
 * Product
 */
router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put('/product/:id', 
  body('name').isString(), 
  handleInputError, 
  updateProduct
);
router.post('/product', 
  body('name').isString(), 
  handleInputError, 
  createProduct
);
router.delete('/product/:id', deleteProduct);

/**
 * Update
 */
router.get('/update', (req, res) => {
  res.send('Update endpoint');
});
router.get('/update/:id', (req, res) => {
  const id = req.params.id;
  res.send(`Update endpoint for ID: ${id}`);
});
router.put('/update/:id', 
  body('title').optional(),
  body('body').optional(), 
  oneOf([
    check('status').equals('IN_PROGRESS'), 
    check('status').equals('SHIPPED'), 
    check('status').equals('DEPRECATED')
  ]),
  body('version').optional(),
  handleInputError,
  (req, res) => {
    // Perform the update logic here
    res.send(`Updated item with ID: ${req.params.id}`);
  }
);
router.post('/update', 
  body('title').exists().optional(),
  body('body').exists().optional(), 
  handleInputError,
  (req, res) => {
    // Perform the create logic here
    res.send('Created update');
  }
);
router.delete('/update/:id', (req, res) => {
  // Perform the delete logic here
  res.send(`Deleted update with ID: ${req.params.id}`);
});

/**
 * Update Point 
 */
router.get('/updatepoint', (req, res) => {
  res.send('Update Point endpoint');
});
router.get('/updatepoint/:id', (req, res) => {
  const id = req.params.id;
  res.send(`Update Point endpoint for ID: ${id}`);
});
router.put('/updatepoint/:id', 
  body('name').optional().isString(), 
  body('description').optional().isString(),
  handleInputError,
  (req, res) => {
    // Perform the update logic here
    res.send(`Updated update point with ID: ${req.params.id}`);
  }
);
router.post('/updatepoint',
  body('name').exists().isString(),
  body('description').exists().isString(),
  body('updateId').exists().isNumeric(),
  handleInputError,
  (req, res) => {
    // Perform the create logic here
    res.send('Created update point');
  }
);
router.delete('/updatepoint/:id', (req, res) => {
  // Perform the delete logic here
  res.send(`Deleted update point with ID: ${req.params.id}`);
});

export default router;