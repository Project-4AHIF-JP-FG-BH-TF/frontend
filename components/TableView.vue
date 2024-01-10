<script setup lang="ts">
import {useLogEntryStore} from "~/stores/logEntryStore";

const entryStore = useLogEntryStore();

callOnce(() => {
  entryStore.loadEntries(0, 0);
});
</script>

<template>
  <div id="main">
    <FilterSettings />

    <div id="tableView" class="grow mb-5">
      <div id="tableHeader">
        <span class="headerElement border-bottom-and-right flex-4">Datum</span>
        <span class="headerElement border-bottom-and-right flex-3">Level</span>
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
        <div
            v-for="log in entryStore.entries"
            :key="log.file_name + log.entry_nr.toString()"
            class="list-element"
        >
          <span class="list-data border-right flex-4">{{
              log.creation_date.toLocaleString()
            }}</span>
          <div id="level-field" class="list-data border-right flex-3">
            <div v-if="log.classification == 'error'" class="log-type error">
              <span>!</span>
            </div>
            <div v-else class="log-type info"></div>
          </div>
          <span class="list-data border-right flex-4">{{
              log.service_ip
            }}</span>
          <span class="list-data border-right flex-3">{{ log.user_id }}</span>
          <span class="list-data border-right flex-3">{{
              log.user_session_id
            }}</span>
          <span class="list-data text-overflow-ellipsis flex-10"
          >{{ log.java_class }} {{ log.content }}</span
          >
        </div>
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
    background-color: #535353;
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
    border-right: #2e2e2e solid 2px;
    border-bottom: #2e2e2e solid 2px;
  }

  .border-bottom {
    border-bottom: #2e2e2e solid 2px;
  }

  .border-right {
    border-right: #2e2e2e solid 2px;
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

  .error {
    background-color: red;
    color: black;
    font-weight: bold;
  }

  .info {
    background-color: lightgray;
  }

  #level-field {
    display: flex;
    justify-content: center;
  }

  .text-overflow-ellipsis {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
