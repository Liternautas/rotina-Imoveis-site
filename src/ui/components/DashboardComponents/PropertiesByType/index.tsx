import { Container } from "./styles";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);




export function Properties({ properties, types }) {
    const data = {
        labels: properties.map(item => {
            let type = types.find(type => item.typeId === type.id);
            if(type) return type.name;
        }),
        datasets: [
            {
                label: 'Imóveis',
                data: properties.map(item => {
                    return  Number(item.num_aluguel) + Number(item.num_venda);
                }),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    return (
        <Container>
            <h4>Imóveis por tipo</h4>
            <div style={{
                display: 'flex',
                maxWidth: '100%'
            }}>
                <Pie
                    data={data}
                />
            </div>
        </Container>
    )
}