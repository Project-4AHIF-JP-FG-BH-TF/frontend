<script setup lang="ts">
import { useLogEntryStore } from "~/stores/logEntryStore";
import type { LogEntry } from "~/types/LogEntry";

const props = defineProps<{
  index: number;
}>();

const entryStore = useLogEntryStore();

const log = ref(entryStore.entries[props.index] as LogEntry);
const index = props.index;
const logIndex = ref(index);

const nextAvailable = computed(
  () => logIndex.value < entryStore.entries.length - 1,
);
const previousAvailable = computed(() => logIndex.value > 0);

const emit = defineEmits(["close"]);

function close() {
  emit("close");
}

function nextEntry() {
  if (!nextAvailable.value) return;
  logIndex.value++;
  updateLog();
}

function previousEntry() {
  if (!previousAvailable.value) return;
  logIndex.value--;
  updateLog();
}

function updateLog() {
  log.value = entryStore.entries[logIndex.value];
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
        <span>Erweiterte Log-Nachrichten Anzeige</span>
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
      <div id="messageContainer">
        Nachricht:
        {{ log.content }}
      </div>
      <footer id="footer">
        <Icon
          name="material-symbols:arrow-left-alt-rounded"
          size="40"
          class="arrowButton"
          :class="{ disabled: !previousAvailable }"
          @click="previousEntry"
        ></Icon>
        <Icon
          name="material-symbols:arrow-right-alt-rounded"
          size="40"
          class="arrowButton"
          :class="{ disabled: !nextAvailable }"
          color="black"
          @click="nextEntry"
        ></Icon>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
#background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
}

#mainView {
  z-index: 2;
  position: absolute;
  left: 25%;
  top: 25%;
  width: 50vw;
  height: 50vh;

  background-color: var(--highlighted-background);

  box-shadow: transparentize(#1f2836, 0.1) 5px 5px 10px;

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

    #titleContainer {
      text-align: center;
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
    #messageContainer {
      margin: 0 auto;
    }

    #footer {
      display: flex;
      justify-content: space-between;

      .arrowButton:hover {
        cursor: pointer;
      }

      .disabled {
        cursor: default !important;
        color: black;
      }
    }
  }
}
</style>
