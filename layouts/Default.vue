<template>
  <div class="w-full pt-0 lg:pt-10 max-h-screen overflow-auto h-screen flex flex-row justify-start bg-slate-800 text-white">
    <div class="h-screen">
    <el-menu
      default-active="3"
      class="el-menu-demo z-50 h-fit bottom-0 w-full flex flex-row items-center justify-center md:flex-col md:items-start md:justify-start md:w-16 shadow-2xl md:h-full fixed"
      mode="horizontal"
      :collapse="true"
      background-color="rgb(71 85 105)"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <nuxt-link class="w-16 md:w-full m-auto md:my-0" to="/">
        <el-menu-item index="1" >
          <i class="el-icon-pie-chart"></i>
          <span slot="title" class="text-white font-bold"
            >Dashboard</span
          >
        </el-menu-item>
      </nuxt-link>

       <nuxt-link class="w-16 md:w-full m-auto md:my-0" to="/ManageProject">
        <el-menu-item index="2" >
          <i class="el-icon-document"></i>
          <span slot="title" class="text-white font-bold"
            >Projects</span
          >
        </el-menu-item>
      </nuxt-link>
    </el-menu>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: "Default",
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