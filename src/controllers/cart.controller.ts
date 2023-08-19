import { Request, Response } from 'express';
import Cart from '../database/models/cartModel';
import Product from '../database/models/productModel';
import { getTotal } from '../utils/getTotalPriceAndQuantity';
import Stripe from 'stripe';
import { vatFunction } from '../utils/vatFunction';

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// /**
//  * create cart
//  * @method createCart
//  * @memberof cartController
//  * @param {object} req
//  * @param {object} res
//  * @returns {(function|object)} Function next() or JSON object
//  */
// export const createCart = async (req: Request, res: Response) => {
//   const { _id: userId } = (<any>req).user;
//   let cart;
//
//   let data = await Cart.findOne({ userId });
//
//   if (!data) {
//     cart = new Cart({
//       userId,
//       cartItems: [],
//       totalQuantity: 0,
//       totalPrice: 0,
//       taxPrice: 0,
//       totalPriceAfterTax: 0,
//       grandTotal: 0,
//     });
//     data = await cart.save();
//   }
//
//   return res.status(201).json({ status: 'success', data });
// };

/**
 * add items to cart
 * @method addItemToCart
 * @memberof cartController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const addItemToCart = async (req: Request, res: Response) => {
  const { productId, price, cartId, name, image } = req.body;
  let cart;

  let userCart = await Cart.findOne({ _id: cartId });

  if (!userCart) {
    return res.status(404).json({ status: 'failed', message: 'Cart does not exist' });
  }
  //
  // if (!userCart) {
  //   cart = new Cart({
  //     cartItems: [],
  //     totalQuantity: 0,
  //     totalPrice: 0,
  //     taxPrice: 0,
  //     totalPriceAfterTax: 0,
  //     grandTotal: 0,
  //   });
  //   userCart = await cart.save();
  // }

  const taxValue = vatFunction(price);

  const itemIndex = userCart?.cartItems.findIndex((cartItem) => {
    return cartItem?.productId.toString() === productId;
  });

  // if item exists
  if (itemIndex >= 0) {
    const cartItemToAdd = userCart.cartItems[itemIndex];

    userCart.cartItems[itemIndex] = {
      ...cartItemToAdd,
      productId: cartItemToAdd.productId,
      name: cartItemToAdd.name,
      image: cartItemToAdd?.image,
      quantity: cartItemToAdd.quantity + 1,
      price: cartItemToAdd.price,
      taxPrice: cartItemToAdd.taxPrice,
      priceAfterTax: cartItemToAdd.priceAfterTax,
    };
  } else {
    const newItem = {
      productId,
      quantity: 1,
      name,
      image,
      price: price * 100,
      taxPrice: taxValue.vatInCents,
      priceAfterTax: taxValue.getVat,
    };

    userCart.cartItems.push(newItem);
  }

  let result = getTotal(userCart.cartItems);

  const data = await Cart.findByIdAndUpdate(
    { _id: cartId },
    {
      cartItems: userCart.cartItems,
      totalPrice: result.totalPrice,
      totalQuantity: result.totalQuantity,
      totalTax: result.totalTax,
      totalPriceAfterTax: result.totalPriceAfterTax,
    },
    { new: true },
  );

  return res.status(201).json({ status: 'success', data });
};

/**
 * getUserCartItems
 * @method getUserCartItems
 * @memberof cartController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const getUserCartItems = async (req: Request, res: Response) => {
  const { _id: cartId } = req.params;

  const data = await Cart.findById(cartId);

  if (!data) {
    return res.status(404).json({ status: 'failed', message: 'Cart does not exist' });
  }

  return res.status(200).json({ status: 'success', data });
};

/**
 * reduce items in cart
 * @method reduceItemsInCart
 * @memberof cartController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */

