import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import CheckOut from './components/CheckOut/CheckOut';
import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Order from './components/Order/Order';
import Profile from './components/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Shop from './components/Shop/Shop';
import SignUp from './components/SignUp/SignUp';

function App() {
	return (
		<div className='body'>
			<Header></Header>
			<Routes>
				<Route element={<Shop></Shop>} path='/'></Route>
				<Route element={<Shop></Shop>} path='/shop'></Route>
				<Route element={<Order />} path='/order'></Route>
				<Route path='/inventory' element={<Inventory />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route path='/signup' element={<SignUp />}></Route>
				<Route
					path='/checkout'
					element={
						<ProtectedRoute>
							<CheckOut></CheckOut>
						</ProtectedRoute>
					}
				></Route>
				<Route
					path='/profile'
					element={
						<ProtectedRoute>
							<Profile></Profile>
						</ProtectedRoute>
					}
				></Route>
				<Route path='*' element={<NotFound></NotFound>}></Route>
			</Routes>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				theme='light'
				pauseOnFocusLoss={false}
				pauseOnHover={false}
			/>
		</div>
	);
}

export default App;
