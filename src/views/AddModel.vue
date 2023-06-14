<template>
  <section class="add-model">
    <form class="add-model__form">
      <AInput
        @input-data="nameModel"
        style="margin-top: 30px"
        title="Название модели"
        font-size="16"
      />
      <div class="add-model__section">
        <p>
          Загрузить модель
        </p>
        <form enctype="multipart/form-data" method="post">
          <input
            id="file"
            type="file"
            style="display: none;"
            @change="downloadModel"
          >
          <label
            class="add-model__btn"
            for="file"
          >
            Загрузить
          </label>
        </form>
      </div>
      <ATextarea
        @textarea-data="descriptionModel"
        style="margin-top: 30px"
        title="Описание модели"
        font-size="16"
      />
      <AInput
        @input-data="programModel"
        style="margin-top: 30px"
        title="Программа разработки"
        font-size="16"
      />
      <AInput
        @input-data="renderModel"
        style="margin-top: 30px"
        title="Render"
        font-size="16"
      />
      <AInput
        @input-data="poliigonsModel"
        style="margin-top: 30px"
        title="Количество полигонов"
        font-size="16"
      />
      <AInput
        @input-data="verticesModel"
        style="margin-top: 30px"
        title="Количество вершин"
        font-size="16"
      />
      <AInput
        @input-data="fileWeightModel"
        style="margin-top: 30px"
        title="Размер файла"
        font-size="16"
      />
      <AInput
        @input-data="rightsModel"
        style="margin-top: 30px"
        title="Права"
        font-size="16"
      />
      <AInput
        @input-data="tegsModel"
        style="margin-top: 30px"
        title="Теги (разделяйте теги пробелом)"
        font-size="16"
      />
      <div
        class="add-model__section-tegs"
        v-if="localModel.tegs[0] !== ''"
      >
        <p
          class="add-model__tegs"
          v-for="(item, name, index) of itemFilter"
          :key="index"
        >
          {{ item }}
        </p>
      </div>
      <div class="add-model__section">
        <p class="add-model__section-name">
          Приватность
        </p>
        <div class="add-model__section-privacy">
          <button
            :class="localModel.privacy == 'public' ? 'add-model__btn_active' : ''"
            type="button"
            @click="publicActive"
          >
            Общедоступная модель
          </button>
          <button
            :class="localModel.privacy == 'privacy' ? 'add-model__btn_active' : ''"
            type="button"
            @click="privacyActive"
          >
            Приватная модель
          </button>
          <button
            :class="localModel.privacy == 'link' ? 'add-model__btn_active' : ''"
            type="button"
            @click="linkActive"
          >
            Доступ по ссылке
          </button>
        </div>
      </div>
    </form>
    <aside>
      <div class="add-model__prompt">
        <p class="add-model__prompt-title">
          Внимание!
        </p>
        <p>
          Присылайте только ваши модели. Чужие и библиотечные модели будут удаляться, а вам закроют доступ на сайт
        </p>
        <p>
          Поддерживаемые расширения: .gltf
        </p>
        <div class="add-model__wrap-submit">
          <router-link to="/MyProfile">
            <button
              :class="true ? 'add-model__btn-submit' : 'add-model__submit-disabled'"
              type="button"
              @click="submitPersonData"
            >
              Загрузить модель
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
      localModel: {
        name: "",
        model: "",
        user: "",
        avatarUser: "",
        description: "",
        date: "",
        privacy: "public",
        tegs: [""],
      },
    }
  },
  mounted () {
  },
  methods: {
    submitPersonData () {
      this.localModel.scaleModel = 16;
      const maxId = this.$store.getters.models[this.$store.getters.models.length - 1];
      this.localModel.id = maxId ? maxId.id + 1 : 1;
      this.localModel.starsRatedAmount = 0;
      let date = new Date();
      this.localModel.date = date.getDate() + '.' + (+date.getMonth() + 1) + '.' + date.getFullYear()
      this.$store.commit('ADD_models', this.localModel);
    },
    nameModel (el) {
      this.localModel.name = el.dataEmit
    },
    descriptionModel (el) {
      this.localModel.description = el.dataEmit
    },
    programModel (el) {
      this.localModel.programs = el.dataEmit
    },
    renderModel (el) {
      this.localModel.render = el.dataEmit
    },
    poliigonsModel (el) {
      this.localModel.poliigons = el.dataEmit
    },
    verticesModel (el) {
      this.localModel.vertices = el.dataEmit
    },
    fileWeightModel (el) {
      this.localModel.fileWeight = el.dataEmit
    },
    rightsModel (el) {
      this.localModel.rights = el.dataEmit
    },
    tegsModel (el) {
      this.localModel.tegs = el.dataEmit.split(' ').filter(el => {
          return (el != "");
      })
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
  },
  computed: {
    itemFilter () {
      return this.localModel.tegs.filter(el => el != "")
    }
  },
};
</script>

<style scoped>
.add-model {
  width: 1280px;
  margin: auto;
  display: flex;
  flex-direction: row;
  margin-top: 50px;
}
.add-model__form {
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
.add-model__prompt {
  position: fixed;
  height: 400px;
  width: 480px;
  padding: 40px;
  color: #868686;
  box-sizing: border-box;
}
.add-model__prompt-title{
  font-size: 18px;
}
p {
  margin: 10px 0;
}
.add-model__wrap-submit {
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.add-model__btn-submit {
  border: 3px solid #000;
  margin: auto;
}
.add-model__btn-submit:hover {
  border: 3px solid #35B7FF;
  color: #2b82b1;
}
.add-model__submit-disabled {
  cursor: auto;
  margin: auto;
  opacity: 0.3;
}
.add-model__section {
  margin-top: 40px;
  margin-bottom: 40px;
}
.add-model__section-tegs {
  display: flex;
  flex-direction: row;
}
.add-model__tegs {
  padding: 5px 10px;
  margin: 5px;
  background-color: #b9b9b9;
  border-radius: 50px;
}
.add-model__btn {
  border: 1px solid #000;
  border-radius: 5px;
  background-color: #8ACDF2;
  width: 220px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center ;
}
.add-model__btn_active {
  border: 3px solid #35B7FF;
  color: #2b82b1;
}
.add-model__section-privacy {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
