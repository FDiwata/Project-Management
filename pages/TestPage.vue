<template>
  <div class="ml-20 m-auto w-full h-screen pr-20">
    <eisenhower-matrix />
  </div>
</template>

<script>
import ChartWidget from '../components/Widgets/ChartWidget.vue';
import EisenhowerMatrix from '../components/Widgets/EisenhowerMatrix.vue';
export default {
  components: { ChartWidget, EisenhowerMatrix },
  layout: "Default",
};
</script>

<style>
</style>