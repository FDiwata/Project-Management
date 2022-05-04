<template>
  <div>
    <client-only>
      <component
        :is="apexchart"
        ref="realTimeChart"
        class="text-black"
        :options="chartOptions"
        :series="series"
        height="480"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  computed: {
    apexchart() {
      return () => {
        if (process.client) {
          return import("vue-apexcharts");
        }
      };
    },
  },
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Todo", "Doing", "Done"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      widgetData: [],
      subStatus: ["todo", "doing", "done"],
      subColor: ["#FAA43A", "#5DA5DA", "#9ACD32"],
    };
  },

  watch: {
    widgetData() {
      this.series = this.widgetData.map((status) => {
        return status.percentage;
      });
    },
  },

  async mounted() {
    this.widgetData.push(await this.$store.dispatch("getTodoPercentage"));
    this.widgetData.push(await this.$store.dispatch("getDoingPercentage"));
    this.widgetData.push(await this.$store.dispatch("getDonePercentage"));
  },
};
</script>

<style>
</style>