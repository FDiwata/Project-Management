<template>
  <div class="ml-20 m-auto w-full h-screen pr-20">
   <entity-stats />
  </div>
</template>

<script>
import EntityStats from '../components/Widgets/EntityStats.vue';
export default {
    layout: "Default",
    components: { EntityStats }
};
</script>

<style>
</style>