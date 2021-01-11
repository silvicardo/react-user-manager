import {rest, setupWorker} from "msw";

export const worker = setupWorker();

// Make the `worker` and `rest` references available globally,
// so they can be accessed in both runtime and test suites.
window.msw = {
    worker,
    rest,
}