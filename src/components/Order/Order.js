import { CreditCardOutline, TrashOutline } from 'heroicons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeFromDb } from '../Localstorage/Localstorage';
import OrderedProduct from '../OrderedProduct/OrderedProduct';
import useCart from './../hooks/useCart';
import useCartCalculation from './../hooks/useCartCalculation';
import useProducts from './../hooks/useProducts';
import './Order.scss';

const Order = () => {
	const [products, setProducts] = useProducts();
	const [cart, setCart] = useCart();
	const [total, shippingCost, quantity, tax, grandTotal] =
		useCartCalculation(cart);
	const navigate = useNavigate();

	const clearCart = () => {
		localStorage.removeItem('storedCart');
		setCart([]);
	};
	const removeItem = (id) => {
		let newCart = [...cart];
		let index = newCart.findIndex((p) => {
			return p._id === id;
		});
		newCart.splice(index, 1);
		setCart(newCart);
		removeFromDb(id);
	};

	return (
		<div className='review'>
			<div className='items'>
				{cart.map((product) => {
					return (
						<OrderedProduct
							key={product._id}
							product={product}
							removeItem={removeItem}
						></OrderedProduct>
					);
				})}
			</div>
			<div className='summary'>
				<div className='summary-details'>
					<h1>Order Summary</h1>
					<p className='total-items'>
						<span>Selected Items: </span>
						{quantity}
					</p>
					<p className='total-price'>
						<span>Total Price: </span>${total}
					</p>
					<p className='total-shipping'>
						<span>Total Shipping Charge: </span>${shippingCost}
					</p>
					<p className='total-tax'>
						<span>Tax: </span>${tax}
					</p>
					<p className='grand-total'>
						<span>Grand Total: </span>
						{grandTotal}
					</p>
				</div>
				<div className='btns'>
					<button className='clear' onClick={clearCart}>
						Clear Cart
						<TrashOutline className='btns-icon'></TrashOutline>
					</button>
					<button className='chk-out' onClick={() => navigate('/checkout')}>
						Proceed Checkout
						<CreditCardOutline className='btns-icon'></CreditCardOutline>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Order;
