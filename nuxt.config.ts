// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-icon", "@vueuse/nuxt"],
  runtimeConfig: {
    public: {
      nodeBaseURL: "http://localhost:3001",
      rustBaseURL: "http://localhost:8000",
    },
  },
  css: ["@/assets/style/variables.scss", "@/assets/style/global.scss"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
