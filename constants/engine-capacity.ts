export const getEngineCapacity = () => {
    const engineCapacitySet = new Set<string>();

    engineCapacitySet.add("0.05");

    for (let i = 0.05; i <= 13.1; i += 0.1) {
        engineCapacitySet.add(i.toFixed(1));
    }

    const engineCapacity = Array.from(engineCapacitySet);

    return engineCapacity;
};