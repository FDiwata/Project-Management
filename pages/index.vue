<template>
  <div class="p-5 w-3/4 m-auto h-screen">
    <div class="w-full py-5">
      <span class="text-5xl font-bold text-white">
        Dashboard
      </span>
    </div>
    <div class="flex flex-col items-center justify-between">
      <client-only>
        <component
          :is="apexchart"
          ref="realTimeChart"
          class="w-full"
          :options="chartOptions"
          :series="series"
          height="300"
        />
      </client-only>
      <div class="mt-10 w-full">
        <div class="w-full m-auto pb-5">
          <span class="font-bold">Project list</span
          ><span class="font-thin mx-3"
            >(click plans row in popover to see it in the graph)</span
          >
        </div>

        <el-table :header-cell-style="{ background: '#545c64' }" :cell-style="{ background: '#545c64' }" :data="GET_ALL_PROJECTS" class="w-full break-words">
          <el-table-column label="Plans" width="180">
            <template slot-scope="scope">
              <el-popover
                @show="getProjectPlan(scope.row.project_id)"
                placement="right"
                width="800"
                trigger="click"
              >
                <el-table
                   :header-cell-style="{ background: '#545c64' }" 
                   :cell-style="{ background: '#545c64' }"
                  :data="GET_ALL_PLANS"
                  class="w-full"
                  @row-click="plotPlan"
                >
                  <el-table-column prop="plan_id" label="Plan ID">
                  </el-table-column>
                  <el-table-column prop="plan_title" label="Plan Title">
                    <template slot-scope="scope">
                      <nuxt-link
                        class="font-bold text-md hover:underline"
                        :to="{
                          name: $route.query.redir ? 'CreateSubtask' : 'Plan',
                          query: { plan_id: scope.row.plan_id },
                        }"
                      >
                        {{ scope.row.plan_title }}
                      </nuxt-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="assignee" label="Assignee">
                  </el-table-column>
                  <el-table-column
                    width="200"
                    prop="plan_desc"
                    label="Description"
                  >
                    <template slot-scope="scope">
                      <span class="break-normal">{{
                        scope.row.plan_desc
                      }}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <el-button slot="reference">Click to see plans</el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="project_id" label="Project ID">
          </el-table-column>
          <el-table-column
            prop="project_title"
            label="Project Title"
            width="350"
          >
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
          <el-table-column prop="project_type" label="Project Type">
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.project_type === 'planned' ? 'success' : 'info'
                "
                disable-transitions
                >{{ scope.row.project_type }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="in_charge" label="in Charge">
          </el-table-column>
          <el-table-column prop="percentage" label="Percentage">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import 'element-theme-dark';
import { mapGetters } from "vuex";
export default {
  name: "IndexPage",
  layout: "Default",
  computed: {
    apexchart() {
      return () => {
        if (process.client) {
          return import("vue-apexcharts");
        }
      };
    },
    ...mapGetters(["GET_DASHBOARD_DATA", "GET_ALL_PLANS", "GET_ALL_PROJECTS"]),
  },
  data() {
    return {
      series: [
        {
          name: "Actual",
          data: [],
        },
        {
          name: "Planned",
          data: [],
        },
      ],
      chartOptions: {
        title: {
          text: 'All Subtasks',
          align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "14pt",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#f59e0b",
          },
        },
        chart: {
          height: 350,
          type: "rangeBar",
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "vertical",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100],
          },
        },
        xaxis: {
          type: "datetime",
        },
        legend: {
          position: "top",
        },
      },
    };
  },
  methods: {
    async plotPlan(row, column, event) {
      this.chartOptions =  {...this.chartOptions, ...{
    title: {
          text: `Subtasks from '${row.plan_title}' plan`,
          align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "14pt",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#f59e0b",
          },
        },
}}
      console.log(this.chartOptions.title.text)
      await this.$store.dispatch("getPlanDashboard", row.plan_id);
    },

    async getProjectPlan(project_id) {
      await this.$store.dispatch("getPlans", project_id);
    },
  },

  watch: {
    GET_DASHBOARD_DATA(value) {
      this.series[0].data = value.actualData;
      this.series[1].data = value.plannedData;
      try{
      this.$refs.realTimeChart.updateSeries([
        {
          name: "Actual",
          data: value.actualData,
        },
        {
          name: "Planned",
          data: value.plannedData,
        },
      ]);
      } catch (e) {
        this.$refs.realTimeChart.updateSeries([
        {
          name: "Actual",
          data: value.actualData,
        },
        {
          name: "Planned",
          data: value.plannedData,
        },
      ]);
      }
    },
  },
  async mounted() {
    await this.$store.dispatch("getProjects");
    await this.$store.dispatch("getPlans");
    await this.$store.dispatch("getPlanDashboard");
  },
};
</script>
<style>
@import url("~/assets/output.css");
</style>