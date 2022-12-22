import React, {useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

// eslint-disable-next-line react/prop-types
const BMRChart = ({ gender, weight, height, age }) => {
	function calculateBMR(gender, weight, height, age) {
		// The Mifflin-St. Jeor equation for calculating BMR is as follows:
		// BMR = (10 * weight in kg) + (6.25 * height in cm) - (5 * age in years) + s
		// where s is +5 for males and -161 for females
		const s = gender === 'male' ? 5 : -161;
		const currentBMR = (10 * weight) + (6.25 * height) - (5 * age) + s;

		// The best BMR is calculated by assuming the person is at their highest weight
		const bestBMR = (10 * (weight * 1.1)) + (6.25 * height) - (5 * age) + s;

		return { currentBMR, bestBMR };
	}


	const [currentBMR, setCurrentBMR] = useState(0);
	const [bestBMR, setBestBMR] = useState(0);
	useEffect(()=> {
		const bmrs = calculateBMR(gender, weight, height, age);
		setCurrentBMR(bmrs.currentBMR);
		setBestBMR(bmrs.bestBMR);
	});

	const data = {
		labels: ['Current BMR', 'Best BMR'],
		datasets: [
			{
				label: 'BMR (calories)',
				data: [currentBMR, bestBMR],
				backgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(128,255,86,0.8)'],
				borderColor: ['rgba(54, 162, 235, 1)', 'rgba(128,255,86,0.93)'],
				borderWidth: 1
			}
		]
	};

	return (
		<div style={{width: '300px', height: '300px'}}>
			<Bar
				data={data}
				options={{
					maintainAspectRatio: false,
					responsive: true,
					scales: {
						x: {
							grid: {
								color: '#625D5D'
							}
						},
						y:{
							grid: {
								color: '#625D5D'
							}
						}
					}
				}}/>
		</div>
	);
};

export default BMRChart;
