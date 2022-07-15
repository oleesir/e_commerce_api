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
	const { productId, price } = req.body;
	const { _id: userId } = (<any>req).user;

	let userCart = await Cart.findOne({ userId });

	if (!userCart) {
		const cart = new Cart({ userId, cartItems: [] });
		userCart = await cart.save();
	}

	const itemIndex = userCart?.cartItems.findIndex((cartItem) => {
		return cartItem?.productId.toString() === productId;
	});

	// if item exists
	if (itemIndex >= 0) {
		const cartItemToAdd = userCart.cartItems[itemIndex];

		userCart.cartItems[itemIndex] = {
			...cartItemToAdd,
			productId: cartItemToAdd.productId,
			quantity: cartItemToAdd.quantity + 1,
			price: cartItemToAdd.price,
		};
	} else {
		const newItem = { productId, quantity: 1, price };
		userCart.cartItems.push(newItem);
	}

	const data = await userCart.save();
	return res.status(201).json({ status: "success", data });
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
	const { _id: userId } = (<any>req).user;
	const { productId } = req.body;

	let userCart = await Cart.findOne({ userId });

	if (!userCart) {
		return res.status(404).json({ status: "failed", message: "No cart found" });
	}

	const itemIndex = userCart?.cartItems.findIndex((cartItem) => cartItem?.productId.toString() === productId);

	if (userCart.cartItems[itemIndex].quantity > 1) {
		userCart.cartItems[itemIndex].quantity -= 1;
	} else if (userCart.cartItems[itemIndex].quantity === 1) {
		const nextCartItems = userCart?.cartItems.filter((cartItem: any) => cartItem?.productId.toString() !== productId);

		const data = await Cart.findOneAndUpdate({ userId }, { cartItems: nextCartItems }, { new: true });

		return res.status(200).json({ status: "success", data });
	}

	const data = await userCart.save();
	return res.status(200).json({ status: "success", data });
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
	const { _id: userId } = (<any>req).user;
	const { productId } = req.params;

	let userCart = await Cart.findOne({ userId });

	if (!userCart) {
		return res.status(404).json({ status: "failed", message: "No cart found" });
	}

	const itemIndex = userCart?.cartItems.findIndex((cartItem) => cartItem?.productId.toString() === productId);

	if (userCart.cartItems[itemIndex]) {
		const nextCartItems = userCart?.cartItems.filter((cartItem: any) => cartItem?.productId.toString() !== productId);

		const data = await Cart.findOneAndUpdate({ userId }, { cartItems: nextCartItems }, { new: true });

		return res.status(200).json({ status: "success", data });
	}
};
