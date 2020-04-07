<template>
  <q-card class="bg-white text-dark" style="width: 300px;">
    <!-- <q-card-section>
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
    </q-card-section> -->
    <Head :status="status" @close="closeDialog" />

    <q-card-section class="q-pa-sm">
      <q-form class="q-gutter-sm">
        <q-input
          outlined
          v-model="user.name"
          placeholder="请输入用户名"
          :dense="dense"
          maxlength="12"
          :rules="[suggestName]"
          class="q-mt-none"
          debounce="500"
        />
        <q-input
          ref="phoneInput"
          outlined
          v-model="user.phone"
          placeholder="请输入手机号"
          :dense="dense"
          maxlength="11"
          :rules="[
            (val) => /^[1]([3-9=])[0-9]{9}/.test(val) || '请输入正确格式手机号',
          ]"
          class="q-mt-none"
          debounce="500"
        />

        <q-input
          v-if="ifjustify"
          outlined
          v-model="justifyCode"
          placeholder="手机验证码"
          :dense="dense"
          maxlength="6"
          error-message="验证码错误"
          :error="codeError"
          class="q-mt-none"
        >
          <template v-slot:append>
            <q-btn
              :disable="disable"
              :label="justifyInfo"
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
          :type="isPwd ? 'password' : 'text'"
          maxlength="18"
          :rules="[(val) => val.length >= 6 || '密码太短了']"
          class="q-mt-none"
          lazy-rules
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
            label="注册"
            @click="doRegister"
            class="full-width"
          />
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
import { mapActions } from "vuex";
import axios from "axios";
import Head from "../authCompoents/CardHeadSection";
export default {
  name: "",
  data() {
    return {
      user: {
        name: "",
        phone: "",
        password: "",
      },
      codeError: false,
      isPwd: true,
      dense: true,
      justifyCode: "",
      status: "注册",
      disable: false,
      count: 60,
      phoneMessage: "",
      phoneError: false,
    };
  },
  methods: {
    disableGetCode: function () {
      this.disable = true;
      this.codeError = false;
      let self = this;
      let interval = setInterval(function () {
        self.count--;
        if (self.count == 0) {
          clearInterval(interval);
          self.count = 60;
          self.disable = false;
        }
      }, 1000);
      return interval;
    },
    getVerifyCode: function () {
      axios
        .get("/api/auth/code?phone=" + this.user.phone)
        .then((res) => {
          if (res.data === "手机号已被使用") {
            this.$refs.phoneInput.innerErrorMessage = res.data;
            this.$refs.phoneInput.innerError = true;
          } else if (res.data === "请确认") {
            this.disableGetCode();
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
    suggestName: function (val) {
      if (val.length <= 0) {
        return "用户名不能为空";
      }
      return new Promise((resolve, reject) => {
        axios
          .get("/api/auth/suggest?name=" + this.user.name)
          .then((res) => {
            if (res.data.status === "OK") {
              resolve(true);
            } else if (res.data.status === "REPEAT") {
              resolve("用户名已被注册");
            } else {
              resolve(false);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    },
    doRegister: function () {
      axios
        .post("/api/auth/active", {
          phone: this.user.phone,
          code: this.justifyCode,
          name: this.user.name,
          password: this.user.password,
        })
        .then((res) => {
          if (res.data === "注册成功") {
            this.handleFormChange();
          } else {
            this.codeError = true;
          }
        });
    },
    ...mapActions("tasks", ["updateProfile"]),
  },
  computed: {
    ifjustify() {
      return this.user.phone.length >= 11;
    },
    isValid() {
      return this.user.name.length <= 5;
    },
    justifyInfo() {
      if (this.count == 60) {
        return "获取验证码";
      } else {
        return this.count + "秒后重新发送";
      }
    },
  },

  components: {
    Head,
  },
};
</script>

<style scoped lang="sass"></style>
