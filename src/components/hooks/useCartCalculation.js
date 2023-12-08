import { useEffect } from 'react';
const useCartCalculation = (cart) => {
	let total = 0,
		shippingCost = 0,
		quantity = 0,
		tax = 0,
		grandTotal = 0;

	for (const product of cart) {
		quantity += product.quantity;
		total += product.price * product.quantity;
		shippingCost += product.shipping;
		tax = parseFloat((total * 0.1).toFixed(2));
		grandTotal = total + shippingCost + tax;
	}

	return [total, shippingCost, quantity, tax, grandTotal];
};

export default useCartCalculation;
