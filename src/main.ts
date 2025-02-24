import * as ui from "ui";
import { registerSW } from "virtual:pwa-register";

import * as pages from "./pages";

// PWA Updates

const updateSW = registerSW({
    async onNeedRefresh() {
        if (confirm(`Update verfügbar. Zum Aktualisieren bestätigen.`)) {
            await updateSW();
        }
    },
});

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
