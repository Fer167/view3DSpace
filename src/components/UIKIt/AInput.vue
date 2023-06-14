<template>
  <section class="input">
    <header class="input__header">
      <p class="input__title">
        {{ title }}
      </p>
      <p
        class="input__link"
        v-if="isLink"
      >
        {{ link }}
      </p>
    </header>
    <img
      v-if="icon"
      class="input__show-password"
      src="../../assets/image/show_password.png"
      @click="iconLocal = !iconLocal"
    >
    <input
      class="input__data"
      v-model="dataInput"
      :type="iconLocal ? 'password' : 'text'"
    >
  </section>
</template>
  
<script>
export default {
  name: "AInput",
  props: {
    text: String,
    title: String,
    link: String,
    icon: Boolean,
    fontSize: String,
  },
  data() {
    return {
      dataInput: "",
      iconLocal: this.icon,
    }
  },
  mounted () {
    setTimeout(() => {
      this.dataInput = this.text
    }, 1);
    this.fontSize ? document.querySelector(".input__title").style.fontSize = this.fontSize + "px" : document.querySelector(".input__title").style.fontSize = "14px"
  },
  computed: {
    isLink () {
      return this.link !== undefined
    }
  },
  watch: {
    dataInput () {
      this.$emit('inputData', {
        dataEmit: this.dataInput
      })
    }
  }
};
</script>

<style scoped>
.input {
  width: 100%;
  position: relative;
}
.input__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.input__title {
}
.input__link {
  font-size: 14px;
  color: #4240B2;
  cursor: pointer;
}
.input__show-password {
  position: absolute;
  z-index: 1;
  height: 40px;
  margin-top: 10px;
  right: 0;
  cursor: pointer;
  margin-right: 5px;
}
.input__data {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  margin-top: 10px;
}
input {
  font-size: 14px;
  padding: 0 8px;
  margin: 0;
  box-sizing: border-box;
  border: 1px solid #939393;
}
</style>
