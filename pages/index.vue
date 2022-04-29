<template>
  <div class="w-5/6 m-auto h-full">
    <div class="w-full py-5">
      <span class="text-5xl font-bold text-white"> Dashboard </span>
    </div>
    <div class="flex flex-col items-start justify-between">
      <!-- -->
      <percentages />
      <div class="mt-10 w-full">
        <project-percentage :plan-data="GET_ALL_PLANS" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ChartWidget from "../components/Widgets/ChartWidget.vue";
import ProjectPercentage from "../components/Widgets/ProjectPercentage.vue";
import Percentages from "../components/Widgets/Percentages.vue";
export default {
  components: { ChartWidget, ProjectPercentage, Percentages },
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
};
</script>
<style>
@import url("~/assets/output.css");
</style>