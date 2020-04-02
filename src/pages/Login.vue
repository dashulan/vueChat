<template>
  <div>
    <input type="text" v-model="userName" />
    <input type="text" v-model="userId" />
    <button @click="login">submit</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "",
  data() {
    return {
      userName: "",
      userId: 0
    };
  },
  components: {},
  methods: {
    login: function() {
      console.log("login");
      this.updateProfile({
        userId: this.userId,
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
