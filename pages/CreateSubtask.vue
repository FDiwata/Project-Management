<template>
  <div class="p-5 w-3/4 m-auto h-screen">
    <div class="w-full py-5">
      <span class="text-5xl font-bold text-gray-600 dark:text-white">Create Subtask</span>
    </div>
    <div>
      <el-row
        class="w-full flex flex-row items-center justify-start space-x-3 py-3"
      >
        <el-input
          placeholder="Subtask title"
          class="transition-all hover:shadow-lg"
          v-model="formData.subtask_title"
        ></el-input>
      </el-row>
      <div
        class="w-full flex flex-row items-center justify-start space-x-3 py-3"
      >
        <el-select
          v-model="formData.priority"
          class="transition-all hover:shadow-lg w-1/2"
          placeholder="Priroty type"
        >
          <el-option label="Critical" value="critical"></el-option>
          <el-option label="Major" value="major"></el-option>
          <el-option label="Minor" value="minor"></el-option>
        </el-select>

        <el-select
          v-model="formData.status"
          class="transition-all hover:shadow-lg w-1/2"
          placeholder="Status"
        >
          <el-option label="Todo" value="Todo"></el-option>
          <el-option label="Doing" value="Doing"></el-option>
          <el-option label="Done" value="Done"></el-option>
        </el-select>
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
        <el-input
          type="textarea"
          :rows="5"
          class="w-full hover:shadow-lg transition-all"
          placeholder="Subtask description here..."
          resize="none"
          v-model="formData.subtask_desc"
        >
        </el-input>
      </div>
      <el-row
        class="w-full flex flex-row items-center justify-end space-x-3 py-3"
      >
        <el-button
          @click="createSubtask"
          class="bg-blue-500 text-blue-500"
          icon="el-icon-edit"
          >Create</el-button
        >
        <el-button>Clear</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
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
    };
  },

  methods: {
    createSubtask() {
      if (!Object.values(this.formData).includes("")) {
        this.formData.start_date = this.formatDate(this.formData.start_date)
        this.formData.end_date = this.formatDate(this.formData.end_date)
        this.formData.due_date = this.formatDate(this.formData.due_date)
        this.$store.dispatch("createSubtask", this.formData).then(() => {
          alert("successfully created a Subtask!");
          this.$router.push(`Subtask?subtask_id=${this.formData.subtask_id}`);
        });
      } else {
        alert("Please complete the fields above.");
      }
    },

    formatDate(date) {
      const newDate = new Date(date);
      const dd = newDate.getDate();
      const mm = newDate.getMonth() + 1; // month start at 0, we have to add 1.
      const yyyy = newDate.getUTCFullYear();

      return `${yyyy}-${mm}-${dd}`;
    },
  },

  async mounted() {
      if (this.$route.query.plan_id === undefined) {
      this.$router.push('ManagePlan?redir=true')
    }
    this.formData.plan_id = this.$route.query.plan_id;
    this.formData.subtask_id = await this.$store.dispatch(
      "generateID",
      "t_subtasks"
    );
  },
};
</script>

<style>
</style>