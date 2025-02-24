import * as calc from "../../utils/calc";

export async function open(data: calc.Results): Promise<void> {
    return new Promise((resolve) => {
        const dialog = document.querySelector<HTMLDialogElement>(`dialog[name="results"]`)!;

        dialog.onclose = () => {
            resolve();
        };

        // TODO: Pass data to dialog

        dialog.showModal();
    });
}
