<template>
  <section class="peculiarities">
    <div :class="swap ? 'peculiarities__info_swap' : 'peculiarities__info'">
      <p class="peculiarities__title">
        {{ title }}
      </p>
      <p class="peculiarities__dectiption">
        {{ decription }}
      </p>
    </div>
    <div class="peculiarities__img-wrap">
      <img class="peculiarities__img" :src="imgPuth">
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
    decription: String,
    image: String,
    swap: Boolean,
  },
  data() {
    return {
      imgPuth: require('../assets/image/peculiarities/' + this.image),
    }
  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style scoped>
.peculiarities {
  width: 1280px;
  display: flex;
  flex-direction: row;
  margin: 100px auto;
}
.peculiarities__info {
  width: 50%;
  margin: 50px 50px;
}
.peculiarities__info_swap {
  width: 50%;
  margin: 50px 50px;
  order: 3;
}
.peculiarities__title {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}
.peculiarities__dectiption {
  font-size: 18px;
}
.peculiarities__img-wrap {
  width: 50%;
  order: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.peculiarities__img {
  height: 200px;
}
</style>
