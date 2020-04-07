<template>
  <q-card class="bg-white text-dark" style="width: 300px;">
    <q-card-section>
      <q-item class="q-pa-none">
        <q-item-section>
          <div class="text-h6 text-dark text-weight-bold">{{ status }}</div>
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

    <q-card-section class="q-pa-none">
      <q-form class="q-gutter-sm q-pa-sm">
        <q-input
          outlined
          v-model="user.name"
          placeholder="请输入用户名"
          :dense="dense"
          maxlength="12"
          error-message="用户名重复"
          :error="!isValid"
          class="q-mt-none"
        />
        <q-input
          outlined
          v-model="user.phone"
          placeholder="请输入手机号"
          :dense="dense"
          maxlength="11"
          error-message="用户名重复"
          :error="!isValid"
          class="q-mt-none"
        />
        <q-input
          v-if="ifjustify"
          outlined
          v-model="justify"
          placeholder="手机验证码"
          :dense="dense"
          maxlength="6"
          error-message="用户名重复"
          :error="!isValid"
          class="q-mt-none"
        >
          <template v-slot:append>
            <q-btn
              label="获取验证码"
              @click="getVerifyCode"
              flat
              color="primary"
            />
          </template>
        </q-input>

        <q-input
          outlined
          v-model="user.password"
          placeholder="请输入密码(不少于6位)"
          dense
          type="password"
          maxlength="18"
          error-message="用户名重复"
          :error="!isValid"
          class="q-mt-none"
        />
        <div class="q-mt-none">
          <q-btn color="primary" label="注册" class="full-width" />
        </div>
      </q-form>
    </q-card-section>
    <q-item>
      <div @click="handleFormChange" class="col-4 text-primary cursor-pointer">
        已有账号登录
      </div>
    </q-item>
  </q-card>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      user: {
        name: "",
        phone: "",
        password: "",
      },
      persistent: false,
      nameE: "asdf",
      nameError: false,
      isPwd: false,
      dense: true,
      justify: "",
      status: "注册",
    };
  },
  methods: {
    getVerifyCode: function () {
      console.log("验证码是:123456");
    },
    resetInfo: function () {
      this.user = {
        name: "",
        phone: "",
        password: "",
      };
      this.justify = "";
    },
    closeDialog: function () {
      this.resetInfo();
      this.$emit("close");
    },
    handleFormChange: function () {
      this.$emit("change", "Login");
    },
  },
  computed: {
    ifjustify() {
      return this.user.phone.length >= 11;
    },
    isValid() {
      return this.user.name.length <= 5;
    },
  },
  components: {},
};
</script>

<style scoped lang="sass"></style>
