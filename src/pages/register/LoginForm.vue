<template>
  <q-card style="width: 300px;" class="bg-white text-dark">
    <Head :status="status" @close="closeDialog" />

    <q-card-section class="q-pa-sm">
      <q-form class="q-gutter-sm">
        <q-input
          outlined
          v-model="user.name"
          placeholder="请输入用户名"
          dense
          maxlength="12"
          error-message="用户不存在"
          :error="userError"
          class="q-mt-none"
        />
        <q-input
          outlined
          v-model="user.password"
          placeholder="请输入密码"
          dense
          :type="isPwd ? 'password' : 'text'"
          maxlength="18"
          error-message="密码错误"
          :error="pwdError"
          class="q-mt-none"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="q-mt-none">
          <q-btn
            color="primary"
            @click="doLogin"
            label="登录"
            class="full-width"
          />
        </div>
      </q-form>
    </q-card-section>
    <q-card-section class="q-py-none row">
      <span>
        没有账号？
      </span>
      <span
        class="text-primary cursor-pointer q-ml-sm"
        @click="handleFormChange"
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
import { mapActions } from "vuex";
import axios from "axios";
import Head from "../authCompoents/CardHeadSection";
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
      pwdError: false,
      userError: false,
      isPwd: true,
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
    doLogin: function () {
      axios.post("/api/auth/login", this.user).then((res) => {
        if (res.data === "登录成功") {
          this.updateProfile({
            userName: this.user.name,
          });
          this.$router.push("home");
        } else if (res.data === "密码错误") {
          this.pwdError = true;
        } else if (res.data === "用户不存在") {
          this.userError = true;
        }
      });
    },
    ...mapActions("tasks", ["updateProfile"]),
  },
  components: {
    Head,
  },
};
</script>

<style scoped lang="sass"></style>
