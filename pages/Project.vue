<template>
  <div class="p-1 lg:p-5 w-fit lg:w-5/6 m-auto h-screen">
    <div class="w-full p-3">
      <span class="text-lg font-thin text-white">{{
        GET_SELECTED_PROJECT.project_id
      }}</span>
    </div>
    <div class="w-full p-3 py-1 flex flex-row items-center justify-between">
      <span class="text-4xl font-bold text-white">{{
        GET_SELECTED_PROJECT.project_title
      }}</span>

      <nuxt-link
        :to="{
          name: 'CreateProject',
          query: { project_id: GET_SELECTED_PROJECT.project_id },
        }"
        ><el-button icon="el-icon-edit" class="bg-white text-white"
          >Update this project</el-button
        ></nuxt-link
      >
    </div>
    <div
      class="w-full p-3 flex flex-row items-center justify-between space-x-3"
    >
      <div class="flex flex-col items-start justify-between w-1/2">
        <div class="flex flex-row items-center justify-center py-1 space-x-5">
          <span>Project type:</span>
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
          <span>Created by:</span>
          <span class="text-cyan-500 font-semibold"
            >@{{ GET_SELECTED_PROJECT.in_charge }}</span
          >
        </div>
        <div class="flex flex-row items-center justify-center py-1 space-x-5">
          <span>Percentage:</span>
          <span class="font-bold text-cyan-500">{{ Math.round(getProjectPercentage) }} % <span class="font-light text-white">complete</span></span>
        </div>

         <div class="flex flex-row items-center justify-center py-1 space-x-5">
          <span>Target Month:</span>
          <span class="font-bold">{{ GET_SELECTED_PROJECT.TargetMonth }}</span>
        </div>
      </div>
      <div class="flex flex-col items-start justify-center w-1/2">
        <span>Project Description</span>
        <p class="font-italic font-light mt-3">
          {{ GET_SELECTED_PROJECT.project_desc }}
        </p>
      </div>
    </div>
    <hr />
    <div class="p-3">
      <div class="w-full flex flex-row justify-between items-center py-2">
        <span class="font-bold">Project plans list:</span>
        <nuxt-link
          :to="{
            name: 'CreatePlan',
            query: { project_id: GET_SELECTED_PROJECT.project_id },
          }"
          ><el-button icon="el-icon-edit" class="bg-white text-white"
            >Create a Plan</el-button
          ></nuxt-link
        >
      </div>
      <el-table
        :data="GET_SELECTED_PLANS"
        class="w-full rounded-lg"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div v-if="scope.row.subtasks.length < 1" class="w-full text-center py-10"><span>This needs to be planned out. 🤔</span></div>
            <div v-else class="w-full px-3 pt-3 bg-gray-300"><span class="text-lg text-gray-800">Subtasks for <span class="font-bold">{{scope.row.plan_title}}</span></span></div>
            <div v-if="scope.row.subtasks.length >= 1" class="w-full p-3 bg-gray-300 grid grid-flow-row gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <subtask-doc v-for="item in scope.row.subtasks" :key="item.key" :subtask="item"/>
            </div>
          </template>  
        </el-table-column> 
        <el-table-column prop="plan_id" label="Plan ID" width="90"> </el-table-column>
        <el-table-column prop="plan_title" label="Plan Title" width="190">
          <template slot-scope="scope">
            <nuxt-link
              class="font-bold hover:underline"
              :to="{ name: 'Plan', query: { plan_id: scope.row.plan_id } }"
            >
              {{ scope.row.plan_title }}
            </nuxt-link>
          </template>
        </el-table-column>
        <el-table-column prop="assignee" label="Assignee" width="190"> </el-table-column>
        <el-table-column prop="plan_desc" label="Description">
        </el-table-column>
        <el-table-column prop="percentage" label="percentage" width="180">
           <template slot-scope="scope">
            <el-progress  type="circle" :stroke-width="12" :percentage="Math.round(scope.row.percentage)"></el-progress>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SubtaskDoc from '../components/Elements/SubtaskDoc.vue';
export default {
  components: { SubtaskDoc },
  layout: "Default",
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["GET_SELECTED_PROJECT", "GET_SELECTED_PLANS"]),
    getProjectPercentage () {
      let projTotalPercentage = 0
      this.GET_SELECTED_PLANS.forEach((plan) => {
        projTotalPercentage+=plan.percentage
      })
      return 100/this.GET_SELECTED_PLANS.length * projTotalPercentage/100
    }
  },
  async created() {
    try {
      await this.$store.dispatch("getProject", this.$route.query.project_id);
      await this.$store.dispatch("getPlans",
        this.GET_SELECTED_PROJECT.project_id || ""
      )
      this.GET_SELECTED_PLANS.forEach(async (plan, index) => {
        this.GET_SELECTED_PLANS[index].subtasks = await this.getSpecificSubtasks(plan.plan_id)
      })
    } catch (_) {
      this.$message({
              type: "error",
              message:
                "Project does not exist.",
            });
      this.$router.push("/ManageProject");
    }
  },
  methods: {
    async getSpecificSubtasks (plan_id) {
      return await this.$store.dispatch('getSubtasks', plan_id)
    }
  }
};
</script>