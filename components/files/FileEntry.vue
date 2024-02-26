<script setup lang="ts">
const props = defineProps<{
  index: number;
}>();
const store = useFileStore();

const file = computed(() => store.files[props.index]);

function setActive() {
  file.value.active = !file.value.active;
}
</script>

<template>
  <div id="container" @click="setActive">
    <input id="checkbox" v-model="file.active" type="checkbox" />
    <Icon name="ph:file" size="20" />
    {{ file.name }}
  </div>
</template>

<style scoped lang="scss">
#container {
  display: flex;
  align-items: center;
  margin: 3px;
}
</style>
