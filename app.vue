<script setup lang="ts">
import { fetchRefreshSession } from "~/composables/session.ts";
import { useToastStore } from "~/stores/toastStore";

const toastStore = useToastStore();

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
    <div id="toast-list">
      <transition-group name="toast-list">
        <toast-display
          v-for="toast in toastStore.messages"
          :key="toast"
          :toast-data="toast"
        />
      </transition-group>
    </div>
    <nuxt-page />
  </nuxt-layout>
</template>

<style lang="scss">
#toast-list {
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  width: 100vw;
}

.toast-list-move, /* apply transition to moving elements */
.toast-list-enter-active,
.toast-list-leave-active {
  transition: all 0.5s ease;
}

.toast-list-enter-from,
.toast-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.toast-list-leave-active {
  position: absolute;
}
</style>
