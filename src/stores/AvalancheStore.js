import { writable } from 'svelte/store';

let cache
const store = writable([])

export const makeAvalancheStore = () => {
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
    const response = await fetch('https://oppdal-skisenter.herokuapp.com/v1/avalanche-warnings')
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
