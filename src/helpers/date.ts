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