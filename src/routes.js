import Dashboard from './views/Dashboard/index.svelte'
import TrackDetail from './views/TrackDetail.svelte'
import MapView from './views/MapView.svelte'
import Layout from './components/Layout.svelte'

export const routes = [
  {
    name: "/",
    component: Dashboard,
    layout: Layout
  },
  {
    name: "/tracks/:id",
    component: TrackDetail,
    layout: Layout
  },
  {
    name: "/map",
    component: MapView,
    layout: Layout
  }
]