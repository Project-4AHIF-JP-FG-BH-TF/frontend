<script setup lang="ts">
import { useLogEntryStore } from "~/stores/logEntryStore";
import type { LogEntry } from "~/types/LogEntry";

const props = defineProps<{
  index: number;
}>();

const entryStore = useLogEntryStore();

let log = ref(entryStore.entries[props.index] as LogEntry);
let index = props.index;
let log_index = ref(index);

let next_available = computed(
  () => log_index.value < entryStore.entries.length - 1,
);
let previous_available = computed(() => log_index.value > 0);

const emit = defineEmits(["close"]);

function close() {
  emit("close");
}

function nextEntry() {
  if (!next_available.value) return;
  log_index.value++;
  updateLog();
}

function previousEntry() {
  if (!previous_available.value) return;
  log_index.value--;
  updateLog();
}

function updateLog() {
  console.log("updating");
  log.value = entryStore.entries[log_index.value];
}
</script>

<template>
  <div
    id="background"
    class="backdrop-blur-sm backdrop-brightness-75"
    @click="close"
  ></div>
  <div id="mainView">
    <div id="expandedView">
      <div id="titleContainer">
        <span>Log-Entry</span>
      </div>
      <div id="infoContainer">
        <div id="generalInfoContainer">
          <span>Generelle Informationen:</span>
          <span>Eintrags Nr.: {{ log.entry_nr }}</span>
          <span>Dateiname: {{ log.file_name }}</span>
          <span
            >Klassifizierung:
            <img
              v-if="log.classification == 'error'"
              src="~/assets/error.svg"
              alt="error" />
            <img v-else src="~/assets/info.svg" alt="info"
          /></span>
          <span>Datum/Uhrzeit: {{ log.creation_date.toLocaleString() }}</span>
        </div>
        <div id="extendedInfoContainer">
          <span>Erweiterte Informationen: </span>
          <span>Nutzer ID: {{ log.user_id }}</span>
          <span>Nutzer Session ID: {{ log.user_session_id }}</span>
          <span>Service IP: {{ log.service_ip }}</span>
          <span>Java Klasse: {{ log.java_class }}</span>
        </div>
      </div>
      <div>
        {{ log.content }}
      </div>
      <footer id="footer">
        <Icon
          name="material-symbols:arrow-left-alt-rounded"
          size="40"
          class="arrowButton"
          @click="previousEntry"
        ></Icon>
        <Icon
          name="material-symbols:arrow-right-alt-rounded"
          size="40"
          class="arrowButton"
          @click="nextEntry"
          color="black"
        ></Icon>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
#background {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100vh;
}

#mainView {
  position: absolute;
  left: 25%;
  width: 50vw;
  height: 50vh;

  background-color: var(--highlighted-background);

  display: flex;
  justify-content: center;

  border-radius: 10px;

  #expandedView {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 5px;

    span {
      margin: 3px;
    }

    #infoContainer {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;

      #generalInfoContainer,
      #extendedInfoContainer {
        display: flex;
        flex-direction: column;

        img {
          width: 30px;
          display: inline;
        }
      }
    }

    #footer {
      display: flex;
      justify-content: space-between;

      .arrowButton:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
