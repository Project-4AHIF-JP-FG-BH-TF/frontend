<script setup lang="ts">
import { useLogEntryStore } from "~/stores/logEntryStore";
import { useOrderStore } from "~/stores/orderStore";
import ColumVisibleMenu from "~/components/ColumVisibleMenu.vue";

const entryStore = useLogEntryStore();
const orderStore = useOrderStore();

if (process.client) {
  entryStore.reloadEntries();
}

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

const isColumMenuVisible = ref(false);

function switchColumnMenuVisibility() {
  isColumMenuVisible.value = !isColumMenuVisible.value;
}

const isDateVisible = ref(true);
const isLevelVisible = ref(true);
const isIpAddressVisible = ref(true);
const isUserIdVisible = ref(true);
const isSessionIdVisible = ref(true);
const isTextVisible = ref(true);
</script>

<template>
  <div id="tableView" class="grow mb-5">
    <div id="tableHeader">
      <div
        v-if="isDateVisible"
        class="headerElement border-bottom-and-right flex-4"
      >
        Datum
        <button id="sortButton" @click="changeSortingDirection">
          <Icon :name="icon" class="icons"></Icon>
        </button>
      </div>
      <div
        v-if="isLevelVisible"
        class="headerElement border-bottom-and-right flex-2"
      >
        Level
      </div>
      <div
        v-if="isIpAddressVisible"
        class="headerElement border-bottom-and-right flex-4"
      >
        IP-Adresse
      </div>
      <div
        v-if="isUserIdVisible"
        class="headerElement border-bottom-and-right flex-3"
      >
        Nutzer-ID
      </div>
      <div
        v-if="isSessionIdVisible"
        class="headerElement border-bottom-and-right flex-3"
      >
        Sitzungs-ID
      </div>
      <div v-if="isTextVisible" class="headerElement border-bottom flex-10">
        Text
      </div>

      <div id="visibility">
        <button id="sortButton" @click="switchColumnMenuVisibility">
          <Icon :name="'material-symbols:list'" class="icons"></Icon>
        </button>
        <div v-if="isColumMenuVisible" id="columnVisibilityMenu">
          <ColumVisibleMenu></ColumVisibleMenu>
        </div>
      </div>
    </div>

    <div id="list">
      <LogEntryComponent
        v-for="log in entryStore.entries"
        :key="log.file_name + log.entry_nr.toString()"
        :log="log"
      ></LogEntryComponent>
    </div>
  </div>
</template>

<style scoped lang="scss">
#columnVisibilityMenu {
  position: absolute;
  right: 120px;
}

#visibility {
  position: absolute;
  right: 0;
  margin-right: 7px;
}

#tableView {
  width: 90%;
  background-color: var(--highlighted-background);
  border-radius: 10px;
  overflow: hidden;

  #tableHeader {
    position: relative;
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
