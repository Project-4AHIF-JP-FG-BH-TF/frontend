<script setup lang="ts">
defineProps<{ name: string }>();
</script>

<template>
  <div>
    <span>{{ name }}:</span>
    <slot />
  </div>
</template>

<style scoped lang="scss">
div {
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    font-weight: lighter;
  }
}
</style>
