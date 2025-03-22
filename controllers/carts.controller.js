import {
  getCartById,
  createCart,
  updateCart as updateCartDao,
  clearCart as clearCartDao,
  deleteProductFromCart as deleteProductFromCartDao,
  updateProductQuantity as updateProductQuantityDao
} from '../dao/cart.dao.js';

// GET /api/carts/:cid
export const getCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await getCartById(cid);
    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    // Renderizas la vista 'cart' si así lo deseas
    res.render('cart', { cart });
    // O devuelves JSON:
    // res.json({ status: 'success', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};

// DELETE /api/carts/:cid/products/:pid
export const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await deleteProductFromCartDao(cid, pid);
    if (!updatedCart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }
    res.json({ status: 'success', cart: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};

// PUT /api/carts/:cid
// Se recibe en el body: { "products": [ { product: "pid", quantity: X }, ... ] }
export const updateCartProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({
        status: 'error',
        message: 'El campo "products" debe ser un array de productos'
      });
    }

    const updated = await updateCartDao(cid, products);
    if (!updated) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }
    res.json({ status: 'success', cart: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};

// PUT /api/carts/:cid/products/:pid
// Se recibe en el body: { "quantity": X }
export const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (quantity == null) {
      return res.status(400).json({ status: 'error', message: 'Falta la cantidad' });
    }

    const updatedCart = await updateProductQuantityDao(cid, pid, quantity);
    if (!updatedCart) {
      return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' });
    }
    res.json({ status: 'success', cart: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};

// DELETE /api/carts/:cid
export const clearCart = async (req, res) => {
  try {
    const { cid } = req.params;
    // Ojo: Llamamos a la función 'clearCartDao' para que no colisione con la nuestra
    const cleared = await clearCartDao(cid);
    if (!cleared) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }
    res.json({ status: 'success', cart: cleared });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};
