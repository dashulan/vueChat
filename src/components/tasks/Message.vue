<template>
  <div class="container">
    <q-item
      @click="updateTask({ id: id, updates: { sent: !item.sent } })"
      v-touch-hold:1000.mouse="fireSomething"
    >
      <q-item-section>
        <q-chat-message
          :avatar="item.avatar"
          :text="item.text"
          :sent="item.userName === profile.userName"
        />
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { date } from "quasar";
import { scroll } from "quasar";
const { getScrollHeight } = scroll;
export default {
  props: ["item", "id"],
  data() {
    return {
      show: false
    };
  },
  methods: {
    ...mapActions("tasks", ["updateTask"]),
    fireSomething() {
      console.log(getScrollHeight(this.$refs.MessageList));
    }
  },
  computed: {
    stamp() {
      let current = Date.now();
      let cs = date.formatDate(current, "ss");
      console.log(cs);
      let sent = date.extractDate(this.item.sentTimeStamp, "ss");
      console.log(sent);
      return cs - sent;
    },
    ...mapGetters("tasks", ["profile"])
  }
};
</script>

<style scoped lang="sass"></style>
