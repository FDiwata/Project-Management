<template>
  <div class="w-11/12 md:w-5/6 m-auto h-fit p-1 md:p-10 lg:p-0">
    <client-only>
      <div class="w-full flex flex-row items-center justify-between space-y-3 my-3">
        <span class="text-xl md:text-5xl font-bold text-white"
          >Dashboard</span
        >
        <fiscal-year-selector />
      </div>
      <el-tabs type="card" class="bg-neutral-900 h-fit">
        <el-tab-pane label="Dashboard">
          <div
            class="w-full flex flex-col items-center justify-between space-y-5"
          >
            <entity-stats />
            <div
              class="
                w-full
                flex flex-col
                lg:flex-row
                items-center
                justify-start
                mt-0
                space-y-5 space-x-0
                lg:space-y-0 lg:space-x-5
              "
            >
              <pie-subtask-widget />
              <pie-subtask-widget :is-project-mode="true" />
              <percentages />
            </div>
          </div>
          <div
            class="
              py-5
              w-full
              m-auto
              flex flex-col
              md:flex-row
              items-center
              justify-center
              space-x-10
            "
          >
            <project-percentage
              class="w-full md:w-1/2"
              :perc-data="GET_ALL_PLANS"
            />
            <eisenhower-matrix class="w-full md:w-1/2" />
          </div>
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="Subtask schedule" class="text-white">
          <span slot="label" class="text-white"
            ><i class="el-icon-date"></i> Subtask Schedule</span
          >
          <calendar-widget />
        </el-tab-pane>
        <!-- <el-tab-pane :lazy="false" label="Subtask schedule" class="text-white h-screen">
        <span slot="label" class="text-white"><i class="el-icon-finished p-2"></i>Gantt (Subtasks)</span>
          <chart-widget />
      </el-tab-pane> -->
      </el-tabs>
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ChartWidget from "../components/Widgets/ChartWidget.vue";
import ProjectPercentage from "../components/Widgets/ProjectPercentage.vue";
import Percentages from "../components/Widgets/Percentages.vue";
import PieSubtaskWidget from "../components/Widgets/PieSubtaskWidget.vue";
import CalendarWidget from "../components/Widgets/CalendarWidget.vue";
import NewFeature from "../components/Elements/NewFeature.vue";
import EisenhowerMatrix from "../components/Widgets/EisenhowerMatrix.vue";
import EntityStats from "../components/Widgets/EntityStats.vue";
import FiscalYearSelector from "../components/Widgets/FiscalYearSelector.vue";
export default {
  components: {
    ChartWidget,
    ProjectPercentage,
    Percentages,
    PieSubtaskWidget,
    CalendarWidget,
    NewFeature,
    EisenhowerMatrix,
    EntityStats,
    FiscalYearSelector,
  },
  name: "IndexPage",
  layout: "Default",
  computed: {
    ...mapGetters(["GET_SELECTED_PLANS", "GET_ALL_PROJECTS", "GET_ALL_PLANS"]),
  },
  methods: {
    async getProjectPlan(project_id) {
      await this.$store.dispatch("getPlans", project_id);
    },
  },
  async created() {
    await this.$store.dispatch("getProjects");
    await this.$store.dispatch("getPlans");
    await this.$store.dispatch("getPlanDashboard");
  },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
<style>
.is-active {
  background-color: #3a546a;
}
@import url("~/assets/output.css");
</style>