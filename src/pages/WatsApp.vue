<template>
  <transition appear enter-active-class="animated fadeIn">
    <div class="WAL position-relative bg-grey-11" :style="style">
      <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
        <q-header>
          <chat-header :user="currentConversation.title" />
        </q-header>

        <q-page-container class="bg-grey-11">
          <chat-window />
        </q-page-container>

        <q-footer>
          <message-input />
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

export default {
  name: "WhatsappLayout",
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
    style() {
      return {
        height: this.$q.screen.height + "px"
      };
    },
    // messageList() {
    //   return this.$store.getters["tasks/tasks"];
    // }
    // 等同于 简写方式
    ...mapGetters("tasks", ["tasks"]),
    ...mapGetters("tasks", ["currentConversation"])
  },
  methods: {
    inputkeyDownHandle(even) {
      const keyName = even.key;
      if (keyName === "Enter") {
        this.sendMessage();
      }
    },
    sendMessage() {}
  },
  mounted() {
    console.log(this.currentConversation);
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
