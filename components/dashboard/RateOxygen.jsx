import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
        {
            label: 'Frecuencia cardiaca',
            data: [5, 3, 6, 1, 0, 4, 10],
            borderColor: '#33FFB8',
            tension: 0.4,
            filled: false,
        },
        {
            label: 'Oxigenación',
            data: [12, 19, 3, 5, 2, 3, 10],
            borderColor: 'rgba(22, 130, 255, 0.5)',
            tension: 0.4,
            filled: false,
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            stacked: true,
            barPercentage: 0.4
        },
        y: {
            stacked: true,
            suggestedMin: 50,
        },
    },
};


const RateOxygen = () => {
    return <div style={{ height: '40vh' }}>
        <Line data={data} options={options} />
    </div>
};

export default RateOxygen;