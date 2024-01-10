<script setup lang="ts">
import { useLogEntryStore } from "~/stores/logEntryStore";

const entryStore = useLogEntryStore();

callOnce(() => {
  entryStore.loadEntries(0, 0);
});
</script>

<template>
  <div id="main">
    <div id="settings">
      <span>Settings-Placeholder</span>
    </div>

    <div id="tableView">
      <div id="tableHeader">
        <span class="headerElement border-bottom-and-right flex-4">Datum</span>
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
        >
        </LogEntryComponent>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  #settings {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 90%;
    height: 8%;
    background-color: var(--highlighted-background);
    border-radius: 10px;
  }

  #tableView {
    margin-bottom: 20px;
    width: 90%;
    height: 90%;
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
}
</style>
