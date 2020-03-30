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
          :stamp="stamp + ' age'"
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
      let stamp;
      let current = Date.now();
      console.log(date.formatDate(current, "YYYY-MM-DD HH:mm:ss"));
      let cs = date.formatDate(current, "X");
      let sent = date.extractDate(
        this.item.sentTimeStamp,
        "YYYY-MM-DD HH:mm:ss"
      );
      let sent2 = date.formatDate(sent, "X");
      console.log(cs);
      console.log(sent2);
      console.log("=======");
      let min = Math.round((cs - sent2) / 60);
      stamp = min + " min";
      if (min > 60) {
        let hour = Math.round(min / 60);
        stamp = hour + " hour";
        if (hour > 24) {
          let day = Math.round(hour / 24);
          stamp = day + " day";
        }
      }
      return stamp;
    },
    ...mapGetters("tasks", ["profile"])
  }
};
</script>

<style scoped lang="sass"></style>
