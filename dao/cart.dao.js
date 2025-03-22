import Cart from '../models/cart.model.js';

export const getCartById = async (cid) => {
  return await Cart.findById(cid).populate('products.product');
};

export const createCart = async () => {
  const newCart = await Cart.create({ products: [] });
  return newCart;
};

export const updateCart = async (cid, productsArray) => {
  return await Cart.findByIdAndUpdate(
    cid,
    { products: productsArray },
    { new: true }
  );
};

export const clearCart = async (cid) => {
  return await Cart.findByIdAndUpdate(
    cid,
    { products: [] },
    { new: true }
  );
};

export const deleteProductFromCart = async (cid, pid) => {
  const cart = await Cart.findById(cid);
  if (!cart) return null;

  cart.products = cart.products.filter(
    (item) => item.product.toString() !== pid
  );
  await cart.save();
  return cart;
};

export const updateProductQuantity = async (cid, pid, quantity) => {
  const cart = await Cart.findById(cid);
  if (!cart) return null;

  const productInCart = cart.products.find(
    (item) => item.product.toString() === pid
  );
  if (!productInCart) {
    // Podrías opcionalmente crearlo si no existe
    cart.products.push({ product: pid, quantity });
  } else {
    productInCart.quantity = quantity;
  }

  await cart.save();
  return cart;
};
