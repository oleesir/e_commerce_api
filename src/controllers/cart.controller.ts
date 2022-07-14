import { Request, Response } from "express";
import Cart from "../database/models/cartModel";

/**
 * add items to cart
 * @method addItemToCart
 * @memberof cartController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const addItemToCart = async (req: Request, res: Response) => {
	const { productId } = req.body;
	const { _id: userId } = (<any>req).user;

	let userCart = await Cart.findOne({ user: userId });

	if (!userCart) {
		const cart = new Cart({ user: userId, cartItems: [] });
		userCart = await cart.save();
	}

	const itemIndex = userCart?.cartItems.findIndex((cartItem) => {
		return cartItem?.productId?.toString() === productId;
	});

	// if item exists
	if (itemIndex >= 0) {
		const cartItemToAdd = userCart.cartItems[itemIndex];

		userCart.cartItems[itemIndex] = {
			...cartItemToAdd,
			productId: cartItemToAdd.productId,
			quantity: cartItemToAdd.quantity + 1,
		};
	} else {
		const newItem = { productId, quantity: 1 };
		userCart.cartItems.push(newItem);
	}

	const data = await userCart.save();
	return res.status(201).json({ status: "success", data });
};
