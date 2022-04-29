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
          title: {
            text: "All Subtasks",
            align: "left",
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize: "14pt",
              fontWeight: "bold",
              fontFamily: undefined,
              color: "white",
            },
          },
          labels: ['Todo', 'Doing', 'Done'],
          chart: {
            height: 350,
            type: "rangeBar",
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "vertical",
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [50, 0, 100, 100],
            },
          },
          xaxis: {
            type: "datetime",
          },
          legend: {
            position: "top",
          },
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