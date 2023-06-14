import { createStore } from "vuex";

export default createStore({
  state: {
    activeEditModel: {},
    rerenderHeaderStore: 0,
    login: true,
    activeProfileSection: "about_me",
    personData: {
      id: 1,
      name: "Максим",
      login: "qwer",
      password: "qwer",
      link: "/maxim",
      avatar: "avatarDefault_example.jpg",
      short: "3D-визуализатор, профессионально занимаюсь созданием помещений, созданием реалистичных материалов, композиции кадра и освещением",
      privacy: "public",
      fullName: "Петров Максим Владиславович",
      address: "г. Москва",
      tel: "+7 (875) 555-75-75",
      proposedPosition: "3D-визуализатор, 3D-дизайнер, Архитектурный визуализатор",
      experience: "9 лет в сфере 3D-моделирования",
      schooling: "Чувашский государственный университет имени И.Н. Ульянова, 2014-2018 год",
      skills: "Профессионально занимаюсь созданием помещений, загрузками готовых моделей, созданием реалистичных материалов, композиции кадра и освещением",
      additional: "Я ответственный, общительный, стрессоустойчивый, коммуникабельный, честный",
    },
    models: [
      {
        id: 1,
        userId: 1,
        name: "Рубин",
        model: "1",
        starsRatedAmount: 0,
        scaleModel: 12,//лишнее
        user: "",//лишнее
        avatarUser: "",//лишнее
        description: "Красный рубин",
        date: "1.05.2023",
        privacy: "public",
        programs: "3D Max",
        render: "Arnold",
        poliigons: "160",
        vertices: "80",
        fileWeight: "15Mb",
        rights: "https://market.pmnd.rs/model/ruby",
        tegs: ["3DModel", "3DMax", "Ruby"]
      },
      {
        id: 2,
        userId: 1,
        name: "Деревянное ведро",
        model: "2",
        starsRatedAmount: 0,
        scaleModel: 20,//лишнее
        user: "",//лишнее
        avatarUser: "",//лишнее
        description: "Деревянное ведро",
        date: "1.05.2023",
        privacy: "public",
        programs: "3D Max",
        render: "Arnold",
        poliigons: "128",
        vertices: "36",
        fileWeight: "15Mb",
        rights: "https://market.pmnd.rs/model/wood-bucket",
        tegs: ["3DModel", "3DMax", "Bucket", "model"]
      },
    ],
  },
  getters: {
    activeEditModel: state => {
      return state.activeEditModel;
    },
    rerenderHeaderStore: state => {
      return state.rerenderHeaderStore;
    },
    models: state => {
      return state.models;
    },
    login: state => {
      return state.login;
    },
    activeProfileSection: state => {
      return state.activeProfileSection;
    },
    personData: state => {
      return state.personData;
    },
  },
  mutations: {
    ADD_models: (state, payload) => {
      if (!payload.programs) {
        payload.programs = ""
      }
      if (!payload.render) {
        payload.render = ""
      }
      if (!payload.poliigons) {
        payload.poliigons = ""
      }
      if (!payload.vertices) {
        payload.vertices = ""
      }
      if (!payload.fileWeight) {
        payload.fileWeight = ""
      }
      if (!payload.rights) {
        payload.rights = ""
      }
      if (!payload.tegs) {
        payload.tegs = []
      }
      state.models.push(payload);
    },
    DELETE_models: (state, payload) => {
      state.models.forEach(function(el, i) {
        if (el.id == payload) state.models.splice(i, 1)
      })
    },
    EDIT_models: (state, payload) => {
      state.models.forEach(function(el, i) {
        if (el.id == payload.id) state.models.splice(i, 1)
      })
      state.models.push(payload);
      state.models.sort((prev, next) => prev.id - next.id);
    },
    rerenderHeaderStore: (state, payload) => {
      state.rerenderHeaderStore++
    },
    SET_activeEditModel: (state, payload) => {
      state.activeEditModel = payload;
    },
    SET_login: (state, payload) => {
      state.login = payload;
    },
    SET_activeProfileSection: (state, payload) => {
      state.activeProfileSection = payload;
    },
    SET_personData: (state, payload) => {
      state.personData  = JSON.parse(JSON.stringify(payload));
    },
    SET_madelRated: (state, payload) => {
      state.models[payload.item-1].starsRatedAmount = payload.value;
    },
  },
  actions: {},
  modules: {},
});
