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
        <q-card class=" my-card q-gutter-md">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="user.name"
              label="Your name *"
              hint="Name and surname"
              lazy-rules
              name="userName"
              :rules="[
                val => (val && val.length > 0) || 'Please type something'
              ]"
              @blur="suggestName"
              :error-message="nameE"
              :error="nameError"
            />
            <q-input
              v-model="user.password"
              filled
              :type="isPwd ? 'password' : 'text'"
              hint="Password with toggle"
              name="password"
              :rules="[v => /^[\w]{6,12}$/.test(v) || '密码为数字和字母组合']"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-card-section>
              <q-toggle
                v-model="accept"
                label="I accept the license and terms"
              />
            </q-card-section>
            <q-card-sectinos align="center">
              <q-btn type="submit" flat>创建</q-btn>
            </q-card-sectinos>
          </q-form>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      accept: false,
      user: {
        name: "",
        password: ""
      },
      nameE: "asdf",
      nameError: false,
      isPwd: false
    };
  },
  methods: {
    suggestName: function(e) {
      axios
        .get("/api/auth/suggest?name=" + this.user.name)
        .then(this.JudgeName)
        .catch(function(error) {
          console.log(error);
        });
    },
    JudgeName: function(res) {
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
    onSubmit: function() {
      axios
        .post("/api/auth/register", this.user)
        .then(function(res) {
          let data = res.data;
          if (data.status === "SUCCESS") {
            alert("注册成功");
          } else {
            alert("注册失败");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="sass" scoped>
.my-card
  max-width: 660px
  margin-top: 100px
</style>
