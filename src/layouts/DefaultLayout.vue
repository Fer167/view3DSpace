<template>
  <CastomHeader :key="this.$store.getters.rerenderHeaderStore"></CastomHeader>
  <div class="fon">
    <router-view />
  </div>
  <CastomFooter></CastomFooter>
</template>

<script>
import CastomHeader from '@/components/CastomHeader.vue';
import CastomFooter from '@/components/CastomFooter.vue';

export default {
  name: "DefaultLayout",
  components: {
    CastomHeader,
    CastomFooter,
  },
};
</script>

<style scoped>
.fon {
  background-color: #fff;
}
</style>
