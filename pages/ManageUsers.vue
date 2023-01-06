<template>
  <div class="w-5/6 m-auto h-full shadow rounded p-5 pb-16 mb-10">
    <h1 class="text-2xl font-bold text-white mb-5">Manage users</h1>
    <div class="w-full h-fit flex flex-row items-start justify-start space-x-3">
      <el-form ref="form" :model="form" class="w-full m-auto">
        <div
          class="
            w-full
            mb-5
            grid grid-flow-row-dense grid-cols-1 grid-rows-6
            md:grid-cols-2 md:grid-rows-3
            lg:grid-cols-3 lg:grid-rows-2
            gap-5
          "
        >
          <div class="my-2" :key="item.key" v-for="item in Object.keys(form)">
            <span :class="`${isFormValid === {} || isFormValid[item] ? 'text-neutral-200' : 'text-red-400' }`">{{ item.split("_").join(" ") }}</span>
            <el-input v-model="form[item]"></el-input>
          </div>
        </div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Add user</el-button>
          <el-button>Clear</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  layout: "Default",
  data() {
    return {
      form: {
        user_id: "",
        first_name: "",
        last_name: "",
        user_name: "",
        user_pass: "",
        user_confirm_pass: "",
      },
      isFormValid: {}
    };
  },
  methods: {
    async onSubmit() {
      if (Object.values(this.isFormDataValid()).includes(false)) {
        this.$message.error({
          message: "Please complete the fields above.",
        });
        this.isFormValid = this.isFormDataValid()
        return;
      } else if (this.form.user_pass !== this.form.user_confirm_pass) {
        this.$message.error({
          message: "Passwords do not match. Please try again.",
        });
        return;
      }
      const submitData = this.form;
      delete submitData.user_confirm_pass;
      await this.$store
        .dispatch("userRegister", submitData)
        .then(() => {
          this.$message({
            message: `Successfully Added user: ${this.form.user_name}`,
            type: "success",
          });
          this.form = {
            user_id: "",
            first_name: "",
            last_name: "",
            user_name: "",
            user_pass: "",
            user_confirm_pass: "",
          };
        })
        .catch(() => {
          this.$message.error({
            message: "Cannot add user.",
          });
        });
    },

    isFormDataValid () {
        let returnObj = {}
        Object.keys(this.form).forEach((item) => {
            returnObj[item] = this.form[item].trim().length > 0
        })
        return returnObj
    }
  }
};
</script>

<style>
</style>