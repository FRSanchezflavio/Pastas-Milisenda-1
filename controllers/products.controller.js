import { getProducts, getProductById } from '../dao/product.dao.js';

export const getAllProducts = async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;

    const result = await getProducts({
      limit: parseInt(limit),
      page: parseInt(page),
      sort,
      query
    });

    res.json({
      status:  'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage:  result.prevPage,
      nextPage:  result.nextPage,
      page:      result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink:  result.hasPrevPage ? `/products?page=${result.prevPage}` : null,
      nextLink:  result.hasNextPage ? `/products?page=${result.nextPage}` : null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};

export const getProductDetail = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await getProductById(pid);
    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    
    res.render('productDetail', { product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};
