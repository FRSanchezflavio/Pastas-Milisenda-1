import Product from '../models/product.model.js';

export const getProducts = async ({ limit, page, sort, query }) => {
  let filter = {};
  if (query) {
    filter = { category: { $regex: query, $options: 'i' } };
  }

  const options = {
    limit:  limit || 10,
    page:   page  || 1,
    sort:   {}
  };

  if (sort === 'asc')  options.sort = { price: 1 };
  if (sort === 'desc') options.sort = { price: -1 };

  const result = await Product.paginate(filter, options);
  return result;
};

export const getProductById = async (id) => {
  return Product.findById(id);
};
