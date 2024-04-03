<script setup lang="ts">
const statisticsExpanded = ref(false);
</script>

<template>
  <aside>
    <div>
      <img id="logo" src="assets/loggaroo_logo.svg" alt="Loggaroo Logo" />
    </div>

    <div id="actions">
      <nuxt-link to="/logfiles" class="links">Log-Dateien</nuxt-link>
      <nuxt-link to="/" class="links">Log-Einträge</nuxt-link>
      <!--        <nuxt-link to="/statistics">Statistiken</nuxt-link>-->

      <div id="chartSelection">
        <span
          id="statistics"
          :class="{ noBorderRadiusBottom: statisticsExpanded }"
          @click="statisticsExpanded = !statisticsExpanded"
          >Statistiken</span
        >
        <div v-if="statisticsExpanded" id="chartSelectorsContainer">
          <nuxt-link to="/piechart" class="chartSelectors">PieChart</nuxt-link>
          <nuxt-link class="chartSelectors">BarChart</nuxt-link>
          <nuxt-link class="chartSelectors bottomSelector"
            >LineChart
          </nuxt-link>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped lang="scss">
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

    .links,
    #statistics {
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

    #chartSelection {
      display: flex;
      flex-direction: column;
      width: 100%;

      .noBorderRadiusBottom {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }

      #chartSelectorsContainer {
        display: flex;
        flex-direction: column;

        .chartSelectors {
          background-color: var(--base-background);
          //width: calc(var(--side-width) - var(--gap) * 2);
          //width: 100%;
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

        .bottomSelector {
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }
    }
  }

  .router-link-active {
    background: var(--light-blue) !important;
  }
}
</style>
