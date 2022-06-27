<template>
  <div
    class="
      p-2
      md:p-5
      mt-32
      w-11/12
      md:w-2/3
      lg:w-1/2
      xl:w-1/4
      m-auto
      shadow-lg
      rounded-lg
      flex flex-col
      items-center
      justify-center
      bg-slate-700
    "
  >
    <h1
      class="
        text-4xl
        md:text-5xl
        font-black
        w-full
        px-1
        md:px-1
        py-5
        text-left
        m-auto
        text-white
      "
    >
      Project Master
    </h1>
    <div class="px-2 w-full m-auto flex flex-col items-center justify-start">
      <div
        class="p-1 md:space-x-2 w-full flex flex-col md:flex-row items-start md:items-center justify-center md:justify-start"
      >
        <span class="font-semibold w-1/3 md:w-1/8 text-white md:text-xl"
          >Username</span
        >
        <el-input
          class="w-full md:w-5/6 text-lg text-black"
          v-model="loginForm.user_name"
          type="text"
        />
      </div>
      <div
        class="p-1 md:space-x-2 w-full flex flex-col md:flex-row items-start md:items-center justify-center md:justify-start"
      >
        <span class="font-semibold w-1/3 md:w-1/8 text-white md:text-xl"
          >Password</span
        >
        <el-input
          class="w-full md:w-5/6 text-lg text-black"
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
</template>

<script>
export default {
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
        this.$router.push("/");
      });
    },
  },
};
</script>

<style>
</style>