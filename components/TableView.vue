<script setup lang="ts">
import { useLogEntryStore } from "~/stores/logEntryStore";
import { useOrderStore } from "~/stores/orderStore";
import type { LogEntry } from "~/types/LogEntry";
import type { Ref } from "vue";

const entryStore = useLogEntryStore();
const orderStore = useOrderStore();

onMounted(() => {
  entryStore.reloadEntries();
});

const desc = ref(true);

const icon = ref("material-symbols:arrow-downward");

function changeSortingDirection() {
  desc.value = !desc.value;
  entryStore.loadNextEntries();
  if (desc.value) {
    icon.value = "material-symbols:arrow-downward";
  } else {
    icon.value = "material-symbols:arrow-upward";
  }
  orderStore.setOrder(desc.value ? "DESC" : "ASC");
}

let selectedLogIndex = ref(-1);

function showExpandedLogView(logIndex: number) {
  selectedLogIndex.value = logIndex;
}
function hideExpandedLogView() {
  selectedLogIndex.value = -1;
}
</script>

<template>
  <ExpandedLogView
    :index="selectedLogIndex"
    v-if="selectedLogIndex !== -1"
    @close="hideExpandedLogView"
  ></ExpandedLogView>
  <div id="tableView" class="grow mb-5">
    <div id="tableHeader">
      <span class="headerElement border-bottom-and-right flex-4"
        >Datum
        <button id="sortButton" @click="changeSortingDirection">
          <Icon :name="icon" class="icons"></Icon></button
      ></span>
      <span class="headerElement border-bottom-and-right flex-2">Level</span>
      <span class="headerElement border-bottom-and-right flex-4"
        >IP-Adresse</span
      >
      <span class="headerElement border-bottom-and-right flex-3"
        >Nutzer-ID</span
      >
      <span class="headerElement border-bottom-and-right flex-3"
        >Sitzungs-ID</span
      >
      <span class="headerElement border-bottom-and-right flex-10">Text</span>
      <span class="headerElement border-bottom flex-1"></span>
    </div>
    <div id="list">
      <LogEntryComponent
        v-for="(log, index) in entryStore.entries"
        :key="log.file_name + log.entry_nr.toString()"
        :log="log"
        @expand="showExpandedLogView(index)"
      ></LogEntryComponent>
    </div>
  </div>
</template>

<style scoped lang="scss">
#tableView {
  width: 90%;
  background-color: var(--highlighted-background);
  border-radius: 10px;
  overflow: hidden;

  #tableHeader {
    display: flex;

    .headerElement {
      padding: 10px;
      margin: 5px 2px 2px;
      text-align: center;

      &.border-bottom-and-right {
        border-right: var(--base-background) solid 2px;
        border-bottom: var(--base-background) solid 2px;
      }

      &.border-bottom {
        border-bottom: var(--base-background) solid 2px;
      }

      &.border-right {
        border-right: var(--base-background) solid 2px;
      }
    }

    #sortButton {
      float: right;

      .icons {
        width: 30px;
        height: 30px;
      }
    }
  }

  #list {
    height: 90%;
    overflow: scroll;
    overflow-x: hidden;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none; /* Chrome */
    }
  }
}
</style>
