<template>
  <section class="textarea">
    <header class="textarea__header">
      <p class="textarea__title">
        {{ title }}
      </p>
      <p
        class="textarea__link"
        v-if="isLink"
      >
        {{ link }}
      </p>
    </header>
    <textarea
      class="textarea__data"
      v-model="dataInput"
      rows="6"
    >
    </textarea>
  </section>
</template>
  
<script>
export default {
  name: "ATextarea",
  props: {
    text: String,
    title: String,
    link: String,
    fontSize: String,
  },
  data() {
    return {
      dataInput: "",
    }
  },
  mounted () {
    setTimeout(() => {
      this.dataInput = this.text
    }, 1);
    this.fontSize ? document.querySelector(".textarea__title").style.fontSize = this.fontSize + "px" : document.querySelector(".textarea__title").style.fontSize = "14px"
  },
  computed: {
    isLink () {
      return this.link !== undefined
    }
  },
  watch: {
    dataInput () {
      this.$emit('textareaData', {
        dataEmit: this.dataInput
      })
    }
  }
};
</script>

<style scoped>
.textarea {
  width: 100%;
  position: relative;
}
.textarea__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.textarea__title {
}
.textarea__link {
  font-size: 14px;
  color: #4240B2;
  cursor: pointer;
}
.textarea__data {
  width: 100%;
  border-radius: 10px;
  margin-top: 10px;
}
textarea {
  font-size: 14px;
  padding: 8px;
  margin: 0;
  box-sizing: border-box;
  border: 1px solid #939393;
  resize: none;
}
</style>
