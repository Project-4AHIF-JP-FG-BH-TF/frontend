<script setup>
import { useSessionStore } from "~/stores/sessionStore.ts";

const sessionStore = useSessionStore();

if (process.client) {
  await sessionStore.requestSession();

  setInterval(() => {
    sessionStore.refreshSession();
    // 1 minute
  }, 1000 * 60);
}
</script>

<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>
