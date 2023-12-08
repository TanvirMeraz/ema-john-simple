import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../hooks/useToken';
import auth from './../../firebase.init';
import './SignUp.scss';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const location = useLocation();

	let from = location.state?.from?.pathname || '/';

	const [createUserWithEmailAndPassword, user, loading, createUserError] =
		useCreateUserWithEmailAndPassword(auth);

	const [token] = useToken(user);
	if (token) navigate(from, { replace: true });

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		if (password.length < 6 || password.length > 18) {
			setError('Your password length must be within 6 to 18 characters long');
			return;
		}

		if (password !== confirmPassword) {
			setError('Your passwords doesnot match');
			return;
		}

		const success = await createUserWithEmailAndPassword(email, password);
		console.log(success);

		setError('');
	};

	return (
		<div className='signup'>
			<h1>Sign Up</h1>
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
						required
						onBlur={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className='input-group'>
					<label htmlFor='confirm-password'>Confirm Password</label>
					<input
						type='password'
						name='confirm-password'
						id='confirm-password'
						required
						onBlur={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>
				<p className='error' style={{ color: 'red' }}>
					{error || createUserError?.message}
				</p>
				<button className='email-login'>
					Sign Up
					{loading && <div className='circle'></div>}
				</button>
			</form>
			<p>
				Already Have an account? <NavLink to='/login'>Login</NavLink>
			</p>
			<div className='or'>
				<p>or</p>
			</div>
			<button className='google-login'>Continue with Google</button>
		</div>
	);
};

export default SignUp;
