<template>
  <div
    class="
      w-full
      bg-neutral-200
      dark:bg-neutral-900
      m-auto
      rounded
      flex flex-row
      items-center
      justify-center
      space-x-3
      text-center
    "
  >
      <div
        class="
          w-1/3
          h-40
          flex flex-col
          items-center
          justify-center
          border border-t-0 border-l-0 border-b-0 border-r-3
        "
      >
        <span
          class="font-bold text-5xl text-neutral-900 dark:text-neutral-300 my-3"
        >
          {{ generateProjectEntityValues.length }}/{{ totalProjectPerYear.length }}
        </span>
        <span class="text-xs md:text-sm text-neutral-900 dark:text-neutral-300"
          >Projects completed</span
        >
      </div>
      <div class="w-1/3 h-40 flex flex-col items-center justify-center">
        <span
          class="font-bold text-5xl text-neutral-900 dark:text-neutral-300 my-3"
        >
          {{ generatePlanEntityValues.length }}/{{ totalPlanPerYear.length }}</span
        >
        <span class="text-xs md:text-sm text-neutral-900 dark:text-neutral-300"
          >Plans fulfilled</span
        >
      </div>
      <div
        class="
          w-1/3
          h-40
          flex flex-col
          items-center
          justify-center
          border border-t-0 border-r-0 border-b-0 border-l-3
        "
      >
        <span
          class="font-bold text-5xl text-neutral-900 dark:text-neutral-300 my-3"
        >
          {{ generateSubtaskEntityValues.length }}/{{ totalSubtaskPerYear.length }}
        </span>
        <span class="text-xs md:text-sm text-neutral-900 dark:text-neutral-300"
          >Subtasks done</span
        >
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      projectArray: [],
    };
  },
  async mounted() {
    await this.$store.dispatch("getPlans");
    await this.$store.dispatch("getSubtasks");
    this.projectArray = await this.$store.dispatch("getAllProjectsPercentage");
  },
  computed: {
    generateProjectEntityValues() {
      return this.projectArray.filter((project) => {
        return (
          this.checkStats(project.plan_count, project.percentage) === 100 &&
          new Date(project.month).getFullYear() === this.GET_FISCAL_YEAR
        );
      });
    },

    totalProjectPerYear() {
      return this.projectArray.filter((project) => {
        return new Date(project.month).getFullYear() === this.GET_FISCAL_YEAR;
      });
    },

    ...mapGetters(["GET_ALL_PLANS", "GET_ALL_SUBTASKS", "GET_FISCAL_YEAR"]),

    generatePlanEntityValues() {
      return this.GET_ALL_PLANS.filter((plan) => {
        return (
          this.generateProjectEntityValues
            .map((proj) => proj.project_id)
            .includes(plan.project_id) && plan.percentage === 100
        );
      });
    },

    totalPlanPerYear() {
      return this.GET_ALL_PLANS.filter((plan) => {
        return this.totalProjectPerYear
          .map((proj) => proj.project_id)
          .includes(plan.project_id);
      });
    },

    generateSubtaskEntityValues() {
      return this.GET_ALL_SUBTASKS.filter((subtask) => {
        return (
          this.generatePlanEntityValues
            .map((plan) => plan.plan_id)
            .includes(subtask.plan_id) && subtask.status === "Done"
        );
      });
    },

    totalSubtaskPerYear() {
      return this.GET_ALL_SUBTASKS.filter((subtask) => {
        return this.totalPlanPerYear
          .map((plan) => plan.plan_id)
          .includes(subtask.plan_id);
      });
    },
  },
  methods: {
    yearFilter(metaData) {
      return metaData.filter((project) => {
        return (
          new Date(project.month).getFullYear().toString() ===
          this.$cookies.get("fyear")
        );
      });
    },
    checkStats(plan_count, percentage) {
      if (!isNaN(Math.round((100 / plan_count) * (percentage / 100)))) {
        return Math.round((100 / plan_count) * (percentage / 100));
      }
      return 0;
    },
  },
};
</script>

<style>
</style>