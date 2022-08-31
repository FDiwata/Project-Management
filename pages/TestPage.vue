<template>
  <div class="ml-20 m-auto w-full h-screen pr-20">
    <gantt-chart />
  </div>
</template>

<script>
import CalendarWidget from "../components/Widgets/CalendarWidget.vue";
import GanttChart from "../components/Widgets/GanttChart.vue";
export default {
  components: { CalendarWidget, GanttChart },
  layout: "Default",
};
</script>

<style>
</style>