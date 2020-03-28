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
      sentTimeStamp: "2020-03-26 23:54:58",
      sentDate: "",
      sentTime: ""
    }
  },
  profile: {
    userName: "大树懒",
    avatar: "img/city.jpg"
  }
};

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  addMessage(state, payload) {
    Vue.set(state.tasks, payload.id, payload.message);
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
  }
};

const getters = {
  tasks: state => {
    return state.tasks;
  },
  profile: state => {
    return state.profile;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
