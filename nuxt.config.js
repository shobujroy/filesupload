import colors from "vuetify/es5/util/colors";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  env: {
    BASE_URL: process.env.BASE_URL,
    BASE_URL_TWO: process.env.BASE_URL_TWO,
    X_API_KEY: process.env.X_API_KEY,
  },
  ssr: false,
  appPrefix: "premierTaxDebt",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s",
    title: "Premier Tax Debt Solutions",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/png", href: "/logo-taxpert.png" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/app.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/api",
    "~/plugins/axios",
    { src: "~/plugins/apexcharts.js", ssr: false },
    "~/plugins/vue-tel-input.js",
    "~/plugins/axios_backend-2.js",
  ],
  router: {
    middleware: ["prefix"],
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "vue-sweetalert2/nuxt",
    "nuxt-webfontloader",
  ],

  io: {
    // module options

    server: {
      /* CORS options */
      cors: {
        credentials: true,
        origin: [
          // whitelisted origins
          "http://localhost:3000",
        ],
      },
    },
  },

  webfontloader: {
    google: {
      families: ["Poppins"],
    },
  },

  sweetalert: {
    confirmButtonColor: "#41b882",
    cancelButtonColor: "#ff7674",
  },

  auth: {
    watchLoggedIn: false,
    rewriteRedirects: false,
    cookie: {
      name: "previsitAdmin_auth",
    },
    redirect: {
      logout: "/login",
      home: "/",
    },
    localStorage: {
      prefix: "premierTaxDebt",
    },
    token: {
      prefix: "premierTaxDebt",
    },
    strategies: {
      local: {
        token: {
          property: "data.token",
          name: "x-auth-token",
          maxAge: 0,
          type: false,
        },
        user: {
          property: "data",
          autoFetch: true,
        },
        endpoints: {
          login: { url: "/user/login", method: "post" },
          user: { url: "/user/me", method: "get" },
          logout: false,
        },
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL,
    progress: false,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#0e2b8f",
          accent: "#061c68",
          secondary: "#e11f27",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        dark: {
          primary: "#0e2b8f",
          accent: "#061c68",
          secondary: "#e11f27",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: "src",
        },
      },
    },
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      });
    },
  },
};
