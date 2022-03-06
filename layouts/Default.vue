<template>
  <div class="w-full h-screen flex flex-row items-center justify-start">
    <el-menu
      default-active="2"
      class="w-1/6 h-screen shadow-2xl"
      :collapse="false"
    >
      <nuxt-link to="/">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">Dashboard</span>
        </el-menu-item>
      </nuxt-link>
       <nuxt-link to="/ManageProject">
        <el-menu-item index="2">
          <i class="el-icon-s-order"></i>
          <span slot="title">Manage Projects</span>
        </el-menu-item>
      </nuxt-link>
       <nuxt-link to="/ManagePlan">
        <el-menu-item index="3">
          <i class="el-icon-date"></i>
          <span slot="title">Manage Plans</span>
        </el-menu-item>
      </nuxt-link>
       <nuxt-link to="/ManageSubtask">
        <el-menu-item index="4">
          <i class="el-icon-document"></i>
          <span slot="title">Manage Subtasks</span>
        </el-menu-item>
      </nuxt-link>
    </el-menu>
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
</style>