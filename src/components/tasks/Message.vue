<template>
  <div class="container">
    <q-item>
      <q-item-section>
        <q-chat-message :sent="show" :stamp="stamp">
          {{ item.text }}
        </q-chat-message>
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
      console.log(sent);
      let sent2 = date.formatDate(sent, "X");

      let min = Math.round((cs - sent2) / 60);
      if (min == 0) return stamp;
      if (min > 60) {
        let hour = Math.round(min / 60);
        stamp = hour + " 小时";
        if (hour > 24) {
          let day = Math.round(hour / 24);
          stamp = day + " 天";
        }
        return stamp + " 前";
      } else {
        return min + " 分钟前";
      }
    },
    ...mapGetters("tasks", ["profile"]),
    show() {
      return this.item.uid == this.profile.userId;
    }
  }
};
</script>

<style scoped lang="sass"></style>
