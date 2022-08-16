<template>
  <div class="py-5 w-full md:w-2/3 m-auto h-screen">
    <div class="w-full py-2 md:py-5 px-3 md:px-0">
      <span v-if="!isUpdateMode" class="text-5xl font-bold text-white">Create Project</span>
      <span v-else class="text-5xl font-bold text-white">Update Project</span>
    </div>
    <div>
      <el-row
        class="w-full flex flex-row items-center justify-start space-x-3 py-0 md:py-3 px-3 md:px-0"
      >
       <div class="flex flex-col items-start justify-center w-full">
        <span class="pb-3 text-sm">Project title</span>
        <el-input
          placeholder="Project title"
          class="transition-all hover:shadow-lg text-black"
          v-model="formData.project_title"
        ></el-input>
       </div>
      </el-row>
      <div
        class="w-full flex flex-col md:flex-row items-center justify-start space-x-0 space-y-3 md:space-y-0 md:space-x-3 py-3"
      >
       <div class="flex flex-col items-start justify-center w-full md:w-1/3 px-3 md:px-0">
        <span class="pb-3 text-sm">Project type</span>
        <el-select
          class="w-full transition-all hover:shadow-lg"
          v-model="formData.project_type"
          placeholder="Project type"
        >
          <el-option label="Planned" value="planned"></el-option>
          <el-option label="Unplanned" value="unplanned"></el-option>
        </el-select>
       </div>

       <div class="flex flex-col items-start justify-center w-full md:w-1/3 px-3 md:px-0">
        <span class="pb-3 text-sm">Person in charge</span>
        <el-input
          placeholder="Person in charge"
          class="transition-all hover:shadow-lg w-full"
          v-model="formData.in_charge"
        ></el-input>
       </div>

       <div class="flex flex-col items-start justify-center w-full md:w-1/3 px-3 md:px-0">
        <span class="pb-3 text-sm">Percentage</span>
        <el-input
          placeholder="Percentage"
          class="transition-all hover:shadow-lg w-full text-black"
          v-model="formData.percentage"
        ></el-input>
       </div>

        <div class="flex flex-col items-start justify-center w-full md:w-1/3 px-3 md:px-0">
        <span class="pb-3 text-sm">Target Month</span>
         <el-select
          class="w-full transition-all hover:shadow-lg"
          v-model="formData.TargetMonth"
          placeholder="Pick a month"
        >
          <el-option label="January" value="Jan"></el-option>
          <el-option label="February" value="Feb"></el-option>
          <el-option label="March" value="Mar"></el-option>
          <el-option label="April" value="Apr"></el-option>
          <el-option label="May" value="May"></el-option>
          <el-option label="June" value="Jun"></el-option>
          <el-option label="July" value="Jul"></el-option>
          <el-option label="August" value="Aug"></el-option>
          <el-option label="September" value="Sep"></el-option>
          <el-option label="October" value="Oct"></el-option>
          <el-option label="November" value="Nov"></el-option>
          <el-option label="December" value="Dec"></el-option>
        </el-select>
       </div>
      </div>
      <div
        class="w-full flex flex-row items-center justify-start space-x-3 py-3 px-3 md:px-0"
      >
      <div class="flex flex-col items-start justify-center w-full">
        <span class="pb-3 text-sm">Project Description</span>
        <el-input
          type="textarea"
          :rows="5"
          class="w-full hover:shadow-lg transition-all text-black"
          placeholder="Project description here..."
          resize="none"
          v-model="formData.project_desc"
        >
        </el-input>
      </div>
      </div>
      <el-row
        class="w-full flex flex-row items-center justify-end space-x-3 py-3 pb-20"
      >
        <el-button
          v-if="!isUpdateMode"
          @click="createProject"
          class="font-bold text-cyan-500"
          icon="el-icon-edit"
          >Create</el-button>
         <el-button
         v-else
          @click="updateProject"
          class="font-bold text-cyan-500"
          icon="el-icon-edit"
          >Update Project</el-button
        >
        <el-button class="text-white" @click="$router.go(-1)">Back</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  layout: "Default",
  data() {
    return {
      formData: {
        project_id: "",
        project_title: "",
        project_desc: "",
        project_type: "",
        in_charge: "",
        percentage: "",
        TargetMonth: ""
      },
      isUpdateMode: false,
    };
  },
  computed: {
    ...mapGetters(["GET_SELECTED_PROJECT"]),
    updatePayload() {
      const updateData = { ...this.formData }
      delete updateData.project_id
      return {
        id: this.formData.project_id,
        type: 'project',
        updateData: updateData
      }
    }
  },
  methods: {
    createProject() {
      if (!Object.values(this.formData).includes("")) {
        this.$store.dispatch("createProject", this.formData).then(() => {
          this.$message({
          type: "success",
          message: "Succesfully created a Project!",
        });
          this.$router.push(`Project?project_id=${this.formData.project_id}`);
        });
      } else {
        this.$message({
          type: "error",
          message: "Please complete the fields above.",
        });
      }
    },

    updateProject() {
      if (!Object.values(this.formData).includes("")) {
        this.$store.dispatch("updateTableData", this.updatePayload).then(() => {
         this.$message({
          type: "success",
          message: "Successfully updated a Project!",
        });
          this.$router.push(`Project?project_id=${this.formData.project_id}`);
        });
      } else {
        this.$message({
          type: "error",
          message: "Please complete the fields above.",
        });
      }
    },

    clearData() {
      this.formData = {
        project_id: "",
        project_title: "",
        project_desc: "",
        project_type: "",
        in_charge: "",
        percentage: "",
      };
    },
  },

  async mounted() {
    if (this.$route.query.project_id === undefined) {
      this.formData.project_id = await this.$store.dispatch(
        "generateID",
        "t_projects"
      );
    } else {
      this.isUpdateMode = true;
      await this.$store.dispatch("getProject", this.$route.query.project_id);
      this.formData = { ...this.GET_SELECTED_PROJECT }
    }
  },
};
</script>

<style>
</style>