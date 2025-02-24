import { describe, test, expect } from "@jest/globals";

import * as calc from "./calc";

describe("calc", () => {
    test("consumption", () => {
        const check: calc.Results = {
            data: {
                flow: 1.5, // KG/s
                runtime: 950 / 1.5 / 60,
                slots: [
                    { before: 10, after: 10 + 10 },
                    { before: 20, after: 20 + 10 },
                    { before: 30, after: 30 + 10 },
                    { before: 15, after: 15 + 10 },
                    { before: 16.5, after: 16.5 + 10 },
                ],
            },

            main: {
                kg: 950,
                percent: 95,
            },

            slots: [
                { kg: 10, percent: 1 },
                { kg: 10, percent: 1 },
                { kg: 10, percent: 1 },
                { kg: 10, percent: 1 },
                { kg: 10, percent: 1 },
            ],
        };

        expect(calc.consumption(check.data)).toStrictEqual(check);
    });
});
