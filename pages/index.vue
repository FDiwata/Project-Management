<template>
  <div class="w-11/12 md:w-5/6 m-auto h-full p-1 md:p-10 lg:p-0">
    <div class="w-full flex flex-row items-center justify-between space-x-5">
    <div class="w-1/2 flex flex-col items-center justify-start mt-0">
    <div class="w-full py-3">
      <span class="text-5xl font-bold text-white">Dashboard</span>
    </div>
      <div class="w-full flex flex-row items-center justify-center space-x-3 my-3">
      <pie-subtask-widget />
      <pie-subtask-widget :is-project-mode="true" />
      </div>
      <percentages />
    </div>
    <div class="m-auto mb-0 w-1/2">
      <calendar-widget />
    </div>
    </div>
    <div class="py-10 w-full m-auto">
      <project-percentage :perc-data="GET_ALL_PLANS" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ChartWidget from "../components/Widgets/ChartWidget.vue";
import ProjectPercentage from "../components/Widgets/ProjectPercentage.vue";
import Percentages from "../components/Widgets/Percentages.vue";
import PieSubtaskWidget from "../components/Widgets/PieSubtaskWidget.vue";
import CalendarWidget from "../components/Widgets/CalendarWidget.vue";
export default {
  components: { ChartWidget, ProjectPercentage, Percentages, PieSubtaskWidget, CalendarWidget },
  name: "IndexPage",
  layout: "Default",
  computed: {
    ...mapGetters(["GET_SELECTED_PLANS", "GET_ALL_PROJECTS", "GET_ALL_PLANS"])
  },
  methods: {
    async getProjectPlan(project_id) {
      await this.$store.dispatch("getPlans", project_id);
    }
  },
  async created() {
    await this.$store.dispatch("getProjects");
    await this.$store.dispatch("getPlans");
    await this.$store.dispatch("getPlanDashboard");
  },
  data() {
    return {
      drawer: false
    };
  }
};
</script>
<style>
@import url("~/assets/output.css");
</style>