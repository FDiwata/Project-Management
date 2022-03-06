<template>
   <div class="p-5 w-3/4 m-auto h-screen">
    <div class="w-full py-5 flex flex-row items-center justify-between">
      <span v-if="!$route.query.redir" class="text-5xl font-bold text-white">Manage Plans</span>
      <span v-else class="text-5xl font-bold text-white">Create a Subtask from:</span>
       <nuxt-link v-if="!$route.query.redir" class="pr-5 font-black text-white" to="CreatePlan?redir=true"><el-button
          icon="el-icon-edit" class="hover:font-bold"
          >Create a Plan</el-button
        ></nuxt-link>
    </div>
    <div class="mt-5">
        <el-table
        class="text-white w-full"
        :header-cell-style="{ background: '#545c64', text: 'white' }" 
                   :cell-style="{ background: '#282828', text: 'white' }"
      :data="GET_ALL_PLANS">
      <el-table-column
        prop="plan_id"
        label="Plan ID">
      </el-table-column>
       <el-table-column
        prop="plan_title"
        label="Plan Title">
        <template slot-scope="scope">
          <nuxt-link class="font-bold text-md hover:underline" :to="{name: $route.query.redir ? 'CreateSubtask' : 'Plan', query: { plan_id: scope.row.plan_id }}">
            {{scope.row.plan_title}}
          </nuxt-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="assignee"
        label="Assignee">
      </el-table-column>
       <el-table-column
        prop="plan_desc"
        label="Description">
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
          
        }
      },
    computed: {
      ...mapGetters([ 'GET_ALL_PLANS' ])
    },
    async mounted () {
      await this.$store.dispatch('getPlans')
    }
}
</script>

<style>

</style>