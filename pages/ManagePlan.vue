<template>
  <div class="py-5 w-5/6 m-auto h-screen">
    <div class="w-full py-5 flex flex-row items-center justify-between">
      <span v-if="!$route.query.redir" class="text-5xl font-bold text-white"
        >Manage Plans</span
      >
      <span v-else class="text-5xl font-bold text-white"
        >Create a Subtask from:</span
      >
      <nuxt-link
        v-if="!$route.query.redir"
        class="pr-5 font-black text-white"
        to="CreatePlan?redir=true"
        ><el-button
          icon="el-icon-edit"
          class="hover:font-bold bg-gray-500 text-white"
          >Create a Plan</el-button
        ></nuxt-link
      >
    </div>
    <div class="mt-5">
      <div class="w-full grid grid-flow-row gap-3 grid-cols-4">
        <plan-card
          class="col-span-1 w-full"
          v-for="item in [...GET_ALL_PLANS].filter(
            (data) =>
              !filterValue ||
              data[filterColumn]
                .toLowerCase()
                .includes(filterValue.toLowerCase())
          )"
          :key="item.key"
          :planData="{
            assignee: item.assignee,
            plan_desc: item.plan_desc,
            plan_id: item.plan_id,
            plan_title: item.plan_title,
          }"
          @delAction="deleteAction(item.plan_id)"
          @editAction="$router.push(`CreatePlan?plan_id=${item.plan_id}`)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlanCard from "../components/Elements/PlanCard.vue";
export default {
  components: {
    PlanCard,
  },
  layout: "Default",
  data() {
    return {
      filterColumn: "",
      filterValue: "",
    };
  },
  computed: {
    ...mapGetters(["GET_ALL_PLANS"]),
    filterObject() {
      const returnObject = Object.keys(this.GET_ALL_PLANS[0] || []);
      returnObject.splice(1, 1);
      this.filterColumn = returnObject[0];
      return returnObject;
    },
  },

  methods: {
    async deleteTableData(planID) {
      const requestObject = {
        id: planID,
        type: "plan",
        column: "plan_id",
      };
      await this.$store
        .dispatch("deleteTableData", requestObject)
        .then(async (data) => {
          await this.$store.dispatch("getPlans");
          if (!data) {
            this.$message({
              type: "error",
              message:
                "Failed to delete plan because there are existing subtasks under this plan",
            });
          } else {
            this.$message({
              type: "success",
              message: "Plan Deleted.",
            });
          }
        });
    },

    deleteAction(planID) {
      this.$confirm(
        "This will permanently delete this Plan. Continue?",
        "Warning",
        {
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.deleteTableData(planID);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
  },
  async mounted() {
    await this.$store.dispatch("getPlans");
  },
};
</script>

<style>
</style>