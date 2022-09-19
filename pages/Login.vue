<template>
  <div class="grid place-items-center h-screen w-full">
    <div
    class="
      p-2
      md:p-5
      w-11/12
      md:w-2/3
      lg:w-1/2
      xl:w-1/4
      m-auto
      md:shadow-lg
      shadow-none
      rounded-lg
      flex flex-col
      items-center
      justify-center
      md:bg-neutral-800
      bg-neutral-900
    "
    @keypress="keyEnter"
  >
    <h1
      class="
        text-4xl
        md:text-4xl
        font-serif
        w-full
        px-1
        md:px-1
        py-5
        text-left
        m-auto
        text-white
      "
    >
      Project Master <i class="el-icon-data-analysis"></i>
    </h1>
    <div @submit="userLogin" class="px-2 w-full m-auto flex flex-col items-center justify-start">
      <div
        class="p-1 w-full flex flex-col items-start md:justify-start"
      >
        <span class="w-32 my-2 md:w-1/8 text-white md:text-md"
          >Username</span
        >
        <el-input
          class="w-full text-md text-black"
          v-model="loginForm.user_name"
          type="text"
        />
      </div>
      <div
        class="p-1 w-full flex flex-col items-start md:justify-start"
      >
        <span class="w-32 my-2 md:w-1/8 text-white md:text-md"
          >Password</span
        >
        <el-input
          class="w-full text-md text-black"
          v-model="loginForm.user_pass"
          type="password"
        />
      </div>
    </div>
    <div
      class="
        px-3
        py-3
        w-full
        m-auto
        flex flex-row
        md:flex-col
        items-center
        md:items-end
        justify-between
        md:justify-center
        space-y-3
      "
    >
      <nuxt-link class="text-blue-400 hover:underline" to="/"
        >Register user</nuxt-link
      >
      <el-button
        class="w-1/2 md:w-1/3 font-bold"
        type="primary"
        @click="userLogin"
        plain
        >Login</el-button
      >
    </div>
  </div>
  </div>

</template>

<script>
export default {
  layout: "Clean",
  data() {
    return {
      loginForm: {
        type: Object,
        default: () => {
          return {
            user_name: "",
            user_pass: "",
          };
        },
      },
    };
  },
  methods: {
    keyEnter(e) {
      e.keyCode === 13 && this.userLogin()
    },
    userLogin() {
      this.$store.dispatch("userLogin", this.loginForm).then((data) => {
        if (data === undefined) {
          this.$message({
            type: "error",
            message: "Unauthorized user ⚠️ Please try again.",
          });
          this.$router.push("/login");
          return;
        }
        this.$notify({
            title: `Welcome ${data.user_name}`,
            message: 'You have successfully log in.'
          });
        this.$cookies.set('user_id', data.user_id)
        this.$router.push("/");
      });
    },
  },

  mounted () {
    
  }
};
</script>

<style>
</style>