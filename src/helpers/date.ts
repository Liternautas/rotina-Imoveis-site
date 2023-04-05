export function formatDate(date: Date) {
    let day = date.getDate().toString().padStart(2, '0'); // Obtém o dia do mês (com zero à esquerda, se necessário)
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Obtém o mês (com zero à esquerda, se necessário)
    let year = date.getFullYear(); // Obtém o ano

    return  day + '/' + month + '/' + year;
}