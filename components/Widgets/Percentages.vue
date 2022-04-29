<template>
  <div class="w-3/4 p-5 rounded bg-white shadow-lg text-gray-800">
    <span class="text-2xl font-bold">Subtask composition</span>
    <div v-for="(status, index) in widgetData" :key="status.key" class="my-1">
      <span class="font-light">Percentage of subtasks {{ subStatus[index] }}</span>
      <el-progress :stroke-width="40" :color="subColor[index]"  class="w-full" :text-inside="true" :percentage="status.percentage" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      widgetData : [],
      subStatus: ['todo', 'doing', 'done'],
      subColor: ['#FAA43A', '#5DA5DA', '#9ACD32']
    }
  },
 async mounted () {
   this.widgetData.push(await this.$store.dispatch('getTodoPercentage'))
   this.widgetData.push(await this.$store.dispatch('getDoingPercentage'))
   this.widgetData.push(await this.$store.dispatch('getDonePercentage'))
 }
}
</script>

<style>

</style>