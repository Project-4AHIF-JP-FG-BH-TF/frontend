<script setup lang="ts">
import { computed, ref } from "vue";
import { useFilterStore } from "~/stores/filterStore";
import { useIpsStore } from "~/stores/ipsStore";

const ipsStore = useIpsStore();

onMounted(() => {
  ipsStore.reloadIps();
});

const entryStore = useLogEntryStore();

const settingsOpened = ref(false);

const settingsButtonIcon = computed(() => {
  return settingsOpened.value
    ? "material-symbols:arrow-drop-up"
    : "material-symbols:arrow-drop-down";
});

const settingsButtonText = computed(() => {
  return settingsOpened.value ? "Close settings" : "Open settings";
});

function openCloseSettings() {
  settingsOpened.value = !settingsOpened.value;
}

let applyId: NodeJS.Timeout;

function resetFilters() {
  filterStore.clearFilter();
  filtersWereChanged();
}

function setRegex(value: boolean) {
  if (filterStore.regex !== value) {
    filterStore.regex = value;
    filtersWereChanged();
  }
}

const filterStore = useFilterStore();

function filtersWereChanged() {
  clearTimeout(applyId);
  applyId = setTimeout(applyFilter, 1500);
}

function applyFilter() {
  entryStore.reloadEntries();
  ipsStore.reloadIps();
}
</script>

<template>
  <div id="settings">
    <div id="settings-head">
      <button id="open-close-button" @click="openCloseSettings">
        <Icon :name="settingsButtonIcon" color="white" size="32px" />
      </button>
      <span>{{ settingsButtonText }}</span>
    </div>
    <div v-if="settingsOpened" id="settings-body">
      <div id="filter-settings-1" class="filter-settings">
        <div id="ip-address" class="labeled-input">
          <label>Ip Address:</label>
          <select
            v-model="filterStore.ip"
            class="input"
            @change="filtersWereChanged"
          >
            <option v-for="ip of ['', ...ipsStore.ips]" :key="ip">
              {{ ip }}
            </option>
          </select>
        </div>
        <div id="text-regex" class="labeled-input">
          <div id="text-regex-selector">
            <div id="text-selector">
              <button
                :class="{ 'grayed-out': filterStore.regex }"
                @click="setRegex(false)"
              >
                Text
              </button>
            </div>
            <label id="separator">|</label>
            <div id="regex-selector">
              <button
                :class="{ 'grayed-out': !filterStore.regex }"
                @click="setRegex(true)"
              >
                Regex
              </button>
            </div>
          </div>
          <input
            v-model="filterStore.text"
            type="text"
            class="input"
            @input="filtersWereChanged"
          />
        </div>
      </div>
      <div id="filter-settings-2" class="filter-settings">
        <div id="date">
          <div id="from" class="labeled-input">
            <label>From:</label>
            <input
              v-model="filterStore.from"
              type="datetime-local"
              class="input"
              @change="filtersWereChanged"
            />
          </div>
          <div id="to" class="labeled-input">
            <label>To:</label>
            <input
              v-model="filterStore.to"
              type="datetime-local"
              class="input"
              @change="filtersWereChanged"
            />
          </div>
        </div>
        <div id="log-level" class="labeled-input">
          <label>Log Classification</label>
          <select
            v-model="filterStore.classification"
            class="input"
            @change="filtersWereChanged"
          >
            <option></option>
            <option value="info">Info</option>
            <option value="error">Error</option>
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
  @apply flex flex-col flex-none rounded-[8px];
  width: 100%;
  background-color: var(--highlighted-background);

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
        @apply rounded text-white p-1;
        background-color: var(--light-red);
        width: 100%;

        &:hover {
          background-color: var(--darken-red);
        }
      }
    }
  }
}

.labeled-input {
  @apply flex flex-col items-center inline;

  input,
  select {
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
  background: var(--base-background);
  appearance: none;

  &:focus {
    outline: var(--highlight) solid 2px !important;
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
}

.grayed-out {
  color: gray;
}
</style>
