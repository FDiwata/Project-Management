<template>
  <div
    class="w-full p-5 mt-5 lg:mt-0 rounded bg-neutral-800 shadow-lg text-white"
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
      <span class="text-lg font-bold w-full mb-3">Subtask composition</span>
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
          <span class="pb-3 text-sm">Pick a Project</span>
          <el-select
            class="w-full transition-all hover:shadow-lg"
            v-model="selectedProjectID"
            placeholder="Pick a project"
          >
            <el-option label="All projects" :value="null" />
            <el-option
              v-for="project in FilteredProjects"
              :key="project.key"
              :label="project.project_title"
              :value="project.project_id"
            />
          </el-select>
        </div>
        <div class="flex flex-col items-start justify-center w-full lg:w-1/2">
          <span class="pb-3 text-sm">Pick a Plan</span>
          <el-select
            class="w-full transition-all hover:shadow-lg"
            v-model="selectedPlanID"
            placeholder="Pick a plan"
          >
            <el-option label="All plans" :value="null" />
            <el-option
              v-for="plan in FilteredPlans"
              :key="plan.key"
              :label="plan.plan_title"
              :value="plan.plan_id"
            />
          </el-select>
        </div>
      </div>
    </div>
    <div
      v-for="status in widgetData"
      :key="status.key"
      class="min-h-80 flex flex-row items-center justify-center my-5"
    >
      <span class="font-light text-lg mx-5 w-1/6">{{
        subStatus[
          status.status === "Todo" ? 0 : status.status === "Doing" ? 1 : 2
        ]
      }}</span>
      <el-progress
        :stroke-width="25"
        :color="
          subColor[
            status.status === 'Todo' ? 0 : status.status === 'Doing' ? 1 : 2
          ] || '#808080'
        "
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
    ...mapGetters(["GET_ALL_PROJECTS", "GET_ALL_PLANS", "GET_FISCAL_YEAR"]),
    FilteredProjects() {
      return this.GET_ALL_PROJECTS.filter((project) => {
        return (
          new Date(project.TargetMonth).getFullYear() ===
          this.$cookies.get("fyear")
        );
      });
    },

    FilteredPlans() {
      return this.GET_ALL_PLANS.filter((plan) => {
        return this.FilteredProjects.filter(
          (project) =>
            new Date(project.TargetMonth).getFullYear() ===
            this.$cookies.get("fyear")
        )
          .map((proj) => proj.project_id)
          .includes(plan.project_id);
      });
    },
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
      this.widgetData = [];
      const categories = [
        "getTodoPercentage",
        "getDoingPercentage",
        "getDonePercentage",
      ];
      this.widgetData.length = 0;
      this.widgetData.push({
        status: categories[0].replace("get", "").replace("Percentage", ""),
        value: await this.$store.dispatch(categories[0], {
          project_id: project_id,
          plan_id: plan_id,
          year: this.$cookies.get("fyear"),
        }),
      });

      this.widgetData.push({
        status: categories[1].replace("get", "").replace("Percentage", ""),
        value: await this.$store.dispatch(categories[1], {
          project_id: project_id,
          plan_id: plan_id,
          year: this.$cookies.get("fyear"),
        }),
      });

      this.widgetData.push({
        status: categories[2].replace("get", "").replace("Percentage", ""),
        value: await this.$store.dispatch(categories[2], {
          project_id: project_id,
          plan_id: plan_id,
          year: this.$cookies.get("fyear"),
        }),
      });
    },
  },
  watch: {
    async selectedProjectID(value) {
      value === null && this.$store.commit("SET_SELECTED_PLANS", []);
      await this.getPercentages(value, this.selectedPlanID);
      this.selectedPlanID = null;
    },

    async selectedPlanID(value) {
      await this.getPercentages(this.selectedProjectID, value);
    },
    async GET_FISCAL_YEAR(newVal, oldVal) {
      if (oldVal !== "") {
        this.$store.dispatch("getProjects");
        await this.getPercentages(null, null);

        this.selectedProjectID = null;
      }
    },
  },
  async mounted() {
    await this.$store.dispatch("getProjects");
    await this.$store.dispatch("getPlans");
    await this.getPercentages(null, null);
  },
};
</script>

<style>
</style>