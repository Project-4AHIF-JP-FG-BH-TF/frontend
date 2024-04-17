<script setup lang="ts">
import UnknownIcon from "~/components/icons/UnknownIcon.vue";
import DebugIcon from "~/components/icons/DebugIcon.vue";
import InfoIcon from "~/components/icons/InfoIcon.vue";
import WarnIcon from "~/components/icons/WarnIcon.vue";
import ErrorIcon from "~/components/icons/ErrorIcon.vue";

defineProps<{
  name: string;
}>();
</script>

<template>
  <div :title="name">
    <ErrorIcon v-if="name == 'error'" class="icon" />
    <DebugIcon v-else-if="name == 'debug'" class="icon" />
    <WarnIcon v-else-if="name == 'warn'" class="icon" />
    <InfoIcon v-else-if="name == 'info'" class="icon" />
    <UnknownIcon v-else class="icon" />
  </div>
</template>

<style scoped lang="scss">
.icon {
  width: 43px;
}
</style>
