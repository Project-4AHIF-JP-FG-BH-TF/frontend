<script setup>
import { fetchRefreshSession } from "~/composables/session.ts";

onMounted(async () => {
  const session = await useSession();

  setInterval(async () => {
    if (session.value) {
      await fetchRefreshSession(session.value);
    }
    // 1 minute
  }, 1000 * 60);
});
</script>

<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>
