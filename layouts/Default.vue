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
      bg-neutral-900
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
        background-color="#313131"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <nuxt-link class="w-1/3 md:w-full flex flex-row items-center justify-center m-auto md:my-0" to="/">
          <el-menu-item
            index="1"
            class="w-full flex flex-row items-center justify-center md:w-full"
          >
            <i class="el-icon-pie-chart ml-1 transform hover:scale-125"></i>
          </el-menu-item>
        </nuxt-link>

        <nuxt-link class="w-1/3 md:w-full flex flex-row items-center justify-center m-auto md:my-0" to="/ManageProject">
          <el-menu-item
            index="2"
            class="w-full flex flex-row items-center justify-center md:w-full"
          >
            <i class="el-icon-document ml-1 transform hover:scale-125"></i>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link class="w-1/3 md:w-full flex flex-row items-center justify-center m-auto md:my-0" to="/ManageUsers">
          <el-menu-item
            index="3"
            class="w-full flex flex-row items-center justify-center md:w-full"
          >
            <i class="el-icon-user ml-1 transform hover:scale-125"></i>
          </el-menu-item>
        </nuxt-link>

        <el-menu-item
          @click="logOut"
          class="w-1/3 md:w-full flex flex-row items-center justify-center"
          index="4"
        >
          <i class="el-icon-switch-button transform hover:scale-125"></i>
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