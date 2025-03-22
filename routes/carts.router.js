import { Router } from 'express';
import {
  getCart,
  deleteProductFromCart,
  updateCartProducts,
  updateProductQuantity,
  clearCart
} from '../controllers/carts.controller.js';

const router = Router();


router.get('/:cid', getCart);

router.delete('/:cid/products/:pid', deleteProductFromCart);

router.put('/:cid', updateCartProducts);

router.put('/:cid/products/:pid', updateProductQuantity);

router.delete('/:cid', clearCart);

export default router;
