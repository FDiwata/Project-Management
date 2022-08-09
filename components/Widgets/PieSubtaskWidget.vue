<template>
  <div class="rounded-lg w-full lg:w-1/3">
    <GChart
      class="w-full h-full"
      :resizeDebounce="400"
      :data="chartData"
      type="PieChart"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
import { mapGetters } from "vuex";
export default {
  components: {
    GChart,
  },
  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [[]],
      chartOptions: {
        height: 320,
        width: "100%",
        titleTextStyle: {color: '#FFFFFF'},
        legendTextStyle: {
          color: '#FFFFFF'
        },
        backgroundColor: {
          fill: "#46596f",
          opacity: 100,
        },
        title: "Overall subtask composition",
        slices: {
          0: { color: '#FF6242' },
          1: { color: '#FAA43A' },
          2: { color: '#9ACD32' }
        }
      },
      widgetData: [],
      subStatus: ["todo", "doing", "done"],
      subColor: ["#FF6242", "#FAA43A", "#9ACD32"],
      selectedProjectID: "",
      selectedPlanID: null,
    };
  },
  computed: {
    ...mapGetters(["GET_ALL_PROJECTS", "GET_SELECTED_PLANS"]),
  },
  watch: {
    async selectedProjectID(value) {
      await this.$store.dispatch("getPlans", value);
      this.widgetData = [];
      this.widgetData.push(
        await this.$store.dispatch("getTodoPercentage", {
          project_id: value,
          plan_id: this.selectedPlanID,
        })
      );
      this.widgetData.push(
        await this.$store.dispatch("getDoingPercentage", {
          project_id: value,
          plan_id: this.selectedPlanID,
        })
      );
      this.widgetData.push(
        await this.$store.dispatch("getDonePercentage", {
          project_id: value,
          plan_id: this.selectedPlanID,
        })
      );
      this.selectedPlanID = null;
    },

    async selectedPlanID(value) {
      this.widgetData = [];
      this.widgetData.push(
        await this.$store.dispatch("getTodoPercentage", {
          project_id: this.selectedProjectID,
          plan_id: value,
        })
      );
      this.widgetData.push(
        await this.$store.dispatch("getDoingPercentage", {
          project_id: this.selectedProjectID,
          plan_id: value,
        })
      );
      this.widgetData.push(
        await this.$store.dispatch("getDonePercentage", {
          project_id: this.selectedProjectID,
          plan_id: value,
        })
      );
    },

    widgetData(value) {
      this.chartData = [["Year", "Sales"]];
      value.forEach((item, index) => {
        this.chartData.push([this.subStatus[index], Math.round(item.percentage)]);
      });
    },
  },
  async mounted() {
    this.$store.dispatch("getProjects");
    this.widgetData.push(
      await this.$store.dispatch("getTodoPercentage", {
        project_id: null,
        plan_id: null,
      })
    );
    this.widgetData.push(
      await this.$store.dispatch("getDoingPercentage", {
        project_id: null,
        plan_id: null,
      })
    );
    this.widgetData.push(
      await this.$store.dispatch("getDonePercentage", {
        project_id: null,
        plan_id: null,
      })
    );
  },
};
</script>

<style>
</style>