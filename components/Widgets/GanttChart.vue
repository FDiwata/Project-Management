<template>
  <GChart
    class="text-white"
    :resizeDebounce="500"
    :type="type"
    :data="chartData"
    :options="options"
    :settings="settings"
  />
</template>
  
<script>
import { GChart } from "vue-google-charts";
import { mapGetters } from "vuex";
export default {
  name: "GoogleChart",
  components: {
    GChart,
  },
  data() {
    return {
      columns: [
        { type: "string", label: "Task ID" },
        { type: "string", label: "Task Name" },
        { type: "string", label: "Resource" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Duration" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" },
      ],
      rows: [
        [
          "Research",
          "Find sources",
          new Date("2022/08/01"),
          new Date("2022/08/15"),
          null,
          100,
          null,
        ],
        [
          "Write",
          "Write paper",
          new Date("2022/08/01"),
          new Date("2022/08/31"),
          null,
          25,
          null,
        ],
      ],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      type: "Gantt",
      settings: {
        packages: ["gantt"],
      },
    };
  },
  computed: {
    ...mapGetters(["GET_ALL_SUBTASKS"]),
    chartData() {
      return [this.columns, ...this.rows];
    },
    options() {
      return {
        titleTextStyle: { color: "#FFFFFF" },
        legendTextStyle: {
          color: "#FFFFFF",
        },
        gantt: {
          palette: [
            {
              color: "#FFFFFF",
              dark: "#FAA43A",
              light: "#FAA43A",
            },
            {
              color: "#FFFFFF",
              dark: "#FF6242",
              light: "#FF6242",
            },
            {
              color: "#FFFFFF",
              dark: "#9acd32",
              light: "#9acd32",
            },
          ],
          labelStyle: {
            color: "white",
            fontName: "Arial",
            fontSize: 15,
          },
        },
        width: "100%",
        height: window.screen.availHeight,
        backgroundColor: {
          fill: "#46596f",
          opacity: 100,
        },
      };
    },
  },

  methods: {},

  async mounted() {
    await this.$store.dispatch("getSubtasks");
    this.rows = this.GET_ALL_SUBTASKS.map((subtask) => {
      return [
        subtask.subtask_id,
        subtask.subtask_title,
        subtask.status,
        new Date(subtask.start_date),
        new Date(subtask.end_date),
        null,
        100,
        null,
      ];
    });
  },
};
</script>
  