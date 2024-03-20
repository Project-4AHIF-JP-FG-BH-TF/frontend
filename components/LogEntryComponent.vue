<script setup lang="ts">
import type { Columns, LogEntry } from "~/types/LogEntry";
import { type QuickFilterData, useFilterStore } from "~/stores/filterStore";
import { useIpsStore } from "~/stores/ipsStore";

const props = defineProps<{
  log: LogEntry;
  columns: Columns;
}>();

const emit = defineEmits(["expand"]);

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

function showExpandedView() {
  emit("expand");
}

function formatDate(dateString: string, showMilliseconds: boolean): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

  if (!showMilliseconds)
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  else
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}:${milliseconds}`;
}
</script>

<template>
  <div class="list-element">
    <abbr
      v-if="props.columns.date"
      :title="formatDate(log.creation_date.toLocaleString(), true)"
      class="list-data border-right flex-4"
      >{{ formatDate(log.creation_date.toLocaleString(), false) }}</abbr
    >
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
      class="list-data text-overflow-ellipsis border-right flex-10"
    >
      <button @click="clickedText">{{ log.content }}</button>
    </span>
    <span
      id="expand-button"
      class="list-data flex-0 menu"
      @click="showExpandedView"
      >...</span
    >
  </div>
</template>

<style scoped lang="scss">
abbr {
  text-decoration: none;
}

.menu {
  min-width: 50px;
}

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
    width: 26px;
  }
}

.text-overflow-ellipsis {
  width: 100%;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#expand-button {
  cursor: pointer;
}
</style>
