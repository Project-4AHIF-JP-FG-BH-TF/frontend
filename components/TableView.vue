<script setup lang="ts">
const logs = ref([
  {
    date: "8.1.2024 9:30",
    level: "ERROR",
    ip: "192.168.0.1",
    user_id: 123,
    session_id: 456,
    text: "Zusatz Kommentar ZusatzZusatz ZusatzZusatz",
  },
  {
    date: "17.12.2023 23:59",
    level: "INFO",
    ip: "192.168.0.12",
    user_id: 2,
    session_id: 35,
    text: "Zusatz-Text",
  },
  {
    date: "7.1.2024 10:45",
    level: "INFO",
    ip: "192.168.0.45",
    user_id: 1,
    session_id: 2,
    text: "Zusatz-Text",
  },
  {
    date: "6.1.2024 10:45",
    level: "INFO",
    ip: "192.168.0.45",
    user_id: 1,
    session_id: 5,
    text: "Zusatz-Text",
  },
  {
    date: "5.1.2024 10:45",
    level: "INFO",
    ip: "192.168.0.45",
    user_id: 1,
    session_id: 65,
    text: "Zusatz-Text",
  },
  {
    date: "4.1.2024 10:45",
    level: "ERROR",
    ip: "192.168.0.45",
    user_id: 1,
    session_id: 12,
    text: "Kommentar",
  },
]);
</script>

<template>
  <div id="main">
    <div id="settings">
      <span>Settings-Placeholder</span>
    </div>

    <div id="tableView">
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
      <div class="list">
        <div class="list-element" v-for="log in logs">
          <span class="list-data border-right flex-4">{{ log.date }}</span>
          <div class="list-data border-right flex-3" id="level-field">
            <div v-if="log.level == 'ERROR'" class="log-type error">
              <span>!</span>
            </div>
            <div v-else class="log-type info"></div>
          </div>
          <span class="list-data border-right flex-4">{{ log.ip }}</span>
          <span class="list-data border-right flex-3">{{ log.user_id }}</span>
          <span class="list-data border-right flex-3">{{
            log.session_id
          }}</span>
          <span class="list-data text-overflow-ellipsis flex-10">{{
            log.text
          }}</span>
        </div>
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
    background-color: #535353;
    border-radius: 10px;
  }

  #tableView {
    margin-bottom: 20px;
    width: 90%;
    height: 90%;
    background-color: #535353;
    border-radius: 10px;
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
