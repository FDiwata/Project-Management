<template>
  <div class="rounded-lg w-full">
    <GChart
      class="w-full h-full"
      :resizeDebounce="500"
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
  props: {
    isProjectMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [[]],
      widgetData: [],
      selectedProjectID: "",
      selectedPlanID: null,
    };
  },
  computed: {
    ...mapGetters(["GET_ALL_PROJECTS", "GET_SELECTED_PLANS"]),
    chartOptions() {
      return {
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
        title: !this.isProjectMode ? "Overall subtask composition" : "Overall project percentage",
        slices: {
          0: { color: '#FF6242' },
          ...(!this.isProjectMode && { 1: { color: '#FAA43A' }}),
          [this.isProjectMode ?1 :2]: { color: '#9ACD32' },
        }
      }
    },
    subStatus() {
      return !this.isProjectMode? ["todo", "doing", "done"] : ['Ongoing', 'Done']
    },
    subColor() {
      return !this.isProjectMode?  ["#FF6242", "#FAA43A", "#9ACD32"] : ["#FF6242", "#9ACD32"]
    }
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
    if (!this.isProjectMode) {
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
    } else {
      const projObj = await this.$store.dispatch("getOverallProjPerc")
      const perProjPercent = 100/projObj.length
      const percDone = projObj.filter((proj) => {
          return proj.is_done === 1
      }).length * perProjPercent

      const percOngoing = projObj.filter((proj) => {
          return proj.is_done === 0
      }).length * perProjPercent

      console.log(typeof percDone, typeof percOngoing)
 
      this.widgetData.push({
          percentage: percOngoing
      })
      this.widgetData.push({
          percentage: percDone
      })
    }
  },
};
</script>

<style>
</style>