<template>
  <div class="w-full mb-16 md:mb-0" style="min-height: 400px">
    <div
      class="
        w-full
        m-auto
        flex flex-col
        md:flex-row
        items-center
        justify-start
        md:justify-between
        space-x-0
        md:space-x-5
      "
    >
      <span
        class="text-xl w-full mb-3 md:w-fit md:text-3xl font-bold text-white"
        >Current Projects</span
      >
      <div class="w-full md:w-1/2 flex flex-row items-end justify-end space-x-5">
        <el-pagination
          background
          class="w-auto"
          layout="prev, pager, next"
          :hide-on-single-page="metaData.length === 1"
          :page-size="5"
          :current-page.sync="currentPage"
          @current-change="pageChange"
          :total="metaData.flat().length"
        >
        </el-pagination>
        <nuxt-link to="CreateProject" class="w-1/2 md:w-fit">
          <el-button icon="el-icon-edit" class="text-white w-full md:w-fit"
            >Create a project</el-button
          >
        </nuxt-link>
      </div>
    </div>
    <div
      class="
        w-full
        h-fit
        flex flex-col
        items-center
        justify-center
        space-y-3
        my-5
      "
    >
      <nuxt-link
        :to="`/Project?project_id=${percentage.project_id}`"
        class="
          hover:bg-neutral-700
          transition-all
          m-auto
          p-2
          px-5
          shadow-lg
          rounded-lg
          bg-neutral-800
          w-full
          text-white
          flex flex-row
          items-center
          justify-between
          text-center
          space-x-5
        "
        v-for="percentage in percData"
        :key="percentage.key"
      >
        <span class="hover:underline w-full md:w-1/3 text-left">
          {{ percentage.project_title }}
        </span>
        <el-tag class="text-lg" primary>
          {{ percentage.month }}
        </el-tag>
        <el-progress
          class="w-2/3 hidden md:block"
          type="line"
          :stroke-width="13"
          :percentage="
            !isNaN(
              Math.round(
                (100 / percentage.plan_count) * (percentage.percentage / 100)
              )
            )
              ? Math.round(
                  (100 / percentage.plan_count) * (percentage.percentage / 100)
                )
              : 0
          "
        />
        <el-button
          @click.prevent.stop="castDrawer(percentage.project_id)"
          type="primary"
          class="font-bold text-cyan-500 w-1/4 hidden md:block"
          icon="el-icon-edit"
          round
          >See Plans</el-button
        >
      </nuxt-link>
    </div>

    <el-drawer
      :title="`List of plans for ${GET_SELECTED_PROJECT.project_title}`"
      :visible.sync="drawer"
      :size="widthCheck() < 768 ? '100%' : '50%'"
    >
      <div class="h-full w-full p-5 bg-neutral-800 text-white">
        <el-table
          :header-cell-style="{ background: '#272727', text: 'white' }"
          :cell-style="{ background: '#272727' }"
          :data="GET_SELECTED_PLANS"
          class="w-full text-white border-none"
        >
          <el-table-column prop="plan_id" label="Plan ID"></el-table-column>
          <el-table-column prop="plan_title" label="Plan Title">
            <template slot-scope="scope">
              <nuxt-link
                class="font-bold text-md hover:underline"
                :to="{
                  name: $route.query.redir ? 'CreateSubtask' : 'Plan',
                  query: { plan_id: scope.row.plan_id },
                }"
                >{{ scope.row.plan_title }}</nuxt-link
              >
            </template>
          </el-table-column>
          <el-table-column prop="assignee" label="Assignee"></el-table-column>
          <el-table-column width="200" prop="plan_desc" label="Description">
            <template slot-scope="scope">
              <span class="break-normal">{{ scope.row.plan_desc }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      percData: [],
      metaData: [[]],
      drawer: false,
      currentPage: 1,
      seriesIndex: {
        current: 0,
        limit: 0,
      },
    };
  },
  computed: {
    ...mapGetters(["GET_SELECTED_PLANS", "GET_SELECTED_PROJECT"]),
    overAllProgress() {
      let numberOfProjects = this.percData.length;
      let totalPercentage = 0;
      this.percData.forEach((project) => {
        totalPercentage +=
          (100 / project.plan_count) * (project.percentage / 100);
      });
      return (100 / numberOfProjects) * (totalPercentage / 100);
    },
  },
  async mounted() {
    const metaArray = await this.$store.dispatch("getAllProjectsPercentage");
    this.arrayChunkify(JSON.parse(JSON.stringify(metaArray)), 5);
    this.seriesIndex.limit = Math.ceil(this.metaData.length / 5);
    this.percData = this.metaData[0];
  },
  methods: {
    async getProjectPlan(project_id) {
      await this.$store.dispatch("getPlans", project_id);
    },
    async castDrawer(project_id) {
      this.drawer = true;
      await this.$store.dispatch("getProject", project_id);
      await this.getProjectPlan(project_id);
    },
    widthCheck() {
      return process.client ? window.outerWidth : 0;
    },
    arrayChunkify(metaArray, chunkSize) {
      let pushLimit = 0;
      let subCount = 0;
      metaArray.forEach((project) => {
        this.metaData[subCount].push(project);
        if (pushLimit <= chunkSize - 2) {
          pushLimit += 1;
        } else {
          this.metaData.push([]);
          pushLimit = 0;
          subCount++;
        }
      });
    },
    pageChange(currentPage) {
      this.percData = this.metaData[currentPage - 1];
      this.key = currentPage;
    },
  },
};
</script>

<style>
</style>