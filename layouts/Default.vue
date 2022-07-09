<template>
  <div
    class="
      w-full
      pt-0
      lg:pt-10
      max-h-screen
      overflow-auto
      h-screen
      flex flex-row
      justify-start
      bg-slate-900
      text-white
    "
  >
    <div class="h-screen">
      <el-menu
        default-active="1"
        class="
          el-menu-demo
          z-50
          h-fit
          bottom-0
          w-full
          flex flex-row
          items-center
          justify-center
          md:flex-col md:items-start md:justify-start md:w-16
          shadow-2xl
          md:h-full
          fixed
        "
        mode="horizontal"
        :collapse="true"
        background-color="rgb(71 85 105)"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1" class="w-1/3 md:w-full flex flex-row items-center justify-center">
          <nuxt-link class="w-1/3 md:w-full m-auto md:my-0" to="/">
            <i class="el-icon-pie-chart"></i>
          </nuxt-link>
        </el-menu-item>

          <el-menu-item index="2"  class="w-1/3 md:w-full flex flex-row items-center justify-center">

        <nuxt-link class="w-1/3 md:w-full m-auto md:my-0" to="/ManageProject">
            <i class="el-icon-document"></i>

        </nuxt-link>
          </el-menu-item>

        <el-menu-item
          @click="logOut"
           class="w-1/3 md:w-full flex flex-row items-center justify-center"
          index="3"
        >
          <i class="el-icon-switch-button"></i>
        </el-menu-item>
      </el-menu>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: "Default",

  methods: {
    logOut() {
      this.$confirm("Are you sure you want to log out?", "Log out?", {
        confirmButtonText: "Log out",
        cancelButtonText: "Cancel",
        type: "danger",
      }).then(() => {
        this.$cookies.set("user_id", null);
        this.$router.push("/logout");
      });
    },
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
}
i.el-icon-menu,
i.el-icon-s-order,
i.el-icon-date,
i.el-icon-document {
  color: white;
}
</style>