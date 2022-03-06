<template>
  <div class="p-5 w-3/4 m-auto h-screen">
    <div class="w-full py-5 flex flex-row items-center justify-between">
      <span class="text-5xl font-bold text-gray-600 dark:text-white">Manage Subtasks</span>
       <nuxt-link class="pr-5 font-black" to="CreateSubtask?redir=true"><el-button
          icon="el-icon-edit" class="hover:font-bold"
          >Create a Subtask</el-button
        ></nuxt-link>
    </div>
    <div class="mt-5">
      <el-table :data="GET_ALL_SUBTASKS" class="w-full">
        <el-table-column prop="subtask_id" label="Subtask ID"> </el-table-column>
        <el-table-column prop="subtask_title" label="Subtask Title">
           <template slot-scope="scope">
          <nuxt-link class="font-bold text-md hover:underline" :to="{name: 'Subtask', query: {subtask_id: scope.row.subtask_id}}">
            {{scope.row.subtask_title}}
          </nuxt-link>
        </template>
        </el-table-column>
        <el-table-column prop="priority" label="Project Type">
          <template slot-scope="scope">
            <el-tag
              :type="
                scope.row.priority === 'critical'
                  ? 'danger'
                  : scope.row.priority === 'major'
                  ? 'warning'
                  : 'success'
              "
              disable-transitions
              >{{ scope.row.priority }}</el-tag
            >
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
        <el-table-column prop="start_date" label="Start Date">
           <template slot-scope="scope">
             {{new Date(scope.row.start_date).toLocaleString().split(',')[0]}}
           </template>
        </el-table-column>
        <el-table-column prop="end_date" label="End Date">
           <template slot-scope="scope">
             {{new Date(scope.row.start_date).toLocaleString().split(',')[0]}}</template> </el-table-column>
        <el-table-column prop="due_date" label="Due Date">
           <template slot-scope="scope">
             {{new Date(scope.row.start_date).toLocaleString().split(',')[0]}}</template> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: "Default",
  data() {
    return {
      tableData: [
        {
          subtaskID: "Subtask-001",
          subtaskTitle: "Sample Subtask",
          priorityType: "Critical",
          status: "Doing",
          startDate: new Date().toLocaleString().split(",")[0],
          endDate: new Date().toLocaleString().split(",")[0],
          dueDate: new Date().toLocaleString().split(",")[0],
        },
        {
          subtaskID: "Subtask-002",
          subtaskTitle: "Sample Subtask",
          priorityType: "Minor",
          status: "Done",
          startDate: new Date().toLocaleString().split(",")[0],
          endDate: new Date().toLocaleString().split(",")[0],
          dueDate: new Date().toLocaleString().split(",")[0],
        },
        {
          subtaskID: "Subtask-003",
          subtaskTitle: "Sample Subtask",
          priorityType: "Major",
          status: "Doing",
          startDate: new Date().toLocaleString().split(",")[0],
          endDate: new Date().toLocaleString().split(",")[0],
          dueDate: new Date().toLocaleString().split(",")[0],
        },
        {
          subtaskID: "Subtask-004",
          subtaskTitle: "Sample Subtask",
          priorityType: "Minor",
          status: "Done",
          startDate: new Date().toLocaleString().split(",")[0],
          endDate: new Date().toLocaleString().split(",")[0],
          dueDate: new Date().toLocaleString().split(",")[0],
        },
      ],
    };
  },
   computed: {
      ...mapGetters([ 'GET_ALL_SUBTASKS' ])
    },
    async mounted () {
      await this.$store.dispatch('getSubtasks')
    }
};
</script>

<style>
</style>