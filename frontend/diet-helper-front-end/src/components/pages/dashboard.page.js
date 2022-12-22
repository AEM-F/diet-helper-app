import * as React from 'react';
import './dashboard.css';
import DailyIntakeChart from "../user/charts/daily-intake-chart.component";
import {Fade} from "@mui/material";
import DailyProportionOfCalories from "../user/charts/daily-proportion-of-calories.component";
import WeeklyFoodIntakeChartProtein from "../user/charts/weekly-food-intake-chart.component";
import WeeklyFoodIntakeChartCarbs from "../user/charts/weekly-food-intake-chart-carbs.component";
import WeeklyFoodIntakeChartFat from "../user/charts/weekly-food-intake-chart-fat.component";
import NutrientIntakeByMealChart from "../user/charts/nutrient-intake-by-meal-chart.component";

export default function DashboardPage(){
	return (
		<Fade in={true} timeout={800}>
			<div className={'charts-wrapper'}>
				<h1 className={'section-title'}>Macro nutrients</h1>
				<div className="typewriter">
					<h1 style={{fontSize: 12}}>Daily:</h1>
				</div>
				<DailyIntakeChart/>
				<DailyProportionOfCalories/>
				<NutrientIntakeByMealChart/>
				<div className="typewriter">
					<h1 style={{fontSize: 12}}>Weekly:</h1>
				</div>
				<WeeklyFoodIntakeChartProtein/>
				<WeeklyFoodIntakeChartCarbs/>
				<WeeklyFoodIntakeChartFat/>
			</div>
		</Fade>
	);
}
