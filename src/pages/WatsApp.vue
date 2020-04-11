<template>
  <div class="WAL position-relative bg-grey-11" :style="style">
    <q-layout view="lHh lpr lFf" class="WAL__layout shadow-3" container>
      <q-header>
        <q-toolbar>
          <q-btn icon="arrow_back_ios" flat dense @click="backHome" />
          <span class="q-subtitle-1">哈哈</span>
          <q-space />
        </q-toolbar>
      </q-header>

      <q-page-container class="bg-grey-11">
        <q-page>
          <chat-window :messageList="messageList" />
        </q-page>
      </q-page-container>

      <q-footer>
        <q-toolbar class="bg-grey-3 text-black row">
          <q-input
            rounded
            outlined
            dense
            class="col-grow"
            autogrow
            v-model="message"
            @keyup.prevent="handleKey"
          />
          <q-btn round flat icon="send" @click="send" />
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
import ChatWindow from "../components/tasks/Chat";
import { date } from "quasar";
import { mapGetters } from "vuex";
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  name: "WhatsappLayout",
  data() {
    return {
      messageList: [],
      connected: false,
      socket: null,
      stompClient: null,
      message: ""
    };
  },
  components: {
    ChatWindow
  },
  computed: {
    style() {
      return {
        height: this.$q.screen.height + "px"
      };
    },
    ...mapGetters("tasks", ["currentConversation"]),
    ...mapGetters("tasks", ["profile"])
  },
  methods: {
    backHome: function() {
      this.$router.go(-1);
    },
    getMessageOfConversation() {
      console.log(this.currentConversation.cid);
      axios
        .get("/api/conversation/" + this.currentConversation.cid)
        .then(this.getConversationSucc);
    },
    getConversationSucc(res) {
      console.log(res.data);
      res = res.data;
      this.messageList = res.data;
    },
    connect() {
      this.socket = new SockJS("http://192.168.1.108:8083/endpoint-websocket");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        frame => {
          console.log(this.profile.userName);
          this.connected = true;
          this.stompClient.subscribe(
            `/conversation/${this.currentConversation.cid}`,
            tick => {
              console.log(tick);
              let msg = JSON.parse(tick.body);
              console.log(msg);
              this.messageList.push(msg);
            }
          );
        },
        error => {
          console.log(error);
          this.connected = false;
        }
      );
    },

    send() {
      if (
        this.stompClient &&
        this.stompClient.connected &&
        this.message !== "" &&
        this.message !== "\n"
      ) {
        let current = Date.now();
        let sent = date.formatDate(current, "YYYY-MM-DD HH:mm:ss");
        const msg = {
          text: this.message,
          uid: this.profile.userId,
          sent: sent,
          conversationId: this.currentConversation.cid
        };
        this.stompClient.send(
          `/app/conversation/${this.currentConversation.cid}`,
          JSON.stringify(msg),
          {}
        );
        this.message = "";
      }
    },

    handleKey: function(e) {
      if (e.key == "Enter") this.send();
    }
  },
  created() {
    this.getMessageOfConversation();
    this.connect();
  }
};
</script>

<style lang="sass">
.WAL
  width: 100%
  height: 100%
  padding-top: 20px
  padding-bottom: 20px
  &:before
    content: ''
    height: 127px
    position: fixed
    top: 0
    width: 100%
    background-color: #009688
  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 90%
    max-width: 950px
    border-radius: 5px
@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0
@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none
</style>
