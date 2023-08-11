export const vatFunction = (priceInput: string) => {
  const priceInCents = parseInt(priceInput, 10) * 100;
  const vatInCents = priceInCents * parseFloat(process.env.TAX_PRICE as string);
  const getVat = priceInCents + vatInCents;
  return {
    vatInCents,
    getVat,
  };
};
