<template>
  <div class="w-full h-screen flex flex-row items-center justify-start bg-gray-400 text-white">
    <el-menu
      default-active="2"
      class="w-1/6 h-screen shadow-2xl bg-gray-800"
      :collapse="false"
       background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <nuxt-link to="/">
        <el-menu-item index="1" class="bg-gray-800 hover:bg-slate-800">
          <i class="el-icon-menu"></i>
          <span slot="title" class="text-white hover:font-bold hover:underline">Dashboard</span>
        </el-menu-item>
      </nuxt-link>
       <nuxt-link to="/ManageProject" >
        <el-menu-item index="3" class="bg-gray-800 hover:bg-slate-800">
          <i class="el-icon-document"></i>
          <span class="text-white hover:font-bold hover:underline" slot="title">Manage Projects</span>
        </el-menu-item>
      </nuxt-link>
       <nuxt-link to="/ManagePlan">
        <el-menu-item index="4" class="bg-gray-800 hover:bg-slate-800">
          <i class="el-icon-date"></i>
          <span class="text-white hover:font-bold hover:underline" slot="title">Manage Plans</span>
        </el-menu-item>
      </nuxt-link>
       <nuxt-link to="/ManageSubtask">
        <el-menu-item index="5" class="bg-gray-800 hover:bg-slate-800">
          <i class="el-icon-document"></i>
          <span class="text-white hover:font-bold hover:underline" slot="title">Manage Subtasks</span>
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
i.el-icon-menu, i.el-icon-s-order, i.el-icon-date, i.el-icon-document{
 color: white; 
}
</style>