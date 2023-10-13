import { Request, Response } from 'express';
import Cart from '../database/models/cartModel';
import { getTotal } from '../utils/getTotalPriceAndQuantity';
import { vatFunction } from '../utils/vatFunction';

export const addItemToCart = async (req: Request, res: Response) => {
  const { productId, price, cartId, name, image } = req.body;

  let userCart = await Cart.findById({ _id: cartId });

  if (!userCart) {
    return res.status(404).json({ status: 'failed', message: 'Cart does not exist' });
  }

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

export const getUserCartItems = async (req: Request, res: Response) => {
  const { _id: cartId } = req.params;

  const data = await Cart.findById(cartId);

  if (!data) {
    return res.status(404).json({ status: 'failed', message: 'Cart does not exist' });
  }

  return res.status(200).json({ status: 'success', data });
};

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

export const deleteCart = async (req: Request, res: Response) => {
  const { _id: cartId } = req.params;

  let foundCart = await Cart.findById(cartId);

  if (!foundCart) {
    return res.status(404).json({ status: 'failed', message: 'Cart does not exist' });
  }

  await foundCart.deleteOne();

  return res.status(200).json({ status: 'success', message: 'Successfully deleted' });
};
