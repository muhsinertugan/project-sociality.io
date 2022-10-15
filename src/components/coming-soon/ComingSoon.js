import React from 'react';
import comingSoon from '../../icons/card-icons/coming-soon.svg';

import './styles.css';

function ComingSoon() {
	return (
		<div className='soon-container'>
			<img src={comingSoon} alt='coming soon' />
			<h1>Coming soon!</h1>
		</div>
	);
}

export default ComingSoon;
