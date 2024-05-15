import { defineStore } from "pinia";

interface ChartColorStoreState {
  colors: Map<string, string>;
}

export const useChartColorStore = defineStore("chartColor", {
  state(): ChartColorStoreState {
    return {
      colors: new Map<string, string>([
        ["error", "#E53F4E"],
        ["info", "#86B6F6"],
        ["warn", "#d2bf46"],
      ]),
    };
  },

  actions: {
    addColorsForMissingLabels(labels: string[]) {
      for (const labelsKey in labels) {
        if (this.colors.has(labelsKey)) {
          continue;
        }

        this.colors.set(labelsKey, getRandomColor());
      }
    },
  },
});

function getRandomColor() {
  return (
    "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 6)
  );
}
