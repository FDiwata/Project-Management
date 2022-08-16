<template>
  <nuxt-link @click.self.stop :to="`Subtask?subtask_id=${subtask.subtask_id}`">
    <div
      class="
        w-full
        flex flex-col
        space-y-3
        p-5
        h-64 max-h-64 min-h-64
        rounded-lg
        hover:shadow-lg
        justify-between
        items-center
        bg-white
        text-gray-500
      "
    >
      <div class="w-full flex flex-col items-start justify-center">
        <span class="text-xs">{{ subtask.subtask_id }}</span>
        <h1 class="text-xl font-black text-gray-800">
          {{ subtask.subtask_title }}
        </h1>
        <div class="w-full p-1 flex flex-row items-center justify-start space-x-3">
        <span class="text-xs">type:  <el-tag
              :type="
                subtask.priority === 'critical'
                  ? 'danger'
                  : subtask.priority === 'major'
                  ? 'warning'
                  : 'success'
              "
              disable-transitions
              >{{ subtask.priority }}</el-tag
            ></span>
        <span class="text-xs">status: <el-tag
            :type="
              subtask.status === 'Done'
                ? 'success'
                : subtask.status === 'Todo'
                ? 'warning'
                : 'danger'
            "
            disable-transitions
            >{{ subtask.status }}</el-tag
          ></span>
          </div>
        <p class="italic text-gray-400 text-ellipsis mt-3 max-h-20 truncate w-full">
          Description: "{{ subtask.subtask_desc }}"
        </p>
      </div>
      <div class="w-full flex flex-row items-center justify-end space-x-2">
        <el-button
          @click.prevent.stop="updateSubtask(subtask.subtask_id)"
          class="font-bold"
          icon="el-icon-edit"
        ></el-button>
        <el-button
          @click.prevent.stop="deleteAction(subtask.subtask_id)"
          class="font-bold"
          icon="el-icon-delete"
        ></el-button>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    subtask: {
      type: Object,
      default: () => {
        return {
          due_date: "2022-03-16T16:00:00.000Z",
          end_date: "2022-03-16T16:00:00.000Z",
          plan_id: "plan-001",
          priority: "critical",
          start_date: "2022-03-09T16:00:00.000Z",
          status: "Done",
          subtask_desc:
            "Sample Subtask Description. This is a very serious subtask description. And I am testing this one",
          subtask_id: "subtask-001",
          subtask_title: "Sample Subtask",
        };
      },
    },
  },
  methods: {
      async deleteTableData(subtaskID) {
      const requestObject = {
        id: subtaskID,
        type: "subtask",
        column: "subtask_id",
      };
      await this.$store
        .dispatch("deleteTableData", requestObject)
        .then(async (data) => {
          await this.$store.dispatch("getSubtasks");
          if (!data) {
            this.$message({
              type: "error",
              message:
                "Failed to delete subtask because there are existing logs under this one.",
            });
          } else {
            this.$message({
              type: "success",
              message: "Subtask Deleted.",
            });
          }
        });
    },
      deleteAction(subtaskID) {
      this.$confirm(
        "This will permanently delete this Subtask. Continue?",
        "Warning",
        {
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.deleteTableData(subtaskID);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    updateSubtask(subtask_id) {
      this.$router.push(`CreateSubtask?subtask_id=${subtask_id}`)
    },
  },
};
</script>

<style>
</style>