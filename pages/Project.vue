<template>
  <div class="p-1 m-auto md:ml-20 lg:m-auto md:p-5 w-full lg:w-2/3 h-screen">
    <div class="w-full m-auto p-3">
      <span class="text-md md:text-lg font-thin text-white">{{
        GET_SELECTED_PROJECT.project_id
      }}</span>
    </div>
    <div
      class="w-full m-auto p-3 py-1 flex flex-row items-center justify-between"
    >
      <span class="text-2xl md:text-4xl font-bold text-blue-500">{{
        GET_SELECTED_PROJECT.project_title
      }}</span>

<div class="w-1/3 flex flex-row items-center justify-end space-x-2 text-white">

      <nuxt-link
        :to="{
          name: 'CreateProject',
          query: { project_id: GET_SELECTED_PROJECT.project_id },
        }"
        ><el-button class="font-bold text-white" icon="el-icon-edit"
        ></el-button
      ></nuxt-link
      >

      <el-button @click="deleteAction(GET_SELECTED_PROJECT.project_id)" class="font-bold text-white" icon="el-icon-delete"
        ></el-button
      >
</div>
    </div>
    <div
      class="
        w-full
        p-3
        m-auto
        flex flex-col md:flex-row
        items-center
        justify-between
        space-x-0
        md:space-x-3
      "
    >
      <div class="flex flex-col items-start justify-between w-full md:w-1/2">
        <div class="flex flex-row items-center justify-center py-1 space-x-5">
          <span class="text-sm font-thin">Project type:</span>
          <el-tag
            :type="
              GET_SELECTED_PROJECT.project_type === 'planned'
                ? 'success'
                : 'info'
            "
            disable-transitions
            >{{ GET_SELECTED_PROJECT.project_type }}</el-tag
          >
        </div>
        <div class="flex flex-row items-center justify-center py-1 space-x-5">
          <span class="text-sm font-thin">Created by:</span>
          <span class="text-cyan-500 font-semibold"
            >@{{ GET_SELECTED_PROJECT.in_charge }}</span
          >
        </div>
        <div class="flex flex-row items-center justify-center py-1 space-x-5">
          <span class="text-sm font-thin">Percentage:</span>
          <span class="font-bold text-cyan-500"
            >{{ Math.round(getProjectPercentage) }} %
            <span class="font-light text-white">complete</span></span
          >
        </div>

        <div class="flex flex-row items-center justify-center py-1 space-x-5">
          <span class="text-sm font-thin">Target Date:</span>
          <span class="font-bold">{{ GET_SELECTED_PROJECT.TargetMonth }}</span>
        </div>
      </div>
      <div class="flex flex-col items-start justify-center w-full md:w-1/2">
        <span class="text-sm font-thin">Project Description:</span>
        <p class="font-italic font-light mt-3">
          {{ GET_SELECTED_PROJECT.project_desc }}
        </p>
      </div>
    </div>
    <hr />
    <div class="p-3 pb-20 md:pb-1">
      <div class="w-full flex flex-row justify-between items-center py-2">
        <span class="font-bold">Project plans list:</span>

      <el-pagination
      background
      layout="prev, pager, next"
      :hide-on-single-page="metaData.length === 1"
      :page-size="5"
      :current-page.sync="currentPage"
      @current-change="pageChange"
      :total="metaData.flat().length"
    >
    </el-pagination>

        <nuxt-link
          :to="{
            name: 'CreatePlan',
            query: { project_id: GET_SELECTED_PROJECT.project_id },
          }"
          ><el-button icon="el-icon-edit" class="text-white"
            >Create a Plan</el-button
          ></nuxt-link
        >
      </div>
      <el-table 
      :header-cell-style="{ background: '#272727', text: 'white' }"
        :cell-style="{ background: '#272727' }"
      :data="percData" class="w-full text-white border-none hidden md:block">
        <el-table-column prop="plan_id" label="Plan ID"> </el-table-column>
        <el-table-column prop="plan_title" label="Plan Title">
          <template slot-scope="scope">
            <nuxt-link
              class="font-bold hover:underline"
              :to="{ name: 'Plan', query: { plan_id: scope.row.plan_id } }"
            >
              {{ scope.row.plan_title }}
            </nuxt-link>
          </template>
        </el-table-column>
        <el-table-column prop="assignee" label="Assignee"> </el-table-column>
        <el-table-column prop="percentage" label="percentage">
          <template slot-scope="scope">
            <el-progress
              type="line"
              :stroke-width="12"
              :percentage="Math.round(scope.row.percentage)"
            ></el-progress>
          </template>
        </el-table-column>
      </el-table>

      <el-table  :header-cell-style="{ background: '#272727', text: 'white' }"
        :cell-style="{ background: '#272727' }" :data="percData" class="w-full text-white border-none mt-5 block md:hidden">
        <el-table-column prop="plan_title" label="Plan Title">
          <template slot-scope="scope">
            <nuxt-link
              class="font-bold hover:underline"
              :to="{ name: 'Plan', query: { plan_id: scope.row.plan_id } }"
            >
              {{ scope.row.plan_title }}
            </nuxt-link>
          </template>
        </el-table-column>
        <el-table-column prop="percentage" label="percentage">
          <template slot-scope="scope">
            <el-progress
              :stroke-width="5"
              :percentage="Math.round(scope.row.percentage)"
            ></el-progress>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SubtaskDoc from "../components/Elements/SubtaskDoc.vue";
