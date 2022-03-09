<template>
  <div class="py-5 w-2/3 m-auto h-screen">
    <div class="w-full p-3">
      <span class="text-2xl font-bold text-white">{{
        GET_SELECTED_SUBTASK.subtask_id
      }}</span>
    </div>
    <div class="w-full p-3 flex flex-row items-center justify-between">
      <span class="text-4xl font-bold text-white">{{
        GET_SELECTED_SUBTASK.subtask_title
      }}</span>

      <nuxt-link
        :to="{
          name: 'CreateSubtask',
          query: { subtask_id: GET_SELECTED_SUBTASK.subtask_id },
        }"
        ><el-button icon="el-icon-edit" class="bg-white text-white"
          >Update this subtask</el-button
        ></nuxt-link
      >
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
          <el-tag
            :type="
              GET_SELECTED_SUBTASK.status === 'Done'
                ? 'success'
                : GET_SELECTED_SUBTASK.status === 'Todo'
                ? 'warning'
                : 'danger'
            "
            disable-transitions
            >{{ GET_SELECTED_SUBTASK.status }}</el-tag
          >
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
        <el-button
          class="bg-white text-white"
          @click="dialogFormVisible = true"
          icon="el-icon-edit"
          >Log a task</el-button
        >
      </div>
      <el-table
        :header-cell-style="{ background: '#545c64', text: 'white' }"
        :cell-style="{ background: '#545c64' }"
        :data="
          [...GET_SELECTED_TASK_LOGS]
        "
        class="w-full rounded-lg text-white break-words"
      >
        <el-table-column prop="task_logs_id" label="Task Log ID">
          <template slot-scope="scope">
          <el-popover
                class="rounded-lg break-words"
                placement="right"
                width="250"
                height="300"
                trigger="hover"
              >
                <span class="break-words">{{ scope.row.task_desc }}</span>

                <span slot="reference">{{ scope.row.task_logs_id }}</span>
              </el-popover>
          </template>
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
            {{ new Date(scope.row.log_date).toLocaleString().split(",")[0] }}
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
        <el-table-column  width="240">
          <template slot-scope="scope">
            <div class="flex flex-row">
              <el-button
                @click="editTaskLog(scope.row.task_logs_id)"
                class="font-bold text-white bg-white"
                icon="el-icon-edit"
                >Edit</el-button
              >
              <el-button
                @click="deleteAction(scope.row.task_logs_id)"
                class="font-bold text-white bg-white"
                icon="el-icon-delete"
                >Delete</el-button
              >
            </div>
          </template>
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
        <el-button
          @click="
            () => {
              dialogFormVisible = false;
              isUpdateMode = false;
            }
          "
          >Cancel</el-button
        >
        <el-button
          v-if="!isUpdateMode"
          class="text-blue-700 font-bold"
          @click="logTask"
          >Log Task</el-button
        >
        <el-button v-else class="text-blue-700 font-bold" @click="updateTaskLog"
          >Update Task Log</el-button
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
      isUpdateMode: false,
      taskDialogForm: {
        task_logs_id: "",
        subtask_id: "",
        miscellaneous: false,
        log_date: new Date(),
        status: "",
        task_desc: "",
        work_hours: 0,
      },
      filterColumn: "",
      filterValue: "",
    };
  },
  computed: {
    ...mapGetters([
      "GET_SELECTED_SUBTASK",
      "GET_SELECTED_TASK_LOGS",
      "GET_SELECTED_TASK_LOG",
    ]),
    filterObject() {
      const returnObject = Object.keys(this.GET_SELECTED_TASK_LOGS[0] || []);
      returnObject.splice(1, 1);
      this.filterColumn = returnObject[0];
      return returnObject;
    },
    updatePayload() {
      this.taskDialogForm.log_date = this.formatDate(
        this.taskDialogForm.log_date
      );
      const updateData = { ...this.taskDialogForm };
      delete updateData.task_logs_id;
      return {
        id: this.taskDialogForm.task_logs_id,
        parent_key: "task_logs",
        foreign_key: "subtask",
        foreign_id: this.taskDialogForm.subtask_id,
        type: "task_log",
        updateData: updateData,
      };
    },
  },

  watch: {
    dialogFormVisible(value) {
      if (!value) {
        this.taskDialogForm = {
          task_logs_id: "",
          subtask_id: "",
          miscellaneous: false,
          log_date: new Date(),
          status: "",
          task_desc: "",
          work_hours: 0,
        };
      }
    },
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
          this.$store
            .dispatch("updateSubtask", {
              data: { status: this.taskDialogForm.status },
              subtask_id: this.taskDialogForm.subtask_id,
            })
            .then(() => {
              this.$message({
                type: "success",
                message: "Successfully logged your work!.",
              });
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

    async deleteTableData(taskLogID) {
      const requestObject = {
        id: taskLogID,
        type: "task_log",
        column: "task_logs_id",
      };
      await this.$store
        .dispatch("deleteTableData", requestObject)
        .then(async (data) => {
          await this.$store.dispatch("getTaskLogs");
          if (!data) {
            this.$message({
              type: "error",
              message: "Failed to delete this Log",
            });
          } else {
            this.$message({
              type: "success",
              message: "Task log deleted.",
            });
          }
        });
    },

    deleteAction(taskLogID) {
      this.$confirm(
        "This will permanently delete this Task Log. Continue?",
        "Warning",
        {
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.deleteTableData(taskLogID);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },

    async editTaskLog(taskLogID) {
      this.isUpdateMode = true;
      await this.$store.dispatch("getTaskLog", taskLogID);
      const result = { ...this.GET_SELECTED_TASK_LOG[0] };
      result.log_date = new Date(result.log_date);
      result.miscellaneous = result.miscellaneous === 0 ? false : true;
      console.log(result);
      this.taskDialogForm = result;
      this.dialogFormVisible = true;
    },

    updateTaskLog() {
      if (!Object.values(this.taskDialogForm).includes("")) {
        this.$store
          .dispatch("updateTableData", this.updatePayload)
          .then(async () => {
            this.$store
              .dispatch("updateSubtask", {
                data: { status: this.taskDialogForm.status },
                subtask_id: this.taskDialogForm.subtask_id,
              })
              .then( async () => {
                this.$message({
                  type: "success",
                  message: "Successfully updated a task log!",
                });
                this.isUpdateMode = false;
                this.dialogFormVisible = false;
                this.taskDialogForm = {
                  task_logs_id: "",
                  subtask_id: "",
                  miscellaneous: false,
                  log_date: new Date(),
                  status: "",
                  task_desc: "",
                  work_hours: 0,
                };
                this.$store.dispatch(
                  "getTaskLogs",
                  this.GET_SELECTED_SUBTASK.subtask_id
                );
                this.taskDialogForm.subtask_id = this.$route.query.subtask_id;
                this.taskDialogForm.task_logs_id = await this.$store.dispatch(
                  "generateID",
                  "t_task_logs"
                );
                this.$store
                  .dispatch("getSubtask", this.$route.query.subtask_id)
                  .then(() => {
                    this.$store.dispatch(
                      "getTaskLogs",
                      this.GET_SELECTED_SUBTASK.subtask_id
                    );
                  });
              });
          });
      } else {
        this.$message({
          type: "error",
          message: "Please complete the fields above.",
        });
      }
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
    try {
      this.taskDialogForm.subtask_id = this.$route.query.subtask_id;
      this.taskDialogForm.task_logs_id = await this.$store.dispatch(
        "generateID",
        "t_task_logs"
      );
    } catch (_) {
      this.$message({
        type: "error",
        message: "Subtask does not exist.",
      });
      this.$router.push("/ManageSubtask");
    }
  },
};
</script>