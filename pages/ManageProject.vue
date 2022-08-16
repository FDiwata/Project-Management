<template>
  <div class="p-5 w-full md:w-2/3 m-auto h-screen">
    <div class="w-full py-5 flex flex-row items-center justify-between">
      <span v-if="!$route.query.redir" class="text-3xl md:text-5xl font-bold text-white"
        >Manage Projects</span
      >
      <span v-else class="text-5xl font-bold text-white"
        >Create a Plan from:</span
      >
      <nuxt-link
        v-if="!$route.query.redir"
        class="font-black"
        to="CreateProject"
        ><el-button
          icon="el-icon-edit"
          class="hover:font-bold text-white hidden md:block"
          >Create a Project</el-button
        ><el-button
          icon="el-icon-edit"
          class="hover:font-bold text-white block md:hidden"
          ></el-button
        ></nuxt-link
      >
    </div>
    <div class="mt-5">
      <div class="w-full flex flex-col space-y-5 md:space-y-0 md:grid grid-flow-row gap:2 md:gap-5 grid-cols-2 lg:grid-cols-3">
      <project-doc class="col-span-1 w-full" v-for="project in [...GET_ALL_PROJECTS].filter(
            (data) =>
              !filterValue ||
              data[filterColumn]
                .toLowerCase()
                .includes(filterValue.toLowerCase())
          )" :key="project.key" :projData="project"  @delAction="deleteAction(project.project_id)"
          @editAction="$router.push(`CreateProject?project_id=${project.project_id}`)"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProjectDoc from '../components/Elements/ProjectDoc.vue';
export default {
  components: { ProjectDoc },
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