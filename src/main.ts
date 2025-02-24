import { registerSW } from "virtual:pwa-register";

import * as ui from "ui";

import * as pages from "./pages";
import * as constants from "./constants";

// PWA Updates

const updateSW = registerSW({
    async onNeedRefresh() {
        if (confirm(`Update verfügbar. Zum Aktualisieren bestätigen.`)) {
            await updateSW();
        }
    },
});

// Pre

const versionContainer = document.querySelector<HTMLElement>(`.version-container`)!;
versionContainer.querySelector<HTMLElement>(`.version`)!.innerText = `${constants.version} `;
versionContainer.querySelector<HTMLElement>(`.build`)!.innerText = `[Build: ${constants.build}]`;

// Router

ui.router.hash.init(document.querySelector(`#routerTarget`)!, {
    "/": {
        title: "Masseverbrauch Rechner",
        template: {
            selector: `template[name="root"]`,
            onMount() {
                pages.root.onMount();
            },
            onDestroy() {
                pages.root.onDestroy();
            },
        },
    },
});
