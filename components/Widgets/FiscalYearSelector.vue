<template>
    <div class="w-full md:w-fit flex flex-row items-center justify-start my-3">
      <span class="w-1/2">Select year</span>
      <el-select class="w-3/2" v-model="selectedYear" placeholder="Select">
        <el-option
          v-for="year in yearRange.filter((i) => i !== null)"
          :key="year.value"
          :label="year.label"
          :value="year.value"
        >
        </el-option>
      </el-select>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedYear: "2022",
        yearRange: [],
      };
    },
    methods: {
      processYearRange(rangeObject) {
        this.yearRange = rangeObject.map((item, index) => {
          if (new Date(item).getFullYear() !== new Date(rangeObject[index - 1]).getFullYear()) {
          return {
            value: new Date(item).getFullYear().toString(),
            label: `F.Y. ${new Date(item).getFullYear()}`,
          };
          
        } else return null
        });
      },
    },
    watch: {
      selectedYear(value) {
        this.$cookies.set("fyear", value);
        this.$store.dispatch("setFiscalYear", this.$cookies.get("fyear"));
      },
    },
    async mounted() {
      if (this.$cookies.get("fyear") === undefined) {
        this.$cookies.set("fyear", new Date().getFullYear().toString());
      }
      this.processYearRange(await this.$store.dispatch("getYearRange"));
      this.selectedYear = this.$cookies.get("fyear");
    },
  };
  </script>
  
  <style>
  </style>