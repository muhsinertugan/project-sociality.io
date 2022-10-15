import React, { useEffect, useState } from 'react';

import { ReactComponent as CompanyLogo } from '../../icons/navbar-icons/Sociality-logo.svg';
import accountOne from '../../icons/navbar-icons/Logo1.png';
import accountTwo from '../../icons/navbar-icons/Logo2.png';
import accountThree from '../../icons/navbar-icons/Logo3.png';
import accountFour from '../../icons/navbar-icons/Logo4.png';
import accountFive from '../../icons/navbar-icons/Logo5.png';
import accountSix from '../../icons/navbar-icons/Logo6.png';

import { ReactComponent as SummaryIcon } from '../../icons/navbar-icons/summary-icon.svg';
import { ReactComponent as EngageIcon } from '../../icons/navbar-icons/engage-icon.svg';
import { ReactComponent as ListenIcon } from '../../icons/navbar-icons/listen-icon.svg';
import { ReactComponent as ReportIcon } from '../../icons/navbar-icons/report-icon.svg';
import { ReactComponent as PublishIcon } from '../../icons/navbar-icons/publish-icon.svg';
import { ReactComponent as NotificationsIcon } from '../../icons/navbar-icons/notifications-icon.svg';

import './styles.css';
import { Link, Outlet } from 'react-router-dom';

function NavBar() {
	const navBarIcons = [
		{
			icon: <SummaryIcon color='#DF535D' />,
			label: 'SUMMARY',
			options: undefined,
			selected: false,
		},
		{
			icon: <PublishIcon color='#FFFFFF' />,
			label: 'PUBLISH',
			options: [
				{ label: 'Compose', selected: false },
				{ label: 'Feed', selected: true },
			],
			selected: true,
		},
		{
			icon: <EngageIcon color='#DF535D' />,
			label: 'ENGAGE',
			options: undefined,
			selected: false,
		},
		{
			icon: <ListenIcon color='#DF535D' />,
			label: 'LISTEN',
			options: undefined,
			selected: false,
		},
		{
			icon: <ReportIcon color='#DF535D' />,
			label: 'REPORT',
			options: undefined,
			selected: false,
		},
	];

	const accounts = [
		{ label: 'account-one', img: accountOne, selected: false },
		{ label: 'account-two', img: accountTwo, selected: false },
		{ label: 'account-three', img: accountThree, selected: false },
		{ label: 'account-four', img: accountFour, selected: true },
		{ label: 'account-five', img: accountFive, selected: false },
		{ label: 'account-six', img: accountSix, selected: false },
	];
	const colorData = { selectedColor: '#FFFFFF', unSelectedColor: '#F55661' };

	const [navBar, setNavBar] = useState(navBarIcons);
	const [account, setAccount] = useState(accounts);

	const handleNavBar = (event) => {
		const selectedIcon = navBar.find(
			(item) => item.label === event.currentTarget.getAttribute('name')
		);

		setNavBar((prevState) => {
			return prevState.map((item) => {
				return item.label === selectedIcon.label
					? {
							...item,
							selected: !selectedIcon.selected,
							icon: {
								...item.icon,
								props: {
									...item.icon.props,
									color: !selectedIcon.selected
										? colorData.selectedColor
										: colorData.unSelectedColor,
								},
							},
					  }
					: item;
			});
		});
	};

	const handleAccount = (event) => {
		const selectedAccount = account.find(
			(item) => item.img === event.target.src
		);

		setAccount((prevState) => {
			return prevState.map((item) => {
				return item.img === selectedAccount.img
					? { ...item, selected: true }
					: { ...item, selected: false };
			});
		});
		setNavBar((prevState) => {
			return prevState.map((item) => {
				return {
					...item,
					selected: false,
					icon: {
						...item.icon,
						props: {
							...item.icon.props,
							color: colorData.unSelectedColor,
						},
					},
				};
			});
		});
	};

	const handleOptions = (event) => {
		setNavBar((prevState) => {
			return prevState.map((item) => {
				const selectedOption = item.options?.map((option) =>
					option.label === event.target.innerText
						? {
								...option,
								selected: true,
						  }
						: { ...option, selected: false }
				);

				return item.label === event.target?.getAttribute('name')
					? {
							...item,
							options: selectedOption,
					  }
					: item;
			});
		});
	};

	const selectedAccount = account.find((account) => account.selected === true);

	return (
		<nav>
			<div className='company-logo-container'>
				<CompanyLogo className='company-logo' />
			</div>
			<div className='nav-bar-container'>
				<div className='accounts-bar'>
					{account.map((account) => {
						return (
							<Link to={account.label.toLowerCase()} key={account.img}>
								<button
									className={account.selected ? 'account selected' : 'account'}
									onClick={handleAccount}>
									<img src={account.img} alt='sidebar logo'></img>
								</button>
							</Link>
						);
					})}
				</div>
				<div className='nav-bar'>
					<div className='notification'>
						<div className='notification-details'>
							<NotificationsIcon />
							<p className='notification-name'>NOTIFICATIONS</p>
							<div className='notif-num'>29</div>
						</div>
					</div>

					<div className='nav-btn-container'>
						{navBar.map((data) => {
							return (
								<div key={data.label}>
									<Link
										to={`${selectedAccount.label}/${data.label.toLowerCase()}`}>
										<div
											onClick={handleNavBar}
											name={data.label}
											className={
												data.selected ? 'nav-btn selected' : 'nav-btn'
											}>
											<div className='nav-btn-details'>
												{data.icon}
												<p className='nav-btn-name'>{data.label}</p>
											</div>
											<button
												className={
													data.selected
														? 'collapse-btn selected'
														: 'collapse-btn'
												}
												onClick={handleNavBar}
												name={data.label}></button>
										</div>
									</Link>
									<div
										className={
											data.options && data.selected
												? 'nav-btn-options'
												: 'nav-btn-options hidden'
										}>
										<ul>
											{data.options?.map((option, index) => {
												return (
													<Link
														to={`${
															selectedAccount.label
														}/${data.label.toLowerCase()}/${option.label.toLowerCase()}`}
														key={index}>
														<li
															onClick={handleOptions}
															name={data.label}
															className={
																option.selected ? 'option selected' : 'option'
															}>
															{option.label}
														</li>
													</Link>
												);
											})}
										</ul>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<Outlet />
		</nav>
	);
}

export default NavBar;
