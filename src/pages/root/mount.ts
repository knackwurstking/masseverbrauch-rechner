import * as ui from "ui";

let cleanup: ui.CleanUpFunction[] = [];

export async function onMount() {
    // TODO: ...
}

export async function onDestroy() {
    cleanup.forEach((fn) => fn());
    cleanup = [];
}
