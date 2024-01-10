// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "https://api.example.com/",
    },
  },
  css: ["@/assets/style/color.scss","@/assets/style/global.scss"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
