<template>
  <div class="all-models">
    <div class="all-models__title">
      3D Модели всех пользователей
    </div>
    <AllWorks></AllWorks> 
  </div>
</template>

<script>
import AllWorks from '@/components/AllWorks.vue';

export default {
  props: {
  },
  components: {
    AllWorks,
  },
  data() {
    return {

    }
  },
  methods: {

  }
};
</script>

<style scoped>
.all-models {
  width: 1280px;
  margin: auto;
}
.all-models__title {
  margin-top: 50px;
  margin-bottom: 10px;
  font-size: 20px;
}
</style>
