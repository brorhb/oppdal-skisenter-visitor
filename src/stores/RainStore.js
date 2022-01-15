import { writable } from 'svelte/store';
import config from '../helpers/config';
import OFetch from '../helpers/fetch';

let cache
const store = writable([])

export const makeRainStore = () => {
    const load = async () => {
        if (cache) {
            store.set(cache)
            setTimeout(() => {
                cache = false
                load()
            }, 300000)
            return
        }
        const response = await fetchData()
        cache = response
        store.set(response)
        setTimeout(() => {
            load()
        }, 300000)
    }
    load()
    return store;
}

const fetchData = async (data, set) => {
    try {
        const response = await OFetch(`${config.BASE_URL}/rain-report`)
        return response
    } catch (error) {
        return error
    }
}