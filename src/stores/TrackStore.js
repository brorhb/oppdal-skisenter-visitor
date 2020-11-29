import { writable } from 'svelte/store';

let cache

export const makeTracksStore = () => {
  const store = writable([])

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

const fetchData = async () => {
  try {
    const response = await fetch('https://oppdal-skisenter.herokuapp.com/v1/tracks');
    if(response.ok) {
      return await response.json()
    } else {
      throw new Error(response)
    }
  } catch(error) {
    return error
  }
}