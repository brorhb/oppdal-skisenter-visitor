import Dashboard from './views/Dashboard/index.svelte'
import TrackDetail from './views/TrackDetail.svelte'
import Tracks from './views/Tracks.svelte'
import MapView from './views/MapView.svelte'
import Layout from './components/Layout.svelte'
import AdminLayout from './components/AdminLayout.svelte'
import Login from './views/admin/Login.svelte'
import AdminIndex from './views/admin/index.svelte'
import AdminTracks from "./views/admin/Tracks.svelte"

function userIsAdmin() {
  const user = localStorage.getItem("user")
  return user
}

export const routes = [
  {
    name: "/",
    component: Dashboard,
    layout: Layout
  },
  {
    name: "/tracks",
    layout: Layout,
    nestedRoutes: [
      { name: 'index', component: Tracks },
      {
        name: '/:id',
        component: TrackDetail,
        layout: Layout
      }
    ]
  },
  {
    name: "/map",
    component: MapView,
    layout: Layout
  },
  {
    name: "/admin",
    layout: AdminLayout,
    onlyIf: { guard: userIsAdmin, redirect: '/login' },
    nestedRoutes: [
      { name: 'index', component: AdminIndex },
      {
        name: "/tracks",
        component: AdminTracks
      }
    ]
  },
  {
    name: "/login",
    component: Login
  }
]