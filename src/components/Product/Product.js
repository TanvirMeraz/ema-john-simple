import React from 'react';
import styles from './Product.module.scss';

import { ShoppingCartOutline } from 'heroicons-react/build';

const Product = ({ product, addToCartClick }) => {
	const { img, name, price, ratings, seller } = product;
	return (
		<div className={styles.product}>
			<img src={img} alt='product' className={styles['product-image']} />
			<div className={styles['product-details']}>
				<p className={styles.name}>{name}</p>
				<p className={styles.price}>Price: ${price}</p>
				<p className={styles.manufacturer}>Manufacturer: {seller}</p>
				<p className={styles.rating}>Rating: {ratings}star</p>
			</div>
			<button onClick={() => addToCartClick(product)}>
				<p>Add To Cart</p>
				<ShoppingCartOutline className='shopping-cart'></ShoppingCartOutline>
			</button>
		</div>
	);
};

export default Product;
