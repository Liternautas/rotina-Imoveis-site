export function formatDate(date: Date) {
    let day = date.getDate().toString().padStart(2, '0'); // Obtém o dia do mês (com zero à esquerda, se necessário)
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Obtém o mês (com zero à esquerda, se necessário)
    let year = date.getFullYear(); // Obtém o ano

    return  day + '/' + month + '/' + year;
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
      const data = new Date(hoje.getTime() + i * 24 * 60 * 60 * 1000); // adiciona i dias a partir de hoje
      const id = i + 1;
      const day = String(data.getDate()).padStart(2, '0'); // pega o dia com dois dígitos
      const text = diasDaSemana[data.getDay()]; // pega a abreviação do dia da semana
      dias.push({ id, name: day, enum: text, date:  data});
    }
    return dias;
}

export function getMonthList() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Adiciona 1, já que o método getMonth retorna um valor de 0 a 11.

    const monthList = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(year, month - i - 1, 1); // Subtrai i e 1, já que o mês atual é incluído na contagem.
        const monthName = date.toLocaleString('default', { month: 'long' });
        const yearMonth = date.toISOString().slice(0, 7);
        monthList.push({ name: monthName, yearMonth: yearMonth });
    }
    
    return monthList;
}