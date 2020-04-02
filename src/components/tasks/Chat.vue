<template>
  <!-- <q-virtual-scroll ref="virtualListRef" component="q-list">
    <message v-for="(item, key) in tasks" :key="key" :id="key" :item="item">
    </message>
  </q-virtual-scroll> -->
  <q-list ref="MessageList" class="scroll overflow-hidden">
    <message v-for="(item, index) in messageList" :key="index" :item="item" />
  </q-list>
</template>

<script>
import { date } from "quasar";
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  props: {
    messageList: Array
  },
  methods: {
    cacluteTime(sentTime) {
      let current = Date.now();
      // const date = date.extractDate(sentTime, "YYYY-MM-DD HH:mm:ss");
      console.log(sentTime);
      return sentTime;
    }
  },
  components: {
    message: require("./Message").default
  },
  computed: {},
  updated() {}
};
</script>
<style lang="sass"></style>
