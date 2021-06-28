import { writable } from 'svelte/store';

function createToast() {
    const { subscribe, set } = writable({});

    return {
        subscribe,
        setToast: (message, type) => {
            set({message: message, type: type, show: true});
            setTimeout(() => {
                set({})
            }, 3000)
        }
    }
}

export const toast = createToast();