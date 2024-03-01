<script setup lang="ts"></script>

<template>
  <div id="base">
    <aside>
      <div>
        <img id="logo" src="assets/loggaroo_logo.svg" alt="Loggaroo Logo" />
      </div>

      <div id="actions">
        <nuxt-link to="/logfiles">Log-Dateien</nuxt-link>
        <nuxt-link to="/">Log-Einträge</nuxt-link>
        <nuxt-link to="/statistics">Statistiken</nuxt-link>
      </div>
    </aside>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
#base {
  --side-width: 190px;

  width: 100vw;
  height: 100vh;

  display: flex;

  main {
    width: calc(100vw - var(--side-width));
  }

  aside {
    display: flex;
    flex: 0 0 var(--side-width);

    flex-direction: column;
    text-align: center;
    background-color: var(--highlighted-background);
    height: 100vh;

    justify-content: flex-start;
    align-items: center;

    #logo {
      height: 120px;
    }

    #actions {
      display: flex;
      flex-direction: column;

      gap: var(--gap);

      a {
        background-color: var(--base-background);
        border-radius: 10px;
        width: calc(var(--side-width) - var(--gap) * 2);
        padding: 5px;

        font-size: large;
        color: white;

        transition: 0.1s ease-in-out;

        &:hover {
          background-color: var(--highlight);
        }

        &:active {
          background-color: var(--highlight);
          scale: 1.02;
        }
      }
    }
  }
}

.router-link-active {
  background: var(--light-blue) !important;
}
</style>
