<template>
  <div class="container">
    <q-item v-touch-hold:1000.mouse="fireSomething">
      <q-item-section>
        <q-chat-message :text="item.text" :sent="show" :stamp="stamp" />
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
  props: ["item"],
  data() {
    return {};
  },
  methods: {
    ...mapActions("tasks", ["updateTask"]),
    fireSomething() {
      console.log(getScrollHeight(this.$refs.MessageList));
    }
  },
  computed: {
    stamp() {
      let stamp = "";
      let current = Date.now();
      let cs = date.formatDate(current, "X");

      let sent = date.extractDate(this.item.sent, "YYYY-MM-DD HH:mm:ss");
      let sent2 = date.formatDate(sent, "X");

      let min = Math.round((cs - sent2) / 60);
      if (min > 60) {
        let hour = Math.round(min / 60);
        stamp = hour + " hour";
        if (hour > 24) {
          let day = Math.round(hour / 24);
          stamp = day + " day";
        }
        return stamp + " ago";
      } else {
        return stamp;
      }
    },
    ...mapGetters("tasks", ["profile"]),
    show() {
      return this.item.userId == this.profile.userId;
    }
  }
};
</script>

<style scoped lang="sass"></style>
