<template>
  <div class="p-5 w-3/4 m-auto h-screen">
    <div class="w-full py-5">
      <span class="text-5xl font-bold text-white">Create Project</span>
    </div>
    <div>
      <el-row
        class="w-full flex flex-row items-center justify-start space-x-3 py-3"
      >
        <el-input
          placeholder="Project title"
          class="transition-all hover:shadow-lg"
          v-model="formData.project_title"
        ></el-input>
      </el-row>
      <div
        class="w-full flex flex-row items-center justify-start space-x-3 py-3"
      >
        <el-select class="w-1/2 transition-all hover:shadow-lg"  v-model="formData.project_type" placeholder="Project type">
            <el-option label="Planned" value="planned"></el-option>
            <el-option label="Unplanned" value="unplanned"></el-option>
          </el-select>
        <el-input
          placeholder="Person in charge"
          class="transition-all hover:shadow-lg w-1/"
          v-model="formData.in_charge"
        ></el-input>
        <el-input
          placeholder="Percentage"
          class="transition-all hover:shadow-lg w-1/4"
          v-model="formData.percentage"
        ></el-input>
      </div>
      <div
        class="w-full flex flex-row items-center justify-start space-x-3 py-3"
      >
        <el-input
          type="textarea"
          :rows="5"
          class="w-full hover:shadow-lg transition-all"
          placeholder="Project description here..."
          resize="none"
          v-model="formData.project_desc"
        >
        </el-input>
      </div>
      <el-row
        class="w-full flex flex-row items-center justify-end space-x-3 py-3"
      >
         <el-button @click="createProject" class="font-bold text-blue-500" icon="el-icon-edit">Create</el-button>
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
        project_id: '',
        project_title: '',
        project_desc: '',
        project_type: '',
        in_charge: '',
        percentage: '',
      },
    };
  },

  methods: {
    createProject() {
      if (!Object.values(this.formData).includes('')) {
        this.$store.dispatch('createProject', this.formData).then(() => {
          alert('successfully created a Project!')
          this.$router.push(`Project?project_id=${this.formData.project_id}`)
        })
      } else {
        alert('Please complete the fields above.')
      }
    },

    clearData () {
      this.formData = {
        project_id: '',
        project_title: '',
        project_desc: '',
        project_type: '',
        in_charge: '',
        percentage: '',
      }
    }
  },

  async mounted () {
    this.formData.project_id = await this.$store.dispatch('generateID', 't_projects')
  }
};
</script>

<style>
</style>