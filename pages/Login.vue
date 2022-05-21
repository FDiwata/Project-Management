<template>
  <div class="m-auto">
    <div class="p-5 mt-32 w-1/3 m-auto shadow-lg rounded-lg flex flex-col items-center justify-center bg-slate-700">
      <h1 class="text-5xl font-black w-full px-6 py-5 text-left m-auto text-white">Project Master</h1>
      <div class="px-5 w-full m-auto flex flex-col items-center justify-start">
        <div class="p-3 w-full flex flex-row items-center justify-between">
          <span class="font-semibold w-1/3 text-white">Username</span>
          <el-input v-model="loginForm.user_name" type="text" />
        </div>
        <div class="px-3 w-full flex flex-row items-center justify-between">
          <span class="font-semibold w-1/3 text-white">Password</span>
          <el-input v-model="loginForm.user_pass" type="password" />
        </div>
      </div>
      <div class="px-8 py-3 w-full m-auto flex flex-col items-end justify-center space-y-3"> 
          <el-button class="w-1/2 font-bold" type="primary" plain>Login</el-button>
          <nuxt-link class="text-blue-400 hover:underline" to="/">Register user</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            loginForm: {
                type: Object,
                default: () => {
                    return {
                        user_name: '',
                        user_pass: ''
                    }
                }
            }
        }
    },
    methods: {
        userLogin () {
            
        }
    }
};
</script>

<style>
</style>