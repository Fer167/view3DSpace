<template>
  <section class="title">
    <img class="title__elipse" src="../assets/image/MainPageFon/elipses.png" alt="">
    <aside class="title__information">
      <div class="title__wrap-description">
        <div class="title__black-box"></div>
        <p class="title__text">
          3D Space - это веб-приложение по размещению своего портфолио на тему 3D-моделирования для работодателей
        </p>
      </div>
      <div class="title__slider">
        <p class="title__slider-text">
          {{ sliderData[sliderNumber] }}
        </p>
        <div class="title__slider-box">
          <div
            v-for="(item, index) of sliderData"
            :key="index"
            class="title__box-items"
            @click="goNextSlide(index)"
          >
            <div :class="index == sliderNumber ? 'title__box-color_active' : 'title__box-color'" />
          </div>
        </div>
      </div>
    </aside>
    <div class="title__medel">
      <A3DModel />
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue';
import A3DModel from './UIKIt/A3DModel.vue';

export default {
  props: {
  },
  components: {
    A3DModel,
  },
  data() {
    return {
      sliderTimeSwap: 4, //секунды
      sliderSI: null,
      sliderNumber: 0,
      sliderData: [
        "Храните свои работы",
        "Просматривайте в 3D-проекции",
        "Делитесь своими работами",
        "Создайте резюме с портфолио",
        "Ищите новые кадры",
      ]
    }
  },
  mounted () {
    this.slideSetInterval()
  },
  computed: {

  },
  methods: {
    slideSetInterval () {
      clearInterval(this.sliderSI);
      this.sliderSI = setInterval(() => {
        this.sliderNumber > 3 ? this.sliderNumber = 0 : this.sliderNumber += 1
      }, this.sliderTimeSwap * 1000);
    },
    goNextSlide (val=0) {
      this.sliderNumber = val
    this.slideSetInterval()
    }
  }
};
</script>

<style scoped>
.title__elipse {
  position: absolute;
  width: 2600px;
  top: -400px;
  margin-left: -450px;
}
.title {
  overflow: hidden;
  width: 1280px;
  margin: auto;
  display: flex;
  flex-direction: row;
  margin-top: 50px;
}
.title__information {
  width: 50%;
  margin-top: 100px;
  position: relative;
  z-index: 1;
}
.title__wrap-description {
  display: flex;
  flex-direction: row;

}
.title__black-box {
  width: 10px;
  height: 200px;
  background-color: #000;
}
.title__text {
  font-size: 18px;
  margin: auto 30px;
  width: 630px;
}
.title__slider {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.title__slider-text {
  font-size: 36px;
  margin: 60px 0;
}
.title__slider-box {
  display: flex;
  flex-direction: row;
}
.title__box-items{
  width: 90px;
  height: 5px;
  padding: 5px;
  cursor: pointer;
}
.title__box-color {
  background-color: #B0B0B0;
  width: 100%;
  height: 100%;
}
.title__box-color_active {
  background-color: #35B7FF;
  width: 100%;
  height: 100%;
}
.title__medel {
  position: relative;
  z-index: 1;
}
</style>
