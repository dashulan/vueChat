import { uid } from "quasar";
import Vue from "vue";

const state = {
  tasks: {
    ID1: {
      avatar: "https://cdn.quasar.dev/team/razvan_stoenescu.jpeg",
      userName: "haha",
      text: ["哈哈哈哈"],
      sent: true,
      sentTimeStamp: "2020-03-26 23:54:58",
      sentDate: "",
      sentTime: ""
    },
    ID2: {
      avatar: "https://cdn.quasar.dev/team/dan_popescu.jpg",
      userName: "大树懒",
      text: ["哈哈哈哈"],
      sent: true,
      sentTimeStamp: "2020-03-26 23:54:58",
      sentDate: "",
      sentTime: ""
    },
    ID3: {
      avatar: "../statics/city.jpg",
      userName: "猪猪",
      text: ["哈哈哈哈"],
      sent: true,
      sentTimeStamp: "2020-03-30 15:35:38",
      sentDate: "",
      sentTime: ""
    }
  },
  profile: {
    userId: 0,
    userName: "",
    avatar: ""
  },
  currentConversation: {
    name: "",
    cid: ""
  }
};

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  addMessage(state, payload) {
    Vue.set(state.tasks, payload.id, payload.message);
  },
  setCurrentConverstation(state, payload) {
    // console.log(payload);
    // console.log(state.currentConversation);
    Object.assign(state.currentConversation, payload);
  },
  updateProfile(state, payload) {
    Object.assign(state.profile, payload);
  }
};

const actions = {
  updateTask({ commit }, payload) {
    commit("updateTask", payload);
  },
  addMessage({ commit }, message) {
    let messagId = uid();
    let payload = {
      id: messagId,
      message: message
    };
    commit("addMessage", payload);
  },
  setCurrentConverstation({ commit }, conversation) {
    let payload = {
      name: conversation.name,
      cid: conversation.cid
    };
    commit("setCurrentConverstation", payload);
  },
  updateProfile({ commit }, profile) {
    let payload = {
      userId: profile.userId,
      userName: profile.userName,
      avatar: profile.avatar
    };
    commit("updateProfile", payload);
  }
};

const getters = {
  tasks: state => {
    return state.tasks;
  },
  profile: state => {
    return state.profile;
  },
  currentConversation: state => {
    return state.currentConversation;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
