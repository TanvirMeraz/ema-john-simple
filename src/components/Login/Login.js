import React, { useState } from 'react';
import {
	useSignInWithEmailAndPassword,
	useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import googleLogo from '../../images/google.svg';
import useToken from '../hooks/useToken';
import auth from './../../firebase.init';
import './Login.scss';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const location = useLocation();

	let from = location.state?.from?.pathname || '/';

	const [signInWithEmailandPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);
	const [googleSignIn, googleUser, googleLoading, googleError] =
		useSignInWithGoogle(auth);

	const [token] = useToken(user || googleUser);

	if (token) navigate(from, { replace: true });

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const result = await signInWithEmailandPassword(email, password);

		if (result.user.email) {
			toast.success('Welcome Back');
		} else {
			toast.error('Something Wrong Happend');
		}
	};
	return (
		<div className='login'>
			<h1>Login</h1>
			<form onSubmit={handleFormSubmit}>
				<div className='input-group'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						name='email'
						id='email'
						required
						onBlur={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='input-group'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						id='password'
						onBlur={(e) => setPassword(e.target.value)}
					/>
				</div>
				<p className='error' style={{ color: 'red' }}>
					{error?.message || googleError?.message}
				</p>
				<button className='email-login'>
					Login {loading && <div className='circle'></div>}
				</button>
			</form>
			<p>
				New to Ema-john? <NavLink to='/signup'>Create New Account</NavLink>
			</p>
			<div className='or'>
				<p>or</p>
			</div>
			<button className='google-login' onClick={() => googleSignIn()}>
				<img src={googleLogo} alt='google logo' />
				Continue with Google
				{googleLoading && <div className='circle'></div>}
			</button>
		</div>
	);
};

export default Login;
