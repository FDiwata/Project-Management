<template>
  <div class="p-5 w-3/4 m-auto h-screen">
    <div class="w-full py-5">
      <span class="text-5xl font-bold text-white">Create a Plan</span>
    </div>
    <div>
      <el-row
        class="w-full flex flex-row items-center justify-start space-x-3 py-3"
      >
        <el-input
          placeholder="Plan title"
          class="transition-all hover:shadow-lg"
          v-model="formData.plan_title"
        ></el-input>
          <el-input
          placeholder="Person in charge"
          class="transition-all hover:shadow-lg"
          v-model="formData.assignee"
        ></el-input>
      </el-row>
      <div
        class="w-full flex flex-row items-center justify-start space-x-3 py-3"
      >
        <el-input
          type="textarea"
          :rows="5"
          class="w-full hover:shadow-lg transition-all"
          placeholder="Plan description here..."
          resize="none"
          v-model="formData.plan_desc"
        >
        </el-input>
      </div>
      <el-row
        class="w-full flex flex-row items-center justify-end space-x-3 py-3"
      >
         <el-button @click="createPlan" class="font-bold text-blue-700" icon="el-icon-edit">Create</el-button>
         <el-button @click="clearData">Clear</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
layout: 'Default',
  data() {
    return {
      formData: {
        plan_id: '',
        project_id: '',
        assignee: '',
        plan_title: '',
        plan_desc: '',
      },
    };
  },

  methods: {
    createPlan () {
       if (!Object.values(this.formData).includes('')) {
        this.$store.dispatch('createPlan', this.formData).then(() => {
          alert('successfully created a plan!')
          this.$router.push(`Plan?plan_id=${this.formData.plan_id}`)
        })
      } else {
        alert('Please complete the fields above.')
      }
    },

    clearData() {
      this.formData = {
        plan_id: '',
        project_id: '',
        assignee: '',
        plan_title: '',
        plan_desc: '',
      }
    }
  },

  async mounted () {
    if (this.$route.query.project_id === undefined) {
      this.$router.push('ManageProject?redir=true')
    }
    this.formData.project_id = this.$route.query.project_id
    this.formData.plan_id = await this.$store.dispatch('generateID', 't_plans')
  }
};
</script>

<style>
</style>