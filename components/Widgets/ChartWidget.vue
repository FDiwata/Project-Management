<template>
  <div class="w-full flex flex-col items-center justify-center">
    <client-only>
      <component
        :is="apexchart"
        ref="realTimeChart"
        class="w-full text-black"
        :options="chartOptions"
        :series="series"
        height="auto"
        :key="key"
      />
    </client-only>
    <div>
      <el-pagination
        background
        :hide-on-single-page="metaSeries.length === 1"
        class="w-full m-auto py-5 flex flex-row items-end"
        :page-size="10"
        layout="prev, pager, next"
        :total="metaSeries.flat().length"
        @current-change="pageChange"
        @prev-click="pageChange"
        @next-click="pageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      key: 0,
      paramForm: {
        project: "",
        plan: "",
      },
      seriesData: [],
      metaSeries: [[]],
      seriesIndex: {
        current: 0,
        limit: 0,
      },
    };
  },
  computed: {
    chartOptions () {
      return {
          chart: {
            height: 350,
            type: "rangeBar",
            foreColor: "#FFFFFF",
            events: {
              dataPointSelection: this.select,
            },
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          fill: {
            type: "solid",
          },
          xaxis: {
            type: "datetime",
          },
          legend: {
            position: "bottom",
          },
        };
    },
    ...mapGetters(["GET_ALL_SUBTASKS"]),
    apexchart() {
      return () => {
        if (process.client) {
          return import("vue-apexcharts");
        }
      };
    },
    series() {
      return [{ data: this.seriesData }];
    },
  },
  watch: {
    // GET_DASHBOARD_DATA(value) {
    //   this.series[0].data = value.actualData;
    //   this.series[1].data = value.plannedData;
    //   try {
    //     this.$refs.realTimeChart.updateSeries([
    //       {
    //         name: "Actual",
    //         data: value.actualData,
    //       },
    //       {
    //         name: "Planned",
    //         data: value.plannedData,
    //       },
    //     ]);
    //   } catch (e) {
    //     this.$refs.realTimeChart.updateSeries([
    //       {
    //         name: "Actual",
    //         data: value.actualData,
    //       },
    //       {
    //         name: "Planned",
    //         data: value.plannedData,
    //       },
    //     ]);
    //   }
    // },
  },
  async created() {
    const currentUserName = await this.$store.dispatch("getCurrentUserName", { id: this.$cookies.get('user_id')})
    await this.$store.dispatch("getGanttData", {username: currentUserName.user_name});

    let metaArray = [];
    metaArray.push(
      ...this.GET_ALL_SUBTASKS.filter((subtask) => {
        return subtask.status !== 'Done'
      }).map((subtask) => {
        return {
          x: `${subtask.subtask_title} ~ ${subtask.subtask_id}`,
          y: [
            new Date(subtask.start_date).getTime(),
            new Date(subtask.end_date).getTime(),
          ],
          fillColor:
            subtask.status === "Todo"
              ? "#FF6242"
              : subtask.status === "Doing"
              ? "#FAA43A"
              : "#9acd32"
        };
      })
    );

    this.arrayChunkify(JSON.parse(JSON.stringify(metaArray)), 10);

    this.seriesIndex.limit = Math.ceil(this.metaSeries.length / 10);
    this.seriesData = this.metaSeries[0];
  },

  methods: {
    pageChange(currentPage) {
      this.series[0].data = this.metaSeries[currentPage - 1];
      this.key = currentPage;
    },
    arrayChunkify(metaArray, chunkSize) {
      let pushLimit = 0;
      let subCount = 0;
      metaArray.forEach((subtask) => {
        this.metaSeries[subCount].push(subtask);
        if (pushLimit <= chunkSize - 2) {
          pushLimit += 1;
        } else {
          this.metaSeries.push([]);
          pushLimit = 0;
          subCount++;
        }
      });
    },
    select(event, chartContext, config) {
      const id = chartContext.w.globals.labels[config.dataPointIndex]
        .split("~")[1]
        .trim();
      this.$router.push(`/Subtask?subtask_id=${id}`);
    },
  },
};
</script>

<style>
</style>