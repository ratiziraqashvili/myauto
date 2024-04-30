export const getEngineCapacity = () => {
    const engineCapacity: string[] = ["0.05"];

  
    for (let i = 0.05; i <= 13.1; i += 0.1) {
        engineCapacity.push(i.toFixed(1).toString());
    }
  
    return engineCapacity;
  };