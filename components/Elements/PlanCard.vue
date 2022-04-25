<template>
  <div class="w-72 flex flex-col space-y-3 p-5 rounded-lg shadow-md bg-gray-300 text-gray-500">
    <div class="w-full flex flex-col items-start justify-center">
      <span class="text-xs">{{ planData.plan_id }}</span>
      <nuxt-link :to="`Plan?plan_id=${planData.plan_id}`" class="text-xl font-bold">{{ planData.plan_title }}</nuxt-link>
      <span class="text-xs">{{ planData.assignee }}</span>
      <p class="">{{ planData.plan_desc }}</p>
    </div>
    <div class="w-full flex flex-row items-center justify-end space-x-3">
      <el-button @click="updatePlan" class="font-bold" icon="el-icon-edit"
        ></el-button
      >
      <el-button @click="deletePlan" class="font-bold" icon="el-icon-delete"
        ></el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
      planData: {
          type: Object,
          default: () => { return {
              plan_id: 'PLAN-000',
              plan_title: 'Sample Plan Title',
              assignee: 'Sample Assignee',
              plan_desc: 'Sample Description'
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
};
</script>

<style>
</style>