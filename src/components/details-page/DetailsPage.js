import React, { useState } from 'react';
import Card from './card/Card';

import './styles.css';

import data from '../../data.json';

import profilePicture from '../../images/profile-photo.png';

import { dateLabel } from '../../utilities/utilities';
import { Link } from 'react-router-dom';

function DetailsPage() {
	const statuses = [
		{
			label: 'Published',
			className: 'published',
			status: 'published',
			statusCode: 3,
		},
		{
			label: 'Scheduled',
			className: 'scheduled',
			status: 'scheduled',
			statusCode: 1,
		},
		{
			label: 'Need Approval',
			className: 'need-approval',
			status: 'need approval',
			statusCode: 0,
		},
		{
			label: 'Error',
			className: 'error',
			status: 'error',
			statusCode: 4,
		},
		{
			label: 'Notes',
			className: 'notes',
			status: 'notes',
			statusCode: 5,
		},
	];

	const postsData = Object.entries(data.posts_by_date);

	const [postsDateData, setPostsDateData] = useState({
		postsData: postsData,
		filteredPosts: postsData,
	});

	const [filter, setFilter] = useState(null);

	const handleFilter = (event) => {
		setPostsDateData((prevState) => {
			if (event.target.name === filter) {
				setFilter(null);

				return {
					postsData: prevState.postsData,
					filteredPosts: prevState.postsData,
				};
			}
			const filterPosts = prevState.postsData.map(([postDate, postData]) => {
				const filteredPosts = postData.filter(
					(post) => post.status == event.target.name
				);

				return [postDate, filteredPosts];
			});
			setFilter(event.target.name);
			return { postsData: prevState.postsData, filteredPosts: filterPosts };
		});
	};

	return (
		<div className='page-container'>
			<div className='utility-container'>
				<div className='filters-container'>
					{statuses.map((status) => {
						return (
							<div className='filter' key={status.status}>
								<div className={`filter-color-code ${status.className}`}></div>
								<button
									style={{
										...(filter == status.statusCode && {
											fontWeight: 'bold',
										}),
									}}
									className='filter-btn'
									onClick={handleFilter}
									name={status.statusCode}>
									{status.label}
								</button>
							</div>
						);
					})}
				</div>
				<Link to='account-details'>
					<div>
						<button className='account-btn'>
							<img src={profilePicture} alt='profile' id='profile-pic' />
						</button>
					</div>
				</Link>
			</div>

			<div className='date-container'>
				{postsDateData.filteredPosts.map(([postDate, postData]) => {
					return (
						<div className='date' key={postDate}>
							<div className='date-label'>{dateLabel(postDate)}</div>
							<div className='date-content'>
								{postData.map((data) => {
									// Used creation date and channel combined as an unique key
									return (
										<Card
											postData={data}
											key={`${data.created_at}${data.account.channel}`}
										/>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default DetailsPage;
