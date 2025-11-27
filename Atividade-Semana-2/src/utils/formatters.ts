export const formatCurrency = (amount: number): string => {
    const formattedCurrency = amount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    return formattedCurrency;
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formatedDate = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'UTC',
    });
    return formatedDate;
};
