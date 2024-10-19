import { readable, writable, derived } from "svelte/store";

export const transactions = writable([]);

let today = new Date();

export const activeMonth = writable([
  today.getFullYear(),
  today.getMonth(),
  today.toLocaleString("default", { month: "long" }),
]);
