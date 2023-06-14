<template>
  <section class="person">
    <div class="person__img-wrap">
      <img class="person__img" :src="avatarLink">
    </div>
    <div>
      <p class="person__name">
        {{ this.$store.getters.personData.name }}
      </p>
      <p>
        {{ this.$store.getters.personData.short }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
  },
  data() {
    return {
      avatarLink: "",
    }
  },
  mounted () {
    this.avatarLink = require('../assets/image/person/' + JSON.parse(JSON.stringify(this.$store.getters.personData)).avatar);
  },
  methods: {

  }
};
</script>

<style scoped>
.person{
  width: 1280px;
  margin: 50px auto;
  display: flex;
  flex-direction: row;
}
.person__img-wrap {
  width: 200px;
  height: 200px;
  margin-right: 50px;
}
.person__img {
  width: 200px;
  height: 200px;
  border-radius: 50px;
  border: 1px solid #000;
}
.person__name {
  margin-top: 20px;
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
