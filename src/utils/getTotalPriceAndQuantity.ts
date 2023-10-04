export const getTotal = (items: any) => {
  let totalQuantity = items.reduce((acc: any, item: any) => {
    return acc + item.quantity;
  }, 0);

  let totalPrice = items.reduce((acc: any, item: any) => {
    return acc + item.price * item.quantity;
  }, 0);

  let totalTax = items.reduce((acc: any, item: any) => {
    return acc + item.taxPrice * item.quantity;
  }, 0);

  let totalPriceAfterTax = items.reduce((acc: any, item: any) => {
    return acc + item.priceAfterTax * item.quantity;
  }, 0);

  return {
    totalQuantity,
    totalPrice,
    totalTax,
    totalPriceAfterTax,
  };
};
