<template>
  <el-dialog
    class="rounded-lg"
    title="A new feature available for you! ✨"
    :visible.sync="dialogVisible"
    width="35%"
    :before-close="handleClose"
  >
    <div class="w-full flex flex-row items-start justify-center">
      <div class="w-1/2 mt-5 flex flex-col items-start justify-start">
        <h1 class="text-2xl font-bold text-gray-800 break-normal">
          Multiple user/assignee select
        </h1>
        <span class="w-full text-lg h-full break-normal"
          >Allows you to select multipe users/assignees when creating or
          updating your project or plan.</span
        >
      </div>
      <img
        class="w-1/2 mx-auto my-5 rounded-lg shadow-lg bg-cover aspect-auto"
        src="~/assets/images/multiselect_user.gif"
      />
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    version: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      currentVersion: "three",
      dialogVisible: false,
    };
  },
  created() {
    if (this.version === this.currentVersion) {
      this.dialogVisible = false;
    } else {
      this.dialogVisible = true;
    }
  },
  methods: {
    handleClose(done) {
      console.log("close");
      this.$cookies.set("latestVersion", this.currentVersion);
      this.dialogVisible = false;
      done();
    },
  },
};
</script>

<style>
</style>