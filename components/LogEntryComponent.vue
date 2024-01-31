<script setup lang="ts">
import type { Columns, LogEntry } from "~/types/LogEntry";
import { type QuickFilterData, useFilterStore } from "~/stores/filterStore";
import { useIpsStore } from "~/stores/ipsStore";

const props = defineProps<{
  log: LogEntry;
  columns: Columns;
}>();

const filterStore = useFilterStore();
const entryStore = useLogEntryStore();
const ipsStore = useIpsStore();

function clickedClassification() {
  filterStore.applyQuickFilter({
    classification: props.log.classification,
  } as QuickFilterData);
  refetch();
}

function clickedIp() {
  filterStore.applyQuickFilter({ ip: props.log.service_ip } as QuickFilterData);
  refetch();
}

function clickedText() {
  filterStore.applyQuickFilter({ text: props.log.content } as QuickFilterData);
  refetch();
}

function refetch() {
  entryStore.reloadEntries();
  ipsStore.reloadIps();
}
</script>

<template>
  <div class="list-element">
    <span v-if="props.columns.date" class="list-data border-right flex-4">{{
      log.creation_date.toLocaleString()
    }}</span>
    <div
      v-if="props.columns.level"
      id="level-field"
      class="list-data border-right flex-2"
    >
      <button @click="clickedClassification">
        <img
          v-if="log.classification == 'error'"
          src="~/assets/error.svg"
          alt="error"
        />
        <img v-else src="~/assets/info.svg" alt="info" />
      </button>
    </div>
    <span v-if="props.columns.ip" class="list-data border-right flex-4"
      ><button @click="clickedIp">{{ log.service_ip }}</button></span
    >
    <span v-if="props.columns.user" class="list-data border-right flex-3">{{
      log.user_id
    }}</span>
    <span v-if="props.columns.session" class="list-data border-right flex-3">{{
      log.user_session_id
    }}</span>
    <span
      v-if="props.columns.text"
      class="list-data text-overflow-ellipsis flex-10"
    >
      <button @click="clickedText">{{ log.content }}</button>
    </span>
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
</style>
