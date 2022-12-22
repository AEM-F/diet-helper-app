import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(...registerables);

export default function NutrientIntakeByMealChart(){
    const data = {
        labels: ['Morning', 'Afternoon', 'Evening'], // label the x-axis with the meals of the day
        datasets: [
            {
                label: 'Protein',
                data: [50, 100, 150], // the y-axis values representing the protein intake
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Carbohydrates',
                data: [100, 150, 200], // the y-axis values representing the carbohydrate intake
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Fats',
                data: [20, 40, 60], // the y-axis values representing the fat intake
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Macro nutrients intake by meal'
            }
        },
        scales: {
            yAxes: [
                {
                    stacked: true, // set the y-axis to be stacked
                    ticks: {
                        beginAtZero: true, // set the y-axis to start at zero
                    },
                },
            ],
        },
    };

    return (
        <div className={'chart-wrap'}>
            <Bar data={data} options={options} />
        </div>
    );
}
