<template>
  <div class="WAL position-relative bg-grey-11" :style="style">
    <q-layout view="lHh lpr lFf" class="WAL__layout shadow-3" container>
      <q-header>
        <q-toolbar>
          <span class="q-subtitle-1 text-black">{{ profile.userName }}</span>
          <q-space />
          <q-btn flat>
            <q-icon name="control_point" :size="'sm'" />

            <q-menu>
              <q-list style="min-width: 100px;" class="bg-grey-10 text-white">
                <q-item clickable v-close-popup @click="addFriend = true">
                  <q-item-section>加好友</q-item-section>
                </q-item>
                <q-separator dark />
                <q-item clickable v-close-popup>
                  <q-item-section>群聊</q-item-section>
                </q-item>
                <q-separator dark />
                <q-item clickable v-close-popup>
                  <q-item-section>帮助</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-dialog v-model="addFriend" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar
                  icon="signal_wifi_off"
                  color="primary"
                  text-color="white"
                />
                <span class="q-ml-sm"
                  >You are currently not connected to any network.</span
                >
                <input type="text" v-model="name" />
                <button @click="searchUser">搜索</button>
              </q-card-section>
              <q-card-section v-if="showInfo">
                <div>信息</div>
                <div><q-btn label="添加好友" @click="addUser" /></div>
              </q-card-section>
              <q-card-section v-else>
                {{ searchMessage }}
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="关闭" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-toolbar>
      </q-header>
      <q-page-container class="bg-grey-5">
        <q-page class="bg-red-2">
          <q-tab-panels
            v-model="panel"
            animated
            swipeable
            keep-alive
            class="bg-white text-blue shadow-2"
            style="min-height: calc(100vh - 100px);"
          >
            <q-tab-panel name="chats" class="q-pa-none">
              <q-virtual-scroll
                style="max-height: calc(100vh - 100px);"
                :items="heavyList"
              >
                <template v-slot="{ item, index }">
                  <q-item :key="index" clickable @click="handleItemClick(item)">
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ item.name }}</q-item-label>
                      <q-item-label caption lines="2">
                        {{ item.caption }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side top>
                      <q-item-label caption>{{ item.time }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced inset="item" />
                </template>
              </q-virtual-scroll>
            </q-tab-panel>

            <q-tab-panel name="mails">
              <q-virtual-scroll
                style="max-height: calc(100vh - 100px);"
                :items="friends"
              >
                <template v-slot="{ item, index }">
                  <q-item :key="index" clickable @click="handleItemClick(item)">
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ item.id }}</q-item-label>
                      <q-item-label caption lines="2">
                        {{ item.name }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side top>
                      <q-item-label caption>{{ item.id }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced inset="item" />
                </template>
              </q-virtual-scroll>
            </q-tab-panel>

            <q-tab-panel name="alarms"> </q-tab-panel>
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
            <q-tab name="mails" label="Mails" @click="getAllfriends" />
            <q-tab name="alarms" label="Alarms" />
          </q-tabs>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
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
      conversations: [],
      heavyList: [
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        ,
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        ,
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        },
        {
          label: "Option ",
          name: "用户",
          caption: "说点什么",
          time: "上午"
        }
      ],
      addFriend: false,
      showInfo: false,
      searchMessage: "",
      name: "",
      userId: "",
      friends: []
    };
  },
  computed: {
    ...mapGetters("tasks", ["profile"]),
    style() {
      return {
        height: this.$q.screen.height + "px"
      };
    }
  },
  methods: {
    getAllfriends: function() {
      axios.get("/api/user/friends/" + this.profile.userName).then(res => {
        this.friends = res.data.data;
      });
    },
    searchUser: function() {
      axios
        .get("/api/user/find/" + this.name)
        .then(res => {
          if (res.data === "用户不存在") {
            this.showInfo = false;
            this.searchMessage = res.data;
          } else {
            this.userId = res.data.data;
            this.showInfo = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addUser: function() {
      axios
        .get(`/api/user/add/${this.profile.userId}/${this.userId}`)
        .then(res => {
          console.log(res);
        });
    },
    myTweak(offset) {
      console.log(offset);
      return { minHeight: offset ? `calc(100vh - ${offset}px)` : "100vh" };
    },
    getAllConversations() {
      axios
        .get("http://localhost:8083/conversation/id")
        // .get("/statics/conversations.json")
        .then(this.getAllConversationsSucc)
        .catch(err => console.log("失败"));
      console.log("axois");
    },
    getAllConversationsSucc(res) {
      console.log(res);
    },
    async handleItemClick(item) {
      await this.establishConversation(item);
      this.$router.push({ name: "chat" });
    },
    async establishConversation(item) {
      let res = await axios.get(
        `/api/conversation/establish/${this.profile.userId}/${item.id}`
      );
      res = res.data;
      let cid = res.data[0];
      console.log(cid);
      this.setCurrentConverstation({
        cid: cid
      });

      // axios
      //   .get(`/api/conversation/establish/${this.profile.userId}/${item.id}`)
      //   .then(res => {
      //     console.log(res);
      //     res = res.data;
      //     let cid = res.data.conversationId;
      //     this.setCurrentConverstation({
      //       id: cid
      //     });
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    ...mapActions("tasks", ["setCurrentConverstation"])
  },
  components: {}
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
