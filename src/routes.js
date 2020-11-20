import Tracks from './views/Tracks.svelte'
import Dashboard from './views/Dashboard.svelte'
import Lifts from './views/Lifts.svelte'
import TrackDetail from './views/TrackDetail.svelte'
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
    name: "/lifts",
    component: Lifts,
    layout: Layout
  }
]