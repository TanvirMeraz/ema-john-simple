import React from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import auth from './../../firebase.init';
import './Header.scss';

const Header = () => {
	const [user] = useAuthState(auth);
	const [signOut] = useSignOut(auth);
	const handleSignOut = () => {
		signOut();
	};

	let activeStyle = {
		color: '#ff9900',
	};
	return (
		<nav className='header'>
			<img src={logo} alt='Logo' className='logo' />
			<div className='links'>
				<NavLink
					to='/shop'
					style={({ isActive }) => (isActive ? activeStyle : undefined)}
				>
					<i className='bi bi-shop-window' customtitle='Shop'></i>
				</NavLink>
				<NavLink
					to='/order'
					style={({ isActive }) => (isActive ? activeStyle : undefined)}
				>
					<i className='bi bi-cart' customtitle='Order'></i>
				</NavLink>
				<NavLink
					to='/inventory'
					style={({ isActive }) => (isActive ? activeStyle : undefined)}
				>
					<i className='bi bi-box2-heart' customtitle='Inventory'></i>
				</NavLink>
				{user && (
					<NavLink
						to='/profile'
						style={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						<i
							className='bi bi-person-circle'
							customtitle={user?.displayName ? user.displayName : user.email}
						></i>
					</NavLink>
				)}

				{user ? (
					<button className='signOut' onClick={handleSignOut}>
						Sign Out
					</button>
				) : (
					<NavLink
						to='/login'
						style={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Login
					</NavLink>
				)}
			</div>
		</nav>
	);
};

export default Header;
