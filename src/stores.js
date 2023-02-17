import Pocketbase from "pocketbase";
import { writable } from "svelte/store";

export const pb = new Pocketbase("https://tickets.elegantwebcreations.com");

export const unCompletedTickets = writable();
export const deleteModal = writable(false);
