export default defineNuxtPlugin({
  setup() {
    const runtimeConfig = useRuntimeConfig();

    const rustFetch = $fetch.create({
      baseURL: runtimeConfig.public.rustBaseURL,
    });

    return {
      provide: {
        rustFetch,
      },
    };
  },
});
