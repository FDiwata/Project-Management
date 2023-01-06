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
    <el-tooltip
      class="item"
      effect="light"
      :content="`Projects completed out of ${projectArray.length} in total`"
      placement="bottom"
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
          {{ generateProjectEntityValues }}
        </span>
        <span class="text-xs md:text-sm text-neutral-900 dark:text-neutral-300"
          >Projects completed</span
        >
      </div>
    </el-tooltip>
    <el-tooltip
      class="item"
      effect="light"
      :content="`Plans fulfilled out of ${GET_ALL_PLANS.length} in total`"
      placement="bottom"
    >
      <div class="w-1/3 h-40 flex flex-col items-center justify-center">
        <span
          class="font-bold text-5xl text-neutral-900 dark:text-neutral-300 my-3"
        >
          {{ generatePlanEntityValues }}</span
        >
        <span class="text-xs md:text-sm text-neutral-900 dark:text-neutral-300"
          >Plans fulfilled</span
        >
      </div>
    </el-tooltip>
    <el-tooltip
      class="item"
      effect="light"
      :content="`Subtasks done out of ${GET_ALL_SUBTASKS.length} in total`"
      placement="bottom"
    >
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
          {{ generateSubtaskEntityValues }}
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
        return this.checkStats(project.plan_count, project.percentage) === 100;
      }).length;
    },

    ...mapGetters(["GET_ALL_PLANS", "GET_ALL_SUBTASKS"]),

    generatePlanEntityValues() {
      return this.GET_ALL_PLANS.filter((plan) => {
        return plan.percentage === 100;
      }).length;
    },
    generateSubtaskEntityValues() {
      return this.GET_ALL_SUBTASKS.filter((subtask) => {
        return subtask.status === "Done";
      }).length;
    },
  },
  methods: {
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