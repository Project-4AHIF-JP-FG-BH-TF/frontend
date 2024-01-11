<script setup lang="ts">
import {computed, ref} from "vue";
import type {Filters} from "~/types/filters";

interface Props {
  ipList: string[],
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "filters-changed", filters: Filters): void
}>()

const settingsOpened = ref(false);

const settingsButtonIcon = computed(() => {
  return settingsOpened.value ? 'material-symbols:arrow-drop-up' : 'material-symbols:arrow-drop-down';
});

const settingsButtonText = computed(() => {
  return settingsOpened.value ? 'Close settings' : 'Open settings';
});

function onOpenCloseSettings() {
  settingsOpened.value = !settingsOpened.value;
  console.log(settingsOpened.value);
}

const ipInput = ref("");
const regexInput = ref(false);
const textInput = ref("");
const fromInput = ref(null as Date | null);
const toInput = ref(null as Date | null);
const levelInput = ref("");

let filters = {
  regex: false,
} as Filters;

function applyFilters() {
  console.log("applied");
  emits("filters-changed", filters);
}

let applyId: NodeJS.Timeout;
function filtersWereChanged() {
  console.log("changes");
  clearTimeout(applyId);
  applyId = setTimeout(applyFilters, 1000)
}

function resetFilters() {
  filters = {
    regex: false,
  } as Filters;
  ipInput.value = "";
  regexInput.value = false;
  textInput.value = "";
  fromInput.value = null;
  toInput.value = null;
  levelInput.value = "";
  filtersWereChanged();
}

function setRegex(value: boolean) {
  regexInput.value = value;
  filters.regex = value;
  filtersWereChanged();
}

function updateIp() {
  filters.ip = ipInput.value === "" ? undefined : ipInput.value;
  filtersWereChanged();
}

function updateText() {
  filters.text = textInput.value === "" ? undefined : ipInput.value;
  filtersWereChanged();
}

function updateFrom() {
  filters.from = fromInput.value === null ? undefined : fromInput.value;
  filtersWereChanged();
}

function updateTo() {
  filters.to = toInput.value === null ? undefined : toInput.value;
  filtersWereChanged();
}

function updateLevel() {
  filters.level = levelInput.value === "" ? undefined : levelInput.value;
  filtersWereChanged();
}
</script>

<template>
  <div id="settings">
    <div id="settings-head">
      <button id="open-close-button" @click="onOpenCloseSettings">
        <Icon :name="settingsButtonIcon" color="white" size="32px"/>
      </button>
      <span>{{ settingsButtonText }}</span>
    </div>
    <div id="settings-body" v-if="settingsOpened">
      <div id="filter-settings-1" class="filter-settings">
        <div id="ip-address" class="labeled-input">
          <label>Ip Address:</label>
          <select class="input" v-model="ipInput" @change="updateIp">
            <option v-for="ip of ['', ...props.ipList]">{{ ip }}</option>
          </select>
        </div>
        <div id="text-regex" class="labeled-input">
          <div id="text-regex-selector">
            <div id="text-selector">
              <button :class="{'grayed-out': regexInput}" @click="setRegex(false)">Text</button>
            </div>
            <label id="separator">|</label>
            <div id="regex-selector">
              <button :class="{'grayed-out': !regexInput}" @click="setRegex(true)">Regex</button>
            </div>
          </div>
          <input type="text" class="input" v-model="textInput" @input="updateText">
        </div>
      </div>
      <div id="filter-settings-2" class="filter-settings">
        <div id="date">
          <div id="from" class="labeled-input">
            <label>From:</label>
            <input type="datetime-local" class="input" v-model="fromInput" @change="updateFrom">
          </div>
          <div id="to" class="labeled-input">
            <label>To:</label>
            <input type="datetime-local" class="input" v-model="toInput" @change="updateTo">
          </div>
        </div>
        <div id="log-level" class="labeled-input">
          <label>Log Level</label>
          <select class="input" v-model="levelInput" @change="updateLevel">
            <option></option>
            <option>Info</option>
            <option>Error</option>
          </select>
        </div>
      </div>
      <div id="filter-footer">
        <button id="reset-button" @click="resetFilters">reset</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;

#settings {
  @apply flex flex-col flex-none rounded-[8px] mt-3 mb-6;
  width: 90%;
  background-color: #535353;

  #settings-body {
    width: 100%;

    #settings-head {
      @apply flex items-center;
      height: 50px;
      width: 100%;

      #open-close-button {
        @apply pl-2;
      }
    }

    #filter-settings-1 {
      #ip-address {
        @apply grow;
        width: 50%;

        .input {
          @apply text-center;
        }
      }

      #text-regex {
        @apply grow;
        width: 50%;

        #text-regex-selector {
          @apply flex justify-center gap-3;

          #text-selector {
            @apply flex justify-end;
            width: 100px;
          }

          #regex-selector {
            width: 100px;
          }
        }

        .input {
          @apply text-center;
        }
      }
    }

    #filter-settings-2 {
      #date {
        @apply flex justify-between gap-3;
        width: 50%;

        .labeled-input {
          @apply grow;
        }
      }

      #log-level {
        width: 50%;

        .input {
          @apply text-center;
        }
      }
    }

    #filter-footer {
      @apply flex pt-1 pb-4 ps-6 pe-6;
      width: 100%;

      #reset-button {
        @apply rounded bg-red-500 text-white p-1;
        width: 100%;

        &:hover {
          @apply bg-red-700;
        }
      }
    }
  }
}

.labeled-input {
  @apply flex flex-col items-center inline;

  input, select {
    box-sizing: border-box;
    max-width: 100%;
    width: 100%;
    height: 25px;
  }
}

.filter-settings {
  @apply flex gap-6 ps-6 pe-6 pb-4;
  width: 100%;
}

.input {
  @apply rounded ps-[6px] pe-[6px] ms-[-6px] me-[-6px];
  height: 30px !important;
  background: gray;
  appearance: none;

  &:focus {
    outline: deepskyblue solid 2px !important;
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
}

.grayed-out {
  color: gray;
}
</style>