<script setup lang="ts"></script>

<template>
  <div id="outer">
    <h1>Column Vision</h1>

    <div>
      <input id="date" type="checkbox" name="date" />
      <label for="date">Datum</label>
    </div>

    <div>
      <input id="level" type="checkbox" name="level" />
      <label for="level">Level</label>
    </div>

    <div>
      <input id="ipaddress" type="checkbox" name="ipaddress" />
      <label for="IpAddress">IP-Adresse</label>
    </div>

    <div>
      <input id="userID" type="checkbox" name="userID" />
      <label for="userID">Nutzer-ID</label>
    </div>

    <div>
      <input id="sessionID" type="checkbox" name="sessionID" />
      <label for="sessionID">Sitzungs-ID</label>
    </div>

    <div>
      <input id="text" type="checkbox" name="text" />
      <label for="text">Text</label>
    </div>
  </div>
</template>

<style scoped lang="scss">
#outer {
  background-color: var(--base-background);
  border-radius: 10px;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  width: 200px;

  padding: 10px;

  div {
    text-align: left;

    input {
      margin: 10px;
    }
  }
}
</style>
