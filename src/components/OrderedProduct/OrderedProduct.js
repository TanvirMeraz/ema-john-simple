import { TrashOutline } from 'heroicons-react';
import React from 'react';
import './OrderedProduct.scss';

const OrderedProduct = ({ product, removeItem }) => {
	const { name, img, quantity, price, shipping } = product;

	return (
		<div className='ordered-product'>
			<img src={img} alt='' />

			<div className='ordered-product-details'>
				<h1>{name}</h1>
				<p className='product-price'>
					<span>Price: </span>
					{price}
				</p>
				<p className='quantity'>
					<span>Quantity: </span>
					{quantity}
				</p>
				<p className='shipping-cost'>
					<span>Shipping Charge: </span>
					{shipping}
				</p>
			</div>
			<div className='remove-icon'>
				<TrashOutline onClick={() => removeItem(product._id)}></TrashOutline>
			</div>
		</div>
	);
};

export default OrderedProduct;
