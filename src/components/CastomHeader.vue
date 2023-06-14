<template>
  <div class="header__wrap-height"></div>

  <div
    class="header__search-wall"
    v-if="searchModal"
  >
    <div class="header__search-container">
      <div class="header__search-types">
        <p
          class="header__search-type"
          :class="activeType === 'models' ? 'header__search-type_active' : ''"
          @click="swapActiveType('models')"
        >
          Модели
        </p>
        <p
          class="header__search-type"
          :class="activeType === 'users' ? 'header__search-type_active' : ''"
          @click="swapActiveType('users')"
        >
          Пользователи
        </p>
      </div>
      <hr class="header__search-hr">
      <hr class="header__search-blue">
    </div>
    <div
      class="header__search-pictures"
      v-if="!searchText"
    >
        <img
          class="header__search-img"
          src="../assets/image/search_fon.png"
          alt=""
        >
        <p class="header__search-text">
          Введите что-нибудь для поиска
        </p>
    </div>
  </div>

  <div
    class="login-modal"
    @click.self="closeModal"
    v-if="isModalActive"
  >
    <LoginModal
      @modalEmit="closeModal"
    />
  </div>

  <div class="header__wrap">
    <nav class="header">
      <div
        v-if="isMenuActive"
        class="header__menu"
      >
        <p class="header__menu-title">
            {{ this.$store.getters.personData.name }}
        </p>
        <hr class="header__hr">
        <router-link
          class="header__menu-link"
          @click="swapActiveProfileSection('about_me')"
          to="/MyProfile"
        >
          <p class="header__menu-text">
              Мой профиль
          </p>
        </router-link>
        <router-link
          class="header__menu-link"
          @click="swapActiveProfileSection('my_works')"
          to="/MyProfile"
        >
          <p class="header__menu-text">
              Мои работы
          </p>
        </router-link>
        <hr class="header__hr">
        <router-link class="header__menu-link" to="/EditProfile">
          <p class="header__menu-text">
              Редактировать профиль
          </p>
        </router-link>
        <router-link class="header__menu-link" to="/AddModel">
          <p class="header__menu-text">
              Загрузить модель
          </p>
        </router-link>
        <hr class="header__hr">
          <p
            class="header__menu-text"
            @click="logout"
          >
            Выйти
          </p>
      </div>

      <router-link to="/">
        <img class="header__logo"
        src="../assets/image/logo/second.png"
        alt="Logo">
      </router-link>
      <router-link
        v-if="!searchModal"
        class="header__3d-models"
        to="/3DModels"
      >
        3D-модели
      </router-link>
      <div
        class="header__search"
        @click="searchModalActive"
      >
        <img class="header__search-icon" src="../assets/image/search.png">
        <input
          type="text"
          class="header__search-placeholder"
          placeholder="Поиск"
          v-model="searchText"
        >
      </div>
      <button
        class="header__login"
        v-if="!this.$store.getters.login && !searchModal"
        @click="openModal"
      >
        Войти
      </button>
      <button
        class="header__login"
        v-if="this.$store.getters.login && !searchModal"
        @click="openMenu"
      >
        <img class="header__avatar" :src="avatarLink">
      </button>
      <button
        class="header__close-search"
        v-if="searchModal"
        @click="searchModalRemove"
      >
        Отмена
      </button>
    </nav>
  </div>
</template>

<script>
import LoginModal from "@/components/LoginModal.vue";

export default {
  name: "CastomHeader",
  components: {
    LoginModal,
  },
  data() {
    return {
      isMenuActive: false,
      isModalActive: false,
      searchModal: false,
      searchText: "",
      activeType: "models",
      avatarLink: "",

    }
  },
  mounted () {
    window.addEventListener('scroll', this.amimationFomOpacity);
    this.avatarLink = require('../assets/image/person/' + JSON.parse(JSON.stringify(this.$store.getters.personData)).avatar);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.amimationFomOpacity);
    document.removeEventListener("click", this.closeManu);
  },
  methods: {
    swapActiveType (val) {
      this.activeType = val
      if (val === "models") {
        document.querySelector(".header__search-blue").style.left = "0px"
      }
      if (val === "users") {
        document.querySelector(".header__search-blue").style.left = "150px"
      }
    },
    logout () {
      this.$store.commit('SET_login', false);
    },
    amimationFomOpacity () {
      window.pageYOffset > 100 ? document.querySelector(".header__wrap").style.backgroundColor = "#fff" : document.querySelector(".header__wrap").style.backgroundColor = "";
    },
    closeModal () {
      this.isModalActive = false
      document.body.style.overflow = "";
    },
    openModal () {
      this.isModalActive = true 
      document.body.style.overflow = "hidden";
    },
    openMenu () {
      this.isMenuActive = true;
      setTimeout(() => {
        document.addEventListener("click", this.closeManu);
      }, 1);
    },
    closeManu (event) {
      // if (event.target.classList[0] !== "header__hr" || event.target.classList[0] != "header__menu" || event.target.classList[0] != "header__avatar") {
        // console.log(event.target.classList[0])
      this.isMenuActive = false;
      document.removeEventListener("click", this.closeManu);
      // }
    },
    swapActiveProfileSection (val) {
      this.$store.commit('SET_activeProfileSection', val);
      if (document.querySelector(".preson-data__hr-blue")) {
        val === 'about_me' ? document.querySelector(".preson-data__hr-blue").style.left = "0px" : document.querySelector(".preson-data__hr-blue").style.left = "200px"
      }
    },
    searchModalActive () {
      this.searchModal = true
      document.body.style.overflow = "hidden";
      document.querySelector(".header__search-placeholder").focus()
      setTimeout(() => {
        document.querySelector(".header__search-wall").style.top = "0vh"
        document.querySelector(".header__search-pictures").style.top = "30vh"
      }, 1);
    },
    searchModalRemove () {
      this.searchModal = false
      document.body.style.overflow = "";
      this.searchText = ""
    }
  }
};
</script>

