<template>
  <section class="preson-data">
    <div class="preson-data__nav">
      <p
        class="preson-data__about"
        :class="this.$store.getters.activeProfileSection == 'about_me' ? 'preson-data__page_active' : ''"
        @click="swapActiveProfileSection('about_me')"
      >
        Обо мне
      </p>
      <p 
        class="preson-data__works"
        :class="this.$store.getters.activeProfileSection == 'my_works' ? 'preson-data__page_active' : ''"
        @click="swapActiveProfileSection('my_works')"
      >
        Мои работы
      </p>
    </div>
    <hr class="preson-data__hr">
    <hr class="preson-data__hr-blue">
    <AboutMe
      v-if="this.$store.getters.activeProfileSection == 'about_me'"
    />
    <MyWorks
      v-if="this.$store.getters.activeProfileSection == 'my_works'"
    />
  </section>
</template>

<script>
import AboutMe from './AboutMe.vue';
import MyWorks from './MyWorks.vue';

export default {
  props: {
  },
  components: {
    AboutMe,
    MyWorks,
  },
  data() {
    return {
    }
  },
  mounted () {
    this.$store.getters.activeProfileSection === 'about_me' ? document.querySelector(".preson-data__hr-blue").style.left = "0px" : document.querySelector(".preson-data__hr-blue").style.left = "200px"
  },
  methods: {
    swapActiveProfileSection (val) {
      this.$store.commit('SET_activeProfileSection', val);
      val === 'about_me' ? document.querySelector(".preson-data__hr-blue").style.left = "0px" : document.querySelector(".preson-data__hr-blue").style.left = "200px"
    }
  }
};
</script>

<style scoped>
.preson-data {
  width: 1280px;
  margin: 0 auto;
  position: relative;
}
.preson-data__nav {
  font-size: 24px;
  display: flex;
  flex-direction: row;
}
.preson-data__about {
  margin: 0;
  width: 200px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.preson-data__works {
  margin: 0;
  width: 200px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.preson-data__hr{
  margin: 0;
  border: 1px solid #8C8C8C;
  margin-bottom: 20px;
}
.preson-data__hr-blue {
  position: absolute;
  top: 27px;
  margin: 0 ;
  border: 2px solid #1CAAD9;
  left: 0px;
  width: 200px;
  transition: left 0.5s;
}
.preson-data__page_active {
  color: #1CAAD9;
}
</style>
