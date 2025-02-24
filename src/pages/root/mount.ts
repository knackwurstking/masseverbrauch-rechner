import * as ui from "ui";

let cleanup: ui.CleanUpFunction[] = [];

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
            after: t.querySelector(`input#tower-slot-${slot}-before`)!,
        });
    }

    mainFlow.value = "1.5";
    mainRuntime.value = "";

    slots.forEach((slot) => {
        slot.before.value = "";
        slot.after.value = "";
    });

    reset.onclick = (e) => {
        e.preventDefault();
        reload();
    };

    form.onsubmit = () => {
        // TODO: Calculate results and open results dialog
    };

    // TODO: ...
}

export async function onDestroy() {
    cleanup.forEach((fn) => fn());
    cleanup = [];
}

async function reload() {
    await onDestroy();
    await onMount();
}
