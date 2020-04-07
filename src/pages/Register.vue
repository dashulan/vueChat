<template>
  <q-layout view="hHh lpr fFf">
    <q-header class="bg-primary text-white" reveal>
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <q-btn label="Click me" color="primary" @click="persistent = true" />

        <q-dialog
          v-model="persistent"
          persistent
          transition-show="scale"
          transition-hide="scale"
        >
          <!-- <q-card class="bg-white text-white" style="width: 300px;">
            <q-card-section>
              <q-item class="q-pa-none">
                <q-item-section>
                  <div class="text-h6 text-dark text-weight-bold">注册</div>
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
                  :dense="dense"
                  type="password"
                  maxlength="18"
                  error-message="用户名重复"
                  :error="!isValid"
                />
                <div>
                  <q-btn color="primary" label="注册" class="full-width" />
                </div>
              </q-form>
            </q-card-section>
            <q-item class="text-dark">
              <q-tiem-section>
                <q-tiem-label>
                  <q-item
                    class="q-pa-none"
                    clickable
                    dense
                    style="height: 100%;"
                    >已有账号登录</q-item
                  >
                </q-tiem-label>
              </q-tiem-section>
            </q-item>
          </q-card> -->

          <component
            :is="currentComponent"
            @close="persistent = !persistent"
            @change="changeForm"
          >
          </component>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
import Register from "./register/Reg.vue";
import Login from "./register/LoginForm.vue";
export default {
  data() {
    return {
      accept: false,
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
      currentComponent: "Register",
    };
  },
  computed: {
    ifjustify() {
      return this.user.phone.length >= 11;
    },
    isValid() {
      return this.user.name.length <= 5;
    },
  },
  methods: {
    suggestName: function (e) {
      axios
        .get("/api/auth/suggest?name=" + this.user.name)
        .then(this.JudgeName)
        .catch(function (error) {
          console.log(error);
        });
    },
    JudgeName: function (res) {
      let data = res.data;
      if (res.status) {
        if (data.status !== "OK") {
          this.nameError = true;
          this.nameE = data.status;
        } else {
          this.nameError = false;
          this.nameE = "";
        }
      }
    },
    onSubmit: function () {
      axios
        .post("/api/auth/register", this.user)
        .then(function (res) {
          let data = res.data;
          if (data.status === "SUCCESS") {
            alert("注册成功");
          } else {
            alert("注册失败");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
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
      this.persistent = false;
    },
    changeForm: function (e) {
      this.currentComponent = e;
    },
  },
  components: {
    Register,
    Login,
  },
};
</script>

<style lang="sass" scoped>
.my-card
  max-width: 660px
  margin-top: 100px
</style>
