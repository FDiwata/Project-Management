<template>
<nuxt-link @click.self.stop :to="`Project?project_id=${projData.project_id}`">
   <div class="w-full flex flex-col space-y-3 p-5 rounded-lg hover:shadow-lg bg-white text-gray-500">
    <div class="w-full flex flex-col items-start justify-center">
      <span class="text-xs">{{ projData.project_id }}</span>
      <h1 class="text-xl font-black text-gray-800">{{ projData.project_title }}</h1>
      <span class="text-xs">Percentage: {{ projData.percentage }}</span>
      <span class="text-xs">Target Month: {{ projData.TargetMonth }}</span>
      <p class="italic text-gray-400">Description: "{{ projData.project_desc }}"</p>
    </div>
    <div class="w-full flex flex-row items-center justify-end space-x-2">
      <el-button @click.prevent.stop="updatePlan" class="font-bold" icon="el-icon-edit"
        ></el-button
      >
      <el-button @click.prevent.stop="deletePlan" class="font-bold" icon="el-icon-delete"
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