<template>
  <q-layout view="lHh lpr lFf">
    <q-header class="bg-grey-2 text-black" elevated>
      <q-toolbar>
        <span class="q-subtitle-1 text-black">哈哈啊哈啊哈</span>
        <q-space />
      </q-toolbar>
    </q-header>
    <q-page-container class="bg-grey-5 WAL__layout">
      <q-page class="bg-red-2" :style-fn="myTweak">
        <q-tab-panels
          v-model="panel"
          animated
          swipeable
          class="bg-white text-blue shadow-2"
          style="min-height: calc(100vh - 100px)"
        >
          <q-tab-panel name="chats" class="q-pa-none">
            <q-list>
              <div v-for="item in conversations" :key="item.id">
                <q-item
                  clickable
                  @click="handleItemClick(item)"
                  class="q-px-sm"
                >
                  <q-item-section top avatar class="q-px-sm">
                    <q-avatar rounded size="48px">
                      <img :src="item.avatar" />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="text-black">{{
                      item.name
                    }}</q-item-label>
                    <q-item-label caption>
                      {{ item.caption }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-badge
                      class="bg-white text-grey-6"
                      :label="item.lastTime"
                    />
                  </q-item-section>
                </q-item>
                <q-separator inset="item" />
              </div>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="mails">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <q-list>
              <q-item clickable>
                <q-item-section>
                  <q-avatar square>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  dddd
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>
                  <q-avatar square>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  dddd
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-page>
    </q-page-container>
    <q-footer class="bg-grey-2">
      <q-toolbar class="text-black">
        <q-tabs
          v-model="panel"
          class="bg-white-3 fixed-bottom"
          align="justify"
          narrow-indicator
        >
          <q-tab name="chats" label="聊天" />
          <q-tab name="mails" label="Mails" />
          <q-tab name="alarms" label="Alarms" />
        </q-tabs>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "",
  data() {
    return {
      panel: "chats",
      conversations: []
    };
  },
  computed: {
    ...mapGetters("tasks", ["profile"])
  },
  methods: {
    myTweak(offset) {
      // "offset" is a Number (pixels) that refers to the total
      // height of header + footer that occupies on screen,
      // based on the QLayout "view" prop configuration

      // this is actually what the default style-fn does in Quasar
      console.log(offset);
      return { minHeight: offset ? `calc(100vh - ${offset}px)` : "100vh" };
    },
    getAllConversations() {
      axios
        .get("/statics/conversations.json")
        .then(this.getAllConversationsSucc)
        .catch(err => console.log("失败"));
      console.log("axois");
    },
    getAllConversationsSucc(res) {
      res = res.data;
      console.log("sss");
      if (res.ret && res.data) {
        const data = res.data;
        this.conversations = data.conversations;
      }
    },
    handleItemClick(item) {
      this.setCurrentConverstation({
        id: item.id,
        title: item.name
      });
      this.$router.push({ path: "/chat" });
      console.log("assss");
    },
    ...mapActions("tasks", ["setCurrentConverstation"])
  },
  components: {},
  mounted() {
    this.getAllConversations();
  }
};
</script>
<style lang="sass">
.WAL
  width: 100%
  height: 100%
  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 100%
    max-width: 950px
</style>
