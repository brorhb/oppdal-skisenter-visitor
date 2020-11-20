import Dashboard from './views/Dashboard/index.svelte'
import MapView from './views/MapView.svelte'
import Layout from './components/Layout.svelte'

export const routes = [
  {
    name: "/",
    component: Dashboard,
    layout: Layout
  },
  {
    name: "/map",
    component: MapView,
    layout: Layout
  }
]