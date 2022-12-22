import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import './logger.page.css';
import { styled } from '@mui/material/styles';
import {
	Badge,
	Fade,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Carousel from 'react-material-ui-carousel'
import FoodService from "../../services/food.service";
import MealPlan from "../../common/meal-plan.model";
import Avatar from "@mui/material/Avatar";
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import Food from "../../common/food.model";
import {useEffect} from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		backgroundColor: '#b70600',
		color: '#b71500',
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			animation: 'ripple 1s infinite ease-in-out',
			border: '1px solid currentColor',
			content: '""',
		},
	},
	'@keyframes ripple': {
		'0%': {
			transform: 'scale(.8)',
			opacity: 1,
		},
		'100%': {
			transform: 'scale(2.4)',
			opacity: 0,
		},
	},
}));
export default function LoggerPage(){
	function formatDate(value){
		return value.get('year').toString()+value.get('month').toString()+value.get('date').toString();
	}

	const [value, setValue] = React.useState(dayjs());
	const [mealPlanMorning, setMealPlanMorning] = React.useState(new MealPlan(0, formatDate(value), 'morning', []));
	const [mealPlanAfternoon, setMealPlanAfternoon] = React.useState(new MealPlan(0, formatDate(value), 'afternoon', []));
	const [mealPlanEvening, setMealPlanEvening] = React.useState(new MealPlan(0, formatDate(value), 'evening', []));

	function getMealPlan(date, timeOfDay){
		let mealPlan = FoodService.getMealPlan(formatDate(date), timeOfDay);
		if(mealPlan !== null){
			return mealPlan;
		}
		else{
			mealPlan = new MealPlan(0, formatDate(date), timeOfDay, []);
			FoodService.addNewMealPlan(mealPlan);
			return mealPlan;
		}
	}

	function setMealsPlansByNewDate(date, timeOfDay){
		let mealPlan = getMealPlan(date, timeOfDay);
		if(timeOfDay === 'morning'){
			setMealPlanMorning(mealPlan);
		}else if(timeOfDay === 'afternoon'){
			setMealPlanAfternoon(mealPlan)
		}else if(timeOfDay === 'evening'){
			setMealPlanEvening(mealPlan);
		}
	}

	const addFoodsToMealPlan = () => {
		const newFood = new Food('0001', 'Pepsi' , 'test', 10, 20, 30, 40, 50, 300, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyouings.com%2Fcontent%2Fimages%2Fthumbs%2F0002214.jpeg&f=1&nofb=1&ipt=95c7201a0bc2ead6e11153356a7e1e33da03d0cbd58b960b5ba73c370c7eee6a&ipo=images', 250, 1);
		setMealPlanMorning(prevPlan => ({
			...prevPlan,
			consumedFoods: [...prevPlan.consumedFoods, newFood]
		}));

		let mealPlanTemp = mealPlanMorning;
		if (!mealPlanTemp.consumedFoods.some(food => food.barcode === newFood.barcode)) {
			mealPlanTemp.consumedFoods.push(newFood);
		}
		FoodService.addNewMealPlan(mealPlanTemp);
	};

	useEffect(()=>{
		setMealPlanMorning(getMealPlan(value, 'morning'));
		setMealPlanAfternoon(getMealPlan(value, 'afternoon'));
		setMealPlanEvening(getMealPlan(value, 'evening'));
		addFoodsToMealPlan();
	},[])

	const removeFoodForMealPlan = (barcode, timeOfDay) => {
		if(timeOfDay === 'morning'){
			// Create a new array that does not include the item with the specified id
			const newMealPlanFood = mealPlanMorning.consumedFoods.filter(item => item.barcode !== barcode);

			// Update the object's items array with the new array
			setMealPlanMorning({ ...mealPlanMorning, consumedFoods: newMealPlanFood });

			FoodService.removeFoodFromMealPlan(formatDate(value), timeOfDay, barcode)
		}
		else if(timeOfDay === 'afternoon'){
			// Create a new array that does not include the item with the specified id
			const newMealPlanFood = mealPlanAfternoon.consumedFoods.filter(item => item.barcode !== barcode);

			// Update the object's items array with the new array
			setMealPlanAfternoon({ ...mealPlanAfternoon, consumedFoods: newMealPlanFood });
		}else if(timeOfDay === 'evening'){
			// Create a new array that does not include the item with the specified id
			const newMealPlanFood = mealPlanEvening.consumedFoods.filter(item => item.barcode !== barcode);

			// Update the object's items array with the new array
			setMealPlanEvening({ ...mealPlanEvening, consumedFoods: newMealPlanFood });
		}
	}

	const loadMorningFood = () => {
		if(mealPlanMorning.consumedFoods.length === 0){
			return (
				<div className={'no-food-message'}>
					<div className={'typewriter'}>
						<h2>No food registered for morning...</h2>
					</div>
				</div>
			);
		}else{
			return <></>
		}
	}

	const loadAfternoonFood = () => {
		if(mealPlanAfternoon.consumedFoods.length === 0){
			return (
				<div className={'no-food-message'}>
					<div className={'typewriter'}>
						<h2>No food registered for afternoon...</h2>
					</div>
				</div>
			);
		}else{
			return <></>
		}
	}

	const loadEveningFood = () => {
		if(mealPlanEvening.consumedFoods.length === 0){
			return (
				<div className={'no-food-message'}>
					<div className={'typewriter'}>
						<h2>No food registered for evening...</h2>
					</div>
				</div>
			);
		}else{
			return <></>
		}
	}

	return (
		<div className={'page-wrapper'}>
			<Fade in={true} timeout={800}>
				<div className={'top-container'}>
					<div className={'date-container'}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<MobileDatePicker
								label="Select date"
								value={value}
								onChange={(newValue) => {
									setValue(newValue);
									setMealsPlansByNewDate(newValue, 'morning');
									setMealsPlansByNewDate(newValue, 'afternoon');
									setMealsPlansByNewDate(newValue, 'evening');
								}}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</div>
					<div className={'stats-container'}>
						<Carousel>

						</Carousel>
					</div>
				</div>
			</Fade>
			<div className={'bottom-container'}>
				<Fade in={true} timeout={800}>
					<div className={'food-plan'}>
						<h1>Morning</h1>
						<List dense={true}>
							<TransitionGroup>
								{loadMorningFood()}
								{mealPlanMorning.consumedFoods.map(food => {
										return (
											<Collapse key={food.barcode}>
												<ListItem
													divider={true}
												>
													<ListItemAvatar>
														<StyledBadge
															overlap="circular"
															anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
															variant="dot"
														>
															<Avatar alt="Remy Sharp" src={food.imageUrl} />
														</StyledBadge>
													</ListItemAvatar>
													<ListItemText
														primary={food.name}
														secondary={'Qty: '+food.consumedQuantity+' | '+food.totalCalories+' cal'}
													/>
													<IconButton edge="end" onClick={() => removeFoodForMealPlan(food.barcode, 'morning')}>
														<DeleteIcon />
													</IconButton>
												</ListItem>
											</Collapse>
										);
									}
								)}
							</TransitionGroup>
						</List>
					</div>
				</Fade>
				<Fade in={true} timeout={800}>
					<div className={'food-plan'}>
						<h1>Afternoon</h1>
						<List>
							<TransitionGroup>
								{loadAfternoonFood()}
								{mealPlanAfternoon.consumedFoods.map(food => {
										return (
											<Collapse key={food.barcode}>
												<ListItem
													divider={true}
												>
													<ListItemAvatar>
														<Avatar src={food.imageUrl}>
														</Avatar>
													</ListItemAvatar>
													<ListItemText
														primary={food.name}
														secondary={'Qty: '+food.consumedQuantity}
													/>
													<IconButton edge="end" onClick={() => removeFoodForMealPlan(food.barcode, 'afternoon')}>
														<DeleteIcon />
													</IconButton>
												</ListItem>
											</Collapse>
										);
									}
								)}
							</TransitionGroup>
						</List>
					</div>
				</Fade>
				<Fade in={true} timeout={800}>
					<div className={'food-plan'}>
						<h1>Evening</h1>
						<List>
							<TransitionGroup>
								{loadEveningFood()}
								{mealPlanEvening.consumedFoods.map(food => {
										return (
											<Collapse key={food.barcode}>
												<ListItem
													divider={true}
												>
													<ListItemAvatar>
														<Avatar src={food.imageUrl}>
														</Avatar>
													</ListItemAvatar>
													<ListItemText
														primary={food.name}
														secondary={'Qty: '+food.consumedQuantity}
													/>
													<IconButton edge="end" onClick={() => removeFoodForMealPlan(food.barcode, 'evening')}>
														<DeleteIcon />
													</IconButton>
												</ListItem>
											</Collapse>
										);
									}
								)}
							</TransitionGroup>
						</List>
					</div>
				</Fade>
			</div>
		</div>
	);
}
