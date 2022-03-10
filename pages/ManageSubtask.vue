<template>
  <div class="py-5 w-5/6 m-auto h-screen">
    <div class="w-full py-5 flex flex-row items-center justify-between">
      <span class="text-5xl font-bold text-white">Manage Subtasks</span>
      <nuxt-link class="pr-5 font-black" to="CreateSubtask?redir=true"
        ><el-button
          icon="el-icon-edit"
          class="hover:font-bold bg-white text-white"
          >Create a Subtask</el-button
        ></nuxt-link
      >
    </div>
    <div class="mt-5">
      <el-table
        :header-cell-style="{ background: '#545c64', text: 'white' }"
        :cell-style="{ background: '#545c64' }"
        :data="filteredData"
        class="w-full text-white rounded-lg"
      >
        <el-table-column prop="subtask_id" label="ID" width="110">
        </el-table-column>
        <el-table-column prop="subtask_title" label="Title">
          <template slot-scope="scope">
            <nuxt-link
              class="font-bold text-md hover:underline"
              :to="{
                name: 'Subtask',
                query: { subtask_id: scope.row.subtask_id },
              }"
            >
              {{ scope.row.subtask_title }}
            </nuxt-link>
          </template>
        </el-table-column>
        <el-table-column prop="priority" label="Type" width="90">
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

        <el-table-column prop="status" label="Status" width="90">
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
        <el-table-column prop="start_date" label="Starts at" width="90">
          <template slot-scope="scope">
            {{ new Date(scope.row.start_date).toLocaleString().split(",")[0] }}
          </template>
        </el-table-column>
        <el-table-column prop="end_date" label="Ends at" width="90">
          <template slot-scope="scope">
            {{
              new Date(scope.row.end_date).toLocaleString().split(",")[0]
            }}</template
          >
        </el-table-column>
        <el-table-column prop="due_date" label="Due by" width="90">
          <template slot-scope="scope">
            {{
              new Date(scope.row.due_date).toLocaleString().split(",")[0]
            }}</template
          >
        </el-table-column>

        <el-table-column align="right" width="240">
          <template slot="header">
            <div class="flex flex-col w-full items-center justify-center space-y-3">
             <el-select
              class="w-full transition-all hover:shadow-lg"
              v-model="filterColumn"
              placeholder="Filter type"
            >
              <el-option
                v-for="filter in filterObject"
                :key="filter"
                :label="filter"
                :value="filter"
              ></el-option>
            </el-select>
                        <el-date-picker
              v-if="filterColumn === 'due_date' || filterColumn === 'start_date' || filterColumn === 'end_date'"
              v-model="filterValue"
              type="date"
              class="w-full"
              placeholder="Pick a day"
            />
            <el-input v-else v-model="filterValue" placeholder="search" />
            </div>
          </template>
          <template slot-scope="scope">
            <div>
              <nuxt-link
                :to="{
                  name: 'CreateSubtask',
                  query: { subtask_id: scope.row.subtask_id },
                }"
              >
                <el-button
                  class="font-bold text-white bg-white"
                  icon="el-icon-edit"
                  >Edit</el-button
                >
              </nuxt-link>
              <el-button
                @click="deleteAction(scope.row.subtask_id)"
                class="font-bold text-white bg-white"
                icon="el-icon-delete"
                >Delete</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  layout: "Default",
  data() {
    return {
      filterColumn: "",
      filterValue: "",
    };
  },
  watch: {
    filterColumn() {
      this.filterValue = "";
    },
  },
  computed: {
    ...mapGetters(["GET_ALL_SUBTASKS"]),
    filterObject() {
      const returnObject = Object.keys(this.GET_ALL_SUBTASKS[0] || []);
      //returnObject.splice(1, 1);
      this.filterColumn = returnObject[0];
      return returnObject;
    },

    filteredData() {
      return [...this.GET_ALL_SUBTASKS].filter((data) => {
          if (isNaN(new Date(data[this.filterColumn])) && data !== undefined) {
            return (
              !this.filterValue ||
              data[this.filterColumn]
                .toLowerCase()
                .includes(this.filterValue.toLowerCase())
            );
          } else if (
            !isNaN(new Date(data[this.filterColumn])) &&
            data !== undefined
          ) {
            return (
              !this.filterValue ||
              new Date(data[this.filterColumn])
                .toLocaleString()
                .split(",")[0] ===
                new Date(this.filterValue).toLocaleString().split(",")[0]
            );
        }
      });
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
                "Failed to delete subtask because there are existing logs under this plan",
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
  },
  async mounted() {
    await this.$store.dispatch("getSubtasks");
  },
};
</script>

<style>
</style>