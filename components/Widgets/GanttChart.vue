<template>
    <div class="w-full">
      <div>
         <el-select
            v-model="paramForm.project"
            class="transition-all hover:shadow-lg w-full"
            placeholder="Status"
          >
            <el-option v-for="project in dropdownData.projects" :key="project.key" :label="project.project_title" :value="project.project_id"></el-option>
          </el-select>
          <el-select
            v-model="paramForm.plan"
            class="transition-all hover:shadow-lg w-full"
            placeholder="Status"
          >
            <el-option v-for="plan in dropdownData.plans" :key="plan.key" :label="plan.plan_title" :value="plan.plan_id"></el-option>
          </el-select>
      </div>
      <client-only>
        <component
          :is="apexchart"
          ref="realTimeChart"
          class="w-full text-black"
          :options="chartOptions"
          :series="series"
          height="300"
        />
      </client-only>
    </div>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  export default {
    data () {
      return {
        paramForm: {
          project: '',
          plan: ''
        },
      }
    },
    props: {
      series: {
        type: Array,
        default: () => [
        {
                data: [
                  {
                    x: 'Code',
                    y: [
                      new Date('2019-03-02').getTime(),
                      new Date('2019-03-04').getTime()
                    ]
                  },
                  {
                    x: 'Test',
                    y: [
                      new Date('2019-03-04').getTime(),
                      new Date('2019-03-08').getTime()
                    ]
                  },
                  {
                    x: 'Validation',
                    y: [
                      new Date('2019-03-08').getTime(),
                      new Date('2019-03-12').getTime()
                    ]
                  },
                  {
                    x: 'Deployment',
                    y: [
                      new Date('2019-03-12').getTime(),
                      new Date('2019-03-18').getTime()
                    ]
                  }
                ]
              }
        ],
      },
      chartOptions: {
        type: Object,
        default: () => {
          return {
            title: {
              text: "All Subtasks",
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
          };
        },
      },
    },
    computed: {
      apexchart() {
        return () => {
          if (process.client) {
            return import("vue-apexcharts");
          }
        };
      },
      ...mapGetters(["GET_DASHBOARD_DATA", "GET_ALL_PROJECTS", "GET_ALL_PLANS"]),
      dropdownData () {
        let PROJECT_ARRAY = this.GET_ALL_PROJECTS
        let PLAN_ARRAY = this.GET_ALL_PLANS
        let projects = PROJECT_ARRAY.map((project) => {
          return {
            project_id: project.project_id,
            project_title: project.project_title
          }
        })
  
        let plans = PLAN_ARRAY.filter((plan) => {
          return plan.project_id = this.paramForm.project
        }).map((plan) => {
          return {
            plan_id: plan.plan_id,
            plan_title: plan.plan_title
          }
        })
  
        return {
          projects,
          plans
        }
      }
    },
    watch: {
      // GET_DASHBOARD_DATA(value) {
      //   this.series[0].data = value.actualData;
      //   this.series[1].data = value.plannedData;
      //   try {
      //     this.$refs.realTimeChart.updateSeries([
      //       {
      //         name: "Actual",
      //         data: value.actualData,
      //       },
      //       {
      //         name: "Planned",
      //         data: value.plannedData,
      //       },
      //     ]);
      //   } catch (e) {
      //     this.$refs.realTimeChart.updateSeries([
      //       {
      //         name: "Actual",
      //         data: value.actualData,
      //       },
      //       {
      //         name: "Planned",
      //         data: value.plannedData,
      //       },
      //     ]);
      //   }
      // },
    },
    async mounted () {
      //  await this.$store.dispatch("getProjects")
      //  await this.$store.dispatch('getPlans')
    }
  };
  </script>
  
  <style>
  </style>