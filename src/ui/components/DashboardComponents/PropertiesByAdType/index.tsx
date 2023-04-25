import { Container } from "./styles";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useCallback, useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PropertiesByAdType({properties}) {
    const [totalSales, setTotalSales] = useState(0);
    const [totalRentals, setTotalRentals] = useState(0);

    const dataAdType = {
        labels: ['Aluguel', 'Venda'],
        datasets: [
            {
                label: 'Imóveis',
                data: [totalRentals, totalSales],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            }
        ]
    }

    const handleCount = useCallback(() => {
        let sales = 0;
        let rantals = 0;
        if(properties) {
            properties.forEach(item => {
                rantals = rantals + Number(item.num_aluguel);
                sales = sales + Number(item.num_venda);
            })
            setTotalRentals(rantals);
            setTotalSales(sales);
        }
    }, [properties])

    useEffect(() => {
        handleCount();
    }, [properties]);

    return (
        <Container>
            <h4>Imóveis por tipo de anúncio</h4>
            <div style={{
                display: 'flex',
                maxWidth: '100%'
            }}>
                <Pie
                    data={dataAdType}
                />
            </div>
        </Container>
    )
}