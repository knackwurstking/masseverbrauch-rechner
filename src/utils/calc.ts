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

// TODO: ...
export function consumption(data: Data): Results {
    const main: Consumption = {
        kg: 0,
        percent: 0,
    };

    const slots: Consumption[] = [];

    return { data, main, slots };
}
