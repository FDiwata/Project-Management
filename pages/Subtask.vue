<template>
  <div class="p-5 w-3/4 m-auto h-screen">
    <div class="w-full p-3">
      <span class="text-2xl font-bold text-gray-600 dark:text-white">{{
        GET_SELECTED_SUBTASK.subtask_id
      }}</span>
    </div>
    <div class="w-full p-3">
      <span class="text-4xl font-bold text-gray-600 dark:text-white">{{
        GET_SELECTED_SUBTASK.subtask_title
      }}</span>
    </div>
    <div
      class="w-full p-3 flex flex-row items-center justify-between space-x-3"
    >
      <div class="flex flex-col items-start justify-between w-1/2">
        <div class="flex flex-row items-center justify-center py-3 space-x-5">
          <span class="font-bold">Priority type:</span>
          <el-tag type="danger" disable-transitions>{{
            GET_SELECTED_SUBTASK.priority
          }}</el-tag>
        </div>
        <div class="flex flex-row items-center justify-center py-3 space-x-5">
          <span class="font-bold">Status:</span>
          <el-tag :type="GET_SELECTED_SUBTASK.status === 'Done' ? 'success' : GET_SELECTED_SUBTASK.status === 'Todo' ? 'warning' : 'danger'" disable-transitions>{{
            GET_SELECTED_SUBTASK.status
          }}</el-tag>
        </div>
      </div>
      <div class="flex flex-col items-start justify-between w-1/2">
        <div class="flex flex-row items-center justify-center py-3 space-x-5">
          <span class="font-bold">Start Date:</span>
          <span>{{
            new Date(GET_SELECTED_SUBTASK.start_date)
              .toLocaleString()
              .split(",")[0]
          }}</span>
        </div>
        <div class="flex flex-row items-center justify-center py-3 space-x-5">
          <span class="font-bold">End Date:</span>
          <span>{{
            new Date(GET_SELECTED_SUBTASK.end_date)
              .toLocaleString()
              .split(",")[0]
          }}</span>
        </div>
        <div class="flex flex-row items-center justify-center py-3 space-x-5">
          <span class="font-bold">Due Date:</span>
          <span>{{
            new Date(GET_SELECTED_SUBTASK.due_date)
              .toLocaleString()
              .split(",")[0]
          }}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-start justify-center p-3">
      <span class="font-bold">Project Description</span>
      <p class="font-italic mt-3">
        {{ GET_SELECTED_SUBTASK.subtask_desc }}
      </p>
    </div>
    <div class="p-3">
      <div class="w-full flex flex-row justify-between items-center py-5">
        <span class="font-bold">Task Logs:</span>
        <el-button @click="dialogFormVisible = true" icon="el-icon-edit"
          >Log a task</el-button
        >
      </div>
      <el-table :data="GET_SELECTED_TASK_LOGS" class="w-full">
        <el-table-column prop="task_logs_id" label="Task Log ID">
        </el-table-column>
        <el-table-column prop="miscellaneous" label="Miscellaneous">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.miscellaneous === true ? 'info' : 'success'"
              disable-transitions
              >{{ scope.row.miscellaneous ? "misc" : "not-misc" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="log_date" label="Log Date">
           <template slot-scope="scope">
             {{new Date(scope.row.log_date).toLocaleString().split(',')[0]}}
           </template>
        </el-table-column>
        <el-table-column prop="status" label="Status">
          <template slot-scope="scope">
            <el-tag
              :type="
                scope.row.status === 'Todo'
                  ? 'danger'
                  : scope.row.status === 'Doing'
                  ? 'warning'
                  : 'success'
              "
              disable-transitions
              >{{ scope.row.status }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="work_hours" label="Work Hours">
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      class="rounded-lg"
      title="Log a task"
      :visible.sync="dialogFormVisible"
    >
      <el-form>
        <div class="flex flex-row items-center justify-start space-x-5 w-full">
          <el-form-item label="Log Date">
            <el-date-picker
              v-model="taskDialogForm.log_date"
              type="date"
              placeholder="Pick a log date"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="Status">
            <el-select
              v-model="taskDialogForm.status"
              placeholder="Please select a status"
            >
              <el-option label="Doing" value="Doing"></el-option>
              <el-option label="Done" value="Done"></el-option>
              <el-option label="Todo" value="Todo"></el-option>
            </el-select>
          </el-form-item>
          <el-checkbox v-model="taskDialogForm.miscellaneous"
            >Miscellaneous</el-checkbox
          >
          <el-form-item label="Work hours">
            <el-input
              type="number"
              class="hover:shadow-lg transition-all"
              placeholder="work hours"
              resize="none"
              v-model="taskDialogForm.work_hours"
            >
            </el-input>
          </el-form-item>
        </div>
        <el-form-item label="Description">
          <el-input
            type="textarea"
            :rows="5"
            class="w-full hover:shadow-lg transition-all"
            placeholder="Task log description here..."
            resize="none"
            v-model="taskDialogForm.task_desc"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button class="text-blue-500 font-bold" @click="logTask"
          >Log Task</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  layout: "Default",
  data() {
    return {
      dialogFormVisible: false,
      taskDialogForm: {
        task_logs_id: "",
        subtask_id: "",
        miscellaneous: false,
        log_date: new Date(),
        status: "",
        task_desc: "",
        work_hours: 0,
      },
    };
  },
  computed: {
    ...mapGetters(["GET_SELECTED_SUBTASK", "GET_SELECTED_TASK_LOGS"]),
  },

  methods: {
    logTask() {
      if (
        !Object.values(this.taskDialogForm).includes("") ||
        !Object.values(this.taskDialogForm).includes(0)
      ) {
        this.taskDialogForm.log_date = this.formatDate(
          this.taskDialogForm.log_date
        );
        this.$store.dispatch("createTaskLog", this.taskDialogForm).then(() => {
          this.$store.dispatch("updateSubtask", { data:{ status: this.taskDialogForm.status}, subtask_id: this.taskDialogForm.subtask_id }).then(() => {
              alert("successfully logged your work!");
              this.$store
                .dispatch("getSubtask", this.$route.query.subtask_id)
                .then(() => {
                  this.$store.dispatch(
                    "getTaskLogs",
                    this.GET_SELECTED_SUBTASK.subtask_id
                  );
                });
            });
          this.dialogFormVisible = false;
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
  created() {
    this.$store
      .dispatch("getSubtask", this.$route.query.subtask_id)
      .then(() => {
        this.$store.dispatch(
          "getTaskLogs",
          this.GET_SELECTED_SUBTASK.subtask_id
        );
      });
  },

  async mounted() {
    this.taskDialogForm.subtask_id = this.$route.query.subtask_id;
    this.taskDialogForm.task_logs_id = await this.$store.dispatch(
      "generateID",
      "t_task_logs"
    );
  },
};
</script>