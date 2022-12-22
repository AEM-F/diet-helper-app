import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {useEffect, useState} from 'react';
import {SpinningOrbitLoader} from 'react-loaders-kit';
import UserService from '../../services/user.service';

import './user-macro-details.css';
import BMRChart from '../user/bmr-chart.component';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

function UserMacroDetailsPage() {
	const navigate = useNavigate();
	const [isDisplayed, setIsDisplayed] = useState(false);
	const [load, setLoad] = useState(true);
	const [user, setUser] = useState(undefined);

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function checkBMR(bmr) {
		// Determine if BMR is good or bad based on reference values
		if (bmr < 1000) {
			return 'too low';
		} else if (bmr > 2500) {
			return 'too high';
		} else {
			return 'within normal range';
		}
	}


	useEffect(() => {
		console.log(localStorage.getItem('user'));
		setUser(UserService.getUserFromLocalStorage());
		const timer = setTimeout(() => {
			setLoad(false);
		}, 4000);

		setInterval(() => {
			setIsDisplayed(true);
		}, 9000);

		return () => clearTimeout(timer);
	}, []);

	function toNextStep () {
		let user = {temp: 'temp'};
		localStorage.setItem('user', JSON.stringify(user));
		navigate('/logger', {replace: true});
		window.location.reload();
	}

	function entryTextStyle(isDisplayed){
		if(isDisplayed){
			return {marginTop : '0'};
		}else{
			return {marginTop : '200px'};
		}
	}

	const loadContent = () => {
		if(user){
			return (
				<div>
					<CssBaseline />
					<div className={'base-wrapper'}>
						<div className="typewriter" style={entryTextStyle(isDisplayed)}>
							<h2>Take a look at your information: {user.lastName}</h2>
						</div>
						{
							isDisplayed &&
							<div style={{height: 'auto',
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								flexDirection: 'column',
								alignItems: 'center', gap: '8px'}}>
								<div className={'user-info'}>
									<div className={'main-title'}>General Information</div>
									<div className={'user-info-wrapper'}>
										<p className={'label'}>
											FIRST NAME:
										</p>
										<p className={'info'}>
											{user.firstName}
										</p>
									</div>
									<div className={'user-info-wrapper'}>
										<p className={'label'}>
											LAST NAME:
										</p>
										<p className={'info'}>
											{user.lastName}
										</p>
									</div>
									<div className={'user-info-inner-wrapper'}>
										<div className={'user-info-wrapper'}>
											<p className={'label'}>
												AGE:
											</p>
											<p className={'info'}>
												{user.age}
											</p>
										</div>
										<div className={'user-info-wrapper'}>
											<p className={'label'}>
												HEIGHT:
											</p>
											<p className={'info'}>
												{user.height} cm
											</p>
										</div>
										<div className={'user-info-wrapper'}>
											<p className={'label'}>
												WEIGHT:
											</p>
											<p className={'info'}>
												{user.weight} kg
											</p>
										</div>
									</div>
									<div className={'user-info-wrapper'}>
										<p className={'label'}>
											ACTIVITY LEVEL:
										</p>
										<p className={'info'}>
											{capitalizeFirstLetter(user.activityLevel)}
										</p>
									</div>
								</div>
								<div className={'calculated-info'}>
									<p className={'main-title'}>Daily intake</p>
									<div className={'user-info-wrapper'}>
										<p className={'label'}>
											PROTEIN:
										</p>
										<p className={'info'}>
											{user.proteinRecommanded}g
										</p>
									</div>
									<div className={'user-info-wrapper'}>
										<p className={'label'}>
											CARBS:
										</p>
										<p className={'info'}>
											{user.carbsRecommanded}g
										</p>
									</div>
									<div className={'user-info-wrapper'}>
										<p className={'label'}>
											FAT:
										</p>
										<p className={'info'}>
											{user.fatRecommanded}g
										</p>
									</div>
									<div className={'user-info-wrapper'}>
										<p className={'label'}>
											SUGAR:
										</p>
										<p className={'info'}>
											{user.sugarRecommanded}g
										</p>
									</div>
									<div className={'user-info-wrapper'}>
										<p className={'label'}>
											SALT:
										</p>
										<p className={'info'}>
											{user.saltRecommanded}g
										</p>
									</div>
									<div className={'user-info-wrapper'}>
										<p className={'label'}>
											Calories:
										</p>
										<p className={'info'}>
											{user.caloriesRecommanded} cal
										</p>
									</div>
									<p className={'main-title'}>Based on our calculations your BMR status is {checkBMR(user.bmr)}</p>
								</div>
								<BMRChart weight={user.weight} gender={user.gender} age={user.age} height={user.height}/>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
									onClick={toNextStep}
								>
									Continue
								</Button>
							</div>
						}

					</div>
				</div>
			);
		}else{
			return (
				<div>
					<h1>ERROR GETTING USER!</h1>
				</div>
			);
		}
	};

	const loadLoader = () => {
		return (
			<div className={'loader-wrapper'}>
				<CssBaseline />
				<SpinningOrbitLoader size={100} loading={load} colors={['#0f0', '#ffffff', '#ffffff', '#0f0']}/>
				<div className="typewriter">
					<h1>Analyzing your data.</h1>
				</div>
			</div>
		);
	};

	if(load) {
		return loadLoader();
	}
	else{
		return loadContent();
	}
}

export default UserMacroDetailsPage;
