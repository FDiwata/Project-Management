<template>
  <div class="p-5 w-full md:w-5/6 m-auto h-screen">
    <div class="w-full py-5 flex flex-row items-center justify-between">
      <div class="w-fit flex flex-col items-start justify-start space-y-3">
        <span
        class="text-xl md:text-3xl font-bold text-white"
        >Manage Projects</span
      >
      <fiscal-year-selector />
      </div>
      
      <div class="w-1/2 flex flex-row items-end justify-end space-x-5">
        <el-pagination
          background
          class="right-0"
          layout="prev, pager, next"
          :hide-on-single-page="metaData.length === 1"
          :page-size="6"
          :current-page.sync="currentPage"
          @current-change="pageChange"
          :total="metaData.flat().length"
        >
        </el-pagination>
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
        ></nuxt-link>
      </div>
    </div>
    <div class="mt-5" style="min-height: 50%">
      <div
        class="
          w-full
          flex flex-col
          space-y-5
          md:space-y-0 md:grid
          grid-flow-row
          gap:2
          md:gap-5
          grid-cols-2
          lg:grid-cols-3
        "
      >
        <project-doc
          class="col-span-1 w-full"
          v-for="project in percData"
          :key="project.key"
          :projData="project"
          @delAction="deleteAction(project.project_id)"
          @editAction="
            $router.push(`CreateProject?project_id=${project.project_id}`)
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProjectDoc from "../components/Elements/ProjectDoc.vue";
import FiscalYearSelector from "../components/Widgets/FiscalYearSelector.vue";
export default {
  components: { ProjectDoc, FiscalYearSelector },
  layout: "Default",
  data() {
    return {
      percData: [],
      metaData: [[]],
      currentPage: 1,
      filterColumn: "",
      filterValue: "",
    };
  },
  computed: {
    ...mapGetters(["GET_ALL_PROJECTS", "GET_FISCAL_YEAR"]),
    filterObject() {
      const returnObject = Object.keys(this.GET_ALL_PROJECTS[0] || []);
      returnObject.splice(2, 1);
      this.filterColumn = returnObject[0];
      return returnObject;
    },
  },
  methods: {
    yearFilter(metaData) {
      return metaData.filter((project) => {
        return (
          new Date(project.month).getFullYear().toString() ===
          this.$cookies.get("fyear")
        );
      });
    },
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

    arrayChunkify(metaArray, chunkSize) {
      let pushLimit = 0;
      let subCount = 0;
      metaArray.forEach((project) => {
        if (
          new Date(project.TargetMonth).getFullYear() === this.$cookies.get("fyear")
        ) {
          this.metaData[subCount].push(project);
          if (pushLimit <= chunkSize - 2) {
            pushLimit += 1;
          } else {
            this.metaData.push([]);
            pushLimit = 0;
            subCount++;
          }
        }
      });
    },
    pageChange(currentPage) {
      this.percData = this.metaData[currentPage - 1];
      this.key = currentPage;
    },
  },
  async mounted() {
    await this.$store.dispatch("getProjects");
    const metaArray = this.GET_ALL_PROJECTS;
    this.arrayChunkify(JSON.parse(JSON.stringify(metaArray)), 6);
    this.percData = this.metaData[0];
  },

  watch: {
    async GET_FISCAL_YEAR(newVal, oldVal) {
      if (oldVal !== "") {
        this.percData = [];
        this.metaData = [[]];
        this.currentPage = 1;
        this.filterColumn = "";
        this.filterValue = "";
        await this.$store.dispatch("getProjects");
        const metaArray = this.GET_ALL_PROJECTS;
        this.arrayChunkify(JSON.parse(JSON.stringify(metaArray)), 6);
        this.percData = this.metaData[0];
      }
    },
  },
};
</script>

<style>
</style>