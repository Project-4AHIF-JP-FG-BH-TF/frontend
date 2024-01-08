<script setup>
import {useSessionStore} from "~/stores/sessionStore.js";

const sessionStore = useSessionStore();

await callOnce(async () => {
  await sessionStore.requestSession();
  setInterval(() => {
    sessionStore.refreshSession();
  }, 1000 * 60)
})

</script>

<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>
