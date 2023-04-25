import { ColumnText, Container, Row } from "./styles";
import { useEffect, useState } from "react";
import VMasker from "vanilla-masker";

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
    scales: {
        yAxes: [
            {
                ticks: {
                    callback: function (value, index, values) {
                        return (value / 1000).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
                    }
                }
            }
        ]
    },
    plugins: {
        legend: {
            position: 'top' as const,
            labels: {
                labelFormatter: function (value, context) {
                    return (value / 1000).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
                }
            }
        },
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

export function Invoicing({ salesContracts, rentalContracts }) {
    const [monthList, setMonthList] = useState([]);
    const [dataSales, setDataSales] = useState<any>([]);
    const [dataRentals, setDataRentals] = useState<any>([]);
    const [valueRentals, setValueRentals] = useState(0);
    const [valueSales, setValueSales] = useState(0);

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
            salesContracts.forEach(month => {
                if (month.month === item.yearMonth) {
                    quantitySales = quantitySales + Number(month.invoicing);
                }
            });
            rentalContracts.forEach(month => {
                if (month.month === item.yearMonth) {
                    quantityRentals = quantityRentals + Number(month.invoicing);
                }
            });

            sales.push(quantitySales);
            rentals.push(quantityRentals);
        });

        let valueSales = 0;
        let valueRentals = 0;

        salesContracts.forEach(item => valueSales = valueSales + Number(item.invoicing));
        rentalContracts.forEach(item => valueRentals = valueRentals + Number(item.invoicing));

        setDataRentals(rentals);
        setDataSales(sales);
        setValueRentals(valueRentals);
        setValueSales(valueSales);
    }, []);
    return (
        <Container>
            <h4>Faturamento</h4>
            <Row>
                <ColumnText>
                    <span>Aluguel</span>
                    <strong>R$ {VMasker.toMoney(valueRentals)}</strong>
                </ColumnText>
                <ColumnText>
                    <span>Venda</span>
                    <strong>R$ {VMasker.toMoney(valueSales)}</strong>
                </ColumnText>
            </Row>
            <Line options={{
                scales: {
                    y: {
                        ticks: {
                            callback: function (value, index, values) {
                                return (+value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
                            }
                        }
                    },
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';

                                if (label) {
                                    label += ': ';
                                }

                                label += (context.parsed.y / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });

                                return label;
                            }
                        }
                    },
                    legend: {
                        position: 'top' as const,
                        labels: {

                        }
                    },
                },
            }} data={data} />
        </Container>
    )
}