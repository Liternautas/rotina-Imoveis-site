import { Alert } from "@mui/material";

export function formatDate(date: Date) {
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear();

    return day + '/' + month + '/' + year;
}

export interface IDay {
    id: number,
    name: string,
    enum: string,
    date: Date;
}

export const findDays = () => {
    const diasDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
    const hoje = new Date();
    const dias: IDay[] = [];

    for (let i = 0; i < 7; i++) {
        const data = new Date(hoje.getTime() + i * 24 * 60 * 60 * 1000);
        const id = i + 1;
        const day = String(data.getDate()).padStart(2, '0');
        const text = diasDaSemana[data.getDay()];
        dias.push({ id, name: day, enum: text, date: data });
    }
    return dias;
}

export function getMonthList() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const monthList = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(year, month - i - 1, 1);
        const monthName = date.toLocaleString('default', { month: 'long' });
        const yearMonth = date.toISOString().slice(0, 7);
        monthList.push({ name: monthName, yearMonth: yearMonth });
    }

    return monthList;
}