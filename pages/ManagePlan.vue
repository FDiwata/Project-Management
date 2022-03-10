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
          class="hover:font-bold text-white bg-white"
          >Create a Plan</el-button
        ></nuxt-link
      >
    </div>
    <div class="mt-5">
      <el-table
        class="text-white w-full rounded-lg"
        :header-cell-style="{ background: '#545c64', text: 'white' }"
        :cell-style="{ background: '#545c64', text: 'white' }"
        :data="
          [...GET_ALL_PLANS].filter(
            (data) =>
              !filterValue ||
              data[filterColumn]
                .toLowerCase()
                .includes(filterValue.toLowerCase())
          )
        "
      >
        <el-table-column prop="plan_id" label="Plan ID"> </el-table-column>
        <el-table-column prop="plan_title" label="Plan Title">
          <template slot-scope="scope">
            <nuxt-link
              class="font-bold text-md hover:underline"
              :to="{
                name: $route.query.redir ? 'CreateSubtask' : 'Plan',
                query: { plan_id: scope.row.plan_id },
              }"
            >
              {{ scope.row.plan_title }}
            </nuxt-link>
          </template>
        </el-table-column>
        <el-table-column prop="assignee" label="Assignee"> </el-table-column>
        <el-table-column prop="plan_desc" label="Description">
        </el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <el-input
              size="mini"
              v-model="filterValue"
              placeholder="Type to search by:"
            />
          </template>
          <template slot-scope="scope">
            <div>
              <nuxt-link
                :to="{
                  name: 'CreatePlan',
                  query: { plan_id: scope.row.plan_id },
                }"
              >
                <el-button
                  class="font-bold text-white bg-white"
                  icon="el-icon-edit"
                  >Edit</el-button
                >
              </nuxt-link>
            </div>
          </template>
        </el-table-column>

        <el-table-column align="right">
          <template slot="header">
            <el-select
              class="w-full transition-all hover:shadow-lg"
              v-model="filterColumn"
              placeholder="Filter type"
            >
              <el-option
                v-for="filter in filterObject"
                :key="filter"
                :label="filter"
                :value="filter"
              ></el-option>
            </el-select>
          </template>
          <template slot-scope="scope">
            <div>
              <el-button
                @click="deleteAction(scope.row.plan_id)"
                class="font-bold text-white bg-white"
                icon="el-icon-delete"
                >Delete</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
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
      this.filterColumn = returnObject[0]
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