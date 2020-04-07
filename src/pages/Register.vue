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
import Register from "./register/RegisterForm.vue";
import Login from "./register/LoginForm.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      persistent: false,
      currentComponent: "Register",
    };
  },
  computed: {},
  methods: {
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
