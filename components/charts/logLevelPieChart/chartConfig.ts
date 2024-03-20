export const data = {
  labels: ["Error", "Warn", "Info"],
  datasets: [
    {
      backgroundColor: ["#FF0000", "#FFFF00", "#545454"],
      borderColor: "#1f2836",

      data: [10, 20, 50],
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 100,
  },
};
