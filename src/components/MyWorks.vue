<template>
  <div
    v-if="isActiovModalDetails"
    class="modal"
    @click.self="closeDetailsModel"
  >
    <div class="modal__data">
      <div class="modal__model-data">
        <div class="modal__model">
          <A3DModelDetail
            :name="activModel.model"
            :slice="activModel.scaleModel"
          />
        </div>
        <div class="modal__model-wrap1"></div>
        <div class="modal__model-wrap2"></div>
        <div class="modal__model-wrap3">
          <div class="modal__model-name">
            <p >
              {{ activModel.name }}
            </p>
            <div>
              <img
                class="modal__model-stars"
                v-for="(item, name, index) of starImage"
                :key="index"
                :src="item.path"
                alt=""
                @mouseover="mouseoverStars(item.id)"
                @mouseout="starsRated(false)"
                @click="starsRated(item.id)"
              >
            </div>
          </div>
          <div class="modal__user">
            <div class="modal__model-avatar">
              <router-link to="/MyProfile">
                <img
                  @mouseenter="hoverClass='modal__model-link_active'"
                  @mouseleave="hoverClass=''"
                  class="modal__model-img"
                  :src="avatarModelLink"
                  alt=""
                >
              </router-link>
            </div>
            <router-link to="/MyProfile">
              <p
                @mouseenter="hoverClass='modal__model-link_active'"
                @mouseleave="hoverClass=''"
                :class="hoverClass"
                class="modal__model-user"
              >
              {{ $store.getters.personData.name }}
              </p>
            </router-link>
          </div>
          <p class="modal__model-description">
            {{ activModel.description }}
          </p>
          <p class="modal__model-date">
            {{ activModel.date }}
          </p>
        </div>
      </div>
      <div class="modal__parameters">
        <p class="model__parameters-title">
          Параметры
        </p>
        <p class="model__parameters-item">
          Программа: {{ activModel.programs }}
        </p>
        <p class="model__parameters-item">
          Render: {{ activModel.render }}
        </p>
        <p class="model__parameters-item">
          Полигоны: {{ activModel.poliigons }}
        </p>
        <p class="model__parameters-item">
          Вершины: {{ activModel.vertices }}
        </p>
        <p class="model__parameters-item">
          Вес файла: {{ activModel.fileWeight }}
        </p>
        <p class="model__parameters-item">
          Права: {{ activModel.rights }}
        </p>
        <p class="model__parameters-item">
          Скачать: <a class="model__download" :href="`/models/${activModel.model}.gltf`" download="">в формате .gltf</a>
        </p>
        <div class="model__tegs-wrap">
          <p
            class="model__parameters-tegs"
            v-for="(itemTegs, name, index) of activModel.tegs"
            :key="index"
          >
            {{ itemTegs }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <section class="my-works">
    <button
      v-for="(item, name, index) of this.$store.getters.models"
      :key="index"
      class="my-works__models"
      @click="openDetailsModel(item)"
    >
      <div class="my-works__canvas">
        <A3DModelCover
          :name="item.model"
          :slice="item.scaleModel"
          :key="rerender3DModelCover"
        />
      </div>
      <div class="my-works__desc">
        <div>
          <img
            class="my-works__avatar"
            :src="avatarModelLink"
            alt=""
          >
        </div>
        <p class="my-works__name">
          {{ item.name }}
        </p>
        <router-link
          to="/EditModel"
        >
          <button
            class="my-works__btn-edit"
            @click="modelEdit(item)"
          >
            <img
              class="my-works__btn-icon"
              src="../assets/image/edit.png"
              alt=""
            >
          </button>
        </router-link>
        <button
          class="my-works__btn-delete"
          @click="modelDelete(item.id)"
        >
          <img
            class="my-works__btn-icon"
            src="../assets/image/delete.png"
            alt=""
          >
        </button>
      </div>
    </button>
  </section>
</template>

<script>
import A3DModelCover from './UIKIt/A3DModelCover.vue';
import A3DModelDetail from './UIKIt/A3DModelDetail.vue';

export default {
  props: {
  },
  components: {
    A3DModelCover,
    A3DModelDetail,
  },
  data() {
    return {
      avatarModelLink: require('../assets/image/person/' + this.$store.getters.personData.avatar),
      isActiovModalDetails: false,
      activModel: {},
      hoverClass: "",
      activeDelOrEdit: false,
      rerender3DModelCover: 0,
      starImage: [
        {
          id: 1,
          path: require('../assets/image/star.png'),
        },
        {
          id: 2,
          path: require('../assets/image/star.png'),
        },
        {
          id: 3,
          path: require('../assets/image/star.png'),
        },
        {
          id: 4,
          path: require('../assets/image/star.png'),
        },
        {
          id: 5,
          path: require('../assets/image/star.png'),
        },
      ],
      starsRatedAmountLocal: 0,
      localActiveModel: 0,
    }
  },
  mounted () {
    this.mouseoverStars(this.starsRatedAmount)
  },
  methods: {
    modelEdit (model) {
      this.activeDelOrEdit = true
      this.$store.commit('SET_activeEditModel', model);
    },
    modelDelete (id) {
      this.activeDelOrEdit = true
      this.$store.commit('DELETE_models', id);
      this.rerender3DModelCover += 1
    },
    openDetailsModel (item) {
      this.starsRatedAmountLocal = item.starsRatedAmount;
      this.localActiveModel = item.id;
      if (!this.activeDelOrEdit) {
        this.mouseoverStars(item.starsRatedAmount)
        this.activModel  = JSON.parse(JSON.stringify(item));
        this.isActiovModalDetails = true
        document.body.style.overflow = "hidden";
      }
      this.activeDelOrEdit = false
    },
    closeDetailsModel () {
      this.localActiveModel = 0;
      this.isActiovModalDetails = false
      document.body.style.overflow = "";
    },
    starsRated (amount) {
      if (amount) {
        let data = {
          item: this.localActiveModel,
          value: amount
        }
        this.$store.commit('SET_madelRated', data);
        this.starsRatedAmountLocal = amount
      }
      this.mouseoverStars(this.starsRatedAmountLocal)
    },
    mouseoverStars (id) {
      let i = 0;
      this.starImage.forEach((el) => {
        i += 1;
        el.path = id < i ? require('../assets/image/star.png') : require('../assets/image/star_active.png')
      })
    }
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.4);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal__data {
  width: 1200px;
  height: 96vh;;
  background-color: #fff;
  overflow: auto;
  display: flex;
  flex-direction: row;
}
.modal__model-data {
  width: 900px;
}
.modal__model {
  position: absolute;
  top: -200px;
}
.modal__model-name {
  font-size: 20px;
  margin: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.modal__model-stars {
  width: 40px;
  padding: 5px;
  cursor: pointer;
}
.modal__model-avatar {
  height: 40px;
  margin-right: 20px;
}
.modal__model-wrap1 {
  height: 500px;
}
.modal__model-wrap2 {
  height: 200px;
  width: 900px;
  position: absolute;
  background-color: #fff;
}
.modal__model-wrap3 {
  position: relative;
  z-index: 1;
}
.modal__model-user {
  font-size: 20px;
}
.modal__model-description {
  margin: 20px;
}
.modal__model-date {
  margin: 20px;
}
.modal__user {
  display: flex;
  flex-direction: row;
  margin: 20px;
  align-items: center;
}
.modal__model-img {
  width: 40px;
  height: 40px;
}
.modal__parameters {
  box-sizing: border-box;
  width: 300px;
  background-color: #f3f3f3;
  padding: 20px;
}
.model__parameters-title {
  font-size: 18px;
  margin-bottom: 20px;
}

.model__parameters-item {
  color: #747474;
  margin-bottom: 10px;
}
.model__download {
  color: #0682a1
}
.model__download:hover {
  text-decoration: underline;
}
.model__tegs-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.model__parameters-tegs {
  margin: 5px;
  padding: 5px 10px;
  border-radius: 50px;
  background-color: #b8b8b8;
  cursor: pointer;
}
.my-works {
  width: 1320px;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  left: -20px;
}
.my-works__models {
  margin: 20px;
  min-width: 400px;
  /* height: 250px; */
  border: 1px solid #000;
  box-shadow: 0px 0px 10px rgb(105, 105, 105);
  border-radius: 10px;
}
.my-works__canvas {
  height: 298px;
}
.my-works__desc {
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.my-works__avatar {
  margin: 0 14px;
  width: 30px;
  height: 30px;
  border: 1px solid #747474;
}
.modal__model-link_active {
  color: #1CAAD9;
}
.my-works__name {
  width: 100%;
  text-align: start;
}
.my-works__btn-delete {
  width: 50px;
  height: 50px;
  transition: background 0.4s;
  border-radius: 0px 0px 10px 0px;
}
.my-works__btn-delete:hover {
  background-color: #ca7c7c;
}
.my-works__btn-edit {
  width: 50px;
  height: 50px;
  transition: background 0.4s;
}
.my-works__btn-edit:hover {
  background-color: #7d6fbb;
}
.my-works__btn-icon {
  padding-right: 10px;
  padding-left: 10px;
  width: 30px;
  height: 30px;
}
</style>
