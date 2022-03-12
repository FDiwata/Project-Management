<template>
  <div class="py-5 w-5/6 m-auto h-screen">
    <div class="w-full py-5 flex flex-row items-center justify-between">
      <span v-if="!$route.query.redir" class="text-5xl font-bold text-white"
        >Manage Projects</span
      >
      <span v-else class="text-5xl font-bold text-white"
        >Create a Plan from:</span
      >
      <nuxt-link
        v-if="!$route.query.redir"
        class="pr-5 font-black"
        to="CreateProject"
        ><el-button
          icon="el-icon-edit"
          class="hover:font-bold bg-white text-white"
          >Create a Project</el-button
        ></nuxt-link
      >
    </div>
    <div class="mt-5">
      <el-table
        :header-cell-style="{ background: '#545c64', text: 'white' }"
        :cell-style="{ background: '#545c64' }"
        :data="
          [...GET_ALL_PROJECTS].filter(
            (data) =>
              !filterValue ||
              data[filterColumn]
                .toLowerCase()
                .includes(filterValue.toLowerCase())
          )
        "
        class="w-full text-white rounded-lg"
      >
        <el-table-column prop="project_id" label="Project ID">
        </el-table-column>
        <el-table-column prop="project_title" label="Project Title" width="180">
          <template slot-scope="scope">
            <nuxt-link
              class="font-bold text-md hover:underline"
              :to="{
                name: $route.query.redir ? 'CreatePlan' : 'Project',
                query: { project_id: scope.row.project_id },
              }"
            >
              {{ scope.row.project_title }}
            </nuxt-link>
          </template>
        </el-table-column>
        <el-table-column prop="project_type" label="Type">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.project_type === 'planned' ? 'success' : 'info'"
              disable-transitions
              >{{ scope.row.project_type }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="in_charge" label="in Charge"> </el-table-column>
        <el-table-column prop="percentage" label="Percentage">
        </el-table-column>
        <el-table-column prop="TargetMonth" label="Target Month">
        </el-table-column>

        <el-table-column align="right" width="180">
          <template slot="header">
            <el-input
              size="mini"
              v-model="filterValue"
              placeholder="Type to search by:"
            />
          </template>
          <template slot-scope="scope">
            <div>
              <nuxt-link
                :to="{
                  name: 'CreateProject',
                  query: { project_id: scope.row.project_id },
                }"
              >
                <el-button
                  class="font-bold text-white bg-white"
                  icon="el-icon-edit"
                  >Edit</el-button
                >
              </nuxt-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="right" width="180">
          <template slot="header">
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
          </template>
          <template slot-scope="scope">
            <div>
              <el-button
                @click="deleteAction(scope.row.project_id)"
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
  computed: {
    ...mapGetters(["GET_ALL_PROJECTS"]),
    filterObject () {
        const returnObject = Object.keys(this.GET_ALL_PROJECTS[0] || [])
        returnObject.splice(2,1)
        this.filterColumn = returnObject[0]
        return returnObject
      }
  },
  methods: {
    async deleteTableData(projectID) {
      const requestObject = {
        id: projectID,
        type: "project",
        column: "project_id",
      };
      await this.$store
        .dispatch("deleteTableData", requestObject)
        .then(async (data) => {
          if (data) {
            await this.$store.dispatch("getProjects");
            this.$message({
              type: "success",
              message: "Project Deleted.",
            });
          } else {
            await this.$store.dispatch("getProjects");
            this.$message({
              type: "error",
              message:
                "Failed to delete because there are existing plans under this project",
            });
          }
        });
    },

    deleteAction(projectID) {
      this.$confirm(
        "This will permanently delete this Project. Continue?",
        "Warning",
        {
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.deleteTableData(projectID);
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
    await this.$store.dispatch("getProjects");
  },
};
</script>

<style>
</style>