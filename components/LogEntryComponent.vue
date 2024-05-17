<script setup lang="ts">
import { formatDate } from "~/util/formatDate";
import type { Columns, LogEntry } from "~/types/LogEntry";
import { type QuickFilterData, useFilterStore } from "~/stores/filterStore";
import { useIpsStore } from "~/stores/ipsStore";
import ClassificationIcon from "~/components/ClassificationIcon.vue";

const props = defineProps<{
  log: LogEntry;
  columns: Columns;
}>();

const emit = defineEmits(["expand"]);

const filterStore = useFilterStore();
const entryStore = useLogEntryStore();
const ipsStore = useIpsStore();
const entryCountStore = useEntryCountStore();
const classificationStore = useClassificationStore();

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

async function refetch() {
  const promises = [];

  promises.push(entryStore.reloadEntries());
  promises.push(entryCountStore.reloadCount());
  promises.push(ipsStore.reloadIps());
  promises.push(classificationStore.reloadClassifications());

  await Promise.all(promises);
}

function showExpandedView() {
  emit("expand");
}
</script>

<template>
  <div class="list-element">
    <abbr
      v-if="props.columns.date"
      :title="formatDate(log.creation_date, true)"
      class="list-data border-right text-overflow-ellipsis flex-4"
      >{{ formatDate(log.creation_date, false) }}</abbr
    >
    <div
      v-if="props.columns.level"
      id="level-field"
      class="list-data border-right flex-2"
    >
      <button @click="clickedClassification">
        <ClassificationIcon :name="log.classification" />
      </button>
    </div>
    <span v-if="props.columns.ip" class="list-data border-right flex-4"
      ><button class="text-overflow-ellipsis" @click="clickedIp">
        {{ log.service_ip }}
      </button></span
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
      <button class="text-overflow-ellipsis" @click="clickedText">
        {{ log.content }}
      </button>
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

  padding-top: 2px;
  padding-bottom: 2px;
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
