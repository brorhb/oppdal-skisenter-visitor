// Forslag til struktur på ny store. 
import { writable, derived } from 'svelte/store';
import config from '../helpers/config';

let cache;
const fetchData = async (data, set) => {
    try {
      const response = await fetch(`${config.BASE_URL}/lifts`)
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
function createLifts() {
    const { subscribe, set, update } = writable([]);

    const load = async () => {
        if (cache) {
            set(cache);
            setTimeout(() => {
                cache = false;
                load();
            }, 300000)
            return
        }
        const response = await fetchData();
        cache = response
        set(response);
        setTimeout(() => {
            load()
        }, 300000)
    }
    load();

    return {
        subscribe,
        byZone: (id) => {
            if(!cache) return []
            return cache.filter(lift => {
                if(lift.zone == id) return true;
                return false;
            });
        },
        update: () => load()
    }
}

export const lifts = createLifts();
export const liftsByZone = derived(
    lifts,
    $lifts => $lifts.filter(lift => {
        if(lift.zone == 1) return true;
        return false;
    })
)
