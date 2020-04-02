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
    return {
      userName: ""
    };
  },
  components: {},
  methods: {
    login: function() {
      console.log("login");
      this.updateProfile({
        userId: "5",
        userName: this.userName,
        avatar: ""
      });
      this.$router.push("chat");
    },
    ...mapActions("tasks", ["updateProfile"])
  }
};
</script>

<style scoped lang="sass"></style>
