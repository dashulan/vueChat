<template>
  <q-toolbar class="bg-grey-3 text-black row">
    <!-- <q-input
      rounded
      outlined
      dense
      class="col-grow q-mr-sm"
      bg-color="white"
      autogrow
      v-model="message"
      @keyup="handleKey"
    /> -->
    <q-input
      rounded
      outlined
      dense
      class="col-grow"
      autogrow
      v-model="message"
      @keyup="handleKey"
    />
    <q-btn round flat icon="send" @click="sendMessage" />
  </q-toolbar>
</template>

<script>
import { mapActions } from "vuex";
import { date } from "quasar";
import { mapGetters } from "vuex";
import { scroll } from "quasar";
export default {
  name: "MessageInput",
  data() {
    return {
      message: ""
    };
  },
  computed: {
    ...mapGetters("tasks", ["profile"])
  },
  methods: {
    ...mapActions("tasks", ["addMessage"]),
    sendMessage() {
      let m = {
        text: [],
        sent: false,
        sentDate: "",
        sentTimeStamp: "",
        sentTime: ""
      };

      let timeStamp = Date.now();
      let sentTimeStamp = date.formatDate(timeStamp, "YYYY-MM-DD HH:mm:ss");
      let sentDate = date.formatDate(timeStamp, "YYYY-MM-DD");
      let sentTime = date.formatDate(timeStamp, "HH:mm:ss");
      m.sentDate = sentDate;
      m.sentTime = sentTime;
      m.sentTimeStamp = sentTimeStamp;
      m.userName = this.profile.userName;
      m.avatar = this.profile.avatar;
      m.text.push(this.message);
      this.addMessage(m);
      this.message = "";
    },
    handleKey(e) {
      if (e.key === "Enter") {
        this.sendMessage();
      }
    }
  },
  components: {}
};
</script>

<style scoped lang="scss"></style>
