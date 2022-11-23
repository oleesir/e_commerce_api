import {Request, Response} from "express";
import Cart from "../database/models/cartModel";
import User from "../database/models/userModel";
import Order from "../database/models/orderModel";


/**
 * create order
 * @method createOrder
 * @memberof orderController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const createOrder = async (req: Request, res: Response) => {
    const {
        cartId,
        address,
        phoneNumber,
        country,
        city,
        paymentMethod,
    } = req.body;
    const {_id: userId} = (<any>req).user;

    let userCart = await Cart.findOne({userId, cartId});
    let user = await User.findById({_id: userId});

    if (!userCart) {
        return res.status(404).json({status: "failed", message: "No cart found"});
    }


    const order = new Order({
        userId,
        address: address || user?.address,
        email: user?.email,
        country,
        city,
        phoneNumber: phoneNumber || user?.phoneNumber,
        paymentMethod,
        cartItems: userCart.cartItems,
        totalQuantity: userCart?.totalQuantity,
        totalPrice: userCart?.totalPrice,
        totalTax: userCart?.totalTax,
        totalPriceAfterTax: userCart?.totalPriceAfterTax,
    })


    const data = await order.save();
    return res.status(201).json({status: "success", data});

};


/**
 * getUserOrder
 * @method getUserCartItems
 * @memberof cartController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const getUserOrder = async (req: Request, res: Response) => {

    const {_id} = req.params;

    const data = await Order.findById({_id});

    if (!data) {
        return res.status(404).json({status: "failed", message: "Order does not exist"});
    }

    return res.status(200).json({status: "success", data});

};