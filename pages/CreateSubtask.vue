<template>
  <div class="py-5 w-full md:w-2/3 m-auto h-screen">
    <div class="w-full py-5">
      <span v-if="!isUpdateMode" class="text-5xl font-bold text-white">Create Subtask</span>
      <span v-else class="text-5xl font-bold text-white">Update Subtask</span>
    </div>
    <div>
      <el-row
        class="w-full flex flex-row items-center justify-start space-x-3 py-3"
      >
      <div class="flex flex-col items-start justify-center w-full">
        <span class="pb-3 text-sm">Subtask Title</span>
        <el-input
          placeholder="Subtask title"
          class="transition-all hover:shadow-lg text-black"
          v-model="formData.subtask_title"
        >
        </el-input>
        </div>
      </el-row>
      <div
        class="w-full flex flex-row items-center justify-start space-x-3 py-3"
      >
       <div class="flex flex-col items-start justify-center w-1/2">
        <span class="pb-3 text-sm">Priority type</span>
        <el-select
          v-model="formData.priority"
          class="transition-all hover:shadow-lg w-full"
          placeholder="Priroty type"
        >
          <el-option label="Critical" value="critical"></el-option>
          <el-option label="Major" value="major"></el-option>
          <el-option label="Minor" value="minor"></el-option>
        </el-select>
       </div>

       <div class="flex flex-col items-start justify-center w-1/2">
        <span class="pb-3 text-sm">Status</span>
        <el-select
          v-model="formData.status"
          class="transition-all hover:shadow-lg w-full"
          placeholder="Status"
        >
          <el-option label="Todo" value="Todo"></el-option>
          <el-option label="Doing" value="Doing"></el-option>
          <el-option label="Done" value="Done"></el-option>
        </el-select>
       </div>
      </div>
      <div
        class="w-full flex flex-row items-center justify-start space-x-3 py-3"
      >
        <div class="block space-x-3 w-1/3">
          <span class="demonstration">Start Date</span>
          <el-date-picker
            v-model="formData.start_date"
            type="date"
            placeholder="Pick a day"
          >
          </el-date-picker>
        </div>

        <div class="block space-x-3 w-1/3">
          <span class="demonstration">End Date</span>
          <el-date-picker
            v-model="formData.end_date"
            type="date"
            placeholder="Pick a day"
          >
          </el-date-picker>
        </div>

        <div class="block space-x-3 w-1/3">
          <span class="demonstration">Due Date</span>
          <el-date-picker
            v-model="formData.due_date"
            type="date"
            placeholder="Pick a day"
          >
          </el-date-picker>
        </div>
      </div>
      <div
        class="w-full flex flex-row items-center justify-start space-x-3 py-3"
      >
       <div class="flex flex-col items-start justify-center w-full">
        <span class="pb-3 text-sm">Subtask Description</span>
        <el-input
          type="textarea"
          :rows="5"
          class="w-full hover:shadow-lg transition-all text-black"
          placeholder="Subtask description here..."
          resize="none"
          v-model="formData.subtask_desc"
        >
        </el-input>
       </div>
      </div>
      <el-row
        class="w-full flex flex-row items-center justify-end space-x-3 py-3"
      >
        <el-button
          v-if="!isUpdateMode"
          @click="createSubtask"
          class="bg-blue-500 text-cyan-500"
          icon="el-icon-edit"
          >Create</el-button
        >

        <el-button
          v-else
          @click="updateSubtask"
          class="bg-blue-500 text-cyan-500"
          icon="el-icon-edit"
          >Update Subtask</el-button
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
        subtask_id: "",
        plan_id: "",
        subtask_title: "",
        subtask_desc: "",
        priority: "",
        status: "",
        start_date: new Date(),
        end_date: new Date(),
        due_date: new Date(),
      },
      isUpdateMode: false,
    };
  },

  computed: {
    ...mapGetters(["GET_SELECTED_SUBTASK"]),
    updatePayload() {
      const updateData = { ...this.formData };
      delete updateData.subtask_id;
      return {
        id: this.formData.subtask_id,
        type: "subtask",
        updateData: updateData,
      };
    },
  },

  methods: {
    createSubtask() {
      if (!Object.values(this.formData).includes("")) {
        this.formData.start_date = this.formatDate(this.formData.start_date);
        this.formData.end_date = this.formatDate(this.formData.end_date);
        this.formData.due_date = this.formatDate(this.formData.due_date);
        this.$store.dispatch("createSubtask", this.formData).then(() => {
          this.$message({
          type: "success",
          message: "Successfully created a Subtask!",
        });
          this.$router.push(`Subtask?subtask_id=${this.formData.subtask_id}`);
        });
      } else {
        this.$message({
          type: "error",
          message: "Please complete the fields above.",
        });
      }
    },

    updateSubtask() {
      if (!Object.values(this.formData).includes("")) {
        this.formData.start_date = this.formatDate(this.formData.start_date);
        this.formData.end_date = this.formatDate(this.formData.end_date);
        this.formData.due_date = this.formatDate(this.formData.due_date);
        this.$store.dispatch("updateTableData", this.updatePayload).then(() => {
          this.$message({
          type: "success",
          message: "Successfully updated a Subtask!",
        });
          this.$router.push(`Subtask?subtask_id=${this.formData.subtask_id}`);
        });
      } else {
        this.$message({
          type: "error",
          message: "Please complete the fields above.",
        });
      }
    },

    formatDate(date) {
      const newDate = new Date(date);
      const dd = newDate.getDate();
      const mm = newDate.getMonth() + 1; // month start at 0, we have to add 1.
      const yyyy = newDate.getUTCFullYear();

      return `${yyyy}-${mm}-${dd}`;
    },
    clearData() {
      this.formData = {
        subtask_id: "",
        plan_id: "",
        subtask_title: "",
        subtask_desc: "",
        priority: "",
        status: "",
        start_date: new Date(),
        end_date: new Date(),
        due_date: new Date(),
      };
    },
  },

  async mounted() {
    if (this.$route.query.subtask_id !== undefined) {
      this.isUpdateMode = true;
      await this.$store.dispatch("getSubtask", this.$route.query.subtask_id);
      this.formData = { ...this.GET_SELECTED_SUBTASK };
    } else if (this.$route.query.plan_id === undefined) {
      this.$router.push("ManagePlan?redir=true");
    } else {
      this.formData.plan_id = this.$route.query.plan_id;
      this.formData.subtask_id = await this.$store.dispatch(
        "generateID",
        "t_subtasks"
      );
    }
  },
};
</script>

<style>
</style>