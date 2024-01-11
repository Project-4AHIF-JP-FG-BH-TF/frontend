<script setup lang="ts">
import type { LogEntry } from "~/types/LogEntry";

defineProps<{
  log: LogEntry;
}>();
</script>

<template>
  <div class="list-element">
    <span class="list-data border-right flex-4">{{
      log.creation_date.toLocaleString()
    }}</span>
    <div id="level-field" class="list-data border-right flex-2">
      <img
        v-if="log.classification == 'error'"
        src="~/assets/error.svg"
        alt="error"
      />
      <img v-else src="~/assets/info.svg" alt="info" />
    </div>
    <span class="list-data border-right flex-4">{{ log.service_ip }}</span>
    <span class="list-data border-right flex-3">{{ log.user_id }}</span>
    <span class="list-data border-right flex-3">{{ log.user_session_id }}</span>
    <span class="list-data text-overflow-ellipsis flex-10"
      >{{ log.java_class }} {{ log.content }}</span
    >
  </div>
</template>

<style scoped lang="scss">
.border-bottom-and-right {
  border-right: var(--base-background) solid 2px;
  border-bottom: var(--base-background) solid 2px;
}

.border-bottom {
  border-bottom: var(--base-background) solid 2px;
}

.border-right {
  border-right: var(--base-background) solid 2px;
}

.list-element {
  width: 100%;
  display: flex;
}

.list-data {
  padding: 10px;
  margin: 0 2px 2px;
  text-align: center;
}

.log-type {
  height: 30px;
  width: 30px;
  border-radius: 30px;
}

#level-field {
  display: flex;
  justify-content: center;

  img {
    width: 30px;
  }
}

.text-overflow-ellipsis {
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.flex-2 {
  flex: 2;
}

.flex-3 {
  flex: 3;
}

.flex-4 {
  flex: 4;
}

.flex-10 {
  flex: 10;
}
</style>
