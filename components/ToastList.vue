<script setup lang="ts">
const toastStore = useToastStore();
</script>

<template>
  <div id="toast-list">
    <transition-group name="toast-list">
      <toast-display
        v-for="toast in toastStore.messages"
        :key="toast"
        :toast-data="toast"
      />
    </transition-group>
  </div>
</template>

<style scoped lang="scss">
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
