export interface Data {
    flow: number;
    runtime: number;
    slots: {
        before: number;
        after: number;
    }[];
}

export interface Consumption {
    kg: number;
    percent: number;
}

export interface Results {
    data: Data;
    main: Consumption;
    slots: Consumption[];
}

export function consumption(data: Data): Results {
    const main: Consumption = {
        kg: data.flow * (data.runtime * 60),
        percent: 0,
    };

    const slots: Consumption[] = [];
    let slotsKG: number = 0;

    let kg: number;
    data.slots.forEach((slot) => {
        slotsKG += kg = slot.after - slot.before;
        slots.push({
            kg: kg,
            percent: 0,
        });
    });

    let slotsPercentage: number = 0;

    const sumKg = main.kg + slotsKG;
    slots.forEach((slot) => {
        slot.percent = slot.kg / (sumKg / 100);
        slotsPercentage += slot.percent;
    });

    main.percent = 100 - slotsPercentage;

    return { data, main, slots };
}
