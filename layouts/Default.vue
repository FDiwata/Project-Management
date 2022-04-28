<template>
  <div class="w-full max-h-screen overflow-auto h-screen flex flex-row justify-start bg-slate-600 text-white">
    <div class="h-screen">
    <el-menu
      default-active="3"
      class="el-menu-demo top-0 shadow-2xl h-full fixed"
      mode="horizontal"
      :collapse="true"
      background-color="rgb(71 85 105)"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <nuxt-link to="/">
        <el-menu-item index="1">
          <i class="el-icon-user"></i>
          <span slot="title" class="text-white font-bold"
            >Welcome User.</span
          >
        </el-menu-item>
      </nuxt-link>
      <nuxt-link to="/">
        <el-menu-item index="3" class="bg-gray-800 hover:bg-slate-800">
          <i class="el-icon-menu"></i>
          <span slot="title" class="text-white hover:font-bold hover:underline"
            >Dashboard</span
          >
        </el-menu-item>
      </nuxt-link>
      <nuxt-link to="/ManageProject">
        <el-menu-item index="4" class="bg-gray-800 hover:bg-slate-800">
          <i class="el-icon-document"></i>
          <span class="text-white hover:font-bold hover:underline" slot="title"
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