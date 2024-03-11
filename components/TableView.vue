<script setup lang="ts">
import { useLogEntryStore } from "~/stores/logEntryStore";
import { useOrderStore } from "~/stores/orderStore";
import ColumVisibleMenu from "~/components/ColumVisibleMenu.vue";
import type { Columns } from "~/types/LogEntry";

const entryStore = useLogEntryStore();
const orderStore = useOrderStore();

onMounted(() => {
  entryStore.reloadEntries();
});

const desc = ref(true);

const icon = ref("material-symbols:arrow-downward");

function changeSortingDirection() {
  desc.value = !desc.value;
  if (desc.value) {
    icon.value = "material-symbols:arrow-downward";
  } else {
    icon.value = "material-symbols:arrow-upward";
  }

  orderStore.setOrder(desc.value ? "DESC" : "ASC");
  entryStore.reloadEntries();
}

const selectedLogIndex = ref(-1);

function showExpandedLogView(logIndex: number) {
  selectedLogIndex.value = logIndex;
}

function hideExpandedLogView() {
  selectedLogIndex.value = -1;
}

const isColumMenuVisible = ref(false);

function switchColumnMenuVisibility() {
  isColumMenuVisible.value = !isColumMenuVisible.value;
}

const columns = ref({
  date: true,
  level: true,
  ip: true,
  user: true,
  session: true,
  text: true,
} as Columns);

function onScroll(event: Event) {
  const target = event.target as unknown as {
    scrollHeight: number;
    scrollTop: number;
    clientHeight: number;
  };

  // height of full list element < current top of view + visible height * 2
  if (target.scrollHeight < target.scrollTop + target.clientHeight * 2) {
    entryStore.loadNextEntries();
  }
}
</script>

<template>
  <ExpandedLogView
    v-if="selectedLogIndex !== -1"
    :index="selectedLogIndex"
    @close="hideExpandedLogView"
  ></ExpandedLogView>

  <div id="tableView" class="grow">
    <div id="tableHeader">
      <div
        v-if="columns.date"
        class="headerElement border-bottom-and-right flex-4"
      >
        Datum
        <button id="sortButton" @click="changeSortingDirection">
          <Icon size="30" :name="icon" class="icons"></Icon>
        </button>
      </div>
      <div
        v-if="columns.level"
        class="headerElement border-bottom-and-right flex-2"
      >
        Level
      </div>
      <div
        v-if="columns.ip"
        class="headerElement border-bottom-and-right flex-4"
      >
        IP-Adresse
      </div>
      <div
        v-if="columns.user"
        class="headerElement border-bottom-and-right flex-3"
      >
        Nutzer-ID
      </div>
      <div
        v-if="columns.session"
        class="headerElement border-bottom-and-right flex-3"
      >
        Sitzungs-ID
      </div>
      <div
        v-if="columns.text"
        class="headerElement border-bottom-and-right flex-10"
      >
        Text
      </div>
      <div class="headerElement border-bottom flex-0 menu">
        <button id="visibility" @click="switchColumnMenuVisibility">
          <Icon size="30" :name="'material-symbols:list'" class="icons"></Icon>
        </button>

        <div v-if="isColumMenuVisible" id="columnVisibilityMenu">
          <div id="background" @click="switchColumnMenuVisibility" />
          <ColumVisibleMenu v-model="columns"></ColumVisibleMenu>
        </div>
      </div>
    </div>

    <div id="list" @scroll="onScroll">
      <LogEntryComponent
        v-for="(log, index) in entryStore.entries"
        :key="log.file_name + log.entry_nr.toString()"
        :log="log"
        :columns="columns"
        @expand="showExpandedLogView(index)"
      ></LogEntryComponent>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  min-width: 50px;
}

#tableView {
  width: 100%;
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
      height: 50px;

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

    #columnVisibilityMenu {
      z-index: 0;
      position: absolute;
      right: 50px;
      top: 10px;

      #background {
        z-index: -1;
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
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
