import * as dialogs from "../../dialogs";
import * as calc from "../../utils/calc";

const defaultFlow = "1.5";

export async function onMount() {
    const t = document.querySelector<HTMLElement>(`#routerTarget`)!;

    const form = t.querySelector<HTMLFormElement>(`form`)!;
    const reset = t.querySelector<HTMLButtonElement>(`input[type="reset"]`)!;

    const mainFlow = t.querySelector<HTMLInputElement>(`input#main-flow`)!;
    const mainRuntime = t.querySelector<HTMLInputElement>(`input#main-runtime`)!;

    const slots: { before: HTMLInputElement; after: HTMLInputElement }[] = [];
    for (const slot of ["1", "2", "3", "4", "5"]) {
        slots.push({
            before: t.querySelector(`input#tower-slot-${slot}-before`)!,
            after: t.querySelector(`input#tower-slot-${slot}-after`)!,
        });
    }

    mainFlow.value = defaultFlow;
    mainRuntime.value = "";

    slots.forEach((slot) => {
        slot.before.value = "";
        slot.after.value = "";
    });

    reset.onclick = (e) => {
        e.preventDefault();
        reload();
    };

    form.onsubmit = async () => {
        await dialogs.results.open(
            calc.consumption({
                flow: parseFloat(mainFlow.value || defaultFlow),
                runtime: parseFloat(mainRuntime.value || "0"),
                slots: slots.map((slot) => {
                    return {
                        before: parseFloat(slot.before.value || "0"),
                        after: parseFloat(slot.after.value || "0"),
                    };
                }),
            }),
        );
    };
}

export async function onDestroy() {}

async function reload() {
    await onDestroy();
    await onMount();
}
