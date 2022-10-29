import {Request, Response} from "express";
import Cart from "../database/models/cartModel";
import Product from "../database/models/productModel";
import {getTotal} from "../utils/getTotalPriceAndQuantity";
import Stripe from 'stripe';



// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * add items to cart
 * @method addItemToCart
 * @memberof cartController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const addItemToCart = async (req: Request, res: Response) => {
    const {productId, price} = req.body;

    const {_id: userId} = (<any>req).user;
    let cart;

    let userCart = await Cart.findOne({userId});

    if (!userCart) {
        cart = new Cart({userId, cartItems: [], totalQuantity: 0, totalPrice: 0});
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
            price: cartItemToAdd.price ,
        };
    } else {
        const newItem = {
            productId,
            quantity: 1,
            price: price * 100
        };
        userCart.cartItems.push(newItem);
    }


    let result = getTotal(userCart.cartItems)


    const data = await Cart.findOneAndUpdate(
        {userId},
        {cartItems: userCart.cartItems, totalPrice: result.totalPrice , totalQuantity: result.totalQuantity},
        {new: true},
    );

    return res.status(201).json({status: "success", data});
};


// /**
//  * syncLocalStorageToDb
//  * @method syncLocalStorageToDb
//  * @memberof cartController
//  * @param {object} req
//  * @param {object} res
//  * @returns {(function|object)} Function next() or JSON object
//  */
// export const syncLocalStorageToDb = async (req: Request, res: Response) => {
// 	const {cartItems} = req.body;
// 	const {_id: userId} = (<any>req).user;
// 	let cart;
//
//
// 	let userCart = await Cart.findOne({userId});
//
// 	if (!userCart) {
// 		cart = new Cart({userId, cartItems, totalQuantity: 0, totalPrice: 0});
// 		userCart = await cart.save();
//
//
// 		let result = getTotal(userCart.cartItems)
//
// 		const data = await Cart.findOneAndUpdate(
// 			{userId},
// 			{cartItems: userCart.cartItems, totalPrice: result.totalPrice, totalQuantity: result.totalQuantity},
// 			{new: true},
// 		);
//
// 		return res.status(200).json({status: "success", data});
// 	} else {
//
// 		let result = getTotal(userCart.cartItems)
//
// 		const data = await Cart.findOneAndUpdate(
// 			{userId},
// 			{cartItems: cartItems, totalPrice: result.totalPrice, totalQuantity: result.totalQuantity},
// 			{new: true},
// 		);
//
// 		return res.status(200).json({status: "success", data});
//
// 	}
//
// };


/**
 * getUserCartItems
 * @method getUserCartItems
 * @memberof cartController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const getUserCartItems = async (req: Request, res: Response) => {

    const {_id: userId} = (<any>req).user;

    const data = await Cart.findOne({userId});

    if (!data) {
        return res.status(404).json({status: "failed", message: "Cart does not exist"});
    }

    return res.status(200).json({status: "success", data});

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
    const {_id: userId} = (<any>req).user;
    const {productId} = req.body;

    let userCart = await Cart.findOne({userId});

    if (!userCart) {
        return res.status(404).json({status: "failed", message: "No cart found"});
    }

    const itemIndex = userCart?.cartItems.findIndex((cartItem) => cartItem?.productId.toString() === productId);

    if (userCart.cartItems[itemIndex].quantity > 1) {
        userCart.cartItems[itemIndex].quantity -= 1;
    } else if (userCart.cartItems[itemIndex].quantity === 1) {
        const nextCartItems = userCart?.cartItems.filter((cartItem: any) => cartItem?.productId.toString() !== productId);

        const data = await Cart.findOneAndUpdate({userId}, {cartItems: nextCartItems}, {new: true});

        return res.status(200).json({status: "success", data});
    }

    let result = getTotal(userCart.cartItems)


    const data = await Cart.findOneAndUpdate(
        {userId},
        {cartItems: userCart.cartItems, totalPrice: result.totalPrice, totalQuantity: result.totalQuantity},
        {new: true},
    );

    return res.status(200).json({status: "success", data});
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
    const {_id: userId} = (<any>req).user;
    const {productId} = req.params;

    let userCart = await Cart.findOne({userId});

    if (!userCart) {
        return res.status(404).json({status: "failed", message: "No cart found"});
    }

    const itemIndex = userCart?.cartItems.findIndex((cartItem) => cartItem?.productId.toString() === productId);

    if (userCart.cartItems[itemIndex]) {
        const nextCartItems = userCart?.cartItems.filter((cartItem: any) => cartItem?.productId.toString() !== productId);

        let result = getTotal(nextCartItems)

        const data = await Cart.findOneAndUpdate(
            {userId},
            {cartItems: nextCartItems, totalPrice: result.totalPrice, totalQuantity: result.totalQuantity},
            {new: true},)

        return res.status(200).json({status: "success", data});
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
    const {_id: userId} = (<any>req).user;
    const {_id:cartId} = req.body;
    try{
        let userCart = await Cart.findOne({userId,cartId});


        if (!userCart) {
            return res.status(404).json({status: "failed", message: "No cart found"});
        }

        const cartItemsPromises = userCart?.cartItems.map( async (item: any) => {

            const eachProduct =  await Product.findOne({_id: item?.productId.toString()});

            if (!eachProduct) {
                throw new Error('product not found')
            }

            return {
                price_data: {
                    currency: "CAD",
                    product_data: {
                        name: eachProduct.name
                    },
                    unit_amount: eachProduct.price,
                },
                quantity: item.quantity
            }
        })

        const cartItems = await Promise.all(cartItemsPromises);

        const session = await stripe.checkout.sessions.create({
            cancel_url: process.env.NODE_ENV === "development" ? `${process.env.FRONTEND_URL}/transaction_failed` : `${process.env.FRONTEND_URL_PROD}/transaction_failed`,
            success_url: process.env.NODE_ENV === "development" ?`${process.env.FRONTEND_URL}/transaction_success` : `${process.env.FRONTEND_URL_PROD}/transaction_success`,
            payment_method_types: ["card"],
            mode: "payment",
            line_items: cartItems
        })

        return res.json({data:`${session.url}`});


    }catch (e) {
        console.log('ERROR',e)
    }

}



