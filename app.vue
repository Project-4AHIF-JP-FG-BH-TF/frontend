<script setup>
import { useSessionStore } from "~/stores/sessionStore.ts";
const sessionStore = useSessionStore();

await callOnce(async () => {
  await sessionStore.requestSession();
});

if (process.client) {
  setInterval(() => {
    sessionStore.refreshSession();
  }, 1000);
}
</script>

<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>
