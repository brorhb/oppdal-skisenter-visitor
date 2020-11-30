import { writable } from 'svelte/store';
import config from '../helpers/config';

let cache
const store = writable([])

export const makeFacilitiesStore = () => {
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
    const response = await fetch(`${config.BASE_URL}/facilities`)
    if(response.ok) {
      return await response.json()
      
    } else {
      const text = response.text()
      throw new Error(text);
    }
    
  } catch(error) {
    return error
  }
}
