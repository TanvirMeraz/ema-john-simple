import { useEffect, useState } from 'react';

const useProducts = () => {
	const [products, setProducts] = useState([]);
	const { REACT_APP_SERVER_LINK } = process.env;

	useEffect(() => {
		fetch(`${REACT_APP_SERVER_LINK}products`)
			.then((res) => res.json())
			.then((product) => setProducts(product));
	}, []);
	return [products, setProducts];
};

export default useProducts;
