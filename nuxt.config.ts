import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  modules: [
    "@nuxtjs/color-mode",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "@vite-pwa/nuxt",
  ],
  pwa: {
    strategies: "generateSW",
    registerType: "autoUpdate",
    workbox: {
      globPatterns: [
        "**/*.{js,css,html,ico,png,svg,vue,ts}",
        "_nuxt/builds/**/*.json",
      ],
      navigateFallback: "/",
    },
    client: {
      installPrompt: true,
      registerPlugin: true,
      periodicSyncForUpdates: 172800,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
    manifest: {
      name: "Markflow App",
      short_name: "Markflow",
      description: "A statically generated, offline-ready Nuxt 3 application",
      theme_color: "#ffffff",
      lang: "en",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
  },
  colorMode: {
    classSuffix: "",
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  ssr: true,
  routeRules: {
    "/**": { static: true },
  },
  experimental: {
    payloadExtraction: true,
    appManifest: true,
  },
});
