<template>
  <div class="w-5/6 m-auto h-full">
    <div class="w-full py-5">
      <span class="text-5xl font-bold text-white">
        Dashboard
      </span>
    </div>
    <div class="flex flex-col items-center justify-between">
      <chart-widget :chart-options="chartOptions" :series="series" />
      <div class="mt-10 w-full">
        <div class="w-full m-auto pb-5">
          <span class="font-bold">Project list</span
          ><span class="font-thin mx-3"
            >(click plans row in popover to see it in the graph)</span
          >
        </div>
        <el-table :header-cell-style="{ background: 'rgb(71 85 105)', text: 'white' }" :cell-style="{ background: 'rgb(71 85 105)' }" :data="GET_ALL_PROJECTS" class="w-full break-words text-white rounded-lg">
          <el-table-column label="Plans" width="180">
            <template slot-scope="scope">
              <el-popover
                @show="getProjectPlan(scope.row.project_id)"
                class="rounded-lg"
                placement="right"
                width="800"
                trigger="click"
              >
                <h1 class="font-bold text-2xl">{{scope.row.project_title}} Plans</h1>
                <el-table
                   :header-cell-style="{ background: '#545c64', text: 'white' }" 
                   :cell-style="{ background: '#545c64' }"
                  :data="GET_SELECTED_PLANS"
                  class="w-full text-white rounded-lg"
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
                <el-button class="bg-white text-white" slot="reference">Click to see plans</el-button>
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
          <el-table-column prop="TargetMonth" label="Target Month">
          </el-table-column>
          <el-table-column prop="percentage" label="Percentage">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ChartWidget from '../components/Widgets/ChartWidget.vue';
export default {
  components: { ChartWidget },
  name: "IndexPage",
  layout: "Default",
  computed: {
    ...mapGetters(["GET_SELECTED_PLANS", "GET_ALL_PROJECTS"]),
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
            color: "white",
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
            shade: "dark",
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
            color: "white",
          },
        },
}}
      await this.$store.dispatch("getPlanDashboard", row.plan_id);
    },

    async getProjectPlan(project_id) {
      await this.$store.dispatch("getPlans", project_id);
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