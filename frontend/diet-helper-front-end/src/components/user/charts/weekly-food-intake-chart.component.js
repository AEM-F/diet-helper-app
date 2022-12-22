import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(...registerables);

export default function WeeklyFoodIntakeChartProtein(){

    const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // label the x-axis with the days of the week
        datasets: [
            {
                label: 'Protein Intake',
                data: [500, 1200, 300, 890, 1000, 450, 500], // the y-axis values representing the nutrient intake
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                pointBackgroundColor: 'white', // optional: add markers or annotations to highlight specific food items
                pointBorderColor: 'black',
                pointRadius: 5,
                pointHoverRadius: 8,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Weekly protein intake'
            }
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true, // set the y-axis to start at zero
                    },
                    grid: {
                        color: '#625D5D'
                    }
                },
            ],
            xAxes: [
                {
                    grid: {
                        color: '#625D5D'
                    }
                }
            ]
        },
    };


    return (
        <div className={'chart-wrap'}>
            <Line data={data} options={options} />
        </div>
    );
}
