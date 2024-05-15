<script setup lang="ts">
import { formatDate } from "~/util/formatDate";
import { useLogEntryStore } from "~/stores/logEntryStore";
import type { LogEntry } from "~/types/LogEntry";
import ExpandedLogViewEntry from "~/components/logView/ExpandedLogViewEntry.vue";
import { onUnmounted } from "vue";

const props = defineProps<{
  index: number;
}>();

const entryStore = useLogEntryStore();

const log = ref(entryStore.entries[props.index] as LogEntry);
const logIndex = ref(props.index);

const nextAvailable = computed(
  () => logIndex.value < entryStore.entries.length - 1,
);
const previousAvailable = computed(() => logIndex.value > 0);

const emit = defineEmits(["close"]);

function close() {
  emit("close");
}

function nextEntry() {
  if (entryStore.entries.length - 1 == logIndex.value) {
    entryStore.loadNextEntries();
  }

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

function onKeyDown(event: KeyboardEvent) {
  if (event.key == "Escape") {
    close();
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeyDown);
});
</script>

<template>
  <div
    id="background"
    class="backdrop-blur-sm backdrop-brightness-75"
    @click="close"
  ></div>
  <div id="mainView">
    <div
      class="sides"
      :class="{ hidden: logIndex == 0 }"
      @click="previousEntry"
    >
      <Icon
        name="material-symbols:arrow-left-alt-rounded"
        size="40"
        class="arrowButton"
        :class="{ disabled: !previousAvailable }"
      ></Icon>
    </div>
    <div id="expandedView">
      <div id="infoContainer">
        <div>
          <ExpandedLogViewEntry name="Eintrags Nr."
            >{{ log.entry_nr }}
          </ExpandedLogViewEntry>
          <ExpandedLogViewEntry name="Dateiname"
            >{{ log.file_name }}
          </ExpandedLogViewEntry>
          <ExpandedLogViewEntry name="Klassifizierung">
            <ClassificationIcon
              id="classification"
              :name="log.classification"
            />
          </ExpandedLogViewEntry>
          <ExpandedLogViewEntry name="Datum/Uhrzeit">
            {{ formatDate(log.creation_date, true) }}
          </ExpandedLogViewEntry>
        </div>
        <div>
          <ExpandedLogViewEntry name="Nutzer ID">
            {{ log.user_id }}
          </ExpandedLogViewEntry>
          <ExpandedLogViewEntry name="Nutzer Session ID">
            {{ log.user_session_id }}
          </ExpandedLogViewEntry>
          <ExpandedLogViewEntry name="Service IP">
            {{ log.service_ip }}
          </ExpandedLogViewEntry>
          <ExpandedLogViewEntry name="Java Klasse">
            {{ log.java_class }}
          </ExpandedLogViewEntry>
        </div>
      </div>
      <div id="messageContainer">
        <div>
          {{ log.content }}
        </div>
      </div>
    </div>
    <div class="sides" :class="{ hidden: !nextAvailable }" @click="nextEntry">
      <Icon
        name="material-symbols:arrow-right-alt-rounded"
        size="40"
        class="arrowButton"
        :class="{ disabled: !nextAvailable }"
        color="black"
      ></Icon>
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
  z-index: 100;
}

#mainView {
  z-index: 101;
  position: absolute;
  left: 25%;
  top: 25%;
  width: 50vw;
  height: 50vh;

  background-color: var(--highlighted-background);

  box-shadow: transparentize(#1f2836, 0.1) 5px 5px 10px;

  display: flex;
  justify-content: center;

  overflow: hidden;

  border-radius: 10px;

  .sides {
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 40px;

    &:hover:not(.hidden) {
      background: var(--dark-highlighted-background);
    }

    &.hidden {
      :deep(path) {
        color: var(--dark-highlighted-background);
      }
    }
  }

  #expandedView {
    max-width: calc(100% - 40px * 2);
    flex: 1;

    display: flex;
    flex-direction: column;

    padding: 5px;

    span {
      margin: 3px;
    }

    #infoContainer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      padding: 20px;

      overflow-x: scroll;

      :deep(svg) {
        width: 30px;
      }
    }

    #messageContainer {
      flex: 1;

      display: flex;
      align-items: center;
      text-align: center;
      overflow-x: scroll;

      div {
        width: 100%;
      }
    }
  }
}
</style>
