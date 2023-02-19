<template>
  <div class="flex flex-col items-start justify-center mb-20 md:mb-0">
    <span class="text-white text-lg mb-5 font-bold"
      >Project Eisenhower Matrix</span
    >
    <div
      class="
        relative
        flex flex-row
        bg-neutral-800
        p-5
        shadow-xl
        w-full
        ring-1 ring-gray-900/5
        rounded-lg
      "
    >
      <div class="flex flex-col items-center justify-around pr-3">
        <span
          class="text-white text-xs"
          style="writing-mode: vertical-rl; text-orientation: mixed"
          >important</span
        >
        <span
          class="text-white text-xs"
          style="writing-mode: vertical-rl; text-orientation: mixed"
          >not important</span
        >
      </div>
      <div
        class="
          mx-auto
          w-full
          flex flex-col
          items-center
          justify-center
          pr-3
          h-full
        "
      >
        <div class="w-full flex flex-row items-center justify-center h-60">
          <div class="w-1/2 h-full">
            <div class="w-full text-center text-white text-xs mb-2">Urgent</div>
            <div
              class="
                bg-neutral-700
                overflow-auto
                w-full
                p-2
                flex flex-col
                items-start
                justify-start
                border border-dashed border-b-0 border-r-0 border-neutral-500
                h-full
                max-h-full
              "
            >
              <nuxt-link
                :to="`/Project?project_id=${item.project_id}`"
                class="bg-red-500 p-1 rounded-lg shadow my-1 text-sm px-2"
                :key="item.key"
                v-for="item in matrixData.urgentImportant"
                >{{ item.project_title }}</nuxt-link
              >
            </div>
          </div>
          <div class="w-1/2 h-full">
            <div class="w-full text-center text-white text-xs mb-2">
              Not Urgent
            </div>
            <div
              class="
                bg-neutral-700
                overflow-auto
                w-full
                p-2
                flex flex-col
                items-start
                justify-start
                border border-dashed border-b-0 border-neutral-500
                h-full
              "
            >
              <nuxt-link
                :to="`/Project?project_id=${item.project_id}`"
                class="bg-amber-700 p-1 rounded-lg shadow my-1 text-sm px-2"
                :key="item.key"
                v-for="item in matrixData.ImportantNotUrgent"
                >{{ item.project_title }}</nuxt-link
              >
            </div>
          </div>
        </div>
        <div class="w-full flex flex-row items-center justify-center h-60">
          <div
            class="
              bg-neutral-700
              overflow-auto
              w-1/2
              p-2
              flex flex-col
              items-start
              justify-start
              border border-dashed border-r-0 border-neutral-500
              h-full
            "
          >
            <nuxt-link
              :to="`/Project?project_id=${item.project_id}`"
              class="bg-orange-600 p-1 rounded-lg shadow my-1 text-sm px-2"
              :key="item.key"
              v-for="item in matrixData.urgentNotImportant"
              >{{ item.project_title }}</nuxt-link
            >
          </div>
          <div
            class="
              bg-neutral-700
              overflow-auto
              w-1/2
              p-2
              flex flex-col
              items-start
              justify-start
              border border-dashed border-neutral-500
              h-full
            "
          >
            <nuxt-link
              :to="`/Project?project_id=${item.project_id}`"
              class="bg-blue-600 p-1 rounded-lg shadow my-1 text-sm px-2"
              :key="item.key"
              v-for="item in matrixData.notUrgentNotImportant"
              >{{ item.project_title }}</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      metaData: {
        projects: [],
        plans: [],
        subtasks: [],
      },
      matrixData: {
        urgentImportant: [],
        urgentNotImportant: [],
        ImportantNotUrgent: [],
        notUrgentNotImportant: [],
      },
    };
  },

  computed: {
    ...mapGetters(["GET_FISCAL_YEAR"]),
  },

  async mounted() {
    await this.initializeComponent();
  },

  methods: {
    async initializeComponent() {
      this.metaData.projects = await this.$store.dispatch(
        "getEMatrixProject",
        this.$cookies.get("fyear")
      );
      this.setMatrixDataOptimized();
    },
    setMatrixDataOptimized() {
      const perInstanceCondition = (item) => {
        return {
          urgentImportant: item.category === 1 && item.precentage !== 100,
          urgentNotImportant: item.category === 3 && item.precentage !== 100,
          ImportantNotUrgent: item.category === 2 && item.precentage !== 100,
          notUrgentNotImportant: item.category === 4 && item.precentage !== 100,
        };
      };
      Object.keys(this.matrixData).forEach((item) => {
        this.matrixData[item] = this.metaData.projects.filter((data) => {
          return perInstanceCondition(data)[item];
        });
      });
    },
  },

  watch: {
    async GET_FISCAL_YEAR(newVal, oldVal) {
      if (oldVal !== "") {
        this.metaData = {
          projects: [],
          plans: [],
          subtasks: [],
        };
        this.matrixData = {
          urgentImportant: [],
          urgentNotImportant: [],
          ImportantNotUrgent: [],
          notUrgentNotImportant: [],
        };
        await this.initializeComponent();
      }
    },
  },
};
</script>

<style>
</style>