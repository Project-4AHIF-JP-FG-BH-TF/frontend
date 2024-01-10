<script setup lang="ts">
import {computed, ref} from "vue";

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
</script>

<template>
  <div id="settings">
    <div id="settings-head">
      <button class="pl-2" @click="onOpenCloseSettings">
        <Icon :name="settingsButtonIcon" color="white" size="32px"/>
      </button>
      <span>{{ settingsButtonText }}</span>
    </div>
    <div id="settings-body" v-if="settingsOpened">
      <div id="filter-settings-1" class="filter-settings">
        <div id="ip-address" class="labeled-input">
          <label>Ip Address:</label>
          <input type="text">
        </div>
        <div id="text-regex" class="labeled-input">
          <div>
            <label>Text</label>
            <label>Regex</label>
          </div>
          <input type="text">
        </div>
      </div>
      <div id="filter-settings-2" class="filter-settings">
        <div id="date" class="flex justify-between gap-3" style="width: 50%">
          <div id="from" class="labeled-input">
            <label>From:</label>
            <input type="datetime-local">
          </div>
          <div id="to" class="labeled-input">
            <label>To:</label>
            <input type="datetime-local">
          </div>
        </div>
        <div id="log-level" class="labeled-input" style="width: 50%">
          <label>Log Level</label>
          <select>
            <option>Info</option>
            <option>Error</option>
          </select>
        </div>
      </div>
      <div id="filter-footer">
        <button id="reset-button">reset</button>
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
    }

    #filter-settings-1 {
      #ip-address {
        @apply grow;
      }

      #text-regex {
        @apply grow;
      }
    }

    #filter-settings-2 {
      #date {
        .labeled-input {
          @apply grow;
          input {
            &::-webkit-calendar-picker-indicator {
              display: none;
              -webkit-appearance: none;
            }
          }
        }
      }

      #log-level {
      }
    }

    #filter-footer {
      @apply flex justify-center pt-1 pb-4;
      width: 100%;

      #reset-button {
        @apply rounded bg-blue-500 text-white p-1;
        width: 100px;

        &:hover {
          @apply bg-blue-700;
        }
      }
    }
  }
}

.labeled-input {
  @apply flex flex-col items-center inline;

  input, select {
    width: 100%;
    height: 25px;
  }
}

.filter-settings {
  @apply flex gap-6 ps-6 pe-6 pb-4;
  width: 100%;
}
</style>