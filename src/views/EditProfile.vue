<template>
  <section class="edit-profile">
    <form class="edit-profile__form">
      <div class="edit-profile__section">
        <div class="edit-profile__section-data">
          <img
            class="edit-profile__avatar-img"
            :src="avatarLink"
            alt=""
          >
          <div class="edit-profile__wrap-avatar">
            <form enctype="multipart/form-data" method="post">
              <input
                @change="downloadAvatar"
                id="file"
                type="file"
                accept="image/jpeg,image/png"
                style="display: none;"
              >
              <label class="edit-profile__btn" for="file">
                Загрузить
              </label>
            </form>
            <p class="edit-profile__limitation">
              JPG или PNG и не более 1 МБ
            </p>
          </div>
        </div>
      </div>
      <div class="edit-profile__section">
        <p class="edit-profile__section-name">
          Имя
        </p>
        <AInput
          :text="localPersonData.name"
          @input-data="namePerson"
        />
      </div>
      <div class="edit-profile__section">
        <p class="edit-profile__section-name">
          Коротко о себе
        </p>
        <ATextarea
          :text="localPersonData.short"
          @textarea-data="shortPerson"
        />
      </div>
      <div class="edit-profile__section">
        <p class="edit-profile__section-name">
          Ссылка на страницу
        </p>
        <AInput
          :text="localPersonData.link"
          @input-data="linkPerson"
        />
      </div>
      <div class="edit-profile__section">
        <p class="edit-profile__section-name">
          Полное имя
        </p>
        <AInput
          :text="localPersonData.fullName"
          @input-data="fullNamePerson"
        />
      </div>
      <div class="edit-profile__section">
        <p class="edit-profile__section-name">
          Адрес
        </p>
        <AInput
          :text="localPersonData.address"
          @input-data="addressPerson"
        />
      </div>
      <div class="edit-profile__section">
        <p class="edit-profile__section-name">
          Телефон
        </p>
        <AInput
          :text="localPersonData.tel"
          @input-data="telPerson"
        />
      </div>
      <div class="edit-profile__section">
        <p class="edit-profile__section-name">
          Предполагаемая должность
        </p>
        <AInput
          :text="localPersonData.proposedPosition"
          @input-data="proposedPositionPerson"
        />
      </div>
      <div class="edit-profile__section">
        <p class="edit-profile__section-name">
          Опыт работы
        </p>
        <AInput
          :text="localPersonData.experience"
          @input-data="experiencePerson"
        />
      </div>
      <div class="edit-profile__section">
        <p class="edit-profile__section-name">
          Образование
        </p>
        <ATextarea
          :text="localPersonData.schooling"
          @ATextarea-data="schoolingPerson"
        />
      </div>
      <div class="edit-profile__section">
        <p class="edit-profile__section-name">
          Умения
        </p>
        <ATextarea
          :text="localPersonData.skills"
          @ATextarea-data="skillsPerson"
        />
      </div>
      <div class="edit-profile__section">
        <p class="edit-profile__section-name">
          Дополнительная информация
        </p>
        <ATextarea
          :text="localPersonData.additional"
          @ATextarea-data="additionalPerson"
        />
      </div>
      <div class="edit-profile__section">
        <p class="edit-profile__section-name">
          Приватность
        </p>
        <div class="edit-profile__section-privacy">
          <button
            :class="localPersonData.privacy == 'public' ? 'edit-profile__btn_active' : ''"
            type="button"
            @click="publicActive"
          >
            Общедоступный аккаунт
          </button>
          <button
            :class="localPersonData.privacy == 'privacy' ? 'edit-profile__btn_active' : ''"
            type="button"
            @click="privacyActive"
          >
            Приватный аккаунт
          </button>
          <button
            :class="localPersonData.privacy == 'link' ? 'edit-profile__btn_active' : ''"
            type="button"
            @click="linkActive"
          >
            Доступ по ссылке
          </button>
        </div>
      </div>
    </form>
    <aside>
      <div class="edit-profile__prompt">
        <p class="edit-profile__prompt-title">
          Помните!
        </p>
        <p>
          Настраивая свои данные, вы создаете свое резюме для оценки предполагаемых работадателей
        </p>
        <p>
          Старайтесь писать о себе все то хорошее, что будет нужно о вас знать
        </p>
        <div class="edit-profile__wrap-submit">
          <button
            :class="JSON.stringify(localPersonData) !== JSON.stringify(this.$store.getters.personData) ? 'edit-profile__btn-submit' : 'edit-profile__submit-disabled'"
            type="button"
            @click="submitPersonData"
          >
            Сохранить изменения
          </button>
        </div>
      </div>
    </aside>
  </section>
