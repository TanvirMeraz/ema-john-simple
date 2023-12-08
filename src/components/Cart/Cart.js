import { TrashOutline } from 'heroicons-react';
import React from 'react';
import './Cart.scss';

const Cart = ({ cart, setCart }) => {
	const clearCart = () => {
		localStorage.removeItem('storedCart');
		setCart([]);
	};

	let total = 0,
		shippingCost = 0,
		quantity = 0;
	for (const product of cart) {
		quantity += product.quantity;
		total += product.price * product.quantity;
		shippingCost += product.shipping;
	}

	const tax = parseFloat((total * 0.1).toFixed(2));

	return (
		<div className='orders'>
			<h3>Order Summary</h3>
			<div className='orders-summary'>
				<p>Selected Items: {quantity}</p>
				<p>Total Price: ${total} </p>
				<p>Total Shipping Charge: ${shippingCost} </p>
				<p>Tax: ${tax} </p>
				<p className='grand-total'>
					Grand Total: ${total + shippingCost + tax}
				</p>
			</div>
			{cart.length != 0 && (
				<button className='clear' onClick={clearCart}>
					Clear Cart
					<TrashOutline className='btns-icon'></TrashOutline>
				</button>
			)}
		</div>
	);
};

export default Cart;
