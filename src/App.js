import React from 'react';

import DetailsPage from './components/details-page/DetailsPage';
import ComingSoon from './components/coming-soon/ComingSoon';

import NavBar from './components/navbar/NavBar';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<Router>
				<NavBar />
				<Routes>
					<Route exact path='/' element={<DetailsPage />} />
					<Route
						exact
						path='account-four/publish/feed'
						element={<DetailsPage />}
					/>
					<Route path='/*' element={<ComingSoon />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
