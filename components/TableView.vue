<script setup lang="ts">
import { useLogEntryStore } from "~/stores/logEntryStore";

const entryStore = useLogEntryStore();

callOnce(() => {
  entryStore.loadEntries(0, 1);
});

// TODO use backend
const ips = computed(() => {
  return [...new Set(entryStore.entries.map((value) => value.service_ip))];
});

const desc = ref(true);

const icon = ref("material-symbols:arrow-downward");

function changeSortingDirection() {
  desc.value = !desc.value;
  entryStore.loadEntries(0, 1, desc ? "DESC" : "ASC");
  if (desc.value) {
    icon.value = "material-symbols:arrow-downward";
  } else {
    icon.value = "material-symbols:arrow-upward";
  }
}
</script>

<template>
  <div id="main">
    <FilterSettings :ip-list="ips" />

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
        <span class="headerElement border-bottom flex-10">Text</span>
      </div>
      <!-- Liste an Log-Einträgen -->
      <div id="list">
        <LogEntryComponent
          v-for="log in entryStore.entries"
          :key="log.file_name + log.entry_nr.toString()"
          :log="log"
        ></LogEntryComponent>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;

#main {
  @apply w-[100] h-[100] flex flex-col items-center;

  #tableView {
    width: 90%;
    background-color: var(--highlighted-background);
    border-radius: 10px;
    overflow: hidden;
  }

  #tableHeader {
    display: flex;
  }

  .headerElement {
    padding: 10px;
    margin: 5px 2px 2px;
    text-align: center;
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

  #list {
    height: 90%;
    overflow: scroll;
    overflow-x: hidden;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  #list::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  #list {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
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

  #sortButton {
    float: right;
  }

  .icons {
    width: 30px;
    height: 30px;
  }
}
</style>
