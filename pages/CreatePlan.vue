<template>
  <div class="py-5 w-full md:w-2/3 m-auto h-screen">
    <div class="w-full py-5">
      <span v-if="!isUpdateMode" class="text-5xl font-bold text-white"
        >Create a Plan</span
      >
      <span v-else class="text-5xl font-bold text-white">Update Plan</span>
    </div>
    <div>
      <el-row
        class="w-full flex flex-row items-center justify-start space-x-3 py-3"
      >
        <div class="flex flex-col items-start justify-center w-1/2">
          <span class="pb-3 text-sm">Plan title</span>
          <el-input
            placeholder="Plan title"
            class="transition-all hover:shadow-lg text-black"
            v-model="formData.plan_title"
          ></el-input>
        </div>
        <div class="flex flex-col items-start justify-center w-1/2">
          <span class="pb-3 text-sm">Assignee</span>
          <el-input
            placeholder="Person in charge"
            class="transition-all hover:shadow-lg text-black"
            v-model="formData.assignee"
          ></el-input>
        </div>
      </el-row>
      <div
        class="w-full flex flex-row items-center justify-start space-x-3 py-3"
      >
        <div class="flex flex-col items-start justify-center w-full">
          <span class="pb-3 text-sm">Plan description</span>
          <el-input
            type="textarea"
            :rows="5"
            class="w-full hover:shadow-lg transition-all text-black"
            placeholder="Plan description here..."
            resize="none"
            v-model="formData.plan_desc"
          >
          </el-input>
        </div>
      </div>
      <el-row
        class="w-full flex flex-row items-center justify-end space-x-3 py-3"
      >
        <el-button
          v-if="!isUpdateMode"
          @click="createPlan"
          class="font-bold text-cyan-500"
          icon="el-icon-edit"
          >Create</el-button
        >

        <el-button
          v-else
          @click="updatePlan"
          class="font-bold text-cyan-500"
          icon="el-icon-edit"
          >Update Plan</el-button
        >
        <el-button class="text-white " @click="$router.go(-1)">Back</el-button>
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
        plan_id: "",
        project_id: "",
        assignee: "",
        plan_title: "",
        plan_desc: "",
      },
      isUpdateMode: false,
    };
  },
  computed: {
    ...mapGetters(["GET_SELECTED_PLAN"]),
    updatePayload() {
      const updateData = { ...this.formData };
      delete updateData.plan_id;
      return {
        id: this.formData.plan_id,
        type: "plan",
        updateData: updateData,
      };
    },
  },
  methods: {
    createPlan() {
      if (!Object.values(this.formData).includes("")) {
        this.$store.dispatch("createPlan", this.formData).then(() => {
          this.$message({
            type: "success",
            message: "Successfully created a plan!",
          });
          this.$router.push(`Plan?plan_id=${this.formData.plan_id}`);
        });
      } else {
        this.$message({
          type: "error",
          message: "Please complete the fields above.",
        });
      }
    },

    updatePlan() {
      if (!Object.values(this.formData).includes("")) {
        this.$store.dispatch("updateTableData", this.updatePayload).then(() => {
          this.$message({
          type: "success",
          message: "Successfully updated a plan!",
        });
          this.$router.push(`Plan?plan_id=${this.formData.plan_id}`);
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
        plan_id: "",
        project_id: "",
        assignee: "",
        plan_title: "",
        plan_desc: "",
      };
    },
  },

  async mounted() {
    if (this.$route.query.plan_id !== undefined) {
      this.isUpdateMode = true;
      await this.$store.dispatch("getPlan", this.$route.query.plan_id);
      this.formData = { ...this.GET_SELECTED_PLAN };
    } else if (this.$route.query.project_id === undefined) {
      this.$router.push("ManageProject?redir=true");
    } else {
      this.formData.project_id = this.$route.query.project_id;
      this.formData.plan_id = await this.$store.dispatch(
        "generateID",
        "t_plans"
      );
    }
  },
};
</script>

<style>
</style>