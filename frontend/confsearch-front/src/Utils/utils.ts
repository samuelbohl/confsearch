// Month Util Functions
export const get12MonthsAhead = (): string[] => {
    const result: string[] = [];

    const currentDate = new Date();
    result.push(currentDate.toLocaleString('default', { month: 'short' }));

    for (let i = 0; i < 11; i++) {
        currentDate.setMonth(currentDate.getMonth() + 1)
        const month = currentDate.toLocaleString('default', { month: 'short' });
        result.push(month)
    }

    return result;
}
export const isCurrentMonth = (month: string) => {
    return month.toLowerCase() == (new Date()).toLocaleString('default', { month: 'short' }).toLowerCase()
}
export const isInThisMonth = (date: Date, month: string) => {
    return month.toLowerCase() == date.toLocaleString('default', { month: 'short' }).toLowerCase()
}
export const daysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
}