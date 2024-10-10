import { Router } from 'express';
import { body, check, oneOf } from 'express-validator'
import { handleInputError } from './modules/middleware';

const router = Router();

/**
 * Product
 */
router.get('/product', (req, res) => {
  res.json({msg : 'hello'})
});
router.get('/product/:id', () => {});
router.put('/product/:id', body('name').isString, handleInputError ,(req, res) => {
});

router.post('/product', body('name').isString, handleInputError, (req,res) => {

});
router.delete('/product/:id', () => {});


/**
 * Update
 */
router.get('/update', () => {});
router.get('/update/:id', () => {});
router.put('/update/:id', 
  body('title').optional(),
  body('body').optional(), 
  oneOf([
    check('status').equals('IN_PROGRESS'), 
    check('status').equals('SHIPPED'), 
    check('status').equals('DEPRECATED')
  ]),
  body('version').optional(),
  body('version').optional(),
  () => {

  }
);

router.post('/update', 
  body('title').exists().optional(),
  body('body').exists().optional(), 

  () => {});
router.delete('/update/:id', () => {});


/**
 * Update Point 
  */

router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put('/updatepoint/:id', 
  body('name').optional().isString, 
  body('description').optional().isString,
  () => {

  } );

router.post('/updatepoint',

  body('name').exists().isString,
  body('description').exists().isString,
  body('updateId').exists().isNumeric,

   () => {});
router.delete('/updatepoint/:id', () => {});


export default router;