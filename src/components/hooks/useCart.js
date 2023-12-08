import { useEffect, useState } from 'react';
import { getCart } from '../Localstorage/Localstorage';

const useCart = () => {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const storedCart = getCart();
		let savedCart = [];
		const keys = Object.keys(storedCart);

		fetch(`${process.env.REACT_APP_SERVER_LINK}productsbykeys`, {
			method: 'post',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(keys),
		})
			.then((res) => res.json())
			.then((products) => {
				for (const id in storedCart) {
					const foundProduct = products.find((product) => {
						return id === product._id;
					});

					if (foundProduct) {
						foundProduct.quantity = storedCart[id];
						savedCart.push(foundProduct);
					}
				}
				setCart(savedCart);
			});
	}, []);

	return [cart, setCart];
};

export default useCart;
