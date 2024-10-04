// Month Util Functions
export const get12MonthsAhead = (): string[] => {
    const result: string[] = [];

    const currentDate = new Date();
    // currentDate.setFullYear(currentDate.getFullYear() + yearOffset);
    result.push(currentDate.toLocaleString('en-gb', { month: 'short', year: "numeric" }));

    for (let i = 0; i < 11; i++) {
        currentDate.setMonth(currentDate.getMonth() + 1)
        //year: "2-digit"
        const month = currentDate.toLocaleString('en-gb', { month: 'short', year: "numeric" });
        result.push(month)
    }

    return result;
}
export const parseDateString = (dateString: string) => {
    // Split the input string to extract the month and year
    const [monthStr, yearStr] = dateString.split(' ');

    // Create a mapping of short month names to their numerical equivalent
    const monthMap: { [key: string]: number } = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };

    // Get the correct numerical month
    const month = monthMap[monthStr];

    // Parse the year to determine the full 4-digit version
    const year = parseInt(yearStr, 10);

    // Create a Date object for the first day of the next month, then set the date to 0 to get the last day of the desired month
    return new Date(year, month, 1);
}
export const isCurrentMonth = (month: string) => {
    return month.toLowerCase() == (new Date()).toLocaleString('en-gb', { month: 'short', year: "numeric" }).toLowerCase()
}
export const isInThisMonth = (date: Date, month: string) => {
    return month.toLowerCase() == date.toLocaleString('en-gb', { month: 'short', year: "numeric" }).toLowerCase()
}
export const daysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
}