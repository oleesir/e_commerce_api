export const syncVatFunction = (priceInput: string) => {
  const vatInCents = parseInt(priceInput, 10) * parseFloat(process.env.TAX_PRICE as string);
  const getVat = parseInt(priceInput, 10) + vatInCents;
  return {
    vatInCents,
    getVat,
  };
};

export const vatFunction = (priceInput: string) => {
  const priceInCents = parseInt(priceInput, 10) * 100;
  const vatInCents = priceInCents * parseFloat(process.env.TAX_PRICE as string);
  const getVat = priceInCents + vatInCents;
  return {
    vatInCents,
    getVat,
  };
};
