<script setup lang="ts">

</script>

<template>

  <div id="main">

    <aside id="sidebar-left">
      <div>
        <img id="logo" src="assets/loggaroo_logo.svg" alt="Loggaroo Logo">
      </div>

      <div id="actions">
        <button class="button">Log-Dateien</button><br>
        <button class="button">Log-Einträge</button><br>
        <button class="button">Statistiken</button><br>
      </div>

    </aside>

    <div id="main-view">

      <div>
        <h1>MAIN TABLE</h1>
      </div>

    </div>

  </div>


</template>

<style scoped lang="scss">

* {
  font-size: large;
  color: white;
}

#main {
  width: 100vw;
  height: 100vh;
  background-color: #2e2e2e;

  #sidebar-left {
    display: flex;
    float: left;
    width: 240px;
    flex-direction: column;
    text-align: center;
    background-color: #535353;
    height: 100vh;

    justify-content: flex-start;
    align-items: center;

    #logo{
      height: 120px;
    }
  }
}


#main-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%
}

.button{
  border: gray 2px solid;
  background-color: gray;
  border-radius: 10px;
  width:150px;
  margin: 15px;
  padding: 5px;
}


</style>