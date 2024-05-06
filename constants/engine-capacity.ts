export const getEngineCapacity = () => {
    const engineCapacitySet = new Set<string>();

    engineCapacitySet.add("0.05");

    for (let i = 0.05; i <= 13.1; i += 0.1) {
        engineCapacitySet.add(i.toFixed(1));
    }

    const engineCapacity = Array.from(engineCapacitySet);

    return engineCapacity;
};

export const motorCycleEngineCapacity = [
    "50",
    "80",
    "125",
    "150",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
    "1100",
    "1200",
    "1300",
    "1400",
    "1500",
    "1600",
    "1700",
    "1800",
    "1900",
    "2000",
  ];
  