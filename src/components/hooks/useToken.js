import axios from 'axios';
import { useEffect, useState } from 'react';

function useToken(user) {
	const email = user?.user?.email;
	const [token, setToken] = useState('');
	const { REACT_APP_SERVER_LINK } = process.env;

	useEffect(() => {
		async function getToken() {
			if (email) {
				const { data } = await axios.post(`${REACT_APP_SERVER_LINK}login`, {
					email,
				});
				localStorage.setItem('accessToken', `${data}`);
				setToken(data);
			}
		}
		getToken();
	}, [user]);

	return [token];
}

export default useToken;
