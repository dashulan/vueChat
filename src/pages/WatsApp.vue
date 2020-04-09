<template>
  <transition appear enter-active-class="animated fadeIn">
    <div class="WAL position-relative bg-grey-11" :style="style">
      <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
        <q-header>
          <q-toolbar>
            <q-btn icon="arrow_back_ios" flat dense @click="backHome" />
            <span class="q-subtitle-1">{{ name }}</span>
            <q-space />
          </q-toolbar>
        </q-header>

        <q-page-container class="bg-grey-11">
          <chat-window :messageList="messageList" />
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
  </transition>
</template>

<script>
import MessageInput from "../components/tasks/Input";
import ChatWindow from "../components/tasks/Chat";
import ChatHeader from "../components/tasks/ChatHeader";
import { date } from "quasar";
import { mapGetters } from "vuex";
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  name: "WhatsappLayout",
  data() {
    return {
      user: "大树懒",
      messageList: [],
      received_messages: [],

      send_message: null,
      connected: false,
      socket: null,
      stompClient: null,
      message: ""
    };
  },
  props: ["name"],
  components: {
    ChatWindow
    // ChatHeader
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
    inputkeyDownHandle(even) {
      const keyName = even.key;
      if (keyName === "Enter") {
        this.sendMessage();
      }
    },
    sendMessage() {},
    getConversation() {
      let c_id = this.currentConversation.conversationId;
      axios.get("/statics/conversation.json").then(this.getConversationSucc);
    },
    getConversationSucc(res) {
      res = res.data;
      this.messageList = res.data.messages;
    },
    connect() {
      this.socket = new SockJS("http://192.168.1.108:8083/endpoint-websocket");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        frame => {
          console.log(this.profile.userName);
          this.connected = true;
          this.stompClient.subscribe("/conversation/1", tick => {
            let msg = JSON.parse(tick.body);
            this.messageList.push(msg);
          });
        },
        error => {
          console.log(error);
          this.connected = false;
        }
      );
    },
    send() {
      console.log(this.profile.userName);
      console.log("Send message:" + this.message);
      if (
        this.stompClient &&
        this.stompClient.connected &&
        this.message !== ""
      ) {
        let current = Date.now();
        let sent = date.formatDate(current, "YYYY-MM-DD HH:mm:ss");
        const msg = {
          text: [this.message],
          userId: this.profile.userId,
          sent: sent,
          conversationId: "1"
        };
        this.stompClient.send("/app/conversation/1", JSON.stringify(msg), {});
        this.message = "";
      }
    },
    handleKey: function(e) {
      if (e.key == "Enter") this.send();
    }
  },
  mounted() {
    this.getConversation();
    this.connect();
  },
  created() {
    console.log("watsApp.vue create");
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
  &__field.q-field--outlined .q-field__control:before
    border: none
  .q-drawer--standard
    .WAL__drawer-close
      display: none
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
.conversation__summary
  margin-top: 4px
.conversation__more
  margin-top: 0!important
  font-size: 1.4rem
</style>
