import * as calc from "../../utils/calc";
import * as constants from "../../constants";

export async function open(data: calc.Results): Promise<void> {
    console.debug(data);

    return new Promise((resolve) => {
        const dialog = document.querySelector<HTMLDialogElement>(`dialog[name="results"]`)!;

        dialog.onclose = () => {
            resolve();
        };

        const content = dialog.querySelector<HTMLElement>(`.content`)!;
        const close = dialog.querySelector<HTMLButtonElement>(`button.close`)!;

        const mainKG = dialog.querySelector<HTMLElement>(`.main-kg`)!;
        const mainPercent = dialog.querySelector<HTMLElement>(`.main-percent`)!;

        const template = dialog.querySelector<HTMLTemplateElement>(`template[name="slot-item"]`)!;

        close.onclick = () => dialog.close();

        mainKG.innerText = `${data.main.kg.toFixed(2)} KG`;
        mainPercent.innerText = `${data.main.percent.toFixed(2)} %`;

        const items = content.querySelectorAll(`.slot-item`);
        items.forEach((item) => content.removeChild(item));

        data.slots.forEach((s, i) => {
            const item = (
                template.content.cloneNode(true) as HTMLElement
            ).querySelector<HTMLElement>(`.slot-item`)!;

            item.querySelector<HTMLElement>(`.name`)!.innerText = `${constants.slotTitles[i]}:`;
            item.querySelector<HTMLElement>(`.kg`)!.innerText = `${s.kg.toFixed(2)} KG`;
            item.querySelector<HTMLElement>(`.percent`)!.innerText = `${s.percent.toFixed(2)} %`;

            content.appendChild(item);
        });

        dialog.showModal();
    });
}
