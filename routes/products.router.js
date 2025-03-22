import { Router } from 'express';
import {
  getAllProducts,
  getProductDetail
} from '../controllers/products.controller.js';

const router = Router();

router.get('/', getAllProducts);

router.get('/:pid', getProductDetail);

export default router;
