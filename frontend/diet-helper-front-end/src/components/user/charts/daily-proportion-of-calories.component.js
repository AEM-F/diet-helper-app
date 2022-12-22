import { Chart as ChartJS, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(...registerables);

export default function DailyProportionOfCalories(){
    const proteinCalories = 50; // 180 calories from protein
    const carbCalories = 100; // 520 calories from carbohydrates
    const fatCalories = 20; // 120 calories from fat

    const data = {
        labels: ['Protein', 'Carbohydrates', 'Fat'],
        datasets: [
            {
                data: [proteinCalories, carbCalories, fatCalories],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
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
        },
        plugins: {
            title: {
                display: true,
                text: 'Daily proportion of calories'
            }
        },
        legend: {
            display: true,
            labels: {
                fontColor: '#625D5D',
                fontSize: 16,
            },
        },
        tooltips: {
            callbacks: {
                label: (tooltipItem, data) => {
                    const label = data.labels[tooltipItem.index];
                    const value = data.datasets[0].data[tooltipItem.index];
                    return `${label}: ${value} calories`;
                },
            },
        },
    };

    return (
        <div className={'chart-wrap'}>
            <Pie data={data} options={options} />
        </div>
    );
}
