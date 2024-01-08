<script setup lang="ts">
const logs = ref([
  {
    date: "8.1.2024",
    level: "RED",
    ip: "192.168.0.1",
    user_id: 123,
    session_id: 456,
    text: "Zusatz Kommentar",
  },
  {
    date: "7.1.2024",
    level: "INFO",
    ip: "192.168.0.45",
    user_id: 1,
    session_id: 2,
    text: "Zusatz-Text",
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
        <span class="headerElement border-bottom-and-right">Datum</span>
        <span class="headerElement border-bottom-and-right">Level</span>
        <span class="headerElement border-bottom-and-right">IP-Adresse</span>
        <span class="headerElement border-bottom-and-right">Nutzer-ID</span>
        <span class="headerElement border-bottom-and-right">Sitzungs-ID</span>
        <span class="headerElement border-bottom">Text</span>
      </div>
      <!-- Liste an Log-Einträgen -->
      <div class="list">
        <div class="list-element" v-for="log in logs">
          <span class="list-data border-right">{{ log.date }}</span>
          <span class="list-data border-right">{{ log.level }}</span>
          <span class="list-data border-right">{{ log.ip }}</span>
          <span class="list-data border-right">{{ log.user_id }}</span>
          <span class="list-data border-right">{{ log.session_id }}</span>
          <span class="list-data">{{ log.text }}</span>
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
    flex: 10;
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
    flex: 10;
  }
}
</style>
