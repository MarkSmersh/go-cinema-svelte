import { writable } from 'svelte/store';

export const isSearch = writable<boolean>(false);
export const isInfo = writable<boolean>(false);
export const isTickets = writable<boolean>(false);
