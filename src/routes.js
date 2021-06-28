import Dashboard from './views/Dashboard/index.svelte'
import TrackDetail from './views/TrackDetail.svelte'
import Tracks from './views/Tracks.svelte'
import MapView from './views/MapView.svelte'
import Layout from './components/Layout.svelte'
import AdminLayout from './components/admin/AdminLayout.svelte'
import Login from './views/admin/Login.svelte'
import AdminIndex from './views/admin/index.svelte'
import AdminTracks from "./views/admin/Tracks.svelte"
import AdminLifts from "./views/admin/Lifts.svelte"
import Cameras from './views/Cameras.svelte'
import EditItem from './views/admin/EditItem.svelte'
import AdminAlerts from './views/admin/Alerts.svelte'
import AdminWebcamera from './views/admin/Webcamera.svelte'
import EditWebcamera from './views/admin/EditCamera.svelte'
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
        component: TrackDetail
      }
    ]
  },
  {
    name: "/cameras",
    layout: Layout,
    component: Cameras
  },
  {
    name: "/kart",
    component: MapView,
    layout: Layout
  },
  {
    name: "admin",
    layout: AdminLayout,
    onlyIf: { guard: userIsAdmin, redirect: '/login' },
    nestedRoutes: [
      { name: 'index', component: AdminIndex },
      { name: '/meldinger', component: AdminAlerts},
      { 
        name: '/webkamera', 
        nestedRoutes: [
          {
            name: "index",
            component: AdminWebcamera
          },
          {
            name: "/:id",
            component: EditWebcamera
          }
        ]
      },
      {
        name: "/loyper",
        nestedRoutes: [
          {
            name: "index",
            component: AdminTracks
          },
          {
            name: "/:id",
            component: EditItem
          }
        ]
      },
      {
        name: "/heiser",
        nestedRoutes: [
          {
            name: "index",
            component: AdminLifts
          },
          {
            name: "/:id",
            component: EditItem
          }
        ]
      }
    ]
  },
  {
    name: "/login",
    component: Login
  }
]