import Layout from './components/Layout.svelte';
import AdminLayout from './components/admin/AdminLayout.svelte';
import WebcamFullscreen from './views/WebcamFullscreen.svelte';
import Login from './views/admin/Login.svelte';
import AdminIndex from './views/admin/index.svelte';
import AdminTracks from './views/admin/Tracks.svelte';
import AdminFacilities from './views/admin/Facilities.svelte';
import AdminLifts from './views/admin/Lifts.svelte';
import EditItem from './views/admin/EditItem.svelte';
import AdminAlerts from './views/admin/Alerts.svelte';
import AdminWebcamera from './views/admin/Webcamera.svelte';
import AdminUsers from './views/admin/Users.svelte';
import EditWebcamera from './views/admin/EditCamera.svelte';
import AdminSnowConditions from './views/admin/SnowConditions.svelte';
import index from './views/index.svelte';
import AdminHome from './views/admin/AdminHome.svelte';
import AdminStatus from './views/admin/Status.svelte';
import AdminAvalanche from './views/admin/Avalanche.svelte';
import AdminSettings from './views/admin/Settings.svelte';
function userIsAdmin() {
  const user = localStorage.getItem('user');
  return user;
}

export const routes = [
  {
    name: '/',
    component: index,
    layout: Layout,
  },
  {
    name: '/kamera',
    nestedRoutes: [
      {
        name: '/:id',
        component: WebcamFullscreen,
      },
    ],
  },
  {
    name: 'admin',
    component: AdminIndex,
    onlyIf: { guard: userIsAdmin, redirect: '/login' },
    nestedRoutes: [
      { name: 'index', component: AdminHome },
      { name: '/meldinger', component: AdminAlerts },
      { name: 'snoforhold', component: AdminSnowConditions },
      { name: '/status', component: AdminStatus },
      { name: '/skredvarsel', component: AdminAvalanche },
      { name: '/instillinger', component: AdminSettings },
      { name: '/instillinger/brukere', component: AdminUsers },
      { name: '/instillinger/webkamera', component: AdminWebcamera },
      {
        name: '/webkamera',
        nestedRoutes: [
          {
            name: 'index',
            component: AdminWebcamera,
          },
          {
            name: '/:id',
            component: EditWebcamera,
          },
        ],
      },
      {
        name: '/loyper',
        nestedRoutes: [
          {
            name: 'index',
            component: AdminTracks,
          },
          {
            name: '/:id',
            component: EditItem,
          },
        ],
      },
      {
        name: '/facilities',
        nestedRoutes: [
          {
            name: 'index',
            component: AdminFacilities,
          },
        ],
      },
      {
        name: '/heiser',
        nestedRoutes: [
          {
            name: 'index',
            component: AdminLifts,
          },
          {
            name: '/:id',
            component: EditItem,
          },
        ],
      },
    ],
  },
  {
    name: '/login',
    component: Login,
  },
];
