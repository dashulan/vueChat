<template>
  <div>
    <input type="text" v-model="userName" />
    <button @click="login">submit</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
  methods: {
    login: function() {
      this.updateProfile({
        userId: "3",
        userName: this.userName,
        avatar: ""
      });
    },
    ...mapActions("tasks", [""])
  }
};
</script>

<style scoped lang="sass"></style>
