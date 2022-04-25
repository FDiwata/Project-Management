<template>
  <div class="w-full">
    <client-only>
      <component
        :is="apexchart"
        ref="realTimeChart"
        class="w-full text-black"
        :options="chartOptions"
        :series="series"
        height="300"
      />
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    series: {
      type: Array,
      default: () => [
        {
          name: "Actual",
          data: [],
        },
        {
          name: "Planned",
          data: [],
        },
      ],
    },
    chartOptions: {
      type: Object,
      default: () => {
        return {
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
        };
      },
    },
  },
  computed: {
    apexchart() {
      return () => {
        if (process.client) {
          return import("vue-apexcharts");
        }
      };
    },
    ...mapGetters(["GET_DASHBOARD_DATA"]),
  },
  watch: {
    GET_DASHBOARD_DATA(value) {
      this.series[0].data = value.actualData;
      this.series[1].data = value.plannedData;
      try {
        this.$refs.realTimeChart.updateSeries([
          {
            name: "Actual",
            data: value.actualData,
          },
          {
            name: "Planned",
            data: value.plannedData,
          },
        ]);
      } catch (e) {
        this.$refs.realTimeChart.updateSeries([
          {
            name: "Actual",
            data: value.actualData,
          },
          {
            name: "Planned",
            data: value.plannedData,
          },
        ]);
      }
    },
  },
};
</script>

<style>
</style>