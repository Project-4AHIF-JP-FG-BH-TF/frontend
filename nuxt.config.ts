// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-icon", "@vueuse/nuxt"],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "http://localhost:3001",
    },
  },
  css: ["@/assets/style/color.scss"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
