import { Chart as ChartJS, registerables } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import UserService from "../../../services/user.service";
ChartJS.register(...registerables);

export default function DailyIntakeChart(){
    const userData = UserService.getUserFromLocalStorage();

    const data = {
        labels: ['Protein', 'Carbohydrates', 'Fat'],
        datasets: [
            {
                label: 'Daily Intake',
                //data: [userProteinIntake, userCarbIntake, userFatIntake],
                data: [50, 100, 20],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                borderWidth: 1,
            },
            {
                label: 'Recommended Daily Values',
                data: [userData.proteinRecommanded, userData.carbsRecommanded, userData.fatRecommanded],
                backgroundColor: ['rgba(196,60,60,0.99)', '#264ea4', '#d98f05'],
                borderWidth: 1,
            },
        ],
    };

    return(
        <div className={'chart-wrap'}>
            <Doughnut data={data} options={{
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
                        text: 'Macros consumed vs recommended'
                    }
                }
            }}/>
        </div>
    );
}
