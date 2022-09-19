<template>
<nuxt-link @click.self.stop :to="`Project?project_id=${projData.project_id}`">
   <div class="w-full flex flex-col justify-between space-y-3 p-5 h-60 max-h-60 min-h-60 rounded-lg hover:shadow-lg text-white bg-neutral-800">
    <div class="w-full flex flex-col items-start justify-center">
      <span class="text-xs">{{ projData.project_id }}</span>
      <h1 class="text-lg font-black text-blue-400">{{ projData.project_title }}</h1>
      <span class="text-xs mt-2">Percentage: {{ projData.percentage }}</span>
      <span class="text-xs">Target Month: {{ projData.TargetMonth }}</span>
      <p class="italic text-white-800 text-xs w-full text-ellipsis mt-3 max-h-20 truncate">Description: "{{ projData.project_desc }}"</p>
    </div>
    <div class="w-full flex flex-row items-center justify-end space-x-2">
      <el-button @click.prevent.stop="updatePlan" class="font-bold" icon="el-icon-edit text-white"
        ></el-button
      >
      <el-button @click.prevent.stop="deletePlan" class="font-bold" icon="el-icon-delete text-white"
        ></el-button
      >
    </div>
  </div>
</nuxt-link>
</template>

<script>
export default {
    props: {
        projData: {
            type: Object,
            default: () => { return {
            project_id: 'project-002',
            project_title: 'sample project title',
            percentage: '10',
            TargetMonth: 'Jan',
            project_desc: 'sample project description'
            }}
        }
    },
  methods: {
      deletePlan () {
          this.$emit('delAction')
      },
      updatePlan () {
          this.$emit('editAction')
      }
  }
}
</script>

<style>

</style>