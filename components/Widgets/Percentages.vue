<template>
  <div
    class="w-full p-5 mt-5 lg:mt-0 rounded bg-slate-200 shadow-lg text-gray-800"
  >
    <div
      class="
        w-full
        flex flex-col
        items-start
        justify-start
        space-x-0 space-y-2
        lg:space-y-0
      "
    >
      <span class="text-2xl font-bold w-full mb-3">Subtask composition</span>
      <div
        class="
          w-full
          flex flex-col
          md:flex-row
          items-center
          justify-center
          space-y-3 space-x-0
          md:space-y-0 md:space-x-3
        "
      >
        <div class="flex flex-col items-start justify-center w-full lg:w-1/2">
          <span class="pb-1 text-sm">Select Project</span>
          <el-select
            class="w-full transition-all hover:shadow-lg"
            v-model="selectedProjectID"
            placeholder="Pick a project"
          >
            <el-option label="All projects" :value="null" />
            <el-option
              v-for="project in GET_ALL_PROJECTS"
              :key="project.key"
              :label="project.project_title"
              :value="project.project_id"
            />
          </el-select>
        </div>
        <div class="flex flex-col items-start justify-center w-full lg:w-1/2">
          <span class="pb-1 text-sm">Select Plan</span>
          <el-select
            class="w-full transition-all hover:shadow-lg"
            v-model="selectedPlanID"
            placeholder="Pick a plan"
          >
            <el-option label="All plans" :value="null" />
            <el-option
              v-for="plan in GET_SELECTED_PLANS"
              :key="plan.key"
              :label="plan.plan_title"
              :value="plan.plan_id"
            />
          </el-select>
        </div>
      </div>
    </div>
    <hr class="my-3" />
    <div
      v-for="(status) in widgetData"
      :key="status.key"
      class="min-h-80"
    >
      <span class="font-light text-sm"
        >Percentage of subtasks {{ subStatus[status.status === 'Todo' ? 0 : status.status === 'Doing' ? 1 : 2] }}</span
      >
      <el-progress
        :stroke-width="25"
        :color="subColor[status.status === 'Todo' ? 0 : status.status === 'Doing' ? 1 : 2] || '#808080'"
        class="w-full"
        :text-inside="true"
        :percentage="Math.round(status.value.percentage)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["GET_ALL_PROJECTS", "GET_SELECTED_PLANS"]),
  },
  data() {
    return {
      widgetData: [],
      subStatus: ["todo", "doing", "done"],
      subColor: ["#FF6242", "#FAA43A", "#9ACD32"],
      selectedProjectID: null,
      selectedPlanID: null,
    };
  },
  methods: {
    async getPercentages(project_id, plan_id) {
      const categories = [
        "getTodoPercentage",
        "getDoingPercentage",
        "getDonePercentage",
      ];

      this.widgetData.push({
          status: categories[0].replace("get", "").replace("Percentage", ""),
          value: await this.$store.dispatch(categories[0], {
            project_id: project_id,
            plan_id: plan_id,
          }),
        });

        this.widgetData.push({
          status: categories[1].replace("get", "").replace("Percentage", ""),
          value: await this.$store.dispatch(categories[1], {
            project_id: project_id,
            plan_id: plan_id,
          }),
        });

        this.widgetData.push({
          status: categories[2].replace("get", "").replace("Percentage", ""),
          value: await this.$store.dispatch(categories[2], {
            project_id: project_id,
            plan_id: plan_id,
          }),
        });
    },
  },
  watch: {
    async selectedProjectID(value) {
      value === null && this.$store.commit("SET_SELECTED_PLANS", []);
      await this.$store.dispatch("getPlans", value);
      this.widgetData = [];
      await this.getPercentages(value, this.selectedPlanID);
      this.selectedPlanID = null;
    },

    async selectedPlanID(value) {
      this.widgetData = [];
      await this.getPercentages(this.selectedProjectID, value);
    },
  },
  async mounted() {
    this.$store.dispatch("getProjects");
    await this.getPercentages(null, null);
  },
};
</script>

<style>
</style>