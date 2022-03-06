<template>
   <div class="p-5 w-3/4 m-auto h-screen">
    <div class="w-full py-5 flex flex-row items-center justify-between">
      <span v-if="!$route.query.redir" class="text-5xl font-bold text-white">Manage Projects</span>
      <span v-else class="text-5xl font-bold text-white">Create a Plan from:</span>
       <nuxt-link v-if="!$route.query.redir" class="pr-5 font-black" to="CreateProject"><el-button
          icon="el-icon-edit" class="hover:font-bold"
          >Create a Project</el-button
        ></nuxt-link>
    </div>
    <div class="mt-5">
        <el-table
        :header-cell-style="{ background: '#545c64', text: 'white' }" 
                   :cell-style="{ background: '#282828' }"
      :data="GET_ALL_PROJECTS"
      class="w-full text-white">
      <el-table-column
        prop="project_id"
        label="Project ID">
      </el-table-column>
      <el-table-column
        prop="project_title"
        label="Project Title"
        width="380">
        <template slot-scope="scope">
          <nuxt-link class="font-bold text-md hover:underline" :to="{name: $route.query.redir ? 'CreatePlan' : 'Project', query: {project_id: scope.row.project_id}}">
            {{scope.row.project_title}}
          </nuxt-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="project_type"
        label="Project Type">
        <template slot-scope="scope">
        <el-tag
          :type="scope.row.project_type === 'planned' ? 'success' : 'info'"
          disable-transitions>{{scope.row.project_type}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column
        prop="in_charge"
        label="in Charge">
      </el-table-column>
       <el-table-column
        prop="percentage"
        label="Percentage">
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
      ...mapGetters([ 'GET_ALL_PROJECTS' ])
    },
    async mounted () {
      await this.$store.dispatch('getProjects')
    }
}
</script>

<style>

</style>