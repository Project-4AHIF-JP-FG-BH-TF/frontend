<script setup lang="ts">
import { fetchRefreshSession } from "~/composables/session.ts";
import { ToastType } from "~/types/ToastType.js";

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
  <div id="toast-list">
    <toast :toast-data="{ type: ToastType.INFO, message: 'huff puff' }" />
  </div>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>

<style lang="scss">
#toast-list {
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  width: 100%;
}
</style>
