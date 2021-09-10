import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
        {
            label: 'Frecuencia cardiaca promedio',
            data: [5, 3, 6, 1, 0, 4, 10],
            backgroundColor: 'rgba(214, 207, 207, 0.5)',
            borderWidth: 0,
        },
        {
            label: 'Oxigenación promedio',
            data: [12, 19, 3, 5, 2, 3, 10],
            backgroundColor: 'rgba(22, 130, 255, 0.5)',
            borderWidth: 0,
        },
    ],
};

const options = {
    responsive: true,
    scales: {
        xAxes: [{
            stacked: true,
            barPercentage: 0.4
        }],
        yAxes: [
            {
                stacked: true,
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};


const Oxygen = () => {
    return <Bar data={data} options={options} />
};

export default Oxygen;