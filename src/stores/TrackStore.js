import { writable } from 'svelte/store';
import config from '../helpers/config';

let cache
const store = writable([])

export const makeTracksStore = () => {
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

export async function updateTracks() {
  const response = await fetchData()
  cache = response
  store.set(response)
}

const fetchData = async () => {
  try {
    const response = await fetch(`${config.BASE_URL}/tracks`);
    if(response.ok) {
      return await response.json()
    } else {
      throw new Error(response)
    }
  } catch(error) {
    return error
  }
}