<template>
  <form
    class="login-form"
  >
    <header class="login-form__header">
      <p class="login-form__title">
        {{ modalTitle }}
      </p>
      <img
        @click="closeModal"
        class="login-form__close"
        src="../assets/image/close.png"
        alt="Close"
      >
    </header>
    <hr>
    <div
      v-if="typeForm === 1"
      class="login-form__log-in"
    >
      <AInput
        @input-data="emailData"
        style="margin-top: 30px"
        title="Введите e-mail"
      />
      <AInput 
        @input-data="passwordData"
        style="margin-top: 30px"
        title="Введите пароль"
        icon
      />
        <!-- link="Забыли пароль?" -->
    </div>
    <div
      v-if="typeForm === 2"
      class="login-form__log-in"
    >
      <AInput
        @input-data="nameRegister"
        style="margin-top: 30px"
        title="Введите имя"
      />
      <AInput
        @input-data="emailRegister"
        style="margin-top: 30px"
        title="Введите e-mail"
      />
      <AInput 
        @input-data="passwordRegister"
        style="margin-top: 30px"
        title="Придумайте пароль"
        icon
      />
      <AInput 
        @input-data="passwordRegisterСonfirmation"
        style="margin-top: 30px"
        title="Повторите пароль"
        icon
      />
    </div>
    <section class="login-form__swap-form">
      <span>
        {{ textSwap }}
      </span>
      <span
        class="login-form__swap-link"
        @click="swapForm"
      >
        {{ linkSwap }}
      </span>
    </section>
    <button
      v-if="typeForm !== 4"
      class="login-form__submit"
      @click="goLogin"
    >
      {{ modalButtom }}
    </button>
  </form>
</template>
  
<script>
import AInput from "@/components/UIKIt/AInput.vue";

export default {
  name: "LoginModal",
  components: {
    AInput,
  },
  data() {
    return {
      typeForm: 1,
      login: {
        // email: '',
        // password: '',
      },
      register: {
        // name: '',
        // email: '',
        // password: '',
        // passwordСonfirmation: '',
      }
    }
  },
  mounted () {
    document.querySelector(".login-form__title").style.fontSize = "18px";
  },
  computed: {
    goLogin () {
      this.$store.commit('SET_login', true);
    },
    modalTitle () {
      if (this.typeForm === 1) {
        return "Войти"
      }
      if (this.typeForm === 2) {
        return "Зарегистрироваться"
      }
      if (this.typeForm === 3) {
        return "Восстановление пароля"
      }
      if (this.typeForm === 4) {
        return "Политика конфиденциальности"
      }
      return "Error"
    },
    modalButtom () {
      if (this.typeForm === 1) {
        return "Войти по электронной почте"
      }
      if (this.typeForm === 2) {
        return "Зарегистрироваться"
      }
      if (this.typeForm === 3) {
        return "Получить письмо"
      }
      return "Error"
    },
    textSwap () {
      return this.typeForm === 1 ? "Впервые на сайте?" : "Уже есть аккаунт?"
    },
    linkSwap () {
      return this.typeForm === 1 ? "  Завести аккаунт" : "  Войдите здесь"
    },
  },
  methods: {
    swapForm () {
      this.typeForm === 1 ? this.typeForm = 2 : this.typeForm = 1
      this.login = {}
      this.register = {}
    },
    closeModal () {
      this.$emit('modalEmit')
    },
    emailData (el) {
      this.login.email = el.dataEmit
    },
    passwordData (el) {
      this.login.password = el.dataEmit
    },
    nameRegister (el) {
      this.register.name = el.dataEmit
    },
    emailRegister (el) {
      this.register.email = el.dataEmit
    },
    passwordRegister (el) {
      this.register.password = el.dataEmit
    },
    passwordRegisterСonfirmation (el) {
      this.register.passwordСonfirmation = el.dataEmit
    },
  }
};
</script>
  
<style scoped>
.login-form {
  margin: auto;
  background-color: #fff;
  width: 480px;
  height: 600px;
  border-radius: 20px;
  position: relative;
}
.login-form__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 70px;
  align-items: center;
  padding: 0px 35px;
}
.login-form__close {
  cursor: pointer;
}
hr {
  margin: 0;
  padding: 0;
  border: 2px solid #2c2c2c;
}
.login-form__log-in {
  padding: 0 40px;
  width: 400px;
  height: 400px;
}
.login-form__swap-form {
  padding: 0 40px;
  font-size: 14px;
}
.login-form__swap-link {
  color: #3E3BE7;
  cursor: pointer;
}
.login-form__submit {
  background-color: #8ACDF2;
  padding: 10px;
  margin: 19px 40px;
  position: absolute;
  right: 0;
  border-radius: 10px;
  border-bottom: 4px solid #2B2B2B;
}
</style>
