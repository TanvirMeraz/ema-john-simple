import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from './../../firebase.init';

const ProtectedRoute = ({ children }) => {
	const [user, loading] = useAuthState(auth);
	const location = useLocation();
	const token = localStorage.getItem('accessToken');
	if (loading) return <h1>User is loading</h1>;
	if (!token || !user)
		return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
	return children;
};

export default ProtectedRoute;
