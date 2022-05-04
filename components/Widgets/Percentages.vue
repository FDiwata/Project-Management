<template>
  <div class="w-3/4 p-5 rounded bg-white shadow-lg text-gray-800">
    <div class="w-full flex flex-row items-center justify-between">
      <span class="text-2xl font-bold">Subtask composition</span>
       <div class="flex flex-col items-start justify-center w-1/3">
        <span class="pb-3 text-sm">Select Project</span>
         <el-select
          class="w-full transition-all hover:shadow-lg"
          v-model="selectedProjectID"
          placeholder="Pick a project"
        >
          <el-option v-for="project in GET_ALL_PROJECTS" :key="project.key" :label="project.project_title" :value="project.project_id" />
        </el-select>
       </div>
        <div class="flex flex-col items-start justify-center w-1/3">
        <span class="pb-3 text-sm">Select Plan</span>
         <el-select
          class="w-full transition-all hover:shadow-lg"
          v-model="selectedPlanID"
          placeholder="Pick a plan"
        >
          <el-option v-for="plan in GET_SELECTED_PLANS" :key="plan.key" :label="plan.plan_title" :value="plan.plan_id" />
        </el-select>
       </div>
    </div>
    <div v-for="(status, index) in widgetData" :key="status.key" class="my-1">
      <span class="font-light">Percentage of subtasks {{ subStatus[index] }}</span>
      <el-progress :stroke-width="40" :color="subColor[index]"  class="w-full" :text-inside="true" :percentage="Math.round(status.percentage)" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  computed: {
    ...mapGetters(['GET_ALL_PROJECTS', 'GET_SELECTED_PLANS'])
  },
  data () {
    return {
      widgetData : [],
      subStatus: ['todo', 'doing', 'done'],
      subColor: ['#FAA43A', '#5DA5DA', '#9ACD32'],
      selectedProjectID: '',
      selectedPlanID: null
    }
  },
  watch: {
    async selectedProjectID (value) {
       await this.$store.dispatch('getPlans', value)
       this.widgetData = []
       this.widgetData.push(await this.$store.dispatch('getTodoPercentage', { project_id: value, plan_id: this.selectedPlanID}))
      this.widgetData.push(await this.$store.dispatch('getDoingPercentage', { project_id: value, plan_id: this.selectedPlanID}))
      this.widgetData.push(await this.$store.dispatch('getDonePercentage', { project_id: value, plan_id: this.selectedPlanID}))
       this.selectedPlanID = null

    },

    async selectedPlanID (value) {
      this.widgetData = []
      this.widgetData.push(await this.$store.dispatch('getTodoPercentage', { project_id: this.selectedProjectID, plan_id: value}))
      this.widgetData.push(await this.$store.dispatch('getDoingPercentage', { project_id: this.selectedProjectID, plan_id: value}))
      this.widgetData.push(await this.$store.dispatch('getDonePercentage', { project_id: this.selectedProjectID, plan_id: value}))
    }
  },
 async mounted () {
   this.$store.dispatch('getProjects')
   this.widgetData.push(await this.$store.dispatch('getTodoPercentage', { project_id: null, plan_id: null }))
   this.widgetData.push(await this.$store.dispatch('getDoingPercentage', { project_id: null, plan_id: null }))
   this.widgetData.push(await this.$store.dispatch('getDonePercentage', { project_id: null, plan_id: null }))
 }
}
</script>

<style>

</style>