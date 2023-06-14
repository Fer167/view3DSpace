<template>
  <div class="footer__wrap"></div>
  <footer
    class="footer"
    :class="footerFixed ? 'footer__wrap-fixed' : ''"
  >
    <div class="footer__data">
      <p class="footer__copyright">
        © 3D Space, 2023
      </p>
      <p class="footer__copyright">
        <!-- Форма обратной связи -->
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "CastomFooter",
  data() {
    return {
      footerFixed: false,
    }
  },
  mounted () {
    
  }
};
</script>

<style scoped>
.footer__wrap{
  width: 0px;
  margin: 0;
  padding: 0;
  height: 50px;
}
.footer {
  display: flex;
  flex-direction: row;
  height: 50px;
  width: 100vw;
  background-color: #242424;
  position: fixed;
  bottom: 0;
  z-index: -100;
}
.footer__wrap-fixed {
  position: fixed;
  bottom: 0;
}
.footer__data {
  width: 1280px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.footer__copyright {
  font-size: 12px;
  color: #dddddd;
  margin: 0;
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
