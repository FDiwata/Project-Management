<template>
  <div class="w-full">
    <div
      class="w-full flex flex-col md:flex-row items-center justify-start md:justify-between space-x-0 md:space-x-5"
    >
      <span class="text-xl w-full md:w-fit md:text-5xl font-black text-white py-5">Current Projects</span>
      <nuxt-link to="CreateProject" class="w-full md:w-fit">
        <el-button icon="el-icon-edit" class="bg-white text-white w-full md:w-fit">Create a project</el-button>
      </nuxt-link>
    </div>
    <div
      class="w-full h-fit grid grid-flow-row gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-5"
    >
      <nuxt-link
        :to="`/Project?project_id=${percentage.project_id}`"
        class="p-3 shadow-lg rounded-lg bg-gray-200 w-full text-gray-800 flex flex-col items-center justify-center text-center"
        v-for="percentage in percData"
        :key="percentage.key"
      >
        <el-progress
          :width="150"
          type="dashboard"
          :stroke-width="15"
          :percentage="
            Math.round(
              (100 / percentage.plan_count) * (percentage.percentage / 100)
            )
          "
          v-if="!isNaN(Math.round(
              (100 / percentage.plan_count) * (percentage.percentage / 100)
            ))"
        />
        <span class="py-5 text-lg font-semibold hover:underline">
          {{
          percentage.project_title
          }}
        </span>
        <el-button
          @click.prevent.stop="castDrawer(percentage.project_id)"
          class="font-bold bg-cyan-500 text-cyan-500"
          icon="el-icon-edit"
        >See Plans</el-button>
      </nuxt-link>
    </div>
    <el-drawer
      :title="`List of plans for ${GET_SELECTED_PROJECT.project_title}`"
      :visible.sync="drawer"
      :size="widthCheck() < 768 ? '100%' : '50%'"
    >
      <div class="h-full w-full p-5">
        <el-table
          :header-cell-style="{ background: '#545c64', text: 'white' }"
          :cell-style="{ background: '#545c64' }"
          :data="GET_SELECTED_PLANS"
          class="w-full text-white rounded-lg"
        >
          <el-table-column prop="plan_id" label="Plan ID"></el-table-column>
          <el-table-column prop="plan_title" label="Plan Title">
            <template slot-scope="scope">
              <nuxt-link
                class="font-bold text-md hover:underline"
                :to="{
                  name: $route.query.redir ? 'CreateSubtask' : 'Plan',
                  query: { plan_id: scope.row.plan_id },
                }"
              >{{ scope.row.plan_title }}</nuxt-link>
            </template>
          </el-table-column>
          <el-table-column prop="assignee" label="Assignee"></el-table-column>
          <el-table-column width="200" prop="plan_desc" label="Description">
            <template slot-scope="scope">
              <span class="break-normal">{{ scope.row.plan_desc }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      percData: [],
      drawer: false
    };
  },
  computed: {
    ...mapGetters(["GET_SELECTED_PLANS", "GET_SELECTED_PROJECT"]),
    overAllProgress() {
      let numberOfProjects = this.percData.length;
      let totalPercentage = 0;
      this.percData.forEach(project => {
        totalPercentage +=
          (100 / project.plan_count) * (project.percentage / 100);
      });
      return (100 / numberOfProjects) * (totalPercentage / 100);
    }
  },
  async mounted() {
    this.percData = await this.$store.dispatch("getAllProjectsPercentage");
  },
  methods: {
    async getProjectPlan(project_id) {
      await this.$store.dispatch("getPlans", project_id);
    },
    async castDrawer(project_id) {
      this.drawer = true;
      await this.$store.dispatch("getProject", project_id);
      await this.getProjectPlan(project_id);
    },
    widthCheck() {
      return process.client ? window.outerWidth : 0;
    }
  }
};
</script>

<style>
</style>