export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Oppdal Skisenter - Løypetavle",
    htmlAttrs: {
      lang: "nb",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/new-logo.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap",
      },
    ],
    script: [
      {
        src: "./body-color.js",
        body: true
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/click-outside"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: ["~/components", "~/components/user", { path: "~/components/admin", prefix: "admin" }],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/dotenv",
    '@nuxtjs/pwa',
  ],
  tailwindcss: {
    configPath: "./tailwind.config.js",
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  pwa: {
    manifest: {
      name: 'Oppdal Skisenter'
    },
    icon: {
         fileName: 'new-logo.png',
    },
  },
};
