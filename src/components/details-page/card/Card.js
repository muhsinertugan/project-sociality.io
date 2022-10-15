import React, { useState } from 'react';

import classNames from 'classnames/bind';

//Icons
import {
	faFacebookF,
	faTwitter,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

//Utilities
import {
	interactionIconSorter,
	actionsIconSorter,
} from '../../../utilities/utilities';

//Styles
import './styles.css';

import Linkify from 'react-linkify/dist/components/Linkify';

import noImage from '../../../images/no-post-image.png';

library.add(faFacebookF, faTwitter, faInstagram);

function Card({ postData }) {
	const [showMore, setShowMore] = useState(false);

	const [imageError, setImageError] = useState(false);
	const logoSorter = (channel) => {
		if (channel === 'instagrambusiness') {
			return <FontAwesomeIcon icon='fa-brands fa-instagram' />;
		} else if (channel === 'twitter') {
			return <FontAwesomeIcon icon='fa-brands fa-twitter' />;
		} else if (channel === 'facebook') {
			return <FontAwesomeIcon icon='fa-brands fa-facebook-f' />;
		}
	};

	const statusClassName = classNames({
		'sm-container': true,
		published: postData.status === 3,
		scheduled: postData.status === 1,
		'need-approval': postData.status === 0,
		error: postData.status === 4,
	});

	return (
		<div className='card-container'>
			<div className={statusClassName}>
				{logoSorter(postData.account.channel)}
			</div>
			<div className='post-container'>
				<div className='date-actions-container'>
					<div className='creation-date'>
						{postData.created_at.slice(0, -3)}
					</div>
					<div className='actions'>{actionsIconSorter(postData.status)}</div>
				</div>
				<div className='content-container'>
					<div className='content-message'>
						<span className='visible-first'>
							<Linkify>{postData.entry.message.slice(0, 140)}</Linkify>
						</span>
						<button
							className={
								postData.entry.message.length > 140 && showMore === false
									? 'more-btn'
									: 'more-btn hidden'
							}
							onClick={() => {
								setShowMore(true);
							}}>
							...see more
						</button>

						<button
							className={
								postData.entry.message.length > 140 && showMore === true
									? 'more-btn'
									: 'more-btn hidden'
							}
							onClick={() => {
								setShowMore(false);
							}}>
							...see less
						</button>
						<span className={showMore ? 'visible-more' : 'visible-more hidden'}>
							<Linkify>{postData.entry.message.slice(140)}</Linkify>
						</span>
					</div>
					<img
						className='content-img'
						src={imageError ? noImage : postData.entry.image}
						alt={postData.entry.type}
						onError={() => setImageError(true)}
					/>
				</div>
				<div className='interaction-icons-container'>
					{interactionIconSorter(postData.account.channel)}
				</div>
			</div>
		</div>
	);
}

export default Card;
