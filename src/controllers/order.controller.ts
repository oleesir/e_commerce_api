import { Request, Response } from 'express';
import Stripe from 'stripe';
import Cart from '../database/models/cartModel';
import User from '../database/models/userModel';
import Order from '../database/models/orderModel';
import Product from '../database/models/productModel';
import Mailer from '../utils/mailer';

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const updateStock = ({
  countInStock,
  quantityFromCart,
}: {
  countInStock: Number;
  quantityFromCart: Number;
}) => {
  if (countInStock > -1) {
    if (countInStock >= quantityFromCart) {
      return Number(countInStock) - Number(quantityFromCart);
    } else {
      return;
    }
  }
};

const createOrder = async ({ customer, data }: { customer: any; data: any }) => {
  const cartId = customer.metadata.cartId;

  const userId = customer.metadata.userId;

  const userCart = await Cart.findById(cartId);

  const foundUser = await User.findById(userId);

  userCart?.cartItems.map(async (cartItem: any) => {
    const product = await Product.findById({ _id: cartItem?.productId.toString() });
    await Product.findByIdAndUpdate(
      { _id: product?._id },
      {
        countInStock: updateStock({
          countInStock: product?.countInStock || 0,
          quantityFromCart: cartItem?.quantity,
        }),
      },
      { new: true },
    );
  });

  const order = new Order({
    userId: foundUser?._id,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    cartItems: userCart?.cartItems,
    totalQuantity: userCart?.totalQuantity,
    totalPrice: userCart?.totalPrice,
    totalTax: userCart?.totalTax,
    totalPriceAfterTax: userCart?.totalPriceAfterTax,
    txStatus: 'successful',
  });

  const createdOrder = await order.save();

  await Cart.findByIdAndUpdate(
    { _id: userCart?._id },
    {
      cartItems: [],
      totalPrice: 0,
      totalQuantity: 0,
      totalTax: 0,
      totalPriceAfterTax: 0,
    },
    { new: true },
  );

  if (createdOrder) {
    await Mailer.send({
      to: foundUser?.email || '',
      subject: 'Order Confirmation',
      firstName: foundUser?.firstName || '',
      orderId: createdOrder?._id,
      province: foundUser?.province || '',
      city: foundUser?.city || '',
      price: createdOrder?.totalPriceAfterTax || 0,
      orderLink: 'olivemarket.ca',
    });
  }
};

/**
 * checkout
 * @method placeOrder
 * @memberof orderController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const placeOrder = async (req: Request, res: Response) => {
  const { cartId, address, phoneNumber, province, city } = req.body;

  const { _id: userId } = (<any>req).user;

  let userCart = await Cart.findById(cartId);

  let foundUser = await User.findById(userId);

  if (!userCart) {
    return res.status(404).json({ status: 'failed', message: 'No cart found' });
  }

  if (!foundUser) {
    return res.status(404).json({ status: 'failed', message: 'User does not exist' });
  }

  await User.findByIdAndUpdate(
    { _id: foundUser?._id },
    {
      address: address || foundUser?.address,
      phoneNumber: phoneNumber || foundUser?.phoneNumber,
      province: province || foundUser?.province,
      city: city || foundUser?.city,
    },
    { new: true },
  );

  const customer = await stripe.customers.create({
    metadata: {
      userId,
      cartId,
    },
  });

  const cartItemsPromises = userCart?.cartItems.map(async (item: any) => {
    const product = await Product.findById({ _id: item?.productId.toString() });

    userCart = await Cart.findById(cartId);
    if (!product) {
      throw new Error('product not found');
    }

    return {
      price_data: {
        currency: 'CAD',
        product_data: {
          name: product?.name,
          images: [product?.images[0].secureUrl],
          metadata: {
            id: product?._id,
          },
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
    customer: customer?.id,
    phone_number_collection: {
      enabled: true,
    },
    line_items: cartItems,
  });

  return res.json({ data: `${session.url}` });
};

export const stripeWebhook = async (req: Request, res: Response) => {
  let data;
  let eventType;

  const stripePayload = (req as any).rawBody || req.body;

  const stripeSignature = req.headers['stripe-signature'];
  if (stripeSignature == null) {
    throw new Error('No stripe signature found!');
  }

  if (process.env.END_POINT_SECRET) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        stripePayload,
        stripeSignature?.toString(),
        process.env.END_POINT_SECRET,
      );
    } catch (err: any) {
      console.log(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  if (eventType === 'checkout.session.completed') {
    const customer = await stripe.customers.retrieve(data?.customer);
    await createOrder({ customer, data });
  }
  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
};

/**
 * getUserOrder
 * @method getUserCartItems
 * @memberof orderController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const getUserOrder = async (req: Request, res: Response) => {
  const { _id } = req.params;

  const data = await Order.findById({ _id });

  if (!data) {
    return res.status(404).json({ status: 'failed', message: 'Order does not exist' });
  }

  return res.status(200).json({ status: 'success', data });
};