export default {
  components: { SubtaskDoc },
  layout: "Default",
  data() {
    return {
      percData: [],
      metaData: [[]],
      currentPage: 1,
    };
  },
  computed: {
    ...mapGetters(["GET_SELECTED_PROJECT", "GET_SELECTED_PLANS"]),
    getProjectPercentage() {
      let projTotalPercentage = 0;
      this.GET_SELECTED_PLANS.forEach((plan) => {
        projTotalPercentage += plan.percentage;
      });
      return (
        ((100 / this.GET_SELECTED_PLANS.length) * projTotalPercentage) / 100
      );
    },

  },
  async created() {
    try {
      await this.$store.dispatch("getProject", this.$route.query.project_id);
      await this.$store.dispatch(
        "getPlans",
        this.GET_SELECTED_PROJECT.project_id || ""
      );
      this.GET_SELECTED_PLANS.forEach(async (plan, index) => {
        this.GET_SELECTED_PLANS[index].subtasks =
          await this.getSpecificSubtasks(plan.plan_id);
      });

      const metaArray = this.GET_SELECTED_PLANS;
    this.arrayChunkify(JSON.parse(JSON.stringify(metaArray)), 5);
    this.percData = this.metaData[0];
    } catch (_) {
      this.$message({
        type: "error",
        message: "Project does not exist.",
      });
      this.$router.push("/ManageProject");
    }
  },
  methods: {
    async getSpecificSubtasks(plan_id) {
      return await this.$store.dispatch("getSubtasks", plan_id);
    },

    async deleteTableData(projectID) {
      const requestObject = {
        id: projectID,
        type: "project",
        column: "project_id",
      };
      await this.$store
        .dispatch("deleteTableData", requestObject)
        .then(async (data) => {
          if (data) {
            await this.$store.dispatch("getProjects");
            this.$message({
              type: "success",
              message: "Project Deleted.",
            });
            this.$router.push('/')
          } else {
            await this.$store.dispatch("getProjects");
            this.$message({
              type: "error",
              message:
                "Failed to delete because there are existing plans under this project",
            });
          }
        });
    },

    deleteAction(projectID) {
      this.$confirm(
        "This will permanently delete this Project. Continue?",
        "Warning",
        {
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.deleteTableData(projectID);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },

    arrayChunkify(metaArray, chunkSize) {
      let pushLimit = 0;
      let subCount = 0;
      metaArray.forEach((project) => {
        
        this.metaData[subCount].push(project);
        if (pushLimit <= chunkSize - 2) {
          pushLimit += 1;
        } else {
          this.metaData.push([]);
          pushLimit = 0;
          subCount++;
        }
      });
    },
    pageChange(currentPage) {
      this.percData = this.metaData[currentPage - 1];
      this.key = currentPage;
    },
  },
};
</script>