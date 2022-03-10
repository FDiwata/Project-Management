<template>
  <div class="py-5 w-5/6 m-auto h-screen">
    <div class="w-full p-3">
      <span class="text-2xl font-bold text-white">{{GET_SELECTED_PLAN.plan_id}}</span>
    </div>
   <div class="w-full p-3 flex flex-row items-center justify-between">
      <span class="text-4xl font-bold text-white">{{GET_SELECTED_PLAN.plan_title}}</span>

      <nuxt-link :to="{name: 'CreatePlan', query: {plan_id: GET_SELECTED_PLAN.plan_id}}"><el-button
          icon="el-icon-edit"
          class="bg-white text-white"
          >Update this plan</el-button
        ></nuxt-link>
    </div>
    <div class="flex flex-col items-start justify-start w-full p-3">
      <div class="flex flex-row items-center justify-center py-5 space-x-5">
        <span class="font-bold">Assigned to:</span>
        <span class="text-blue-700 font-semibold">{{GET_SELECTED_PLAN.assignee}}</span>
      </div>
      <div class="flex flex-col items-start justify-center">
        <span class="font-bold">Project Description</span>
        <p class="font-italic mt-3">
          {{GET_SELECTED_PLAN.plan_desc}}
        </p>
      </div>
    </div>
    <div class="p-3">
      <div class="w-full flex flex-row justify-between items-center py-5">
        <span class="font-bold">Subtask list:</span>
         <nuxt-link :to="{name: 'CreateSubtask', query: {plan_id: GET_SELECTED_PLAN.plan_id}}"><el-button icon="el-icon-edit" class="bg-white text-white">Create a Subtask</el-button></nuxt-link>
      </div>
      <el-table :header-cell-style="{ background: '#545c64', text: 'white' }" 
                   :cell-style="{ background: '#545c64' }" :data="GET_SELECTED_SUBTASKS" class="w-full rounded-lg text-white">
        <el-table-column prop="subtask_id" label="Subtask ID"> </el-table-column>
        <el-table-column prop="subtask_title" label="Subtask Title">
          <template slot-scope="scope">
          <nuxt-link class="font-bold hover:underline" :to="{name: 'Subtask', query: {subtask_id: scope.row.subtask_id}}">
            {{scope.row.subtask_title}}
          </nuxt-link>
        </template>
        </el-table-column>
        <el-table-column prop="priority" label="Subtask Type">
          <template slot-scope="scope">
            <el-tag
              :type="
                scope.row.priority === 'critical'
                  ? 'danger'
                  : scope.row.priority === 'major'
                  ? 'warning'
                  : 'success'
              "
              disable-transitions
              >{{ scope.row.priority }}</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column prop="status" label="Status">
          <template slot-scope="scope">
            <el-tag
              :type="
                scope.row.status === 'Todo'
                  ? 'warning'
                  : scope.row.status === 'Doing'
                  ? 'success'
                  : ''
              "
              disable-transitions
              >{{ scope.row.status }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="start_date" label="Start Date">
           <template slot-scope="scope">
             {{new Date(scope.row.start_date).toLocaleString().split(',')[0]}}
           </template>
        </el-table-column>
        <el-table-column prop="end_date" label="End Date">
           <template slot-scope="scope">
             {{new Date(scope.row.start_date).toLocaleString().split(',')[0]}}</template> </el-table-column>
        <el-table-column prop="due_date" label="Due Date">
           <template slot-scope="scope">
             {{new Date(scope.row.start_date).toLocaleString().split(',')[0]}}</template> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: "Default",
  data() {
    return {
      
    };
  },
  computed: {
     ...mapGetters(['GET_SELECTED_PLAN', 'GET_SELECTED_SUBTASKS'])
  },
  async mounted () {
    try {
    await this.$store.dispatch('getPlan', this.$route.query.plan_id)
    await this.$store.dispatch('getSubtasks', this.GET_SELECTED_PLAN.plan_id || '')
  } catch (_) {
      this.$message({
              type: "error",
              message:
                "Plan does not exist.",
            });
      this.$router.push("/ManagePlan");
    }
  }
};
</script>