</template>

<script>
import AInput from '@/components/UIKIt/AInput.vue';
import ATextarea from '@/components/UIKIt/ATextarea.vue';

export default {
  props: {
  },
  components: {
    AInput,
    ATextarea,
  },
  data() {
    return {
      avatarLink: "",
      localPersonData: {},
    }
  },
  mounted () {
    this.localPersonData = JSON.parse(JSON.stringify(this.$store.getters.personData));
    setTimeout(() => {
      this.localPersonData = JSON.parse(JSON.stringify(this.$store.getters.personData));
      this.avatarLink = require('../assets/image/person/' + this.localPersonData.avatar);
    }, 1);
  },
  methods: {
    submitPersonData () {
      if (JSON.stringify(this.localPersonData) !== JSON.stringify(this.$store.getters.personData)) {
        this.$store.commit('SET_personData', this.localPersonData);
      }
      this.$store.commit('rerenderHeaderStore');
    },
    downloadAvatar (e) {
      let file = e.target.files[0];
      this.avatarLink = require('../assets/image/person/' + file.name);
      this.localPersonData.avatar = file.name;
      // let reader = new FileReader();
      // reader.readAsDataURL(file);
      // document.querySelector(".edit-profile__avatar-img").src = reader.result;
    },
    publicActive () {
      this.localPersonData.privacy = "public"
    },
    privacyActive () {
      this.localPersonData.privacy = "privacy"
    },
    linkActive () {
      this.localPersonData.privacy = "link"
    },
    namePerson (el) {
      this.localPersonData.name = el.dataEmit
    },
    shortPerson (el) {
      this.localPersonData.short = el.dataEmit
    },
    linkPerson (el) {
      this.localPersonData.link = el.dataEmit
    },
    fullNamePerson (el) {
      this.localPersonData.fullName = el.dataEmit
    },
    addressPerson (el) {
      this.localPersonData.address = el.dataEmit
    },
    telPerson (el) {
      this.localPersonData.tel = el.dataEmit
    },
    proposedPositionPerson (el) {
      this.localPersonData.proposed = el.dataEmit
    },
    experiencePerson (el) {
      this.localPersonData.experience = el.dataEmit
    },
    schoolingPerson (el) {
      this.localPersonData.schooling = el.dataEmit
    },
    skillsPerson (el) {
      this.localPersonData.skills = el.dataEmit
    },
    additionalPerson (el) {
      this.localPersonData.additional = el.dataEmit
    },
  }
};
</script>

<style scoped>
.edit-profile {
  width: 1280px;
  margin: auto;
  display: flex;
  flex-direction: row;
  margin-top: 50px;
}
.edit-profile__form {
  margin-right: 10px;
  width: 800px;
}
.edit-profile__section {
  margin-bottom: 40px;
}
.edit-profile__section-name {
  margin-bottom: 10px;
}
.edit-profile__section-data {
  display: flex;
  flex-direction: row;
}
.edit-profile__avatar-img {
  width: 200px;
  height: 200px;
  border-radius: 50px;
  border: 1px solid #000;
}
.edit-profile__wrap-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 50px;
  flex-direction: column;
}
.edit-profile__btn {
  cursor: pointer;
  background-color: #8ACDF2;
  border: 1px solid #000;
  width: 220px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center ;
}
.edit-profile__limitation {
  margin-top: 2px;
  font-size: 12px;
  color: #8A8A8A;
}
.edit-profile__section-privacy {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
button {
  border: 1px solid #000;
  border-radius: 10px;
  width: 260px;
  height: 40px;
  margin-top: 10px;
}
.edit-profile__prompt {
  position: fixed;
  height: 400px;
  width: 480px;
  padding: 40px;
  color: #868686;
  box-sizing: border-box;
}
.edit-profile__prompt-title{
  font-size: 18px;
}
p {
  margin: 10px 0;
}
.edit-profile__btn_active {
  border: 3px solid #35B7FF;
  color: #2b82b1;
}
.edit-profile__wrap-submit {
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.edit-profile__btn-submit {
  border: 3px solid #000;
  margin: auto;
}
.edit-profile__btn-submit:hover {
  border: 3px solid #35B7FF;
  color: #2b82b1;
}
.edit-profile__submit-disabled {
  cursor: auto;
  margin: auto;
  opacity: 0.3;
}
</style>
