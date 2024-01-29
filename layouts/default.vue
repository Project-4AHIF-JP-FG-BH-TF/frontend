<script setup lang="ts"></script>

<template>
  <div id="base">
    <aside id="sidebar-left">
      <div>
        <img id="logo" src="assets/loggaroo_logo.svg" alt="Loggaroo Logo" />
      </div>

      <div id="actions">
        <button>Log-Dateien</button>
        <br />
        <button>Log-Einträge</button>
        <br />
        <button>Statistiken</button>
        <br />
      </div>
    </aside>

    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
#base {
  width: 100vw;
  height: 100vh;

  display: flex;

  main {
    flex: 1;
  }

  #sidebar-left {
    display: flex;
    float: left;
    width: 240px;
    flex-direction: column;
    text-align: center;
    background-color: var(--highlighted-background);
    height: 100vh;

    justify-content: flex-start;
    align-items: center;

    #logo {
      height: 120px;
    }

    button {
      border: var(--base-background) 2px solid;
      background-color: var(--base-background);
      border-radius: 10px;
      width: 150px;
      margin: 15px;
      padding: 5px;

      font-size: large;
      color: white;
    }
  }
}
</style>