export const reduceItemsInCart = async (req: Request, res: Response) => {
  const { productId, cartId } = req.body;

  let userCart = await Cart.findById(cartId);

  if (!userCart) {
    return res.status(404).json({ status: 'failed', message: 'No cart found' });
  }

  const itemIndex = userCart?.cartItems.findIndex(
    (cartItem) => cartItem?.productId.toString() === productId,
  );

  if (userCart.cartItems[itemIndex].quantity > 1) {
    userCart.cartItems[itemIndex].quantity -= 1;
  } else if (userCart.cartItems[itemIndex].quantity === 1) {
    const nextCartItems = userCart?.cartItems.filter(
      (cartItem: any) => cartItem?.productId.toString() !== productId,
    );

    const data = await Cart.findByIdAndUpdate(
      { _id: cartId },
      { cartItems: nextCartItems },
      { new: true },
    );

    return res.status(200).json({ status: 'success', data });
  }

  let result = getTotal(userCart.cartItems);

  const data = await Cart.findByIdAndUpdate(
    { _id: cartId },
    {
      cartItems: userCart.cartItems,
      totalPrice: result.totalPrice,
      totalQuantity: result.totalQuantity,
      totalTax: result.totalTax,
      totalPriceAfterTax: result.totalPriceAfterTax,
    },
    { new: true },
  );

  return res.status(200).json({ status: 'success', data });
};

/**
 * remove items in cart
 * @method removeItemsInCart
 * @memberof cartController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const removeItemsInCart = async (req: Request, res: Response) => {
  const { productId, cartId } = req.body;

  let userCart = await Cart.findById(cartId);

  if (!userCart) {
    return res.status(404).json({ status: 'failed', message: 'No cart found' });
  }

  const itemIndex = userCart?.cartItems.findIndex(
    (cartItem) => cartItem?.productId.toString() === productId,
  );

  if (userCart.cartItems[itemIndex]) {
    const nextCartItems = userCart?.cartItems.filter(
      (cartItem: any) => cartItem?.productId.toString() !== productId,
    );

    let result = getTotal(nextCartItems);

    const data = await Cart.findByIdAndUpdate(
      { _id: cartId },
      {
        cartItems: nextCartItems,
        totalPrice: result.totalPrice,
        totalQuantity: result.totalQuantity,
        totalTax: result.totalTax,
        totalPriceAfterTax: result.totalPriceAfterTax,
      },
      { new: true },
    );

    return res.status(200).json({ status: 'success', data });
  }
};

/**
 * checkout
 * @method checkout
 * @memberof cartController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const checkoutCart = async (req: Request, res: Response) => {
  const { _id: cartId } = req.body;

  let userCart = await Cart.findById(cartId);

  if (!userCart) {
    return res.status(404).json({ status: 'failed', message: 'No cart found' });
  }

  const cartItemsPromises = userCart?.cartItems.map(async (item: any, i: any) => {
    const eachProduct = await Product.findOne({ _id: item?.productId.toString() });
    userCart = await Cart.findById(cartId);
    if (!eachProduct) {
      throw new Error('product not found');
    }

    return {
      price_data: {
        currency: 'CAD',
        product_data: {
          name: eachProduct.name,
        },
        unit_amount: item.priceAfterTax,
      },
      quantity: item.quantity,
    };
  });

  const cartItems = await Promise.all(cartItemsPromises);

  const session = await stripe.checkout.sessions.create({
    cancel_url: `${process.env.FRONTEND_URL as string}/transaction_failed`,
    success_url: `${process.env.FRONTEND_URL as string}/transaction_success`,
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: cartItems,
  });

  return res.json({ data: `${session.url}` });
};

/**
 * delete cart
 * @method deleteCart
 * @memberof usersController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const deleteCart = async (req: Request, res: Response) => {
  const { _id: userId } = (<any>req).user;
  const { _id: cartId } = req.params;

  let foundCart = await Cart.findOne({ userId, cartId });

  if (!foundCart) {
    return res.status(404).json({ status: 'failed', message: 'Cart does not exist' });
  }

  await foundCart.deleteOne();

  return res.status(200).json({ status: 'success', message: 'Successfully deleted' });
};
