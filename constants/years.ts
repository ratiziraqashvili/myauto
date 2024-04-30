export const getYears = () => {
    const years = [];

    for (let i = 2024; i >= 1900; i--) {
        years.push(i);
    }
    
    return years;
}