<template>
  <div class="p-5 w-3/4 m-auto h-screen">
    <div class="w-full p-3">
      <span class="text-2xl font-bold text-white">{{ GET_SELECTED_PROJECT.project_id }}</span>
    </div>
    <div class="w-full p-3">
      <span class="text-4xl font-bold text-white">{{GET_SELECTED_PROJECT.project_title}}</span>
    </div>
    <div
      class="w-full p-3 flex flex-row items-center justify-between space-x-3"
    >
      <div class="flex flex-col items-start justify-between w-1/2">
        <div class="flex flex-row items-center justify-center py-3 space-x-5">
          <span class="font-bold">Project type:</span>
          <el-tag :type="GET_SELECTED_PROJECT.project_type === 'planned' ? 'success' : 'info'" disable-transitions>{{ GET_SELECTED_PROJECT.project_type }}</el-tag>
        </div>
        <div class="flex flex-row items-center justify-center py-3 space-x-5">
          <span class="font-bold">Created by:</span>
          <span class="text-blue-700 font-semibold">@{{GET_SELECTED_PROJECT.in_charge}}</span>
        </div>
        <div class="flex flex-row items-center justify-center py-3 space-x-5">
          <span class="font-bold">Percentage:</span>
          <span class="font-bold">{{GET_SELECTED_PROJECT.percentage}}</span>
        </div>
      </div>
      <div class="flex flex-col items-start justify-center w-1/2">
        <span class="font-bold">Project Description</span>
        <p class="font-italic mt-3">
          {{GET_SELECTED_PROJECT.project_desc}}
        </p>
      </div>
    </div>
    <div class="p-3">
      <div class="w-full flex flex-row justify-between items-center py-5">
        <span class="font-bold">Project plans list:</span>
        <nuxt-link :to="{name: 'CreatePlan', query: {project_id: GET_SELECTED_PROJECT.project_id}}"><el-button
          icon="el-icon-edit"
          class="bg-white text-white"
          >Create a Plan</el-button
        ></nuxt-link>
      </div>
      <el-table :header-cell-style="{ background: '#545c64', text: 'white' }" 
                   :cell-style="{ background: '#545c64' }" :data="GET_SELECTED_PLANS" class="w-full rounded-lg text-white">
        <el-table-column prop="plan_id" label="Plan ID"> </el-table-column>
        <el-table-column prop="plan_title" label="Plan Title">
          <template slot-scope="scope">
          <nuxt-link class="font-bold hover:underline" :to="{name: 'Plan', query: {plan_id: scope.row.plan_id}}">
            {{scope.row.plan_title}}
          </nuxt-link>
        </template>
        </el-table-column>
        <el-table-column prop="assignee" label="Assignee"> </el-table-column>
        <el-table-column prop="plan_desc" label="Description">
        </el-table-column>
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
     ...mapGetters(['GET_SELECTED_PROJECT', 'GET_SELECTED_PLANS'])
  },
  async mounted () {
    await this.$store.dispatch('getProject', this.$route.query.project_id)
    await this.$store.dispatch('getPlans', this.GET_SELECTED_PROJECT.project_id)
  }
};
</script>