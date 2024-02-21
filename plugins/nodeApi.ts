export default defineNuxtPlugin({
  setup() {
    const runtimeConfig = useRuntimeConfig();

    const nodeFetch = $fetch.create({
      baseURL: runtimeConfig.public.nodeBaseURL,
    });

    return {
      provide: {
        nodeFetch,
      },
    };
  },
});
