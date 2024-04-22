<script setup lang="ts">
import { ToastType } from "~/types/ToastType";

interface Props {
  type: ToastType;
  message: string;
}
const props = defineProps<Props>();

const color = computed(() => {
  switch (props.type) {
    case ToastType.INFO:
      return "#86B6F6";
    case ToastType.WARNING:
      return "#d2bf46";
    case ToastType.ERROR:
      return "#E53F4E";
  }
});
</script>

<template>
  <div id="toast" :style="{ background: color }">{{ props.message }}</div>
</template>

<style scoped lang="scss">
#toast {
  display: flex;
  align-items: center;

  width: calc(100% - 60px);
  height: 50px;

  box-sizing: border-box;
  margin: 16px 32px;
  border-radius: 8px;
  padding: 0 8px;
}
</style>
