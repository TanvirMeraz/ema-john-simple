const addToDB = (id) => {
	const storage = getCart();

	if (storage[id]) {
		storage[id]++;
	} else {
		storage[id] = 1;
	}

	localStorage.setItem('storedCart', JSON.stringify(storage));
};

const getCart = () => {
	let storage = {};

	if (localStorage.getItem('storedCart')) {
		storage = JSON.parse(localStorage.getItem('storedCart'));
	}

	return storage;
};

const removeFromDb = (id) => {
	const storedCart = localStorage.getItem('storedCart');
	if (storedCart) {
		const shoppingCart = JSON.parse(storedCart);
		if (id in shoppingCart) {
			delete shoppingCart[id];
			localStorage.setItem('storedCart', JSON.stringify(shoppingCart));
		}
	}
};

export { addToDB, getCart, removeFromDb };
