<template>
  <section class="edit-model">
    <form class="edit-model__form">
      <AInput
        @input-data="nameModel"
        style="margin-top: 30px"
        title="Название модели"
        :text="localModel.name"
        font-size="16"
      />
      <ATextarea
        @textarea-data="descriptionModel"
        style="margin-top: 30px"
        title="Описание модели"
        :text="localModel.description"
        font-size="16"
      />
      <div class="edit-model__section">
        <p class="edit-model__section-name">
          Приватность
        </p>
        <div class="edit-model__section-privacy">
          <button
            :class="localModel.privacy == 'public' ? 'edit-model__btn_active' : ''"
            type="button"
            @click="publicActive"
          >
            Общедоступная модель
          </button>
          <button
            :class="localModel.privacy == 'privacy' ? 'edit-model__btn_active' : ''"
            type="button"
            @click="privacyActive"
          >
            Приватная модель
          </button>
          <button
            :class="localModel.privacy == 'link' ? 'edit-model__btn_active' : ''"
            type="button"
            @click="linkActive"
          >
            Доступ по ссылке
          </button>
        </div>
      </div>
    </form>
    <aside>
      <div class="edit-model__prompt">
        <p class="edit-model__prompt-title">
          Внимание!
        </p>
        <p>
          Вы можете редактировать лишь основные параметры загруженной модели
        </p>
        <div class="edit-model__wrap-submit">
          <router-link to="/MyProfile">
            <button
              :class="true ? 'edit-model__btn-submit' : 'edit-model__submit-disabled'"
              type="button"
              @click="submitEditModel"
            >
              Сохранить изменения
            </button>
          </router-link>
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
      localModel: {},
      startLocalModel: {},
    }
  },
  mounted () {
    this.localModel = JSON.parse(JSON.stringify(this.$store.getters.activeEditModel));
  },
  methods: {
    submitEditModel () {
      this.$store.commit('EDIT_models', this.localModel);
    },
    nameModel (el) {
      this.localModel.name = el.dataEmit
    },
    descriptionModel (el) {
      this.localModel.description = el.dataEmit
    },
    publicActive () {
      this.localModel.privacy = "public"
    },
    privacyActive () {
      this.localModel.privacy = "privacy"
    },
    linkActive () {
      this.localModel.privacy = "link"
    },
    downloadModel (e) {
      let file = e.target.files[0];
      console.log(file.name.split('.')[0])
      this.localModel.model = file.name.split('.')[0];
    }
  }
};
</script>

<style scoped>
.edit-model {
  width: 1280px;
  margin: auto;
  display: flex;
  flex-direction: row;
  margin-top: 50px;
}
.edit-model__form {
  margin-right: 10px;
  width: 800px;
}
button {
  border: 1px solid #000;
  border-radius: 10px;
  width: 260px;
  height: 40px;
  margin-top: 10px;
}
.edit-model__prompt {
  position: fixed;
  height: 400px;
  width: 480px;
  padding: 40px;
  color: #868686;
  box-sizing: border-box;
}
.edit-model__prompt-title{
  font-size: 18px;
}
p {
  margin: 10px 0;
}
.edit-model__wrap-submit {
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.edit-model__btn-submit {
  border: 3px solid #000;
  margin: auto;
}
.edit-model__btn-submit:hover {
  border: 3px solid #35B7FF;
  color: #2b82b1;
}
.edit-model__submit-disabled {
  cursor: auto;
  margin: auto;
  opacity: 0.3;
}
.edit-model__section {
  margin-top: 40px;
}
.edit-model__btn {
  border: 1px solid #000;
  border-radius: 5px;
  background-color: #8ACDF2;
  width: 220px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center ;
}
.edit-model__btn_active {
  border: 3px solid #35B7FF;
  color: #2b82b1;
}
.edit-model__section-privacy {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