<style scoped>
.header__wrap-height {
  height: 50px;
}
.header__hr {
  margin: 0;
  padding: 0;
  border: 0.5px solid #525252;
  margin: 5px 0;
}
.login-modal{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 10000;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, .5);
}
.header__wrap {
  position: fixed;
  top: 0;
  height: 50px;
  width: 100vw;
  transition: background-color 0.5s;
  z-index: 1000;
}
.header__menu {
  animation: 0.2s 1 normal createModalMenu;
  padding: 5px;
  color: #FFFFFF;
  position: absolute;
  left: auto;
  right: 0;
  top: 50px;
  margin: auto;
  width: 200px;
  background-color: #1E1E1E;
}
@keyframes createModalMenu {
  from {
    right: -10px;
    opacity: 0;
  }

  to {
    right: 0;
    opacity: 1;
  }
}
.header__menu-title {
  font-size: 16px;
  padding: 8px;
}
.header__menu-text {
  font-size: 14px;
  padding: 8px;
  cursor: pointer;
}
.header__menu-text:hover {
  background-color: #5f5f5f;
}
.header__menu-link {
  color: #FFFFFF;
}
.header {
  display: flex;
  flex-direction: row;
  width: 1280px;
  margin: auto;
  height: 50px;
  position: relative;
}

.header__logo {
  margin-right: 20px;
  height: 50px;
}

.header__3d-models {
  /* margin: 0 20px; */
  /* padding: 0 20px; */
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 120px;
}
.header__3d-models:hover {
  color: #35B7FF;
}

.header__search {
  margin: 10px 0;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  border: 2px solid #636363;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
}

.header__search-icon {
  height: 20px;
  margin: 3px 8px;
}

.header__search-placeholder {
  font-size: 16px;
  border: 0px;
  background-color: rgb(0, 0, 0, .0);
  margin: 3px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #838383;
  margin: 0;
  padding: 0;
  width: 100%;
}
.header__search-placeholder:focus{
    outline: none;
}
.header__login {
  background-color: rgb(0, 0, 0, .0);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
  cursor: pointer;
}
.header__avatar {
  width: 36px;
  border: 1px solid #000;

}
.header__close-search {
  width: 150px;
  height: 30px;
  margin: 10px 0;
  margin-left: 20px;
  background-color: #fff;
  border: 1px solid #1CAAD9;
  border-radius: 6px;
  color: #1CAAD9;
}
.header__close-search:hover {
  background-color: #1CAAD9;
  color: #fff;
  transition: all 0.4s;
}
.header__search-wall {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  position: fixed;
  top: -100vh;
  z-index: 3;
  transition: top 0.5s;
}
.header__search-img {
  width: 600px;
  margin: auto;
  opacity: 0.6;
}
.header__search-text {
  margin: auto;
  font-size: 40px;
  color: #A7A7A7;
  opacity: 0.6;
  cursor: auto;
  -ms-user-select: none; 
  -moz-user-select: none; 
  -webkit-user-select: none; 
  user-select: none;
}
.header__search-pictures {
  position: fixed;
  top: -70vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: top 0.5s;
}
.header__search-container {
  width: 1280px;
  margin: auto;
}
.header__search-types {
  margin-top: 100px;
  display: flex;
  flex-direction: row;

}
.header__search-type {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  width: 150px;
  cursor: pointer;
}
.header__search-type_active {
  color: #1CAAD9;
}
.header__search-hr {
  box-sizing: border-box;
  margin: 0;
  border: 0.5px solid #000;
}
.header__search-blue {
  box-sizing: border-box;
  margin: 0;
  border: 2px solid #1CAAD9;
  position: relative;
  top: -3px;
  left: 0px;
  width: 150px;
  transition: left 0.5s;
}
</style>
