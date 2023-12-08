import React from 'react';
import './NotFound.scss';

const NotFound = () => {
	return (
		<div className='notFound'>
			<h1>
				<span className='number'>404</span>
				<span className='line'>|</span>
				<span className='message'>Nothing here to see</span>
			</h1>
		</div>
	);
};

export default NotFound;
