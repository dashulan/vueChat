<template>
  <transition-group
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <!-- We wrap a "p" tag and a QBtn -->

    <!-- Wrapping only one DOM element, defined by QBtn -->
    <div class="WAL position-relative bg-grey-11" :style="style">
      <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
        <q-header>
          <chat-header :user="'猪猪'" />
        </q-header>

        <q-page-container class="bg-grey-11">
          <chat-window />
        </q-page-container>

        <q-footer>
          <message-input />
        </q-footer>
      </q-layout>
    </div>
  </transition-group>
</template>

<script>
import MessageInput from "./tasks/Input";
import ChatWindow from "./tasks/Chat";
import ChatHeader from "./tasks/ChatHeader";
import { date } from "quasar";
import { mapGetters } from "vuex";

export default {
  name: "WhatsappLayout",
  props: ["conversations"],
  data() {
    return {
      user: "大树懒"
    };
  },
  components: {
    ChatWindow,
    MessageInput,
    ChatHeader
  },
  computed: {
    currentConversation() {
      return this.conversations[this.currentConversationIndex];
    },
    style() {
      return {
        height: this.$q.screen.height + "px"
      };
    },
    // messageList() {
    //   return this.$store.getters["tasks/tasks"];
    // }
    // 等同于 简写方式
    ...mapGetters("tasks", ["tasks"])
  },
  methods: {
    inputkeyDownHandle(even) {
      const keyName = even.key;
      if (keyName === "Enter") {
        this.sendMessage();
      }
    },
    sendMessage() {}
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
