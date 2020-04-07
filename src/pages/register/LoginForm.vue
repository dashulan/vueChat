<template>
  <q-card style="width: 300px;" class="bg-white text-dark">
    <q-card-section>
      <q-item class="q-pa-none">
        <q-item-section>
          <div class="text-h6 text-weight-bold">{{ status }}</div>
        </q-item-section>
        <q-space />
        <q-item-section class="col-2">
          <q-btn
            icon="close"
            color="blue-grey-2"
            flat
            round
            @click="closeDialog"
          />
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-section>
      <q-form class="q-gutter-sm">
        <q-input
          outlined
          v-model="user.name"
          placeholder="请输入用户名"
          dense
          maxlength="12"
          error-message="用户名重复"
          :error="!isValid"
          class="q-mt-none"
        />
        <q-input
          outlined
          v-model="user.password"
          placeholder="请输入密码"
          dense
          type="password"
          maxlength="18"
          error-message="用户名重复"
          :error="!isValid"
        />
        <div>
          <q-btn color="primary" label="登录" class="full-width" />
        </div>
      </q-form>
    </q-card-section>
    <q-card-section class="q-py-none row">
      <span>
        没有账号
      </span>
      <span class="text-primary cursor-pointer" @click="handleFormChange"
        >注册</span
      >
      <q-space />
      <span class="text-primary cursor-pointer">
        忘记密码
      </span>
    </q-card-section>
    <q-card-section>
      第三方登录
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        name: "",
        password: "",
      },
      isValid: true,
      status: "登录",
    };
  },
  methods: {
    resetInfo: function () {
      this.user = {
        name: "",
        password: "",
      };
    },
    closeDialog: function () {
      this.resetInfo();
      this.$emit("close");
    },
    handleFormChange: function () {
      this.$emit("change", "Register");
    },
  },
  components: {},
};
</script>

<style scoped lang="sass"></style>
