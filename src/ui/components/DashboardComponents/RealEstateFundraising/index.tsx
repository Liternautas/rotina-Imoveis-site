import { useEffect, useState } from "react";
import { Container } from "./styles";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { getMonthList } from "@/src/helpers/date";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        }
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Aluguel',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Venda',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export function RealEstateFundraising({ propertiesByMonth }) {
    const [monthList, setMonthList] = useState([]);
    const [dataSales, setDataSales] = useState<any>([]);
    const [dataRentals, setDataRentals] = useState<any>([]);

    const data = {
        labels: monthList,
        datasets: [
            {
                label: 'Aluguel',
                data: dataRentals,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Venda',
                data: dataSales,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    useEffect(() => {
        let months = getMonthList();
        months = months.reverse();
        setMonthList(months.map(month => month.name));
        const sales = [];
        const rentals = [];
        months.forEach(item => {
            let quantitySales = 0;
            let quantityRentals = 0;
            propertiesByMonth.forEach(month => {
                if (month.month === item.yearMonth && month.adType === 'venda') {
                    quantitySales = quantitySales + Number(month.count);
                }
                if (month.month === item.yearMonth && month.adType === 'aluguel') {
                    quantityRentals = quantityRentals + Number(month.count);
                }
            });
            sales.push(quantitySales);
            rentals.push(quantityRentals);
        });
        setDataRentals(rentals);
        setDataSales(sales);
    }, []);
    return (
        <Container>
            <h4>Captação de Imóveis</h4>
            <Line options={options} data={data} />
        </Container>
    )
}