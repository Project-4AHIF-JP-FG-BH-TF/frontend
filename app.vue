<script setup lang="ts">
import { fetchRefreshSession } from "~/composables/session.ts";
import ToastList from "~/components/ToastList.vue";

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
    <toast-list />
    <nuxt-page />
  </nuxt-layout>
</template>

<style lang="scss"></style>
