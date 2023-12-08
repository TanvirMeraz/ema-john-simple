import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import { addToDB } from '../Localstorage/Localstorage';
import Product from '../Product/Product';
import useCart from '../hooks/useCart';
import './Shop.scss';

const Shop = () => {
	// Fetching Products information
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useCart();
	const [pages, setPages] = useState(0);
	const [activePage, setActivePage] = useState(0);
	const [size, setSize] = useState(10);
	const [totalProducts, setTotalProducts] = useState(0);
	const { REACT_APP_SERVER_LINK } = process.env;

	useEffect(() => {
		fetch(`${REACT_APP_SERVER_LINK}productsCount`)
			.then((res) => res.json())
			.then((data) => {
				setTotalProducts(data.count);
				setPages(Math.ceil(data.count / 10));
			});
	}, []);

	useEffect(() => {
		fetch(`${REACT_APP_SERVER_LINK}products?page=${activePage}&size=${size}`)
			.then((res) => res.json())
			.then((data) => {
				setProducts(data);
			});
	}, [activePage, size]);

	// Cart Information Update
	const addToCartClick = (product) => {
		const exists = cart.find((cartItem) => cartItem._id === product._id);
		let newCart = [];
		if (!exists) {
			product.quantity = 1;
			newCart = [...cart, product];
		} else {
			const rest = cart.filter((item) => item._id !== product._id);
			product.quantity++;
			newCart = [...rest, product];
		}

		setCart(newCart);
		addToDB(product._id);
	};

	return (
		<div className='shop'>
			<div className='products-container'>
				<div className='products'>
					{products.map((product) => (
						<Product
							key={product._id}
							product={product}
							addToCartClick={addToCartClick}
						></Product>
					))}
				</div>
				<div className='pagination'>
					<div className='page'>
						{[...Array(pages).keys()].map((page) => {
							return (
								<button
									key={page}
									onClick={() => setActivePage(page)}
									className={activePage === page ? 'activePage' : ''}
								>
									{page}
								</button>
							);
						})}
					</div>
					<div className='size'>
						<label htmlFor='size'>Products Per page: </label>
						<select
							name='size'
							onChange={(e) => {
								setSize(e.target.value);
								setPages(Math.ceil(totalProducts / e.target.value));
							}}
							defaultValue={'10'}
						>
							<option value='5'>5</option>
							<option value='10'>10</option>
							<option value='15'>15</option>
							<option value='20'>20</option>
						</select>
					</div>
				</div>
			</div>

			<div className='cart-container'>
				<Cart cart={cart} setCart={setCart}></Cart>
			</div>
		</div>
	);
};

export default Shop;
